---
sidebar_position: 12
sidebar_label: Audit
---

# Audit & Approval

OpsKat records AI and `opsctl` tool executions with their source, result, and available policy-decision context. The approval workflow provides controlled access for CLI operations, and the grant system enables command-pattern pre-approval.

## Audit Logging

Tool calls that enter the AI runner's audit middleware or an audited `opsctl` handler are recorded automatically. Other interactive or delegated paths are not implied to create an audit row for every action. Recorded entries can include:

| Field | Description |
|---|---|
| **Source** | Where the action originated: `ai`, `opsctl`, or `desktop` |
| **Tool Name** | The tool that was called (e.g., `exec`, `cp`, `batch_exec`, `put_asset`) |
| **Asset** | The target asset (ID and name) |
| **Command** | The command or query that was executed |
| **Request / Result** | Request parameters (truncated to 4KB) and execution result (truncated to 32KB) |
| **Success** | Whether the execution succeeded or failed |
| **Decision** | The recorded allow/deny decision, when the operation went through a policy or approval check |
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

## Audit Log Viewer

The audit log viewer in the desktop app provides:

- **Filterable list** — Filter by source, tool, asset, decision, and time range
- **Session filtering** — View all actions within a specific session
- **Detail view** — Inspect the stored request and result, subject to the 4KB / 32KB audit truncation limits

## Audit Payload Boundaries

Audit payloads are raw by default: the audit writer stores the command, request, result, error, and matched pattern it receives instead of scanning their contents and replacing suspected values with `<redacted>`. Existing command canonicalization, limited output buffers, and the 4KB / 32KB truncation limits still apply, so this is not a byte-for-byte forensic transcript.

Some producers own a narrower write-only contract. AI/opsctl `put_asset`, desktop asset changes, and external-edit metadata write explicit allowlisted projections. For asset creation and updates, password, Secret Access Key, kubeconfig, private-key, and passphrase fields are omitted from the audit request; they do not appear as placeholder values. Safe asset and credential queries likewise return narrow metadata DTOs and never expose password, private-key, passphrase, token, kubeconfig, or SSH Agent endpoint values.

Direct execution and approval surfaces are different boundaries. Tool input/output, command history, errors, and approval subjects preserve the content supplied to those surfaces. Do not pass secrets in commands or arguments on the assumption that Audit or the UI will redact them. Prefer managed credential references or a command's documented standard-input secret path, such as [`opsctl create asset --password-stdin`](/docs/cli/assets#passwords-and-authentication-references).

## Approval Workflow

When the `opsctl` CLI is used while the desktop app is running, operations that require approval are routed through the app's UI.

### How It Works

1. `opsctl` sends an approval request via a Unix socket (`<data-dir>/approval.sock`).
2. The desktop app displays an approval dialog showing the operation details.
3. The user reviews and approves or denies.
4. The response is sent back to `opsctl`, which proceeds or aborts.

This applies to CLI commands including `exec`, `cp`, `batch`, `create`, `update`, `delete`, and `grant`, according to the command's approval path. Extension-tool delegation also travels over `approval.sock`, but its current handler executes directly in the desktop extension runtime rather than displaying the normal approval dialog.

### Approval Types

The approval type is what the dialog badges and what policy and grant patterns are matched against. For `opsctl exec` and `opsctl batch` it is derived from the **asset's own type**, so a command against a `database` asset is checked by the SQL policy rather than the shell policy:

| Asset type | Approval type |
|---|---|
| `ssh` | `exec` |
| `database` | `sql` |
| `redis` | `redis` |
| `mongodb` | `mongo` |
| `etcd` | `etcd` |
| `kafka` | `kafka` |
| `k8s` | `k8s` |
| `oss` | `oss` |
| `serial` | `serial` |

The remaining operations carry a fixed type:

| Type | Description |
|---|---|
| `cp` | File transfer (local, remote server, or object storage — in any combination) |
| `create` | Creating a new asset or group |
| `update` | Updating an existing asset or group |
| `delete` | Deleting an asset or group — always confirmed, never pre-approvable |
| `grant` | Submitting command patterns for pre-approval |
| `batch` | Approving multiple supported operations together |

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
4. Subsequent `exec` calls matching any approved pattern are auto-approved (decision source: `grant_allow`).

Grant items support `*` wildcard matching (e.g., `cat /var/log/*` matches `cat /var/log/syslog`). Approved grant items are **not consumed** — they persist for the entire session and can match multiple commands.

## opsctl Session Management

The `opsctl session` command manages approval sessions:

- Sessions group related operations together
- All actions within a session share the same session ID in audit logs
- Grant items are scoped to their grant session
