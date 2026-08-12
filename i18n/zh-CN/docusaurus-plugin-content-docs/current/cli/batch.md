---
sidebar_position: 5
sidebar_label: batch
---

# opsctl batch

并行执行多条命令，仅需一次审批。单个批次可以混合任意资产类型 —— SSH、数据库、Redis、MongoDB、etcd、Kafka、Kubernetes 等。每条命令按其资产类型的语法书写，参见 [`opsctl exec`](./exec.md#各类型的命令语法) 或执行 `opsctl help <asset>`。

## 语法

```bash
# 位置参数模式
opsctl [全局参数] batch '<asset>:<command>' ...
opsctl [全局参数] batch '<type>:<asset>:<command>' ...

# Stdin JSON 模式
echo '{"commands":[...]}' | opsctl [全局参数] batch
```

## 输入模式

### 位置参数

格式：`asset:command` 或 `type:asset:command`。

派发永远由资产的**真实**类型决定。可选的 `type` 前缀是**断言**而非选择器：资产类型不符时，仅该条目立即失败。不带前缀的 `asset:command` 不做任何断言，可用于任意类型的资产。

第一个 `:` 前的内容会被检查——如果是已知类型则作为类型前缀，否则整体作为资产标识。可用前缀为规范资产类型（`ssh`、`database`、`redis`、`mongodb`、`etcd`、`kafka`、`k8s`、`serial`）以及兼容别名 `exec`、`sql`、`mongo`。

```bash
# 不做断言 —— 每个资产按自身类型派发
opsctl batch 'web-01:uptime' 'db-server:df -h'

# 混合类型，并带上断言
opsctl batch 'ssh:web-01:uptime' 'database:prod-db:SELECT 1' 'redis:cache:PING' 'mongodb:analytics:countDocuments events'

# 分组/名称方式引用资产
opsctl batch 'ssh:production/web-01:uptime'
```

### Stdin JSON

主要面向 AI 和脚本的输入模式。每条命令指定 `asset`、`command`，以及可选的 `type`（与位置参数前缀同为断言，省略即不做断言）。

```bash
echo '{"commands":[
  {"asset": "web-01", "type": "ssh", "command": "uptime"},
  {"asset": "prod-db", "type": "database", "command": "SELECT COUNT(*) FROM users"},
  {"asset": "cache", "type": "redis", "command": "INFO keyspace"},
  {"asset": "analytics", "type": "mongodb", "command": "countDocuments events"}
]}' | opsctl batch
```

## 输出

结构化 JSON，包含每条命令的执行结果。其中 `type` 字段回显你为该条目声明的断言类型，未声明时为 `exec` —— 它不代表资产的真实类型。

```json
{
  "results": [
    {
      "asset_id": 1,
      "asset_name": "web-01",
      "type": "ssh",
      "command": "uptime",
      "exit_code": 0,
      "stdout": " 14:32:01 up 30 days...\n",
      "stderr": ""
    },
    {
      "asset_id": 2,
      "asset_name": "prod-db",
      "type": "database",
      "command": "SELECT COUNT(*) FROM users",
      "exit_code": 0,
      "stdout": "{\"columns\":[\"COUNT(*)\"],\"rows\":[[42]]}",
      "error": ""
    }
  ]
}
```

**退出码：**
- `0` — 批量机制本身成功（即使个别命令失败；需检查每条结果的 `exit_code` 和 `error`）
- `1` — 所有命令均失败，或批量级别错误（解析失败、全部被拒）

## 审批

batch 命令使用专门的审批流程：

1. **策略预检** — 每条命令独立检查资产策略（白名单/黑名单）。自动放行的命令跳过审批；自动拒绝的命令在输出中报告错误。
2. **单次批量审批** — 所有需要确认的命令在桌面应用中以单个审批弹窗呈现，列出每条命令及其类型标签。
3. **并行执行** — 审批通过后，所有命令并发执行（最多 10 条并行）。

桌面应用离线时，仅执行匹配策略或授权模式的命令；其余命令将被拒绝并提示允许的命令。

## 示例

```bash
# 检查多台服务器的运行时间
opsctl batch '1:uptime' '2:uptime' '3:uptime'

# 从不同类型的资产收集信息
opsctl batch \
  'web-01:free -h' \
  'database:prod-db:SELECT version()' \
  'redis:cache:INFO server' \
  'k8s:prod-cluster:get nodes'

# 使用显式会话
opsctl --session $ID batch '1:uptime' '2:hostname'

# 使用 JSON 输入执行复杂查询
cat <<'EOF' | opsctl batch
{"commands":[
  {"asset":"web-01","command":"kubectl get pods -A --no-headers | wc -l"},
  {"asset":"web-01","command":"kubectl get namespaces --no-headers"},
  {"asset":"db-01","type":"database","command":"SELECT table_name FROM information_schema.tables LIMIT 10"}
]}
EOF
```
