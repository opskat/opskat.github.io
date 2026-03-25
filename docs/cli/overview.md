---
sidebar_position: 1
sidebar_label: Overview
---

# opsctl CLI Overview

`opsctl` is a standalone CLI tool that shares the same core as the OpsKat desktop app. It provides scripting and automation for remote infrastructure management — SSH commands, file transfers, database queries, and Redis operations — with the same policy enforcement and audit logging as the GUI.

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
- **Session approval** — clicking "Remember" in the approval dialog stores the command pattern for the current session, auto-approving matching subsequent operations

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
| [`ssh`](./ssh.md) | Open an interactive SSH terminal session |
| [`cp`](./cp.md) | Copy files between local and remote servers (scp-style) |
| [`sql`](./sql.md) | Execute SQL on a database asset (MySQL, PostgreSQL) |
| [`redis`](./redis.md) | Execute a Redis command on a Redis asset |
| [`grant`](./grant.md) | Submit a batch grant for pre-approval |
| `session` | Manage approval sessions (start, end, status) |
| `list` | List resources (`assets` or `groups`) |
| `get` | Get detailed information about a resource |
| `create` | Create a new asset (ssh, database, or redis) |
| `update` | Update an existing asset |
| `version` | Print version information |

## Approval and Sessions

Write operations (`exec`, `cp`, `sql`, `redis`, `create`, `update`) require approval. The approval flow works as follows:

1. **Policy check** — the command is checked against the asset's policy (allow-list / deny-list)
2. **Grant matching** — if a pre-approved grant pattern matches, the command is allowed
3. **Desktop app approval** — if neither policy nor grant matches, a dialog is shown in the desktop app

Sessions group multiple operations under a single approval scope. They are auto-created on the first write operation and stored in `.opskat/sessions/` in the current directory. Sessions expire after 24 hours.

```bash
# Explicit session management
opsctl session start               # Creates a session, prints its ID
opsctl exec web-01 -- uptime       # Uses the session from .opskat/sessions/
opsctl exec web-02 -- df -h        # Same session — auto-approved after first "Allow Session"
opsctl session end                  # Ends the session

# Or just let it auto-create
opsctl exec web-01 -- uptime       # Auto-creates session on first call
```

Session ID resolution priority:
1. `--session <id>` global flag
2. `OPSKAT_SESSION_ID` environment variable
3. `.opskat/sessions/<scope>` file (auto-created, walks up directory tree)

The `<scope>` is derived from terminal environment variables (`TERM_SESSION_ID`, `ITERM_SESSION_ID`, `WT_SESSION`, `WINDOWID`) so that different terminal windows in the same directory get separate sessions.
