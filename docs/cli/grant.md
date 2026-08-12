---
sidebar_position: 6
sidebar_label: grant
---

# opsctl grant

Submit batch grants for pre-approval. Grants allow commands matching specific patterns to execute without per-command approval dialogs. This is particularly useful for AI coding tools and automation scripts that need to run multiple related commands.

## Syntax

```bash
# Simple mode — asset + command patterns as arguments
opsctl [global-flags] grant submit <asset> <pattern>...

# Simple mode — group + command patterns
opsctl [global-flags] grant submit --group <group> <pattern>...

# JSON mode — complex grants via stdin
opsctl [global-flags] grant submit [--group <group>] [asset...] < input.json
```

## Subcommands

| Subcommand | Description |
|------------|-------------|
| `submit` | Submit a batch grant for approval |

## Options

| Option | Description |
|--------|-------------|
| `--group <name\|id>` | Default group for items without an explicit asset/group. Repeatable (`--group g1 --group g2`). Approved commands apply to all assets in the group. |

## How It Works

1. You submit a grant with one or more command patterns
2. The desktop app shows an approval dialog (the user can edit patterns before approving)
3. If approved, a session ID is printed to stdout
4. Subsequent `opsctl exec` commands matching the approved patterns skip the approval dialog

Grant patterns support `*` wildcards (e.g., `systemctl *` matches `systemctl restart nginx`). Grant items are **not consumed** — they persist for the entire session.

:::note
The `grant submit` command requires the desktop app to be running, as it needs user interaction for approval.
:::

## Simple Mode

Pass an asset (or `--group`) and command patterns as positional arguments. All patterns are treated as `exec` type.

```bash
# Single asset with multiple patterns
opsctl grant submit web-01 "systemctl *" "df -h" "uptime"

# Group-level grant
opsctl grant submit --group production "uptime" "df -h"
```

## JSON Mode

Pipe a JSON grant via stdin for complex scenarios: multiple operation types, per-item asset/group overrides, or descriptions.

```bash
# Single asset, JSON input
echo '{"description":"Deploy","items":[{"type":"exec","command":"uptime"}]}' \
  | opsctl grant submit web-01

# Multiple assets as default targets
echo '{"description":"Health check","items":[{"type":"exec","command":"uptime"}]}' \
  | opsctl grant submit web-01 web-02 web-03

# Per-item asset/group overrides
cat <<EOF | opsctl grant submit
{"description":"Mixed operations","items":[
  {"type":"exec","asset":"web-01","command":"systemctl restart nginx"},
  {"type":"exec","group":"database","command":"pg_isready"}
]}
EOF
```

### JSON Input Format

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

### Item Fields

| Field | Description |
|-------|-------------|
| `type` | Operation type: `exec`, `cp`, `create`, or `update` |
| `asset` | Asset name or ID (targets a single asset) |
| `group` | Group name or ID (targets all assets in the group) |
| `command` | Shell command pattern (supports `*` wildcard) |
| `detail` | Human-readable description |

When an item has no `asset` or `group`, it inherits the default targets from the positional arguments and `--group` flags.

## Using Grants with Sessions

After a grant is approved, the session ID is printed to stdout. Use it for subsequent commands:

```bash
# Submit a grant and capture the session ID
SESSION=$(opsctl grant submit web-01 "systemctl *" "df -h")

# Execute pre-approved commands without further approval
opsctl --session $SESSION exec web-01 -- systemctl restart nginx
opsctl --session $SESSION exec web-01 -- df -h
```
