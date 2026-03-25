---
sidebar_position: 2
sidebar_label: exec
---

# opsctl exec

通过 SSH 在远程服务器上执行 Shell 命令。

## 语法

```bash
opsctl [global-flags] exec <asset> [--] <command>
```

## 参数

| 参数 | 说明 |
|------|------|
| `asset` | 资产名称或数字 ID。可使用 `group/name` 格式消歧。 |
| `command` | 在远程服务器上执行的 Shell 命令。使用 `--` 将命令与 opsctl 参数分隔。`--` 之后的所有内容会被拼接为一个完整的命令字符串。 |

## 管道支持

当标准输入不是终端（即数据通过管道传入）时，输入数据会被转发到远程命令的 stdin。远程命令的 stdout 和 stderr 会直接写入本地的 stdout 和 stderr，从而支持 Unix 管道链式调用。

远程命令的退出码会作为 `opsctl` 的退出码返回。

## 审批

此命令需要运行中的桌面应用进行审批：

- 匹配资产**白名单**的命令无需审批即可执行
- 匹配**黑名单**的命令会被立即拒绝
- 如果未指定会话，系统会自动创建一个。在审批对话框中点击"记住"后，匹配的后续命令将跳过审批
- 当桌面应用离线时，仅允许执行匹配白名单策略或预审批授权的命令

## 示例

```bash
# 通过资产名称执行命令
opsctl exec web-server -- uptime

# 通过资产 ID 执行命令
opsctl exec 1 -- ls -la /var/log

# 使用 分组/名称 格式消歧
opsctl exec production/web-01 -- cat /etc/hosts

# 通过管道向远程命令传入数据
echo "hello" | opsctl exec web-server -- cat

# 使用显式会话
opsctl --session $ID exec web-01 -- systemctl restart nginx

# 与本地命令链式调用
opsctl exec web-server -- cat /etc/nginx/nginx.conf | grep upstream

# 检查退出码
opsctl exec web-server -- test -f /opt/app/config.yml && echo "exists"
```
