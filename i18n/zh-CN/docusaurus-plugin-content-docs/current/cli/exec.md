---
sidebar_position: 2
sidebar_label: exec
---

# opsctl exec

在**任意**资产上执行命令 —— SSH 服务器、数据库、Redis、MongoDB、etcd、Kafka、Kubernetes、对象存储，统统走这一个命令。

:::info
早期版本有独立的 `opsctl sql`、`opsctl redis`、`opsctl mongo` 三个子命令，现已移除。改用 `opsctl exec`，命令内容按资产类型的语法书写（见[下文](#各类型的命令语法)）。
:::

## 语法

```bash
opsctl [global-flags] exec <asset> [--type <type>] [--] <command>
```

## 参数

| 参数 | 说明 |
|------|------|
| `asset` | 资产名称或数字 ID。可使用 `group/name` 格式消歧。 |
| `command` | 要执行的命令，按该资产类型的语法书写。使用 `--` 将命令与 opsctl 参数分隔，`--` 之后的所有内容会被拼接为一个完整的命令字符串。 |

## 参数选项

| 选项 | 说明 |
|------|------|
| `--type <type>` | 可选的**断言**：资产类型不符时立即报错退出。它**不**决定派发方式 —— 派发永远由资产的真实类型决定。可填规范类型（`ssh`、`database`、`redis`、`mongodb`、`etcd`、`kafka`、`k8s`、`oss`、`serial`），也接受兼容别名 `sql` 和 `mongo`。 |

## 派发方式

命令怎么跑，由资产自身的类型决定：

- **`ssh` 资产**走流式通道 —— 转发 stdin、实时输出 stdout/stderr、远端退出码原样作为 opsctl 的退出码。
- **其余类型**（`database`、`redis`、`mongodb`、`etcd`、`kafka`、`k8s`、`oss` 等）走统一 exec 处理器，返回捕获后的输出，通常是 JSON。

## 各类型的命令语法

执行 `opsctl help <asset>`（或 `opsctl help <type>`）可查看该类型权威的命令语法、配置字段和注意事项。它是只读的，从不触发审批。

```bash
opsctl help prod-db      # 传资产
opsctl help kafka        # 传类型名，即使还没有该类型的资产也能查
```

速查表：

| 资产类型 | 命令语法 | 示例 |
|----------|----------|------|
| `ssh` | Shell 命令原样传入 | `opsctl exec web-01 -- uptime` |
| `database` | SQL 原样传入 | `opsctl exec prod-db -- "SELECT id, name FROM users LIMIT 10"` |
| `redis` | Redis 命令原样传入 | `opsctl exec cache -- "HGETALL user:1"` |
| `mongodb` | `<operation> [collection] [--db=<db>] [--query=<json>]` | `opsctl exec mongo-db -- find users --query='{"filter":{"active":true},"limit":10}'` |
| `etcd` | `<op> [key] [value] [--flags]`（etcdctl 子集） | `opsctl exec etcd-01 -- get /app/ --prefix` |
| `kafka` | `<family> <verb> [target] [--flags]` | `opsctl exec kafka-01 -- topic describe orders` |
| `k8s` | kubectl 命令，带不带开头的 `kubectl` 都行 | `opsctl exec prod-cluster -- get pods -A` |
| `oss` | `<family> <verb> [target] [--flags]` | `opsctl exec s3-prod -- object list backups/2026/` |

几个实际容易踩的点：

- **Redis：** 绝对不要发 `SELECT`。连接是池化的，`SELECT` 要么不生效，要么破坏其他调用方的库选择。
- **MongoDB：** `--db` 属于命令内容，不是 opsctl 的参数；不写则用资产配置的默认库。`--query` 一律用单引号包起来。
- **数据库 / Redis：** CLI 没有单次调用切库的选项，一律使用资产配置的默认数据库（或 Redis DB 编号）。
- 非 SSH 的命令只做分词，**不**经过 shell 执行：`$`、`|`、`>`、`&` 会直接报错而不是展开。含这些字符的值请用单引号包住。

## 管道支持（仅 ssh 资产）

当标准输入不是终端（即数据通过管道传入）时，输入数据会被转发到远程命令的 stdin。远程命令的 stdout 和 stderr 会直接写入本地的 stdout 和 stderr，从而支持 Unix 管道链式调用。

远程命令的退出码会作为 `opsctl` 的退出码返回。

## 审批

此命令需要运行中的桌面应用进行审批，并且按**资产自身类型**的策略检查 —— `database` 资产走 SQL 策略，`redis` 资产走 Redis 策略，以此类推：

- 匹配资产**白名单**的命令无需审批即可执行
- 匹配**黑名单**的命令会被立即拒绝
- 如果未指定会话，系统会自动创建一个。可复用授权来自明确保存的 Grant 模式；匹配的后续命令可跳过再次提示
- 当桌面应用离线时，仅允许执行匹配白名单策略或预审批授权的命令

## 示例

```bash
# 按名称、ID 或 分组/名称 指定资产
opsctl exec web-server -- uptime
opsctl exec 1 -- ls -la /var/log
opsctl exec production/web-01 -- cat /etc/hosts

# 先断言资产类型，类型不对就立即失败
opsctl exec cache --type redis -- "GET session:abc123"

# 查询数据库
opsctl exec prod-db -- "SELECT COUNT(*) FROM users"

# MongoDB、etcd、Kafka、Kubernetes、对象存储
opsctl exec mongo-db -- countDocuments users --db=app
opsctl exec etcd-01 -- put /app/config '{"debug":true}'
opsctl exec kafka-01 -- topic list
opsctl exec prod-cluster -- logs deploy/api --tail 100
opsctl exec s3-prod -- object stat backups/2026/db.sql.gz

# 通过管道向远程命令传入数据（仅 ssh）
echo "hello" | opsctl exec web-server -- cat

# 与本地命令链式调用，并利用透传的退出码
opsctl exec web-server -- cat /etc/nginx/nginx.conf | grep upstream
opsctl exec web-server -- test -f /opt/app/config.yml && echo "exists"

# 使用显式会话
opsctl --session $ID exec web-01 -- systemctl restart nginx
```
