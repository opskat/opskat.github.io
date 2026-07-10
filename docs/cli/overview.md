---
sidebar_position: 1
sidebar_label: Overview
---

# opsctl CLI Overview

`opsctl` is a standalone CLI tool that shares OpsKat's data and operation helpers. It provides scripting and automation for SSH commands, file transfers, SQL, Redis, MongoDB, asset management, and extension tools, with policy and audit coverage for supported operation paths.

## Installation

### From the Desktop App (Recommended)

Open OpsKat desktop app and use the one-click install button. This extracts the embedded `opsctl` binary to:

- **macOS / Linux:** `~/.local/bin/opsctl`
- **Windows:** `%LOCALAPPDATA%/opsctl/opsctl.exe`

### Build from Source

```bash
make build-cli        # Build to ./build/bin/opsctl
make install-cli      # Install to $GOPATH/bin
```

## Global Flags

| Flag | Env Variable | Description |
|------|-------------|-------------|
| `--data-dir <path>` | — | Override the application data directory (default: platform-specific, e.g. `~/Library/Application Support/opskat`) |
| `--master-key <key>` | `OPSKAT_MASTER_KEY` | Override the master encryption key for credential decryption |
| `--session <id>` | `OPSKAT_SESSION_ID` | Session ID for batch approval (auto-created if not specified) |

## Desktop App Integration

When the OpsKat desktop app is running, `opsctl` automatically connects to it via a Unix socket (`sshpool.sock`). This provides:

- **Connection pooling** — reuses the desktop app's SSH connections instead of opening new ones
- **Approval workflow** — write operations (exec, cp, create, update) prompt an approval dialog in the desktop app
- **Persisted grants** — when an approval is explicitly saved as reusable patterns, matching later operations can be authorized through the grant system

When the desktop app is not running, `opsctl` falls back to direct connections using the shared database and credentials.

## Asset Resolution

Assets can be referenced in all commands by:

- **Numeric ID:** `opsctl exec 1 -- uptime`
- **Name:** `opsctl exec web-server -- uptime`
- **Group/Name:** `opsctl exec production/web-01 -- uptime` (for disambiguation when multiple assets share a name)

## Commands

| Command | Description |
|---------|-------------|
| [`exec`](./exec.md) | Execute a shell command on a remote server via SSH |
| [`batch`](./batch.md) | Execute multiple commands in parallel (exec/sql/redis/mongo) |
| [`ssh`](./ssh.md) | Open an interactive SSH terminal session |
| [`cp`](./cp.md) | Copy files between local and remote servers (scp-style) |
| [`sql`](./sql.md) | Execute SQL on a database asset (MySQL, PostgreSQL, SQL Server, or SQLite) |
| [`redis`](./redis.md) | Execute a Redis command on a Redis asset |
| [`mongo`](./mongo.md) | Execute an operation on a MongoDB asset |
| [`grant`](./grant.md) | Submit a batch grant for pre-approval |
| [`ext`](./ext.md) | List installed extensions or execute an extension tool |
| `session` | Manage approval sessions (start, end, status) |
| `list` | List resources (`assets` or `groups`) |
| `get` | Get detailed information about a resource |
| `create` | Create a supported SSH, database, Redis, MongoDB, or Kubernetes asset |
| `update` | Update an existing asset |
| `version` | Print version information |

## Approval and Sessions

Operations such as `exec`, `cp`, `sql`, `redis`, `mongo`, `create`, and `update` use their documented policy, grant, and approval paths. Extension execution uses `approval.sock` only as a delegation transport when the app is available; the delegated `ext_tool` handler does not display the normal approval dialog.

1. **Policy check** — the command is checked against the asset's policy (allow-list / deny-list)
2. **Grant matching** — if a pre-approved grant pattern matches, the command is allowed
3. **Desktop app approval** — if neither policy nor grant matches, a dialog is shown in the desktop app. Multiple concurrent requests are automatically queued into a single dialog with "Approve All" / "Deny All" options

Sessions group multiple operations under a single approval scope. They are auto-created on the first write operation and stored in `.opscat/sessions/` in the current directory. Sessions expire after 24 hours. The `.opscat` spelling reflects the current CLI path and is retained for compatibility.

```bash
# Explicit session management
opsctl session start               # Creates a session, prints its ID
opsctl exec web-01 -- uptime       # Uses the session from .opscat/sessions/
opsctl exec web-02 -- df -h        # Same session — auto-approved after first "Allow Session"
opsctl session end                  # Ends the session

# Or just let it auto-create
opsctl exec web-01 -- uptime       # Auto-creates session on first call
```

Session ID resolution priority:
1. `--session <id>` global flag
2. `OPSKAT_SESSION_ID` environment variable
3. `.opscat/sessions/<scope>` file (auto-created, walks up directory tree)

The `<scope>` is derived from terminal environment variables (`TERM_SESSION_ID`, `ITERM_SESSION_ID`, `WT_SESSION`, `WINDOWID`) so that different terminal windows in the same directory get separate sessions.
