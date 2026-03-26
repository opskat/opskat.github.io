---
sidebar_label: Changelog
sidebar_position: 100
---

# Changelog

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
