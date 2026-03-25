---
sidebar_position: 1
sidebar_label: 架构
---

# 架构概览

OpsKat 是一个**双模式应用**：一个 Wails v2 桌面应用（Go 后端 + React 前端）和一个 `opsctl` 命令行工具。两种模式通过 `internal/bootstrap/` 共享核心基础设施。

## 系统组件

```
┌──────────────────────────────────────────────────────┐
│                   Desktop App (Wails v2)             │
│  ┌────────────────┐        ┌───────────────────────┐ │
│  │  React Frontend │◄─────►│    Go Backend (app.go) │ │
│  │  (Bindings +    │       │                       │ │
│  │   Events)       │       │                       │ │
│  └────────────────┘        └───────────┬───────────┘ │
│                                        │             │
│                              ┌─────────▼──────────┐  │
│                              │  bootstrap.Init()   │  │
│                              └─────────┬──────────┘  │
│                                        │             │
│  ┌─────────────────────────────────────▼───────────┐ │
│  │  Service → Repository → Entity                  │ │
│  │  AI Module │ ConnPool │ SSHPool │ Approval       │ │
│  └─────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│                   opsctl CLI                         │
│  cmd/opsctl/ ──► bootstrap.Init() ──► same core     │
│  (accepts --data-dir, --master-key / OPSKAT_MASTER_KEY)│
└──────────────────────────────────────────────────────┘
```

### 共享引导层 (`internal/bootstrap/`)

Wails 应用（`main.go`）和命令行工具（`cmd/opsctl/`）都调用 `bootstrap.Init()` 来初始化数据库、仓库层、凭证服务和迁移。CLI 支持通过 `--data-dir` 和 `--master-key`（或 `OPSKAT_MASTER_KEY` 环境变量）进行覆盖配置。

### opsctl CLI (`cmd/opsctl/`)

无需 GUI 即可进行资产管理和远程操作的独立命令行工具：

- `list assets|groups`、`get asset <id>`、`create asset`、`update asset <id>`
- `exec <asset-id> -- <command>` -- 通过 SSH 执行命令，支持标准输入输出管道
- `cp` -- 类 scp 风格的文件传输：本地到远程、远程到本地、远程到远程（直接流式传输，无需本地磁盘）
- `ssh <asset-id>` -- 交互式 SSH 终端会话
- `sql <asset-id>` -- 数据库查询执行
- `redis <asset-id>` -- Redis 命令执行
- `session` -- 批量审批工作流的会话管理
- `grant submit` -- 提交命令模式以进行预审批

## 后端分层（cago 框架）

