---
sidebar_position: 1
sidebar_label: 概览
---

# opsctl CLI 概览

`opsctl` 是独立的 CLI 工具，与 OpsKat 共享数据和操作辅助模块。它为 SSH 命令、文件传输、SQL、Redis、MongoDB、资产管理和扩展工具提供脚本化与自动化能力；受支持的操作路径带有对应的策略与审计覆盖。

## 安装

### 从桌面应用安装（推荐）

打开 OpsKat 桌面应用并使用一键安装按钮。内嵌的 `opsctl` 会被释放到：

- **macOS / Linux：** `~/.local/bin/opsctl`
- **Windows：** `%LOCALAPPDATA%/opsctl/opsctl.exe`

### 从源码构建

```bash
make build-cli        # 构建到 ./build/bin/opsctl
make install-cli      # 安装到 $GOPATH/bin
```

## 全局参数

| 参数 | 环境变量 | 说明 |
|---|---|---|
| `--data-dir <path>` | — | 覆盖应用数据目录（默认值依平台而定，例如 `~/Library/Application Support/opskat`） |
| `--master-key <key>` | `OPSKAT_MASTER_KEY` | 覆盖用于解密凭据的主密钥 |
| `--session <id>` | `OPSKAT_SESSION_ID` | 批量审批的会话 ID（未指定时自动创建） |

## 桌面应用集成

OpsKat 桌面应用运行时，`opsctl` 会通过本地套接字连接应用：

- **连接池** —— 通过 `sshpool.sock` 复用桌面应用的 SSH 连接，而不是重新连接
- **审批工作流** —— 需要确认的操作通过 `approval.sock` 在桌面应用中显示审批对话框
- **持久化授权** —— 审批被明确保存为可复用模式后，后续匹配操作可通过 Grant 系统获得授权

桌面应用未运行时，支持离线模式的命令会使用共享数据库和凭据直连。

## 资产解析

所有命令都可以通过以下方式引用资产：

- **数字 ID：** `opsctl exec 1 -- uptime`
- **名称：** `opsctl exec web-server -- uptime`
- **分组/名称：** `opsctl exec production/web-01 -- uptime`（存在同名资产时用于消歧）

## 命令

| 命令 | 说明 |
|---|---|
| [`exec`](./exec.md) | 通过 SSH 在远程服务器执行 shell 命令 |
| [`batch`](./batch.md) | 并行执行多个命令（exec/sql/redis/mongo） |
| [`ssh`](./ssh.md) | 打开交互式 SSH 终端会话 |
| [`cp`](./cp.md) | 在本地与远程服务器之间复制文件（scp 风格） |
| [`sql`](./sql.md) | 在数据库资产上执行 SQL（MySQL、PostgreSQL、SQL Server 或 SQLite） |
| [`redis`](./redis.md) | 在 Redis 资产上执行 Redis 命令 |
| [`mongo`](./mongo.md) | 在 MongoDB 资产上执行操作 |
| [`grant`](./grant.md) | 提交批量授权以供预审批 |
| [`ext`](./ext.md) | 列出已安装扩展或执行扩展工具 |
| `session` | 管理审批会话（start、end、status） |
| `list` | 列出资源（`assets` 或 `groups`） |
| `get` | 获取资源详情 |
| `create` | 创建受支持的 SSH、数据库、Redis、MongoDB 或 Kubernetes 资产 |
| `update` | 更新已有资产 |
| `version` | 输出版本信息 |

## 审批与会话

`exec`、`cp`、`sql`、`redis`、`mongo`、`create` 和 `update` 等操作使用各自文档说明的策略、Grant 和审批路径。桌面应用可用时，扩展执行仅把 `approval.sock` 作为委托传输通道；委托的 `ext_tool` 处理器不会显示常规审批对话框。

1. **策略检查** —— 根据资产策略（允许列表/拒绝列表）检查命令。
2. **授权匹配** —— 如果匹配已预先批准的授权模式，则允许执行。
3. **桌面应用审批** —— 策略和授权都未匹配时，桌面应用显示对话框。多个并发请求会自动合并到同一对话框，可“全部批准”或“全部拒绝”。

会话把多个操作归入同一审批范围。首次写操作时会自动创建，并存储在当前目录的 `.opscat/sessions/` 中；会话在 24 小时后过期。`.opscat` 是当前 CLI 实际使用的兼容路径拼写。

```bash
# 显式管理会话
opsctl session start
opsctl exec web-01 -- uptime
opsctl exec web-02 -- df -h
opsctl session end

# 也可以让它自动创建
opsctl exec web-01 -- uptime
```

会话 ID 解析优先级：

1. 全局参数 `--session <id>`
2. 环境变量 `OPSKAT_SESSION_ID`
3. `.opscat/sessions/<scope>` 文件（自动创建，并向上遍历目录树）

`<scope>` 根据终端环境变量（`TERM_SESSION_ID`、`ITERM_SESSION_ID`、`WT_SESSION`、`WINDOWID`）生成，因此同一目录下的不同终端窗口会获得独立会话。
