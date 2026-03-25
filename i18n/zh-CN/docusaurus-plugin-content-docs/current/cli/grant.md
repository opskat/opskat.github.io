---
sidebar_position: 7
sidebar_label: grant
---

# opsctl grant

提交批量授权 (Grant) 以进行预审批。授权允许匹配特定模式的命令无需逐条审批即可执行。这对于需要运行多个相关命令的 AI 编程工具和自动化脚本尤为实用。

## 语法

```bash
# 简单模式 — 资产 + 命令模式作为参数
opsctl [global-flags] grant submit <asset> <pattern>...

# 简单模式 — 分组 + 命令模式
opsctl [global-flags] grant submit --group <group> <pattern>...

# JSON 模式 — 通过 stdin 传入复杂授权
opsctl [global-flags] grant submit [--group <group>] [asset...] < input.json
```

## 子命令

| 子命令 | 说明 |
|--------|------|
| `submit` | 提交批量授权以供审批 |

## 选项

| 选项 | 说明 |
|------|------|
| `--group <name\|id>` | 为未指定资产/分组的项目设置默认分组。可重复使用（`--group g1 --group g2`）。已审批的命令适用于分组内的所有资产。 |

## 工作原理

1. 提交包含一个或多个命令模式的授权
2. 桌面应用弹出审批对话框（用户可以在审批前编辑模式）
3. 审批通过后，会话 ID 会输出到 stdout
4. 后续匹配已审批模式的 `opsctl exec` 命令将跳过审批对话框

授权模式支持 `*` 通配符（例如 `systemctl *` 可匹配 `systemctl restart nginx`）。授权项**不会被消耗**——它们在整个会话期间持续有效。

:::note
`grant submit` 命令需要桌面应用正在运行，因为它需要用户交互来完成审批。
:::

## 简单模式

将资产（或 `--group`）和命令模式作为位置参数传入。所有模式均视为 `exec` 类型。

```bash
# 单个资产，多个模式
opsctl grant submit web-01 "systemctl *" "df -h" "uptime"

# 分组级别的授权
opsctl grant submit --group production "uptime" "df -h"
```

## JSON 模式

通过 stdin 传入 JSON 格式的授权，适用于复杂场景：多种操作类型、每项单独指定资产/分组，或附加描述信息。

```bash
# 单个资产，JSON 输入
echo '{"description":"Deploy","items":[{"type":"exec","command":"uptime"}]}' \
  | opsctl grant submit web-01

# 多个资产作为默认目标
echo '{"description":"Health check","items":[{"type":"exec","command":"uptime"}]}' \
  | opsctl grant submit web-01 web-02 web-03

# 每项单独指定资产/分组
cat <<EOF | opsctl grant submit
{"description":"Mixed operations","items":[
  {"type":"exec","asset":"web-01","command":"systemctl restart nginx"},
  {"type":"exec","group":"database","command":"pg_isready"}
]}
EOF
```

### JSON 输入格式

```json
{
  "description": "Grant description",
  "items": [
    {"type": "exec", "asset": "web-01", "command": "uptime"},
    {"type": "exec", "group": "production", "command": "systemctl status *"},
    {"type": "exec", "command": "df -h"}
  ]
}
```

### 项目字段

| 字段 | 说明 |
|------|------|
| `type` | 操作类型：`exec`、`cp`、`create` 或 `update` |
| `asset` | 资产名称或 ID（指向单个资产） |
| `group` | 分组名称或 ID（指向分组内的所有资产） |
| `command` | Shell 命令模式（支持 `*` 通配符） |
| `detail` | 人类可读的描述信息 |

当某项未指定 `asset` 或 `group` 时，它会继承位置参数和 `--group` 参数中的默认目标。

## 结合会话使用授权

授权审批通过后，会话 ID 会输出到 stdout。可将其用于后续命令：

```bash
# 提交授权并捕获会话 ID
SESSION=$(opsctl grant submit web-01 "systemctl *" "df -h")

# 执行预审批的命令，无需再次审批
opsctl --session $SESSION exec web-01 -- systemctl restart nginx
opsctl --session $SESSION exec web-01 -- df -h
```