OpsKat 的后端遵循基于 [cago](https://github.com/cago-frame/cago) 框架的分层架构：

```
app.go (Wails 绑定 / 控制器层)
  └── internal/service/       (业务逻辑)
        └── internal/repository/  (数据访问)
              └── internal/model/entity/  (富领域模型)
```

### `app.go` -- Wails App 结构体

`App` 结构体上的所有公开方法都会成为前端可调用的绑定。这取代了传统的控制器/处理器层。

### `internal/service/` -- 服务层

业务逻辑层。每个服务定义为接口，采用单例访问器模式：

```go
// 例如，Asset() 返回 AssetSvc 单例
Asset() AssetSvc
```

### `internal/repository/` -- 仓库层

数据访问层。使用接口 + `RegisterX(impl)` 依赖注入模式。查询通过 `db.Ctx(ctx)` 执行 GORM 操作。

### `internal/model/entity/` -- 实体

**富领域模型** -- 实体包含业务逻辑（如 `Validate`、`GetSSHConfig`、`CanConnect`），而不仅仅是数据字段。类型特定的配置以 JSON 字符串存储在 `Config` 字段中，通过实体方法访问，如 `GetSSHConfig()`/`SetSSHConfig()`、`GetDatabaseConfig()`/`SetDatabaseConfig()`、`GetRedisConfig()`/`SetRedisConfig()`。

### Cago 集成

Cago 组件通过 `Registry()` 立即启动。**不要**调用 `Start()`（它会永久阻塞）：

```go
cago.New(ctx, cfg).
    Registry(component.Core()).
    Registry(component.Database()).
    DisableLogger()
```

需要导入 `_ "github.com/cago-frame/cago/database/db/sqlite"` 以注册 SQLite 驱动。

## 前端技术栈

- **React 19** + **TypeScript 5**
- **Tailwind CSS 4**（配合 `tw-animate-css`）
- **Zustand 5** 状态管理
- **Vite 6** 构建工具
- **xterm.js 6** 终端模拟
- **i18next** / **react-i18next** 国际化
- **Radix UI** + **Lucide icons** 组件库
- **react-markdown** Markdown 渲染

### 前端状态（Zustand Store）

| Store | 职责 |
|---|---|
| `assetStore` | 资产/分组的增删改查、选择状态、通过 `getAssetPath()` 进行面包屑路径解析 |
| `terminalStore` | SSH 终端标签页，支持分屏。标签页使用 `SplitNode` 二叉树结构，支持比例管理 |
| `aiStore` | 多标签页 AI 对话，每个标签页有独立状态（`tabStates`），基于 generation 的流式事件去重，对话持久化 |
| `queryStore` | 每个资产标签页的数据库/Redis 查询编辑器状态 |
| `sftpStore` | SFTP 文件浏览器状态 |
| `tabStore` | 标签页导航状态 |
| `shortcutStore` | 可配置的键盘快捷键绑定 |
| `terminalThemeStore` | xterm 终端配色方案，支持自定义编辑器 |

## 前后端通信

### 绑定（请求/响应）

前端通过 `wailsjs/go/main/App` 生成的 TypeScript 绑定调用 `App.Method()`。修改 `app.go` 中的方法后，需要重新生成绑定：

```bash
wails generate module
```

### 事件（流式传输）

后端通过 `wailsRuntime.EventsEmit()` 发送事件，前端通过 `EventsOn()` 订阅。

关键事件通道：
- SSH 终端数据：`ssh:data:{sessionID}` / `ssh:closed:{sessionID}`（base64 编码）
- AI 流式传输：`ai:event:{conversationID}`，携带 `StreamEvent` 对象

### 语言上下文

后端方法使用 `a.langCtx()`，它调用 `i18n.WithLanguage(ctx, lang)`，使 cago 国际化错误能够根据前端的语言设置进行翻译。

## AI 模块 (`internal/ai/`)

基于 Provider 的抽象层，支持工具执行、策略执行和审计日志。

### Provider

| 文件 | Provider | 说明 |
|---|---|---|
| `openai.go` | OpenAI 兼容 API | 流式 SSE，工具调用 |
| `localcli.go` | 本地 CLI Provider | Claude CLI、Codex CLI -- 将消息转换为纯文本 |
| `cli_claude.go` | Claude CLI | NDJSON 流解析器，通过 `-r <sessionID>` 恢复会话 |
| `cli_codex.go` | Codex CLI | 通过 stdin/stdout 进行 JSON-RPC 2.0 通信，子进程生命周期管理 |
| `cli_process.go` | CLI 子进程 | 启动、写入 JSON、读取行、上下文感知的关闭 |

### 对话循环 (`agent.go`)

运行工具执行循环，最多 **10 轮**，以防止无限循环。

### 工具 (`tool_registry.go`)

可用工具：`list_assets`、`get_asset`、`run_command`、`add_asset`、`update_asset`、`list_groups`、`get_group`、`upload_file`、`download_file`、`exec_sql`、`exec_redis`、`request_permission`。

工具处理器通过 `AllToolDefs()` 与 opsctl 共享。

### 策略执行

三种策略类型，均支持策略组继承：

| 文件 | 类型 | 详情 |
|---|---|---|
| `command_policy.go` | SSH 命令 | 按资产/分组设置允许/拒绝列表。使用 `mvdan.cc/sh` 解析 shell 命令。判定结果：Allow、Deny、NeedConfirm。通过 `MatchCommandRule()` 检查已批准的授权项 |
| `query_policy.go` | SQL 语句 | 使用 TiDB 解析器对语句进行分类（SELECT/INSERT/UPDATE/DELETE/DROP 等），检测危险模式（无 WHERE 的 delete/update、PREPARE、CALL） |
| `redis_policy.go` | Redis 命令 | 多词命令匹配（如 `CONFIG SET`）。按资产设置允许/拒绝列表 |
| `policy_group_resolve.go` | 分组解析 | 解析策略组继承链，合并为最终的允许/拒绝规则 |
| `policy_tester.go` | 测试 | 对所有 3 种类型进行实时策略测试，供前端 PolicyTestPanel 使用 |

### 策略组 (`internal/service/policy_group_svc/`)

- **内置组**（负数 ID，不可修改）：Linux 只读、K8s 只读、Docker 只读、危险操作拒绝（SSH）；只读、危险操作拒绝（SQL）；只读、危险操作拒绝（Redis）
- **用户自定义组**（正数 ID）：支持增删改查 + 从内置组复制
- 资产/分组通过策略 JSON 中的 `Groups` 字段引用策略组。在评估时，引用的策略组会被解析和合并。

### 审计 (`audit.go`)

`AuditingExecutor` 包装 `ToolExecutor`，自动记录所有工具调用及判定信息（判定结果、来源、匹配的模式、会话 ID）。审计上下文通过 `context.Value` 注入。

来源：`"ai"`、`"opsctl"`、`"mcp"` -- 通过 `WithAuditSource(ctx, source)` 注入。日志存储在 `audit_logs` 表中。

### 连接缓存

`SSHClientCache`（在 `tool_registry.go` 中）和 `ConnCache[C]`（泛型，在 `conn_cache.go` 中）在单次 AI 对话中复用 SSH/DB/Redis 连接。

## 连接池 (`internal/connpool/`)

| 文件 | 功能 |
|---|---|
| `database.go` | MySQL/PostgreSQL 的 `sql.DB` 连接，支持可选的 SSH 隧道 |
| `redis.go` | Redis 客户端，支持可选的 SSH 隧道 |
| `tunnel.go` | MySQL 的 SSH 隧道拨号适配器 |
| `pg_tunnel.go` | PostgreSQL 的 SSH 隧道拨号适配器 |

## SSH 架构 (`internal/sshpool/`)

- `ssh_svc` 通过 `sync.Map` 注册表管理会话
- `internal/sshpool/` 提供 Unix socket 服务器，供 opsctl 访问桌面应用的 SSH 连接池
- 跳板机链路递归解析，最大深度 **5**，防止循环引用
- 支持端口转发和 SOCKS 代理
- 凭证通过 `credential_svc`（AES）加密后存储到数据库；通过 `credential_resolver` 解析

## 审批与授权系统 (`internal/approval/`)

基于 Unix socket 协议（`<data-dir>/approval.sock`），供 opsctl 向桌面应用请求审批。

**流程**：opsctl 发送 `ApprovalRequest`（类型：exec/cp/create/update/grant）-> 桌面应用显示对话框 -> 用户批准/拒绝 -> 返回 `ApprovalResponse`。

**授权系统**：AI（`request_permission` 工具）或 opsctl（`grant submit`）提交命令模式作为 `GrantSession` + `GrantItem` 记录。已批准的授权项通过 `MatchCommandRule()`（支持 `*` 通配符）与后续命令进行匹配。授权项在会话期间持久有效。

## 数据库与迁移

- **SQLite** 数据库（`opskat.db`）
- 通过 [gormigrate](https://github.com/go-gormigrate/gormigrate) 在 `migrations/migrations.go` 中管理 Schema
- 每个迁移是一个编号函数（如 `202603220001`）
- 将新迁移添加到 `Migrations` 切片中

### 应用数据目录

通过 `bootstrap.AppDataDir()` 解析：

| 平台 | 路径 |
|---|---|
| macOS | `~/Library/Application Support/opskat` |
| Windows | `%APPDATA%/opskat` |
| Linux | `~/.config/opskat` |

数据库、配置和日志（`logs/opskat.log`、`logs/error.log`）存储在此目录。opsctl 可通过 `--data-dir` 覆盖。

## 关键约定

- **国际化**：所有面向用户的文本使用 i18next 键（前端）或 cago 错误码（后端）。均支持 zh-CN 和 en。
- **软删除**：资产使用 `Status = StatusDeleted` 而非硬删除。
- **资产类型**：`ssh`、`database`（MySQL/PostgreSQL）、`redis` -- 每种类型都有特定的配置和策略支持。
- **错误处理**：禁止静默忽略错误。使用 cago zap 日志记录器：`logger.Default().Warn/Error(msg, zap.Error(err))`。
