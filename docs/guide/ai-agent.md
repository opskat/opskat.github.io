---
sidebar_position: 1
sidebar_label: AI Agent
---

# AI Agent

OpsKat's AI Agent lets you manage infrastructure through natural-language conversations. Instead of navigating menus, describe what you need and the agent executes commands, queries, and file transfers on your behalf.

## Provider Configuration

The AI Agent supports three provider backends. Configure your preferred provider in **Settings > AI**.

### OpenAI-compatible API

Works with OpenAI, Azure OpenAI, and any OpenAI-compatible endpoint (e.g., self-hosted models via vLLM, Ollama, etc.).

- **API Endpoint** — The base URL (e.g., `https://api.openai.com/v1`)
- **API Key** — Your API key
- **Model** — Model name (e.g., `gpt-4o`, `claude-sonnet-4-20250514`)

The agent uses streaming SSE for real-time response delivery and OpenAI function calling for tool invocation.

### Claude CLI

Uses the [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI binary installed on your machine. Messages are converted to plain text and processed through Claude's stream-json format (NDJSON). Supports session resume for continuing previous conversations.

### Codex CLI

Uses the [Codex CLI](https://github.com/openai/codex) via its JSON-RPC 2.0 protocol over stdin/stdout. OpsKat manages the subprocess lifecycle and translates between its internal message format and the Codex protocol.

## How Conversations Work

Each conversation is a multi-turn dialogue between you and the AI agent. The flow:

1. You send a message describing what you want to do.
2. The AI decides which **tools** to call based on your request.
3. Each tool call is executed, with results fed back to the AI.
4. The AI processes the results and may call additional tools or respond.
5. This loop continues for up to **10 rounds** per message to prevent infinite loops.

Tool execution results are capped at 32KB. If output exceeds this limit, it is truncated with a suggestion to use more precise filters (e.g., `| head`, `| grep`).

SSH connections are cached and reused within a single conversation for efficiency.

## Available Tools

The agent has access to the following tools:

### Asset Management

| Tool | Description |
|---|---|
| `list_assets` | List all managed assets. Supports filtering by type and group. |
| `get_asset` | Get detailed info about a specific asset (connection config, description). |
| `add_asset` | Add a new asset (SSH, database, or Redis). |
| `update_asset` | Update an existing asset's properties. |
| `list_groups` | List all asset groups. |
| `get_group` | Get detailed info about a specific group. |

### Remote Operations

| Tool | Description |
|---|---|
| `run_command` | Execute a shell command on a remote server via SSH. |
| `upload_file` | Upload a local file to a remote server via SFTP. |
| `download_file` | Download a file from a remote server via SFTP. |
| `exec_sql` | Execute SQL on a database asset (MySQL/PostgreSQL). Returns rows as JSON for queries, or affected count for statements. |
| `exec_redis` | Execute a Redis command on a Redis asset. |

### Permission

| Tool | Description |
|---|---|
| `request_permission` | Request pre-approval for command patterns before executing them. Supports `*` wildcard. Once approved, matching commands are auto-approved for the session. |

## Policy Enforcement on AI Actions

Every tool call from the AI agent passes through the same policy pipeline as manual operations:

1. **Policy check** — The command/query is evaluated against the asset's allow/deny rules and policy groups.
2. **Grant matching** — If a grant session has been approved (via `request_permission`), matching patterns are auto-approved.
3. **User confirmation** — If neither policy nor grant covers the action, you are prompted to allow or deny.

The AI agent can proactively call `request_permission` to submit command patterns for batch approval, reducing the number of individual confirmations.

See [Policy Enforcement](/docs/guide/policy) for details on configuring rules.

## AI Coding Tool Integration

OpsKat integrates with AI coding CLIs like **Claude Code** and **Codex**. One-click skill installation from the Settings page teaches these AI assistants how to use `opsctl`, enabling them to directly manage servers, run commands, transfer files, and query databases.

### Installing Skills

1. Open **Settings** and go to the **AI** tab.
2. Click **Install** next to Claude Code or Codex.
3. The skill file is symlinked to the appropriate location (e.g., `~/.claude/skills/opsctl` for Claude Code).

Once installed, these AI coding tools can use `opsctl` commands as part of their workflow, with all operations routed through OpsKat's policy and audit pipeline.
