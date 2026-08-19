---
sidebar_position: 12
sidebar_label: Audit
---

# Audit & Approval

OpsKat records AI and `opsctl` tool executions with their source, result, and available policy-decision context. Permanent policy rules, still-valid grants, and human approval provide controlled access for CLI operations.

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

The read-only CLI view works without the desktop app or an interactive terminal:

```bash
opsctl list audit
opsctl list audit --asset web-01 --limit 50
```

Rows are displayed newest first and exactly as stored, including time, source, asset, tool, command summary, and decision source.

## Audit Payload Boundaries

Audit payloads are raw by default: the audit writer stores the command, request, result, error, and matched pattern it receives instead of scanning their contents and replacing suspected values with `<redacted>`. Existing command canonicalization, limited output buffers, and the 4KB / 32KB truncation limits still apply, so this is not a byte-for-byte forensic transcript.

Some producers own a narrower write-only contract. AI/opsctl `put_asset`, desktop asset changes, and external-edit metadata write explicit allowlisted projections. For asset creation and updates, password, Secret Access Key, kubeconfig, private-key, and passphrase fields are omitted from the audit request; they do not appear as placeholder values. Safe asset and credential queries likewise return narrow metadata DTOs and never expose password, private-key, passphrase, token, kubeconfig, or SSH Agent endpoint values.

Direct execution and approval surfaces are different boundaries. Tool input/output, command history, errors, and approval subjects preserve the content supplied to those surfaces. Do not pass secrets in commands or arguments on the assumption that Audit or the UI will redact them. Prefer managed credential references or a command's documented no-echo secret path, such as [a bare `opsctl create asset --password`](/docs/cli/assets#passwords-and-authentication-references), which prompts in your terminal instead of taking the value from argv.

## Approval Workflow

An interactive `opsctl` invocation asks for approval in the current terminal. When opsctl is non-interactive and the desktop app is running, operations that need confirmation can be routed through the app's UI.

### How It Works

1. Permanent deny and allow rules are evaluated first, followed by still-valid grants.
2. With a TTY, opsctl displays the operation and asks the user to allow once, permanently allow when supported, or deny.
3. Without a TTY, opsctl can send a request through `<data-dir>/approval.sock` when the desktop app is available.
4. With neither approval path, rule-capable operations emit `NEEDS AUTHORIZATION`; asset mutation operations emit `NEEDS TTY`. Both use exit code 3.

This applies to CLI commands including `exec`, `cp`, `batch`, `create`, `update`, and `delete`, according to the command's approval path. Extension-tool delegation also travels over `approval.sock`, but its handler executes directly in the desktop extension runtime rather than displaying the normal approval dialog; `ext exec` fails closed when the app is unavailable.

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
| `batch` | Approving multiple supported operations together |

## Grants and Permanent Rules

The desktop approval flow can save a reusable grant for its internal, data-directory-scoped session. opsctl can inspect and revoke still-valid grants through `policy show` and `policy rm`, but it does not provide a command to create temporary grants.

For durable pre-authorization, a human runs `opsctl policy allow` in an interactive terminal. Policy writes are individually audited. AI and other non-interactive callers cannot run policy writes: they receive `NEEDS TTY`.

Sessions remain an internal implementation detail, are reused per data directory, and expire after 24 hours. There are no `opsctl session` subcommands or public session flags.
