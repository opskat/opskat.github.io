---
sidebar_position: 1
sidebar_label: 概览
---

# opsctl CLI 概览

`opsctl` 是独立的 CLI 工具，与 OpsKat 共享数据和操作辅助模块。它为 SSH 命令、文件传输，数据库 / Redis / MongoDB / etcd / Kafka / Kubernetes / 对象存储操作，以及资产管理和扩展工具提供脚本化与自动化能力；受支持的操作路径带有对应的策略与审计覆盖。

## 安装

### 从桌面应用安装（推荐）

打开 OpsKat 桌面应用并使用一键安装按钮。内嵌的 `opsctl` 会被释放到：

- **macOS / Linux：** `~/.local/bin/opsctl`
- **Windows：** `%LOCALAPPDATA%/opskat/opsctl.exe`

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
| [`exec`](./exec.md) | 在任意资产上执行命令（ssh、database、redis、mongodb、etcd、kafka、k8s、oss） |
| [`batch`](./batch.md) | 跨资产并行执行多个命令 |
| [`ssh`](./ssh.md) | 打开交互式 SSH 终端会话 |
| [`cp`](./cp.md) | 在本地、远程服务器与对象存储之间复制文件（scp 风格） |
| [`grant`](./grant.md) | 提交批量授权以供预审批 |
| [`ext`](./ext.md) | 列出已安装扩展或执行扩展工具 |
| `help` | 查看 CLI 用法，或用 `opsctl help <asset>` 查看该资产类型的命令语法 |
| `session` | 管理审批会话（start、end、status） |
| [`list`](./assets.md#安全发现凭据) | 列出资产、分组或安全凭据元数据 |
| [`get`](./assets.md#安全发现凭据) | 获取资产详情，或通过类型化引用获取安全凭据详情 |
| [`create`](./assets.md#创建资产) | 通过类型自有配置创建任意已注册的内建资产类型，或创建分组 |
| `update` | 更新已有资产或分组 |
| `delete` | 删除资产或分组（始终需要桌面端确认） |
| `version` | 输出版本信息 |

:::info
`opsctl sql`、`opsctl redis`、`opsctl mongo` 是早期版本的命令，现已移除。所有资产类型统一通过 [`opsctl exec`](./exec.md) 驱动，由资产的真实类型决定派发方式。
:::

## 审批与会话

`exec`、`cp`、`batch`、`create`、`update` 和 `delete` 等操作使用各自文档说明的策略、Grant 和审批路径。`exec` 按资产自身类型的策略检查 —— `database` 资产走 SQL 策略，`redis` 资产走 Redis 策略，以此类推。桌面应用可用时，扩展执行仅把 `approval.sock` 作为委托传输通道；委托的 `ext_tool` 处理器不会显示常规审批对话框。

1. **策略检查** —— 根据资产策略（允许列表/拒绝列表）检查命令。
2. **授权匹配** —— 如果匹配已预先批准的授权模式，则允许执行。
3. **桌面应用审批** —— 策略和授权都未匹配时，桌面应用显示对话框。多个并发请求会自动合并到同一对话框，可“全部批准”或“全部拒绝”。

会话把多个操作归入同一审批范围。首次写操作时会自动创建，并存储在当前目录的 `.opskat/sessions/` 中；会话在 24 小时后过期。

```bash
# 显式管理会话
opsctl session start               # 创建会话并打印 ID
opsctl exec web-01 -- uptime       # 复用 .opskat/sessions/ 里的会话
opsctl exec web-02 -- df -h        # 命中「记住」保存的模式即可跳过审批
opsctl session end                 # 结束会话

# 也可以让它自动创建
opsctl exec web-01 -- uptime       # 首次调用时自动创建会话
```

会话 ID 解析优先级：

1. 全局参数 `--session <id>`
2. 环境变量 `OPSKAT_SESSION_ID`
3. `.opskat/sessions/<scope>` 文件（自动创建，并向上遍历目录树）

`<scope>` 根据终端环境变量（`TERM_SESSION_ID`、`ITERM_SESSION_ID`、`WT_SESSION`、`WINDOWID`）生成，因此同一目录下的不同终端窗口会获得独立会话。
