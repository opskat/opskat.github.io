---
sidebar_position: 2
sidebar_label: exec
---

# opsctl exec

Execute a command against **any** asset — SSH servers, databases, Redis, MongoDB, etcd, Kafka, Kubernetes, and object storage all go through this single command.

:::info
Earlier releases had separate `opsctl sql`, `opsctl redis`, and `opsctl mongo` verbs. They no longer exist — use `opsctl exec` with the syntax for the asset's type ([below](#command-syntax-per-asset-type)).
:::

## Syntax

```bash
opsctl [global-flags] exec <asset> [--type <type>] [--] <command>
```

## Arguments

| Argument | Description |
|----------|-------------|
| `asset` | Asset name or numeric ID. Use `group/name` to disambiguate. |
| `command` | Command to run, in the syntax for this asset's type. Use `--` to separate it from opsctl flags; everything after `--` is joined into a single command string. |

## Flags

| Flag | Description |
|------|-------------|
| `--type <type>` | Optional **assertion**: fails fast if the asset is not of this type. It does *not* select dispatch — that always comes from the asset's real type. See [Accepted `--type` values](#accepted---type-values). |

### Accepted `--type` values

Three kinds of value are accepted:

| Kind | Values | Asserts |
|------|--------|---------|
| Canonical asset types | `ssh`, `serial`, `database`, `redis`, `mongodb`, `etcd`, `kafka`, `k8s`, `oss` | the asset's type |
| Protocol aliases | `exec` → ssh, `sql` / `db` → database, `mongo` → mongodb, `kubernetes` / `kube` → k8s | the asset's type |
| Database driver names | `mysql`, `postgresql` / `postgres`, `mssql` / `sqlserver`, `sqlite` / `sqlite3` | the asset's type **and** its driver |

Driver names are stricter on purpose. `--type mysql` requires a `database` asset whose driver really is MySQL, so pointing it at a PostgreSQL asset fails:

```console
$ opsctl exec analytics --type mysql -- "SELECT 1"
Error: asset "analytics" is a database with driver=postgresql, but you passed type=mysql — call help(asset="analytics") for its command syntax
```

Had `mysql` been a plain synonym for `database`, that command would have run — which would defeat the point of the assertion. Prefer the canonical type; reach for a driver name only when the dialect matters to the command you are about to run.

## Dispatch

The asset's own type decides how the command runs:

- **`ssh` assets** keep the streaming channel — stdin forwarding, live stdout/stderr, and the remote exit code as opsctl's exit code.
- **Every other type** (`database`, `redis`, `mongodb`, `etcd`, `kafka`, `k8s`, `oss`, …) runs through the unified exec handler and returns captured output, usually JSON.

## Command syntax per asset type

Run `opsctl help <asset>` (or `opsctl help <type>`) for the authoritative syntax, config contract, and per-type caveats. It is read-only and never asks for approval.

```bash
opsctl help prod-db      # by asset
opsctl help kafka        # by type name, even with no such asset yet
```

A short reference:

| Asset type | Command syntax | Example |
|------------|----------------|---------|
| `ssh` | A shell command, verbatim | `opsctl exec web-01 -- uptime` |
| `database` | SQL, verbatim | `opsctl exec prod-db -- "SELECT id, name FROM users LIMIT 10"` |
| `redis` | A Redis command, verbatim | `opsctl exec cache -- "HGETALL user:1"` |
| `mongodb` | `<operation> [collection] [--db=<db>] [--query=<json>]` | `opsctl exec mongo-db -- find users --query='{"filter":{"active":true},"limit":10}'` |
| `etcd` | `<op> [key] [value] [--flags]` (an etcdctl subset) | `opsctl exec etcd-01 -- get /app/ --prefix` |
| `kafka` | `<family> <verb> [target] [--flags]` | `opsctl exec kafka-01 -- topic describe orders` |
| `k8s` | A kubectl command, with or without the leading `kubectl` | `opsctl exec prod-cluster -- get pods -A` |
| `oss` | `<family> <verb> [target] [--flags]` | `opsctl exec s3-prod -- object list backups/2026/` |

Notes that bite in practice:

- **Redis:** never send `SELECT` — connections are pooled, so it either has no effect or corrupts another caller's database selection.
- **MongoDB:** `--db` is part of the command, not an opsctl flag; without it the asset's configured default database is used. Always single-quote `--query`.
- **Database / Redis:** the CLI has no per-call database override; the asset's configured default database (or Redis DB index) applies.
- Non-SSH commands are tokenized but **not** shell-executed — `$`, `|`, `>`, and `&` produce an error instead of expanding. Quote values containing them.

## Pipe support (ssh assets only)

When stdin is not a terminal (i.e. data is piped in), it is forwarded to the remote command's stdin. The remote command's stdout and stderr are written directly to local stdout and stderr, enabling Unix pipe chains.

The exit code of the remote command is propagated as `opsctl`'s exit code.

## Approval

This command is checked against the policy **of the asset's own type** — a `database` asset is evaluated by the SQL policy, a `redis` asset by the Redis policy, and so on:

- Commands matching the asset's **allow list** execute without approval
- Commands matching the **deny list** are rejected immediately
- If no rule decides it, an interactive invocation prompts in the current terminal; a non-interactive invocation can use the desktop approval service when available
- With neither path available, opsctl exits 3 with `NEEDS AUTHORIZATION` and a paste-ready `opsctl policy allow` command. A human must run that command interactively before retrying

## Examples

```bash
# Run a command by asset name, ID, or group/name
opsctl exec web-server -- uptime
opsctl exec 1 -- ls -la /var/log
opsctl exec production/web-01 -- cat /etc/hosts

# Assert the asset type first — fails fast on the wrong asset
opsctl exec cache --type redis -- "GET session:abc123"

# Query a database
opsctl exec prod-db -- "SELECT COUNT(*) FROM users"

# MongoDB, etcd, Kafka, Kubernetes, object storage
opsctl exec mongo-db -- countDocuments users --db=app
opsctl exec etcd-01 -- put /app/config '{"debug":true}'
opsctl exec kafka-01 -- topic list
opsctl exec prod-cluster -- logs deploy/api --tail 100
opsctl exec s3-prod -- object stat backups/2026/db.sql.gz

# Pipe data into a remote command (ssh only)
echo "hello" | opsctl exec web-server -- cat

# Chain with local commands, and use the propagated exit code
opsctl exec web-server -- cat /etc/nginx/nginx.conf | grep upstream
opsctl exec web-server -- test -f /opt/app/config.yml && echo "exists"

# A human can pre-authorize a reusable pattern, then automation can retry
opsctl policy allow web-01 -- 'systemctl restart *'
```
