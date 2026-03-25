---
sidebar_position: 1
sidebar_label: Architecture
---

# Architecture Overview

OpsKat is a **dual-mode application**: a Wails v2 desktop app (Go backend + React frontend) and an `opsctl` CLI tool. Both modes share core infrastructure through `internal/bootstrap/`.

## System Components

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

### Shared Bootstrap (`internal/bootstrap/`)

Both the Wails app (`main.go`) and the CLI (`cmd/opsctl/`) call `bootstrap.Init()` to initialize the database, repositories, credential service, and migrations. The CLI accepts `--data-dir` and `--master-key` (or `OPSKAT_MASTER_KEY` env) overrides.

### opsctl CLI (`cmd/opsctl/`)

Standalone CLI for asset management and remote operations without the GUI:

- `list assets|groups`, `get asset <id>`, `create asset`, `update asset <id>`
- `exec <asset-id> -- <command>` -- SSH command execution with stdio piping
- `cp` -- scp-style file transfer: local-to-remote, remote-to-local, and remote-to-remote (direct streaming, no local disk)
- `ssh <asset-id>` -- Interactive SSH terminal session
- `sql <asset-id>` -- Database query execution
- `redis <asset-id>` -- Redis command execution
- `session` -- Session management for batch approval workflows
- `grant submit` -- Submit command patterns for pre-approval

## Backend Layers (cago framework)

OpsKat's backend follows a layered architecture using the [cago](https://github.com/cago-frame/cago) framework:

```
app.go (Wails bindings / controller layer)
  └── internal/service/       (business logic)
        └── internal/repository/  (data access)
              └── internal/model/entity/  (rich domain model)
```

### `app.go` -- Wails App Struct

All public methods on the `App` struct become frontend-callable bindings. This replaces the traditional controller/handler layer.

### `internal/service/` -- Services

Business logic layer. Each service is defined as an interface with a singleton accessor pattern:

```go
// e.g., Asset() returns the AssetSvc singleton
Asset() AssetSvc
```

### `internal/repository/` -- Repositories

Data access layer. Uses interface + `RegisterX(impl)` dependency injection pattern. Queries use `db.Ctx(ctx)` for GORM operations.

### `internal/model/entity/` -- Entities

**Rich domain model** -- entities contain business logic (e.g., `Validate`, `GetSSHConfig`, `CanConnect`), not just data fields. Type-specific configuration is stored as a JSON string in the `Config` field, accessed via entity methods like `GetSSHConfig()`/`SetSSHConfig()`, `GetDatabaseConfig()`/`SetDatabaseConfig()`, `GetRedisConfig()`/`SetRedisConfig()`.

### Cago Integration

Cago components start immediately via `Registry()`. Do **not** call `Start()` (it blocks forever):

```go
cago.New(ctx, cfg).
    Registry(component.Core()).
    Registry(component.Database()).
    DisableLogger()
```

Requires `_ "github.com/cago-frame/cago/database/db/sqlite"` import for the SQLite driver.

## Frontend Stack

- **React 19** + **TypeScript 5**
- **Tailwind CSS 4** (with `tw-animate-css`)
- **Zustand 5** for state management
- **Vite 6** for build tooling
- **xterm.js 6** for terminal emulation
- **i18next** / **react-i18next** for internationalization
- **Radix UI** + **Lucide icons** for components
- **react-markdown** for markdown rendering

### Frontend State (Zustand Stores)

| Store | Responsibility |
|---|---|
| `assetStore` | Assets/groups CRUD, selection state, breadcrumb path resolution via `getAssetPath()` |
| `terminalStore` | SSH terminal tabs with split pane support. Tabs use a `SplitNode` binary tree structure with ratio management |
| `aiStore` | Multi-tab AI chat with per-tab state (`tabStates`), generation-based stream event deduplication, conversation persistence |
| `queryStore` | Database/Redis query editor state per asset tab |
| `sftpStore` | SFTP file browser state |
| `tabStore` | Tab navigation state |
| `shortcutStore` | Configurable keyboard shortcut bindings |
| `terminalThemeStore` | xterm terminal color themes with custom editor |

## Frontend-Backend Communication

### Bindings (request/response)

Frontend calls `App.Method()` via generated TypeScript bindings at `wailsjs/go/main/App`. After changing `app.go` methods, regenerate bindings with:

```bash
wails generate module
```

### Events (streaming)

Backend emits events via `wailsRuntime.EventsEmit()`, frontend subscribes via `EventsOn()`.

Key event channels:
- SSH terminal data: `ssh:data:{sessionID}` / `ssh:closed:{sessionID}` (base64 encoded)
- AI streaming: `ai:event:{conversationID}` with `StreamEvent` objects

### Language Context

Backend methods use `a.langCtx()` which calls `i18n.WithLanguage(ctx, lang)` so cago i18n errors are translated based on the frontend's language setting.

## AI Module (`internal/ai/`)

Provider-based abstraction with tool execution, policy enforcement, and audit logging.

### Providers

| File | Provider | Notes |
|---|---|---|
| `openai.go` | OpenAI-compatible API | Streaming SSE, tool calling |
| `localcli.go` | Local CLI provider | Claude CLI, Codex CLI -- converts messages to plain text |
| `cli_claude.go` | Claude CLI | NDJSON stream parser, session resume via `-r <sessionID>` |
| `cli_codex.go` | Codex CLI | JSON-RPC 2.0 over stdin/stdout, subprocess lifecycle management |
| `cli_process.go` | CLI subprocess | Start, write JSON, read lines, context-aware shutdown |

