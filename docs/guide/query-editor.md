---
sidebar_position: 4
sidebar_label: Query Editor
---

# Query Editor

OpsKat includes built-in consoles for every data asset type. Each type uses the interface that best fits its data model, so there is **no single editor for everything**:

| Asset type | Console |
|---|---|
| MySQL / PostgreSQL / SQL Server / SQLite | Shared Monaco **SQL editor** (described below) |
| MongoDB | Dedicated [MongoDB panel](/docs/guide/mongodb) — collection browser + mongosh-style query editor |
| Redis | [Key browser + command console](#redis) (no SQL editor) |
| etcd | Dedicated [etcd panel](/docs/guide/etcd) — KV tree browser + query bar |
| Kafka | Dedicated [Kafka panel](/docs/guide/kafka) — form-based broker/topic/group/ACL/schema UI |
| Object Storage | Dedicated [Object Storage browser](/docs/guide/object-storage) — buckets, prefixes, objects, transfers, and presigned links |

Database connections can be tunneled through SSH for secure access.

## SQL Editor

The four SQL drivers — **MySQL, PostgreSQL, SQL Server, and SQLite** — all share the same Monaco-based SQL editor.

### Connecting

Select a database asset from the sidebar and open the **Query** tab. If the database asset has an SSH tunnel configured, OpsKat establishes the SSH connection first and tunnels the database connection through it.

A schema/table tree on the left lets you browse databases and tables, and open a table directly in a data grid.

### Writing and Executing Queries

- Write SQL in the editor with syntax highlighting and table-name auto-completion
- Press **Ctrl/Cmd+Enter** to execute (the selected text, or the whole editor if nothing is selected)
- Query results for `SELECT`, `SHOW`, `DESCRIBE`, and `EXPLAIN` statements are returned as rows
- `INSERT`, `UPDATE`, and `DELETE` statements return the number of affected rows
- You can override the default database for a specific query from a dropdown
- A query history popover keeps recent statements, and SQL snippets can be inserted from your library
- Statements are evaluated by policy: an explicit deny is blocked, an explicit allow runs immediately, and an unmatched statement prompts for confirmation

### SQL Analysis

OpsKat uses **TiDB Parser** to analyze SQL statements before execution. This powers:

- **Statement classification** — Automatically identifies the statement type (SELECT, INSERT, UPDATE, DELETE, DROP, TRUNCATE, etc.)
- **Dangerous pattern detection** — Flags risky operations such as:
  - `DELETE` or `UPDATE` without a `WHERE` clause
  - `PREPARE` statements
  - `CALL` statements
- **Policy enforcement** — Statement types and flags are checked against the asset's [query policy](/docs/guide/policy) before execution

### Result Grid

Query results are displayed in a paginated table:

- Column headers match the query's output columns
- Page size is configurable (50 / 100 / 200 / 500 rows)
- Affected-row count is shown for `INSERT` / `UPDATE` / `DELETE`
- Results can be exported

## Redis

Redis assets do **not** use the SQL editor. Instead they open a key browser plus a command console.

### Connecting

Select a Redis asset and open the **Query** tab. Like databases, Redis connections can be tunneled through an SSH asset.

### Key Browser

The key browser provides a visual interface for exploring Redis data:

- Browse keys in a **tree** (grouped by separator, default `:`) or a flat **list** view
- Filter keys with glob patterns (`SCAN`-based, e.g. `user:*`)
- Switch between databases (db0, db1, …) from the footer selector
- Open a key to view and edit its value, type, and TTL — with type-specific editors for strings, hashes, lists, sets, sorted sets, and streams
- Create and delete keys, and edit or remove TTLs

### Command Console

Each key detail view includes a command input for running arbitrary Redis commands, with results formatted to the command's return type (string, integer, list, hash, nil). An **Overview** tab surfaces `INFO` server/memory/keyspace stats with optional auto-refresh.

## Policy Enforcement

All queries and commands executed through these consoles are subject to the same [policy rules](/docs/guide/policy) as AI Agent operations:

- **SQL** — Checked against the asset's query policy (allowed/denied statement types, dangerous pattern flags)
- **Redis** — Checked against the asset's Redis policy (allowed/denied command patterns)
- **MongoDB**, **etcd**, and **Kafka** — Checked against their respective policy kinds

The Object Storage browser is an interactive file-management surface and currently has no allow/deny policy kind.

If an operation is denied by policy, it will not be executed. If it requires confirmation, you will be prompted before execution.
