---
sidebar_position: 1
sidebar_label: Overview
---

# opsctl CLI Overview

`opsctl` is a standalone CLI tool that shares OpsKat's data and operation helpers. It provides scripting and automation for SSH commands, file transfers, database / Redis / MongoDB / etcd / Kafka / Kubernetes / object-storage operations, asset management, and extension tools, with policy and audit coverage for supported operation paths.

## Installation

### From the Desktop App (Recommended)

Open OpsKat desktop app and use the one-click install button. This extracts the embedded `opsctl` binary to:

- **macOS / Linux:** `~/.local/bin/opsctl`
- **Windows:** `%LOCALAPPDATA%/opskat/opsctl.exe`

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

## Desktop App Integration

When the OpsKat desktop app is running, `opsctl` automatically connects to it via a Unix socket (`sshpool.sock`). This provides:

- **Connection pooling** — reuses the desktop app's SSH connections instead of opening new ones
- **Approval workflow** — non-interactive operations may use the desktop approval service when no permanent rule decides them
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
| [`exec`](./exec.md) | Execute a command on any asset (ssh, database, redis, mongodb, etcd, kafka, k8s, oss) |
| [`batch`](./batch.md) | Execute multiple commands in parallel across assets |
| [`ssh`](./ssh.md) | Open an interactive SSH terminal session |
| [`cp`](./cp.md) | Copy files between local, remote servers, and object storage (scp-style) |
| [`policy`](./policy.md) | Inspect effective authorization and manage permanent rules and policy groups |
| [`ext`](./ext.md) | List installed extensions or execute an extension tool |
| `help` | Show CLI usage, or `opsctl help <asset>` for that asset type's command syntax |
| [`list`](./assets.md#discover-credentials-safely) | List assets, groups, safe credential metadata, or stored audit rows (`list audit`) |
| [`get`](./assets.md#discover-credentials-safely) | Get asset detail or safe credential detail by typed reference |
| [`create`](./assets.md#create-an-asset) | Create any registered built-in asset type through its type-owned configuration, or create a group |
| `update` | Update an existing asset or group |
| `delete` | Delete an asset or group (always asks for human confirmation) |
| `version` | Print version information |

:::info
`opsctl sql`, `opsctl redis`, and `opsctl mongo` existed in earlier releases and have been removed. Every asset type is now driven through [`opsctl exec`](./exec.md), which dispatches on the asset's real type.
:::

## Authorization and Approval

Operations such as `exec`, `cp`, `batch`, `create`, `update`, and `delete` use their documented policy, grant, and approval paths. `exec` is checked against the policy of the asset's own type — a `database` asset by the SQL policy, a `redis` asset by the Redis policy, and so on. Extension execution is a separate delegated path and requires the desktop extension runtime.

1. **Policy check** — the command is checked against the asset's policy (allow-list / deny-list)
2. **Grant matching** — if a pre-approved grant pattern matches, the command is allowed
3. **Human approval** — if neither policy nor grant decides the operation, an interactive opsctl prompts in the current terminal. A single-kind operation can be allowed once, permanently allowed, or denied; other kinds can be allowed once or denied. A non-interactive invocation can instead use the desktop approval dialog when the app is reachable.

When neither an interactive terminal nor the desktop app is available, `exec`, `cp`, and `batch` exit with code 3, print `NEEDS AUTHORIZATION`, and provide a paste-ready permanent-rule command for a human to run. `create`, `update`, and `delete` cannot be pre-authorized and print `NEEDS TTY`; run the original operation in a terminal.

Approval sessions are internal, scoped to the data directory, and expire after 24 hours. There are no `session` subcommands, `--session` flag, `OPSKAT_SESSION_ID`, or project-local `.opskat/sessions/` files.

## Output Language

Human-readable policy, approval, and audit output follows `LC_ALL`, then `LC_MESSAGES`, then `LANG`. The refusal markers `NEEDS AUTHORIZATION` and `NEEDS TTY`, and the paste-ready command, remain stable English ASCII. Use `LC_ALL=C` when scripts need deterministic English display text.
