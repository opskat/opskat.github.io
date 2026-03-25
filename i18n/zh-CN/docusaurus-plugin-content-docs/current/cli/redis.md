---
sidebar_position: 6
sidebar_label: redis
---

# opsctl redis

对 Redis 资产执行 Redis 命令。当资产配置了 SSH 隧道时，Redis 连接会通过 SSH 隧道建立。

## 语法

```bash
opsctl [global-flags] redis <asset> "<command>"
```

## 参数

| 参数 | 说明 |
|------|------|
| `asset` | Redis 资产名称或数字 ID |
| `command` | 要执行的 Redis 命令（如 `GET mykey`、`HGETALL user:1`） |

## 审批

命令会根据资产的 Redis 策略进行检查：

- **允许的命令**无需审批即可执行
- **危险命令**（如 `FLUSHDB`、`CONFIG SET`）默认会被拒绝
- 其他命令需要用户通过桌面应用确认
- 当桌面应用离线时，仅允许执行匹配白名单策略的命令

## 示例

```bash
# 获取键值
opsctl redis cache "GET session:abc123"

# 获取哈希的所有字段
opsctl redis cache "HGETALL user:1"

# 设置带过期时间的键
opsctl redis cache "SET key value EX 3600"

# 按模式列出键
opsctl redis cache "KEYS user:*"

# 使用显式会话
opsctl --session $ID redis cache "DEL temp:*"
```
