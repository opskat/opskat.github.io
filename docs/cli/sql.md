---
sidebar_position: 5
sidebar_label: sql
---

# opsctl sql

Execute SQL against a database asset. Network drivers include MySQL, PostgreSQL, and SQL Server; SQLite assets use their configured local or remote file source. Network connections honor the asset's configured SSH tunnel or proxy.

## Syntax

```bash
opsctl [global-flags] sql <asset> [flags] "<SQL>"
```

## Arguments

| Argument | Description |
|----------|-------------|
| `asset` | Database asset name or numeric ID |

## Flags

| Flag | Description |
|------|-------------|
| `-f <file>` | Read SQL from a file instead of a command-line argument |
| `-d <database>` | Override the default database for this execution |

## Approval

SQL statements are checked against the asset's query policy:

- **Allowed types** (e.g., `SELECT`) execute without approval
- **Denied types** (e.g., `DROP TABLE`) are rejected immediately
- Other statements require user confirmation via the desktop app
- When the desktop app is offline, only statements matching the allow-list policy are permitted

## Examples

```bash
# Run a query
opsctl sql prod-db "SELECT * FROM users LIMIT 10"

# Insert data
opsctl sql prod-db "INSERT INTO logs (msg) VALUES ('test')"

# Read SQL from a file
opsctl sql prod-db -f migration.sql

# Override the database
opsctl sql prod-db -d other_db "SHOW TABLES"

# Use with an explicit session
opsctl --session $ID sql prod-db "UPDATE settings SET value='true' WHERE key='maintenance'"
```
