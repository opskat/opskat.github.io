---
sidebar_position: 1
sidebar_label: AI Agent
---

# AI Agent

OpsKat's AI Agent lets you manage infrastructure through natural-language conversations. Instead of navigating menus, describe what you need and the agent executes commands, queries, and file transfers on your behalf.

## Provider Configuration

OpsKat supports multiple AI providers. You can configure and switch between them in **Settings > AI**, or use the setup wizard on first launch.

### OpenAI-compatible API (Recommended)

Works with OpenAI, DeepSeek, Azure OpenAI, and any OpenAI-compatible endpoint (e.g., self-hosted models via vLLM, Ollama, etc.).

- **API Endpoint** — The base URL (e.g., `https://api.openai.com/v1`)
- **API Key** — Your API key
- **Model** — Model name (e.g., `gpt-4o`, `deepseek-chat`). Click **Fetch Models** to auto-discover available models, or type manually — model parameters (max output tokens, context window) will auto-fill based on known presets.

The agent uses streaming SSE for real-time response delivery and OpenAI function calling for tool invocation.

### Anthropic API

Native support for Anthropic's Messages API with prompt caching optimization.

- **API Key** — Your Anthropic API key
- **Model** — Claude model name (e.g., `claude-sonnet-4-20250514`)

Supports automatic context compression when conversations approach the context window limit.

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

OpsKat integrates with AI coding CLIs like **Claude Code**, **Codex**, **OpenCode**, and **Gemini CLI**. Skill/plugin installation teaches these AI assistants how to use `opsctl`, enabling them to directly manage servers, run commands, transfer files, and query databases.

### Installing Skills

1. Open **Settings** and go to the **AI** tab.
2. Click **Install** next to the target AI tool.

For **Claude Code**, this installs a plugin (to `~/.claude/plugins/`) that provides two skill commands:

| Command | Description |
|---|---|
| `/opsctl` | Full opsctl CLI reference — asset management, exec, ssh, cp, sql, redis, grant, session |
| `/opsctl:init` | Server environment auto-discovery — scans a server via SSH and generates a structured description |

Other tools install skill files to their standard locations:

| Tool | Install Path |
|---|---|
| Codex | `~/.agents/skills/opsctl/` |
| OpenCode | `~/.config/opencode/skills/opsctl/` |
| Gemini CLI | `~/.gemini/extensions/opsctl/` |

Skills are automatically updated when the desktop app is updated.

Once installed, these AI coding tools can use `opsctl` commands as part of their workflow, with all operations routed through OpsKat's policy and audit pipeline.
