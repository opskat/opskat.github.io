---
sidebar_position: 5
sidebar_label: Policy
---

# Policy Enforcement

OpsKat enforces allow/deny rules on every operation — whether triggered by the AI Agent, the Query Editor, or the `opsctl` CLI. Three policy types cover SSH commands, SQL statements, and Redis operations.

## Policy Types

### SSH Command Policy

Controls which shell commands can be executed on SSH assets.

- **Allow List** — Command patterns that are auto-approved (e.g., `ls *`, `cat *`, `systemctl status *`)
- **Deny List** — Command patterns that are always blocked (e.g., `rm -rf /*`, `shutdown *`)
- **Groups** — References to policy groups whose rules are merged in

Commands are parsed using a shell parser (`mvdan.cc/sh`) for accurate matching. The `*` wildcard matches any arguments.

### SQL Query Policy

Controls which SQL statements can be executed on database assets.

- **Allow Types** — Permitted statement types (e.g., `SELECT`, `SHOW`, `DESCRIBE`, `EXPLAIN`, `USE`)
- **Deny Types** — Blocked statement types (e.g., `DROP TABLE`, `DROP DATABASE`, `TRUNCATE`, `GRANT`, `REVOKE`, `CREATE USER`, `DROP USER`, `ALTER USER`)
- **Deny Flags** — Blocked patterns:
  - `no_where_delete` — `DELETE` without a `WHERE` clause
  - `no_where_update` — `UPDATE` without a `WHERE` clause
  - `prepare` — `PREPARE` statements
  - `call` — `CALL` statements
- **Groups** — References to policy groups

SQL statements are analyzed by the **TiDB Parser** to classify statement types and detect dangerous patterns.

### Redis Policy

Controls which Redis commands can be executed on Redis assets.

- **Allow List** — Permitted command patterns (e.g., `GET`, `HGETALL`, `KEYS`, `INFO`)
- **Deny List** — Blocked command patterns (e.g., `FLUSHDB`, `FLUSHALL`, `CONFIG SET *`, `SHUTDOWN *`)
- **Groups** — References to policy groups

Multi-word Redis commands are supported (e.g., `CONFIG SET`, `ACL DELUSER`).

## Decision Flow

When an operation is evaluated, the policy engine produces one of three decisions:

| Decision | Meaning |
|---|---|
| **Allow** | The command matches an allow rule and is executed immediately. |
| **Deny** | The command matches a deny rule and is blocked. |
| **NeedConfirm** | No rule matches. The user is prompted to allow or deny. |

The evaluation order is:

1. **Deny list** is checked first — if a match is found, the operation is denied immediately.
2. **Allow list** is checked next — if a match is found, the operation is allowed.
3. **No match** — the decision is `NeedConfirm`, requiring user approval.

## Policy Groups

Policy groups are reusable collections of rules that can be referenced by multiple assets and groups.

### Built-in Groups

OpsKat ships with built-in policy groups (these cannot be modified):

#### SSH Command Groups

| Group | Description |
|---|---|
| **Linux Read-Only** | Common Linux read-only commands (`ls`, `cat`, `head`, `tail`, `grep`, `ps`, `df`, `netstat`, etc.) |
| **Kubernetes Read-Only** | Kubernetes read-only commands (`kubectl get`, `kubectl describe`, `kubectl logs`, etc.) |
| **Docker Read-Only** | Docker read-only commands (`docker ps`, `docker images`, `docker logs`, etc.) |
| **Dangerous Deny** | Blocks dangerous system commands (`rm -rf /*`, `mkfs`, `dd`, `shutdown`, `reboot`, etc.) |

#### SQL Query Groups

| Group | Description |
|---|---|
| **SQL Read-Only** | Only allows `SELECT`, `SHOW`, `DESCRIBE`, `EXPLAIN`, `USE` |
| **SQL Dangerous Deny** | Blocks `DROP TABLE`, `DROP DATABASE`, `TRUNCATE`, `GRANT`, `REVOKE`, user management, and flags `no_where_delete`, `no_where_update`, `prepare` |

#### Redis Groups

| Group | Description |
|---|---|
| **Redis Read-Only** | Only allows read commands (`GET`, `HGETALL`, `LRANGE`, `SMEMBERS`, `ZRANGE`, `INFO`, `KEYS`, etc.) |
| **Redis Dangerous Deny** | Blocks `FLUSHDB`, `FLUSHALL`, `CONFIG SET`, `SHUTDOWN`, `DEBUG`, `SLAVEOF`, ACL mutations, etc. |

### User-Defined Groups

You can create custom policy groups:

1. Open the policy group management page.
2. Click **Create** and select the policy type (command, query, or redis).
3. Define your allow/deny rules.
4. Save the group.

You can also **copy** a built-in group to create a user-defined group based on it.

### Assigning Policy Groups

Policy groups are assigned to assets or groups via their policy configuration. When an asset or group references a policy group, the group's rules are merged into the asset's effective policy.

By default, new SSH assets reference the **Linux Read-Only** and **Dangerous Deny** groups. New database assets reference **SQL Read-Only** and **SQL Dangerous Deny**. New Redis assets reference **Redis Read-Only** and **Redis Dangerous Deny**.

## Policy Group Inheritance

Groups in the asset tree can have their own policies. When evaluating an asset's effective policy:

1. The asset's own policy rules and referenced policy groups are loaded.
2. The parent group's policy (if any) is also considered.
3. All referenced policy groups are resolved and their rules are merged into the final allow/deny lists.

This allows you to set organization-wide rules at the group level while allowing asset-specific overrides.

## Policy Testing

OpsKat includes a real-time policy tester for all three policy types. Enter a command, SQL statement, or Redis command to see whether it would be allowed, denied, or require confirmation, and which rule matched.
