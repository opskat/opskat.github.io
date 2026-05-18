---
sidebar_label: Changelog
sidebar_position: 100
---

# Changelog

## v1.6.2 (2026-05-18)

Fixes a rendering glitch where selected text in the xterm WebGL terminal appeared to shift font when the selection updated frequently.

### 🎨 UI Improvements

- 🎨 Terminal selection now sets an explicit foreground color, eliminating the "font shift" appearance of selected text under frequent selection updates (by @CodFrm)

**Full Changelog**: [v1.6.1...v1.6.2](https://github.com/opskat/opskat/compare/v1.6.1...v1.6.2)

## v1.6.1 (2026-05-18)

Fixes a regression where SSH terminal double-sent characters (space, capital letters) due to xterm rollover-bypass misjudgement, and adds loading feedback to the port-forwarding start/stop flow so users don't repeatedly click during dial and tear down a connection mid-build.

### 🐛 Bug Fixes

- 🐛 Fixed SSH terminal double-sending characters (rollover bypass mistakenly re-emitting chars already handled by xterm's keypress path) (by @CodFrm)

### 🎨 UI Improvements

- 🎨 Port-forward start/stop now shows loading feedback (button spinner + "Processing…" status; asset dropdown disabled during dial to prevent implicit restart) (by @CodFrm)

**Full Changelog**: [v1.6.0...v1.6.1](https://github.com/opskat/opskat/compare/v1.6.0...v1.6.1)

## v1.6.0 (2026-05-17)

This release adds Serial (COM/TTY) asset support with AI serial command execution, asset-context selection for the AI assistant, and migrates the AI subsystem to the cago-frame/agents framework. New features include a VSCode-style search/command palette, drag-and-drop reordering of the asset tree, right-click file management on SSH assets, 60s SSH keepalive heartbeat, and reasoning-effort support for Anthropic/OpenAI providers. Major performance work landed on the database query panel and AI streaming output. Bug fixes cover SSH private-key + MFA chained auth, restart-after-update auto-start, terminal IME character loss, and SSH Powerline/Nerd Font rendering.

### 🚀 Major New Features

- 💥 Serial (COM/TTY) asset support — terminal connection and AI serial command execution ([#89](https://github.com/opskat/opskat/pull/89)) (by @fqscfqj)
- 💥 AI assistant asset-context selection ([#121](https://github.com/opskat/opskat/pull/121)) (by @CodFrm)
- ✨ Top-bar VSCode-style search/command palette + asset/AI panel collapse buttons ([#113](https://github.com/opskat/opskat/pull/113)) (by @CodFrm)
- ✨ SSH asset right-click opens file manager ([#104](https://github.com/opskat/opskat/pull/104)) (by @lonelyman0108)
- ✨ Drag-and-drop reordering of asset tree + fixed nested-group asset placement ([#101](https://github.com/opskat/opskat/pull/101)) (by @lonelyman0108)
- ✨ Credentials linked to username + asset form auto-fills username from selected credential ([#88](https://github.com/opskat/opskat/pull/88)) (by @CodFrm)
- ✨ 60s SSH keepalive heartbeat + Enter-to-reconnect after disconnect ([#81](https://github.com/opskat/opskat/pull/81)) (by @CodFrm)
- ✨ New shared SSH client package ([#82](https://github.com/opskat/opskat/pull/82)) (by @CodFrm)
- ✨ Reasoning effort support for Anthropic provider ([#76](https://github.com/opskat/opskat/pull/76)) (by @CodFrm)
- ✨ Reasoning effort support for OpenAI-compatible providers ([#74](https://github.com/opskat/opskat/pull/74)) (by @fqscfqj)
- ✨ Persist window size config (by @CodFrm)

### ⚡️ Performance

- ⚡️ Database query panel — connection reuse + OpenTable first-paint merge + large-table virtualization ([#116](https://github.com/opskat/opskat/pull/116)) (by @CodFrm)
- ⚡️ AI streaming output optimization + component decomposition ([#93](https://github.com/opskat/opskat/pull/93)) (by @CodFrm)

### ♻️ Refactoring

- ♻️ Migrated AI subsystem to cago-frame/agents framework ([#92](https://github.com/opskat/opskat/pull/92)) (by @CodFrm)
- ♻️ Code slimming and frontend UX improvements ([#119](https://github.com/opskat/opskat/pull/119)) (by @CodFrm)
- ♻️ Renamed AI local tools to `local_*` with visual separation from remote tools ([#110](https://github.com/opskat/opskat/pull/110)) (by @CodFrm)

### 🔒 Security

- 🔒 Hardened compound-command permission checking ([#107](https://github.com/opskat/opskat/pull/107)) (by @CodFrm)

### 🐛 Bug Fixes

- 🐛 SSH private-key auth can now continue into keyboard-interactive (MFA/OTP) ([#109](https://github.com/opskat/opskat/pull/109)) (by @CodFrm)
- 🐛 Auto-start after update-and-restart ([#106](https://github.com/opskat/opskat/pull/106)) (by @CodFrm)
- 🐛 SSH terminal Powerline/Nerd Font icons rendering as boxes; font dropdown split into system-recommended/other; theme switch reflects current selection ([#103](https://github.com/opskat/opskat/pull/103)) (by @lonelyman0108)
- 🐛 Settings sub-tab persistence + cancelable asset test-connection + asset form layout refactor ([#102](https://github.com/opskat/opskat/pull/102)) (by @lonelyman0108)
- 🐛 SFTP transfer progress tab scoping ([#95](https://github.com/opskat/opskat/pull/95)) (by @CodFrm)
- 🐛 Terminal IME — bypass xterm key-rollover input drop ([#105](https://github.com/opskat/opskat/pull/105)) (by @CodFrm)
- 🐛 Terminal IME — extract TerminalInputBridge + isComposing early return [#94](https://github.com/opskat/opskat/issues/94) ([#98](https://github.com/opskat/opskat/pull/98)) (by @CodFrm)
- 🐛 AI assistant input shortcut newline ([#111](https://github.com/opskat/opskat/pull/111)) (by @CodFrm)
- 🐛 Ungrouped asset tree expansion ([#73](https://github.com/opskat/opskat/pull/73)) (by @CodFrm)
- 🐛 AI mention popover fallback ([#72](https://github.com/opskat/opskat/pull/72)) (by @CodFrm)

### 📄 Docs

- 📄 Added intro video link to README ([#87](https://github.com/opskat/opskat/pull/87)) (by @Pililink)

**Full Changelog**: [v1.5.0...v1.6.0](https://github.com/opskat/opskat/compare/v1.5.0...v1.6.0)

## v1.5.0 (2026-05-06)

This release adds two new modules — K8s asset and cluster resource management, and Kafka management — alongside a major Redis management panel overhaul. New additions include VSCode-style Cmd+P quick open, terminal font presets, and bidirectional cwd sync between terminal and online directory. MySQL gains improved table editing, import/export and filter flows, and asset routing was refactored to shrink the frontend bundle. Bug fixes include AI mistakenly sending `group_id=0`/`parent_id=0` causing assets/groups to be unlinked, hidden SSH login prompts, and the assistant still demanding reconfiguration after the AI provider had been set up in Settings.

### 🚀 Major New Features

- 💥 K8s asset and cluster resource management ([#58](https://github.com/opskat/opskat/pull/58)) (by @shanaiardor)
- 💥 Kafka management ([#68](https://github.com/opskat/opskat/pull/68)) (by @Pililink)
- ✨ Redis management panel overhaul ([#53](https://github.com/opskat/opskat/pull/53)) (by @Pililink)
- ✨ MySQL table editing, import/export, and filter flow improvements ([#59](https://github.com/opskat/opskat/pull/59)) (by @youaremywind)
- ✨ Cmd+P quick open (VSCode-style) ([#55](https://github.com/opskat/opskat/pull/55)) (by @CodFrm)
- ✨ Terminal font presets ([#66](https://github.com/opskat/opskat/pull/66)) (by @CodFrm)
- ✨ Bidirectional cwd sync between terminal and online directory ([#63](https://github.com/opskat/opskat/pull/63)) (by @2849236173)
- ✨ Database table right-click menu supports drop/truncate with confirmation (by @CodFrm)

### 🐛 Bug Fixes

- 🐛 Hidden SSH login prompt ([#67](https://github.com/opskat/opskat/pull/67)) (by @CodFrm)
- 🐛 AI mistakenly sending `group_id=0`/`parent_id=0` unlinking assets/groups (by @CodFrm)
- 🐛 Assistant requiring AI provider reconfiguration after first Settings setup [#61](https://github.com/opskat/opskat/issues/61) (by @CodFrm)
- 🐛 Side assistant input not cleared after send [#60](https://github.com/opskat/opskat/issues/60) (by @CodFrm)
- 🐛 Database tree refresh (by @CodFrm)
- 🐛 SSH asset test-connection not passing managed-password credential [#57](https://github.com/opskat/opskat/issues/57) (by @CodFrm)

### ♻️ Refactoring

- ♻️ Asset routing refactor + frontend bundle size reduction ([#64](https://github.com/opskat/opskat/pull/64)) (by @CodFrm)

**Full Changelog**: [v1.4.1...v1.5.0](https://github.com/opskat/opskat/compare/v1.4.1...v1.5.0)

## v1.4.1 (2026-04-28)

UX improvements to the asset tree and SSH terminal, plus a fix for i18n fallback language on non-zh/en systems.

### ✨ New Features

- ✨ Asset tree can hide empty folders (by @CodFrm)
- ✨ SSH terminal scrollback buffer is now configurable, default raised to 25000 lines (by @CodFrm)

### 🐛 Bug Fixes

- 🐛 i18n fallback was incorrectly defaulting to Chinese on non-zh/non-en systems (by @CodFrm)

**Full Changelog**: [v1.4.0...v1.4.1](https://github.com/opskat/opskat/compare/v1.4.0...v1.4.1)

## v1.4.0 (2026-04-27)

This release introduces a Snippets reuse system and a WebDAV backup provider. The AI assistant gains a multi-session tab bar with session rename, edit-and-resend on history messages, and expandable tool cards. Home page sections and Settings page were unified, asset tree gains type-filtering, and the Redis panel adds Stream type display. Fixes include split-screen terminal content loss, Ctrl+A selecting the whole page, and DeepSeek thinking-mode 400 errors.

### 🚀 Major New Features

- 💥 Snippets reuse system (by @CodFrm)
- 💥 WebDAV backup provider ([#47](https://github.com/opskat/opskat/pull/47)) (by @Pililink)
- 💥 Multi-session tabs in side AI assistant with right-side session pane ([#35](https://github.com/opskat/opskat/pull/35)) (by @2849236173)
- ✨ AI session rename ([#38](https://github.com/opskat/opskat/pull/38)) (by @2849236173)
- ✨ Edit-and-resend on AI history messages ([#30](https://github.com/opskat/opskat/pull/30)) (by @2849236173)
- ✨ AI tool cards expandable to view invocation parameters (by @CodFrm)
- ✨ AI asset tools cover password/key/group management and trigger left-tree refresh (by @CodFrm)
- ✨ Redis Stream data display ([#36](https://github.com/opskat/opskat/pull/36)) (by @shanaiardor)
- ✨ Asset tree type filter + removed Sidebar section buttons ([#51](https://github.com/opskat/opskat/pull/51)) (by @CodFrm)
- ✨ Home page sections merged into Settings, list interaction states fixed ([#37](https://github.com/opskat/opskat/pull/37)) (by @tangqiu0205)
- ✨ Settings page adds Bug feedback, Debug log toggle, and open-log-directory (by @CodFrm)
- ✨ Settings page shows repository URL ([#45](https://github.com/opskat/opskat/pull/45)) (by @Pililink)
- ✨ Extension framework supports generic TCP IO, deadlines, action cancellation, and textarea formatting ([#31](https://github.com/opskat/opskat/pull/31)) (by @CodFrm)

### 🐛 Bug Fixes

- 🐛 SSH split-pane wiping existing terminal content (by @CodFrm)
- 🐛 Ctrl+A selecting the whole page instead of terminal [#48](https://github.com/opskat/opskat/issues/48) (by @CodFrm)
- 🐛 Hardcoded terminal Ctrl+F ignoring user rebinding ([#32](https://github.com/opskat/opskat/pull/32)) (by @CodFrm)
- 🐛 DeepSeek thinking-mode multi-turn 400 errors ([#42](https://github.com/opskat/opskat/pull/42)) (by @shanaiardor)
- 🐛 Windows OpenDirectory not surfacing explorer due to hidden UI ([#41](https://github.com/opskat/opskat/pull/41)) (by @shanaiardor)
- 🐛 GitHub Releases manual install links ([#50](https://github.com/opskat/opskat/pull/50)) (by @Pililink)

**Full Changelog**: [v1.3.0...v1.4.0](https://github.com/opskat/opskat/compare/v1.3.0...v1.4.0)

## v1.3.0 (2026-04-23)

This release brings the side AI assistant panel and a new Sidebar layout. The database panel adds full create-db/create-table/design-table flows and Monaco editor integration. AI chat supports @ mentions of assets and token usage display. Significant query panel performance work and many AI assistant / SSH / SOCKS / terminal stability fixes.

### 🚀 Major New Features

- ✨ Side AI assistant panel — aiStore refactor + persistent SideAssistantPanel ([#18](https://github.com/opskat/opskat/pull/18)) (by @CodFrm)
- ✨ Side tab layout — ActivityBar merged into Sidebar with left/right toggle ([#17](https://github.com/opskat/opskat/pull/17)) (by @CodFrm)
- ✨ Database panel — create-db/create-table/design-table with unified SQL preview-and-confirm ([#27](https://github.com/opskat/opskat/pull/27)) (by @tangqiu0205)
- ✨ Database panel — Monaco editor and improved query UX (by @CodFrm)
- ✨ AI @ asset mentions + unified asset search (pinyin support) ([#22](https://github.com/opskat/opskat/pull/22)) (by @CodFrm)
- ✨ AI chat token usage display + copy improvements (by @CodFrm)
- ✨ MongoDB result panel aligned with database — shared QueryResultTable + FILTER/SORT bar (by @CodFrm)
- ✨ Persisted asset-group collapse state (by @CodFrm)

### ⚡️ Performance

- ⚡️ Query panel edit/drag/render path refactor — eliminates typing and drag lag (by @CodFrm)

### 🐛 Bug Fixes

- 🐛 AI assistant `run_command` hang and session loss ([#20](https://github.com/opskat/opskat/pull/20)) (by @2849236173)
- 🐛 AI assistant copy and input history interaction ([#25](https://github.com/opskat/opskat/pull/25)) (by @2849236173)
- 🐛 Side assistant history dropdown not scrolling, deletion not taking effect (by @CodFrm)
- 🐛 Stale provider after switching AI provider (by @CodFrm)
- 🐛 In-flight AI conversation content lost on app close (by @CodFrm)
- 🐛 AI stop-session hang during SFTP file transfer (by @CodFrm)
- 🐛 Unified SSH dial path — AI commands now honor SOCKS5 proxy (by @CodFrm)
- 🐛 Removed SOCKS4 / HTTP proxy type leftovers (by @CodFrm)
- 🐛 SSH asset switching from jump host back to direct now saves (by @CodFrm)
- 🐛 PostgreSQL inline edit producing UPDATE with every column in WHERE (by @CodFrm)
- 🐛 SSH terminal losing focus after context-menu close (by @CodFrm)
- 🐛 Enter mistakenly triggered during IME composition (by @CodFrm)
- 🐛 Text ghosting on page switch ([#26](https://github.com/opskat/opskat/pull/26)) (by @tangqiu0205)
- 🐛 Tab filter popup dismissed by DropdownMenu unmount / exit-animation focus-outside issue (by @CodFrm)

### 🎨 UI Improvements

- 🎨 Tab filter entry text renamed to "Find Tab" and DatabasePanel formatting fix (by @CodFrm)

**Full Changelog**: [v1.2.0...v1.3.0](https://github.com/opskat/opskat/compare/v1.2.0...v1.3.0)

## v1.2.0 (2026-04-16)

This release adds full MongoDB integration and improves terminal and query panel interactions.

### 🚀 Major New Features

- ✨ MongoDB integration — full MongoDB asset management and query ([#15](https://github.com/opskat/opskat/pull/15)) (by @CodFrm)
- ✨ SSH terminal copy hint

### 🎨 UI Improvements

- ✨ Tab bar — equal-width adaptive compression + color indicator strip
- ✨ SQL query pagination, result table column width adjust, terminal shortcut hints

**Full Changelog**: [v1.1.0...v1.2.0](https://github.com/opskat/opskat/compare/v1.1.0...v1.2.0)

## v1.1.1

### New Features

- **Download integrity verification** — SHA256 checksum verification for downloaded files. On failure, prompts manual download.
- **Download mirror support** — Mirror selector in settings with automatic fallback and skip-verification option.
- **AI thinking display** — AI conversations now show thinking process, message queue, stop/retry, and error recovery.
- **Terminal context menu & search** — Right-click context menu and search in terminal. MySQL TLS support, password echo.
- **Edge reveal strip** — Edge hot zone component for sidebar navigation.
- **System status dashboard** — Startup status registry with settings page section and toast notifications for migration failures.

### Bug Fixes

- Fixed DeepSeek and other OpenAI-compatible API returning 400 errors.
- Fixed CI golangci-lint v2 formatting and staticcheck issues.
- Removed redundant `nolint gosec` directives.
- Fixed UpdateSection prettier formatting.

### CI/CD

- Generate `release-info.json` on release for mirror update checks.

### Other

- README rewrite highlighting use cases and security auditing.

**Full Changelog**: [v1.1.0...v1.1.1](https://github.com/opskat/opskat/compare/v1.1.0...v1.1.1)

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

- Added GPLv3 License.
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
