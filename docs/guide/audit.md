---
sidebar_position: 6
sidebar_label: Audit
---

# Audit & Approval

Every operation in OpsKat is logged with full decision tracking. The audit system covers actions from the AI Agent, the `opsctl` CLI, and MCP integrations. The approval workflow provides controlled access for CLI operations, and the grant system enables command pattern pre-approval.

## Audit Logging

All tool executions are automatically recorded in the audit log, regardless of the source. Each log entry captures:

| Field | Description |
|---|---|
| **Source** | Where the action originated: `ai`, `opsctl`, or `mcp` |
| **Tool Name** | The tool that was called (e.g., `run_command`, `exec_sql`, `upload_file`) |
| **Asset** | The target asset (ID and name) |
| **Command** | The command or query that was executed |
| **Request / Result** | The full request parameters and execution result (truncated to 4KB) |
| **Success** | Whether the execution succeeded or failed |
| **Decision** | `allow` or `deny` |
| **Decision Source** | How the decision was made (see below) |
| **Matched Pattern** | The specific rule or pattern that matched |
| **Session ID** | The opsctl or AI session identifier |
| **Conversation ID** | The AI conversation this action belongs to (if applicable) |
| **Grant Session ID** | The grant session that authorized this action (if applicable) |
| **Timestamp** | When the action occurred |

## Decision Sources

Each audit log entry records the decision source, indicating how the allow/deny decision was made:

| Source | Description |
|---|---|
| `policy_allow` | Allowed by a policy allow-list rule |
| `policy_deny` | Blocked by a policy deny-list rule |
| `user_allow` | User manually approved when prompted |
| `user_deny` | User manually denied when prompted |
| `grant_allow` | Matched an approved grant pattern |
| `grant_deny` | Grant request was rejected |
| `session_allow` | Matched a "remembered" session rule (from clicking "Remember" in the confirmation dialog) |
| `auto_allow` | Automatically allowed (no policy configured) |

## Audit Log Viewer

The audit log viewer in the desktop app provides:

- **Filterable list** — Filter by source, tool, asset, decision, and time range
- **Session filtering** — View all actions within a specific session
- **Detail view** — Inspect the full request and result of any action

## Approval Workflow

When the `opsctl` CLI is used while the desktop app is running, operations that require approval are routed through the app's UI.

### How It Works

1. `opsctl` sends an approval request via a Unix socket (`<data-dir>/approval.sock`).
2. The desktop app displays an approval dialog showing the operation details.
3. The user reviews and approves or denies.
4. The response is sent back to `opsctl`, which proceeds or aborts.

This applies to operations like `exec`, `cp`, `create`, `update`, and `grant`.

### Approval Types

| Type | Description |
|---|---|
| `exec` | Remote command execution |
| `cp` | File transfer (local-to-remote, remote-to-local, or cross-server) |
| `create` | Creating a new asset |
| `update` | Updating an existing asset |
| `grant` | Submitting command patterns for pre-approval |

## Grant System

The grant system lets you pre-approve command patterns so that subsequent matching commands are auto-approved, reducing repetitive confirmations.

### Submitting Grants

Grants can be submitted from two places:

1. **AI Agent** — The `request_permission` tool submits command patterns with a reason.
2. **opsctl CLI** — `opsctl grant submit` submits patterns from the command line.

Example from `opsctl`:

```bash
opsctl grant submit 1 "cat /var/log/*" "systemctl * nginx"
```

### Grant Lifecycle

1. A `GrantSession` is created with status **pending** and one or more `GrantItem` records (each specifying an asset and command pattern).
2. The desktop app shows an approval dialog where the user can review and **edit** the patterns before approving.
3. Once approved, the grant session status changes to **approved**.
4. Subsequent `run_command` calls matching any approved pattern are auto-approved (decision source: `grant_allow`).

Grant items support `*` wildcard matching (e.g., `cat /var/log/*` matches `cat /var/log/syslog`). Approved grant items are **not consumed** — they persist for the entire session and can match multiple commands.

### Remembered Patterns

In addition to grants, the exec confirmation dialog has a **Remember** button. When clicked, the command pattern is stored in memory for the current session. This is separate from the grant system — remembered patterns are session-scoped and not persisted to the database.

## opsctl Session Management

The `opsctl session` command manages approval sessions:

- Sessions group related operations together
- All actions within a session share the same session ID in audit logs
- Grant items are scoped to their grant session
