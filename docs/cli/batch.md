---
sidebar_position: 3
sidebar_label: batch
---

# opsctl batch

Execute multiple commands in parallel with a single approval request. Supports mixing exec (SSH), sql, redis, and mongo command types in a single batch.

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

Format: `asset:command` (default type `exec`) or `type:asset:command`.

The first `:` is checked — if the left side is a known type (`exec`, `sql`, `redis`, `mongo`), it's treated as a type prefix. Otherwise the entire left side is the asset identifier and the type defaults to `exec`.

```bash
# Default exec
opsctl batch 'web-01:uptime' 'db-server:df -h'

# Mixed types
opsctl batch 'web-01:uptime' 'sql:prod-db:SELECT 1' 'redis:cache:PING' 'mongo:analytics:db.events.countDocuments({})'

# Group/name asset reference
opsctl batch 'exec:production/web-01:uptime'
```

### Stdin JSON

Primary mode for AI and scripting. Each command specifies `asset`, `type` (optional, defaults to `exec`), and `command`.

```bash
echo '{"commands":[
  {"asset": "web-01", "type": "exec", "command": "uptime"},
  {"asset": "prod-db", "type": "sql", "command": "SELECT COUNT(*) FROM users"},
  {"asset": "cache", "type": "redis", "command": "INFO keyspace"},
  {"asset": "analytics", "type": "mongo", "command": "db.events.countDocuments({})"}
]}' | opsctl batch
```

## Output

Structured JSON with per-command results:

```json
{
  "results": [
    {
      "asset_id": 1,
      "asset_name": "web-01",
      "type": "exec",
      "command": "uptime",
      "exit_code": 0,
      "stdout": " 14:32:01 up 30 days...\n",
      "stderr": ""
    },
    {
      "asset_id": 2,
      "asset_name": "prod-db",
      "type": "sql",
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
  'sql:prod-db:SELECT version()' \
  'redis:cache:INFO server'

# Use with explicit session
opsctl --session $ID batch '1:uptime' '2:hostname'

# JSON input for complex queries
cat <<'EOF' | opsctl batch
{"commands":[
  {"asset":"web-01","command":"kubectl get pods -A --no-headers | wc -l"},
  {"asset":"web-01","command":"kubectl get namespaces --no-headers"},
  {"asset":"db-01","type":"sql","command":"SELECT table_name FROM information_schema.tables LIMIT 10"}
]}
EOF
```
