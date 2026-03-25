---
sidebar_position: 3
sidebar_label: ssh
---

# opsctl ssh

打开到远程服务器的交互式 SSH 终端会话。

## 语法

```bash
opsctl ssh <asset>
```

## 参数

| 参数 | 说明 |
|------|------|
| `asset` | 资产名称或数字 ID。可使用 `group/name` 格式消歧。 |

## 行为说明

- 打开一个完整的交互式 Shell 会话，分配 PTY（`xterm-256color`）
- 终端窗口大小变化会自动转发到远程会话
- **不需要**桌面应用审批（面向人类交互使用场景）
- 当桌面应用运行时，会复用其 SSH 连接池
- 当桌面应用未运行时，会建立直接的 SSH 连接
- 远程 Shell 的退出码会作为 `opsctl` 的退出码返回

## 示例

```bash
# 通过资产名称连接
opsctl ssh web-server

# 通过资产 ID 连接
opsctl ssh 1

# 使用 分组/名称 格式消歧
opsctl ssh production/web-01
```
