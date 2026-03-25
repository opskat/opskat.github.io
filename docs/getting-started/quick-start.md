---
sidebar_position: 2
sidebar_label: Quick Start
---

# Quick Start

Get up and running with OpsKat in under 5 minutes. This guide walks you through initial setup, adding your first server, and running your first AI-assisted operation.

## First Launch

Launch OpsKat from your applications menu or run the built binary directly. On first launch, the app initializes its SQLite database and creates the data directory automatically.

The main interface has a sidebar with:
- **Assets** — Your infrastructure inventory
- **AI Agent** — Natural-language operations
- **Settings** — Configuration and preferences

## Adding Your First Asset

### SSH Server

1. Click the **+** button in the asset sidebar.
2. Select **SSH** as the asset type.
3. Fill in the connection details:
   - **Name** — A display name (e.g., "Production Web Server")
   - **Host** — Hostname or IP address
   - **Port** — SSH port (default: 22)
   - **Username** — SSH login user
   - **Auth Type** — Choose `Password` or `Key`
   - **Password / Private Key** — Your credentials
4. Click **Save**.

Credentials are encrypted with AES-256-GCM before being stored in the local database. The encryption key is managed via your OS keyring.

### Database (MySQL / PostgreSQL)

1. Click **+** and select **Database**.
2. Choose a **Driver** — MySQL or PostgreSQL.
3. Enter host, port, username, password, and default database name.
4. Optionally select an SSH asset to tunnel through.
5. Click **Save**.

### Redis

1. Click **+** and select **Redis**.
2. Enter host, port, and optional password.
3. Optionally select an SSH asset to tunnel through.
4. Click **Save**.

## Connecting to an SSH Terminal

1. Select an SSH asset from the sidebar.
2. Click **Connect** or double-click the asset.
3. An interactive terminal session opens in a new tab.

You can split the terminal pane, open multiple sessions, and use the built-in SFTP file browser to transfer files.

## Setting Up the AI Agent

The AI Agent lets you manage infrastructure through natural language. Before using it, configure a provider.

### Option 1: OpenAI-compatible API

1. Open **Settings** and go to the **AI** tab.
2. Select **OpenAI API** as the provider.
3. Enter your API endpoint and API key.
4. Choose a model (e.g., `gpt-4o`).
5. Click **Save**.

This works with any OpenAI-compatible API, including self-hosted models.

### Option 2: Claude CLI

1. Install [Claude Code](https://docs.anthropic.com/en/docs/claude-code) on your machine.
2. In **Settings > AI**, select **Claude CLI**.
3. OpsKat will use the Claude CLI binary directly.

### Option 3: Codex CLI

1. Install [Codex CLI](https://github.com/openai/codex) on your machine.
2. In **Settings > AI**, select **Codex CLI**.

## Your First AI Conversation

1. Open the **AI Agent** tab.
2. Type a natural-language instruction, for example:

   > Show me the disk usage on my production server

3. The AI will:
   - Call `list_assets` to find available servers
   - Call `run_command` with `df -h` on the target asset
   - Return the results in a readable format

4. If the command matches a **deny** policy, it will be blocked. If it requires confirmation, you will see a prompt before execution.

All actions are logged in the [Audit Log](/docs/guide/audit) with full decision tracking.

## What's Next

- [Asset Management](/docs/guide/asset-management) — Organize assets into groups, import/export
- [SSH Terminal](/docs/guide/ssh-terminal) — Split pane, SFTP, jump hosts, port forwarding
- [AI Agent](/docs/guide/ai-agent) — Provider configuration, tools, policy enforcement
- [Query Editor](/docs/guide/query-editor) — SQL and Redis query editor
- [Policy](/docs/guide/policy) — Configure allow/deny rules
- [Audit](/docs/guide/audit) — Review audit logs and approval workflows
