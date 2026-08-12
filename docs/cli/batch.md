---
sidebar_position: 5
sidebar_label: batch
---

# opsctl batch

Execute multiple commands in parallel with a single approval request. A single batch can mix any asset types — SSH, database, Redis, MongoDB, etcd, Kafka, Kubernetes, and more. Each command is written in the syntax for its asset's type; see [`opsctl exec`](./exec.md#command-syntax-per-asset-type) or run `opsctl help <asset>`.

## Syntax

```bash
# Positional args
opsctl [global-flags] batch '<asset>:<command>' ...
opsctl [global-flags] batch '<type>:<asset>:<command>' ...

# Stdin JSON
echo '{"commands":[...]}' | opsctl [global-flags] batch
```

## Input Modes

### Positional Args

Format: `asset:command` or `type:asset:command`.

Dispatch always comes from the asset's **real** type. The optional `type` prefix is an **assertion**, not a selector: it fails that one item fast if the asset isn't actually of that type. A bare `asset:command` entry makes no assertion and runs against any asset type.

The first `:` is checked — if the left side is a known type it's treated as a prefix, otherwise the whole left side is the asset identifier. Recognized prefixes are the canonical asset types (`ssh`, `database`, `redis`, `mongodb`, `etcd`, `kafka`, `k8s`, `serial`) plus the compatibility aliases `exec`, `sql`, and `mongo`.

```bash
# No assertion — each asset is dispatched by its own type
opsctl batch 'web-01:uptime' 'db-server:df -h'

# Mixed types, with assertions
opsctl batch 'ssh:web-01:uptime' 'database:prod-db:SELECT 1' 'redis:cache:PING' 'mongodb:analytics:countDocuments events'

# Group/name asset reference
opsctl batch 'ssh:production/web-01:uptime'
```

### Stdin JSON

Primary mode for AI and scripting. Each command specifies `asset`, `command`, and an optional `type` (the same assertion as the positional prefix — omit it to make no assertion).

```bash
echo '{"commands":[
  {"asset": "web-01", "type": "ssh", "command": "uptime"},
  {"asset": "prod-db", "type": "database", "command": "SELECT COUNT(*) FROM users"},
  {"asset": "cache", "type": "redis", "command": "INFO keyspace"},
  {"asset": "analytics", "type": "mongodb", "command": "countDocuments events"}
]}' | opsctl batch
```

## Output

Structured JSON with per-command results. The `type` field echoes back the type you asserted for that item, or `exec` when you asserted none — it is not a report of the asset's real type.

```json
{
  "results": [
    {
      "asset_id": 1,
      "asset_name": "web-01",
      "type": "ssh",
      "command": "uptime",
      "exit_code": 0,
      "stdout": " 14:32:01 up 30 days...\n",
      "stderr": ""
    },
    {
      "asset_id": 2,
      "asset_name": "prod-db",
      "type": "database",
      "command": "SELECT COUNT(*) FROM users",
      "exit_code": 0,
      "stdout": "{\"columns\":[\"COUNT(*)\"],\"rows\":[[42]]}",
      "error": ""
    }
  ]
}
```

**Exit code:**
- `0` — batch mechanism succeeded (even if individual commands failed; check per-result `exit_code` and `error`)
- `1` — all commands failed, or batch-level error (parsing, all denied)

## Approval

The batch command uses a dedicated approval flow:

1. **Policy pre-check** — each command is individually checked against the asset's policy (allow-list / deny-list). Auto-allowed commands skip approval; auto-denied commands are reported in output with an error.
2. **Single batch approval** — all remaining commands that need confirmation are presented in a single approval dialog in the desktop app, listing each command with its type badge.
3. **Parallel execution** — after approval, all commands execute concurrently (up to 10 in parallel).

When the desktop app is offline, only commands matching policy or grant patterns are executed; the rest are denied with hints about allowed commands.

## Examples

```bash
# Check uptime on multiple servers
opsctl batch '1:uptime' '2:uptime' '3:uptime'

# Gather info from different asset types
opsctl batch \
  'web-01:free -h' \
  'database:prod-db:SELECT version()' \
  'redis:cache:INFO server' \
  'k8s:prod-cluster:get nodes'

# Use with explicit session
opsctl --session $ID batch '1:uptime' '2:hostname'

# JSON input for complex queries
cat <<'EOF' | opsctl batch
{"commands":[
  {"asset":"web-01","command":"kubectl get pods -A --no-headers | wc -l"},
  {"asset":"web-01","command":"kubectl get namespaces --no-headers"},
  {"asset":"db-01","type":"database","command":"SELECT table_name FROM information_schema.tables LIMIT 10"}
]}
EOF
```
