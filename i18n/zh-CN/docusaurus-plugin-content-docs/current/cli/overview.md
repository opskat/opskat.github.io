---
sidebar_position: 1
sidebar_label: 概览
---

# opsctl CLI 概览

`opsctl` 是一个独立的命令行工具，与 OpsKat 桌面应用共享相同的核心。它为远程基础设施管理提供脚本化和自动化能力——SSH 命令执行、文件传输、数据库查询和 Redis 操作——同时拥有与图形界面相同的策略 (Policy) 执行和审计 (Audit) 日志。

## 安装

### 从桌面应用安装（推荐）

打开 OpsKat 桌面应用，使用一键安装按钮。这会将内置的 `opsctl` 二进制文件提取到：

- **macOS / Linux:** `~/.local/bin/opsctl`
- **Windows:** `%LOCALAPPDATA%/opsctl/opsctl.exe`

### 从源码构建

```bash
make build-cli        # Build to ./build/bin/opsctl
make install-cli      # Install to $GOPATH/bin
```

## 全局参数

| 参数 | 环境变量 | 说明 |
|------|---------|------|
| `--data-dir <path>` | — | 覆盖应用数据目录（默认为平台特定路径，如 `~/Library/Application Support/opskat`） |
| `--master-key <key>` | `OPSKAT_MASTER_KEY` | 覆盖用于凭据解密的主加密密钥 |
| `--session <id>` | `OPSKAT_SESSION_ID` | 批量审批的会话 ID（未指定时自动创建） |

## 桌面应用集成

当 OpsKat 桌面应用正在运行时，`opsctl` 会通过 Unix 套接字（`sshpool.sock`）自动连接到桌面应用。这提供了以下能力：

- **连接池** — 复用桌面应用的 SSH 连接，而非新建连接
- **审批 (Approval) 工作流** — 写操作（exec、cp、create、update）会在桌面应用中弹出审批对话框
- **会话审批** — 用户点击"允许本次会话"后，同一会话中的后续操作将自动通过审批

当桌面应用未运行时，`opsctl` 会回退到使用共享数据库和凭据进行直连。

## 资产解析

在所有命令中，资产 (Asset) 可以通过以下方式引用：

- **数字 ID:** `opsctl exec 1 -- uptime`
- **名称:** `opsctl exec web-server -- uptime`
- **分组/名称:** `opsctl exec production/web-01 -- uptime`（当多个资产同名时用于消歧）

## 命令列表

| 命令 | 说明 |
|------|------|
| [`exec`](./exec.md) | 通过 SSH 在远程服务器上执行 Shell 命令 |
| [`ssh`](./ssh.md) | 打开交互式 SSH 终端会话 |
| [`cp`](./cp.md) | 在本地与远程服务器之间复制文件（类似 scp） |
| [`sql`](./sql.md) | 在数据库资产上执行 SQL（MySQL、PostgreSQL） |
| [`redis`](./redis.md) | 在 Redis 资产上执行 Redis 命令 |
| [`grant`](./grant.md) | 提交批量授权以进行预审批 |
| `session` | 管理审批会话（启动、结束、查看状态） |
| `list` | 列出资源（`assets` 或 `groups`） |
| `get` | 获取资源的详细信息 |
| `create` | 创建新资产（SSH、数据库或 Redis） |
| `update` | 更新已有资产 |
| `version` | 输出版本信息 |

## 审批与会话

写操作（`exec`、`cp`、`sql`、`redis`、`create`、`update`）需要审批。审批流程如下：

1. **策略检查** — 命令会根据资产的策略（白名单/黑名单）进行检查
2. **授权匹配** — 如果存在匹配的预审批授权模式，命令将被放行
3. **桌面应用审批** — 如果策略和授权均未匹配，将在桌面应用中弹出审批对话框

会话将多个操作归入同一审批范围。会话在首次写操作时自动创建，存储在当前目录的 `.opskat/sessions/` 中。会话有效期为 24 小时。

```bash
# 显式管理会话
opsctl session start               # 创建会话并输出其 ID
opsctl exec web-01 -- uptime       # 使用 .opskat/sessions/ 中的会话
opsctl exec web-02 -- df -h        # 同一会话——首次点击"允许本次会话"后自动审批
opsctl session end                  # 结束会话

# 也可以让系统自动创建
opsctl exec web-01 -- uptime       # 首次调用时自动创建会话
```

会话 ID 的解析优先级：
1. `--session <id>` 全局参数
2. `OPSKAT_SESSION_ID` 环境变量
3. `.opskat/sessions/<scope>` 文件（自动创建，沿目录树向上查找）

`<scope>` 由终端环境变量（`TERM_SESSION_ID`、`ITERM_SESSION_ID`、`WT_SESSION`、`WINDOWID`）派生，因此同一目录下的不同终端窗口会获得各自独立的会话。