### Conversation Loop (`agent.go`)

Runs a tool execution loop with a max of **10 rounds** to prevent infinite loops.

### Tools (`tool_registry.go`)

Available tools: `list_assets`, `get_asset`, `run_command`, `add_asset`, `update_asset`, `list_groups`, `get_group`, `upload_file`, `download_file`, `exec_sql`, `exec_redis`, `request_permission`.

Tool handlers are shared with opsctl via `AllToolDefs()`.

### Policy Enforcement

Three policy types, all supporting policy group inheritance:

| File | Type | Details |
|---|---|---|
| `command_policy.go` | SSH commands | Per-asset/group allow/deny lists. Uses `mvdan.cc/sh` to parse shell commands. Decisions: Allow, Deny, NeedConfirm. Checks approved grant items with `MatchCommandRule()` |
| `query_policy.go` | SQL statements | Uses TiDB parser to classify statements (SELECT/INSERT/UPDATE/DELETE/DROP/etc.) and detect dangerous patterns (no-WHERE delete/update, PREPARE, CALL) |
| `redis_policy.go` | Redis commands | Multi-word command matching (e.g., `CONFIG SET`). Per-asset allow/deny lists |
| `policy_group_resolve.go` | Group resolution | Resolves policy group inheritance chains, merges into final allow/deny rules |
| `policy_tester.go` | Testing | Real-time policy testing for all 3 types, used by frontend PolicyTestPanel |

### Policy Groups (`internal/service/policy_group_svc/`)

- **Built-in groups** (negative IDs, immutable): Linux ReadOnly, K8s ReadOnly, Docker ReadOnly, Dangerous Deny (SSH); ReadOnly, Dangerous Deny (SQL); ReadOnly, Dangerous Deny (Redis)
- **User-defined groups** (positive IDs): CRUD + copy from built-in
- Assets/groups reference policy groups via `Groups` field in their policy JSON. At evaluation time, referenced groups are resolved and merged.

### Audit (`audit.go`)

`AuditingExecutor` wraps `ToolExecutor` to automatically log all tool calls with decision info (decision, source, matched pattern, session ID). Audit context injected via `context.Value`.

Sources: `"ai"`, `"opsctl"`, `"mcp"` -- injected via `WithAuditSource(ctx, source)`. Logs stored in `audit_logs` table.

### Connection Caching

`SSHClientCache` (in `tool_registry.go`) and `ConnCache[C]` (generic, in `conn_cache.go`) reuse SSH/DB/Redis connections within a single AI conversation.

## Connection Pooling (`internal/connpool/`)

| File | Functionality |
|---|---|
| `database.go` | `sql.DB` connections for MySQL/PostgreSQL with optional SSH tunnel |
| `redis.go` | Redis clients with optional SSH tunnel |
| `tunnel.go` | SSH tunnel dial adapter for MySQL |
| `pg_tunnel.go` | SSH tunnel dial adapter for PostgreSQL |

## SSH Architecture (`internal/sshpool/`)

- `ssh_svc` manages sessions via `sync.Map` registry
- `internal/sshpool/` provides a Unix socket server for opsctl to access the desktop app's pooled SSH connections
- Jump host chains resolved recursively with max depth **5** to prevent circular references
- Supports port forwarding and SOCKS proxy
- Credentials encrypted via `credential_svc` (AES) before database storage; resolved via `credential_resolver`

## Approval & Grant System (`internal/approval/`)

Unix socket protocol (`<data-dir>/approval.sock`) for opsctl to request approval from the desktop app.

**Flow**: opsctl sends `ApprovalRequest` (type: exec/cp/create/update/grant) -> desktop app shows dialog -> user approves/denies -> `ApprovalResponse` sent back.

**Grant system**: AI (`request_permission` tool) or opsctl (`grant submit`) submits command patterns as `GrantSession` + `GrantItem` records. Approved grant items are matched against subsequent commands using `MatchCommandRule()` (supports `*` wildcard). Grant items persist for the session.

## Database & Migrations

- **SQLite** database (`opskat.db`)
- Schema managed via [gormigrate](https://github.com/go-gormigrate/gormigrate) in `migrations/migrations.go`
- Each migration is a numbered function (e.g., `202603220001`)
- Add new migrations to the `Migrations` slice

### App Data Directories

Resolved by `bootstrap.AppDataDir()`:

| Platform | Path |
|---|---|
| macOS | `~/Library/Application Support/opskat` |
| Windows | `%APPDATA%/opskat` |
| Linux | `~/.config/opskat` |

Database, config, and logs (`logs/opskat.log`, `logs/error.log`) are stored here. opsctl can override with `--data-dir`.

## Key Conventions

- **i18n**: All user-facing text uses i18next keys (frontend) or cago error codes (backend). Both support zh-CN and en.
- **Soft delete**: Assets use `Status = StatusDeleted` instead of hard delete.
- **Asset types**: `ssh`, `database` (MySQL/PostgreSQL), `redis` -- each with type-specific config and policy support.
- **Error handling**: Never ignore errors silently. Use cago zap logger: `logger.Default().Warn/Error(msg, zap.Error(err))`.
