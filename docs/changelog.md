---
sidebar_label: Changelog
sidebar_position: 100
---

# Changelog

## v1.1.0

### New Features

- **Multi-provider AI configuration** — Database-backed provider management with full CRUD API. Added native Anthropic Messages API support alongside OpenAI-compatible providers.
- **AI Agent enhancements** — Dynamic system prompts, sub-agent support, parallel tool execution, and batch command processing.
- **Unified approval system** — Merged AI and opsctl approval dialogs into a single workflow. Supports batch confirmation, Grant mechanism with editable command patterns, and remember mode.
- **AI model intelligence** — Model parameter presets with auto-fill on selection, context window auto-compression, and Anthropic prompt caching optimization.
- **Multi-asset permission requests** — `request_permission` tool now supports multi-asset `items` parameter, consistent with `opsctl grant`.
- **opsctl improvements** — Redis `-n` flag for database selection; `create/update asset` supports `--icon` parameter.

### UI/UX Improvements

- **AI setup wizard redesign** — New opsctl plugin banner, improved provider selection cards, extracted shared `AIProviderForm` component.
- **AI chat UI refactoring** — Chat header, role labels, solid assistant bubbles, independent approval block rendering.
- **Terminal Aesthetic theme** — New visual style for the application interface.
- **AI settings enhancement** — Model list fetching from API, model selector with search, token parameter configuration.
- **Approval block improvements** — Differentiated rendering for single/batch/grant types; only pending approvals interrupt message flow.
- **ToolBlock & AgentBlock refinements** — Optimized spacing, line height, running state indicator, error state icons.
- **GFM Markdown support** — AI chat now renders GitHub Flavored Markdown (tables, strikethrough, task lists).
- **Database & Redis UX** — Improved frontend user experience for query modules.

### Bug Fixes

- Fixed Windows subprocess causing a brief black window flash on launch.
- Fixed new SSH asset defaulting to port 6379 instead of 22.
- Fixed `SSHPool.Close()` panic on double-call.
- Fixed opsctl `exec_sql`/`exec_redis`/`cp` audit logs missing decision and decision source.

### Backend Improvements

- **User denial handling** — Strong stop instructions when user denies commands; system prompt includes denial guidance to prevent AI from attempting workarounds.
- **Concurrency safety** — Approval callbacks now receive conversation ID via context instead of instance variable.
- Error messages in AI module standardized to English for better LLM comprehension.

### Other

- Added MIT License.
- Updated README links to opskat.github.io.
- Added i18n translations for approval buttons and batch operations.

**Full Changelog**: [v1.0.2...v1.1.0](https://github.com/opskat/opskat/compare/v1.0.2...v1.1.0)

## v1.0.2

### New Features

- **opsctl batch command** — Batch execution of SSH commands, file transfers, and database/Redis operations across multiple assets.
- **Batch approval dialog** — Approve multiple operations at once from the desktop app.
- **Plugin system refactor** — Migrated `skill/` directory to `plugin/`, supporting multi-platform plugin registration (Claude Code, Codex, Gemini CLI).
- **Build info module** — Embed commit ID into binary for version traceability.

### Testing & Quality

- Added 16 frontend test files covering stores, hooks, components, and utilities.
- Added opsctl batch command tests and GitHub backup service tests.
- Improved golangci-lint error handling: replaced `//nolint` with proper logger-based error handling for `os.Remove`/`os.RemoveAll`.

### CI/CD

- Release/Nightly build optimization.
- Integrated frontend Vitest tests into CI.

### Other Improvements

- Frontend component accessibility attributes.
- Added i18n translations for batch operations.
- GitHub backup service refactoring.
- Auto-update service fixes.

**Full Changelog**: [v1.0.1...v1.0.2](https://github.com/opskat/opskat/compare/v1.0.1...v1.0.2)

## v1.0.0

OpsKat is a desktop application for server asset management and remote operation and maintenance. It integrates an AI intelligent assistant and supports SSH terminal, database queries, Redis operations, and file transfer.

### Main Functions

- **Asset Management** — Grouping and management of server, database, and Redis assets, supporting encrypted credential storage.
- **SSH Terminal** — Multi-tab terminal, supporting split-screen, jump server chaining, port forwarding, and SOCKS proxy.
- **Database Query** — MySQL/PostgreSQL query editor, supporting SSH tunnel connections.
- **Redis Operations** — Redis command execution, supporting SSH tunnel connections.
- **SFTP File Management** — Remote file browsing and transfer.
- **AI Smart Assistant** — Supports multiple backends including OpenAI compatible API, Claude CLI, and Codex CLI, enabling operation and maintenance through natural language.
- **Security Policy** — Three types of policies: SSH commands, SQL statements, and Redis commands, supporting policy group inheritance and pre-approval authorization.
- **Audit Log** — All operations are automatically recorded and traceable.
- **opsctl CLI** — Independent command-line tool supporting asset management, remote execution, file transfer, and other operations.

**Full Changelog**: [v1.0.0](https://github.com/opskat/opskat/commits/v1.0.0)
