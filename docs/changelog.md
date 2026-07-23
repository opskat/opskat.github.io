---
sidebar_label: Changelog
sidebar_position: 100
---

# Changelog

## v1.11.1 (2026-07-23)

A patch release on top of v1.11.0: adds **GPU monitoring** to server status, closes the approval and audit-consistency gaps in file transfers (cp), and fixes SFTP symlink navigation, high-DPI rendering, and GitHub login state.

### 🚀 Major New Features

- ✨ Added GPU monitoring to server status ([#245](https://github.com/opskat/opskat/pull/245)) (by @CodFrm)

### 🔒 Security

- 🔒 Closed the file-transfer approval gap: `upload_file` / `download_file` and `opsctl cp` no longer bypass approval ([#251](https://github.com/opskat/opskat/pull/251)) (by @CodFrm)

### 🐛 Bug Fixes

- 🐛 Fixed cp audit status and context consistency ([#252](https://github.com/opskat/opskat/pull/252)) (by @CodFrm)
- 🐛 Fixed SFTP directory symlinks not being enterable [#239](https://github.com/opskat/opskat/issues/239) ([#243](https://github.com/opskat/opskat/pull/243)) (by @CodFrm)
- 🐛 Fixed path underline being clipped under high DPI [#240](https://github.com/opskat/opskat/issues/240) ([#244](https://github.com/opskat/opskat/pull/244)) (by @CodFrm)
- 🐛 Fixed GitHub login being wrongly invalidated after restart [#229](https://github.com/opskat/opskat/issues/229) ([#237](https://github.com/opskat/opskat/pull/237)) (by @CodFrm)

**Full Changelog**: [v1.11.0...v1.11.1](https://github.com/opskat/opskat/compare/v1.11.0...v1.11.1)

## v1.11.0 (2026-07-16)

This release adds **VNC** as a remote desktop asset type, rounding out graphical remote access alongside the RDP support introduced in v1.10.0. A unified proxy chain model lets you stack SSH tunnels, SOCKS5, and HTTP tunnels into an ordered multi-hop route, wired into every connection-based asset. A portable Windows build is also available — unzip and run, with all data kept next to the executable.

### 🚀 Major New Features

- 💥 **VNC remote connections** — an embedded noVNC client opens right in a tab, reaching the target through your existing SSH / SOCKS5 / HTTP proxy chain, with no dependency on guacd. Connection tests perform a real RFB handshake and password authentication (including RealVNC's `RFB 005.000` downgrade), CJK clipboard text transfers correctly in both directions, and an optional SSH asset binding reuses the existing SFTP file panel [#222](https://github.com/opskat/opskat/issues/222) ([#227](https://github.com/opskat/opskat/pull/227)) (by @fr58386612)
- 💥 **Proxy chain configuration** — a unified `proxy_chain` model and chained dialer let you order and combine SSH tunnel, SOCKS5, and HTTP script tunnel hops. Now used by every connection path: SSH, K8s, Database, Redis, MongoDB, Kafka, and Etcd [#203](https://github.com/opskat/opskat/issues/203) ([#221](https://github.com/opskat/opskat/pull/221)) (by @fr58386612)
- ✨ Portable Windows build `opskat-<version>-windows-amd64-portable.zip` — unzip and run. Data travels with the folder, and nothing is written to the host registry, PATH, or credential manager ([#231](https://github.com/opskat/opskat/pull/231)) (by @CodFrm)

### 🐛 Bug Fixes

- 🐛 Fixed several remote desktop issues when switching tabs: the connection was rebuilt, the previous frame lingered, and the window shrank to 200x200 ([#234](https://github.com/opskat/opskat/pull/234)) (by @CodFrm)
- 🐛 Fixed the window controls overlapping the tab menu after hiding the toolbar [#233](https://github.com/opskat/opskat/issues/233) ([#236](https://github.com/opskat/opskat/pull/236)) (by @CodFrm)
- 🐛 Fixed a stack overflow when browsing OSS directories, and polished the interaction ([#235](https://github.com/opskat/opskat/pull/235)) (by @CodFrm)
- 🐛 Fixed the Wails binding types for AI tool calls

**Full Changelog**: [v1.10.0...v1.11.0](https://github.com/opskat/opskat/compare/v1.10.0...v1.11.0)

## v1.10.0 (2026-07-11)

This release adds two new remote asset types — **RDP remote desktop** and **Object Storage (OSS)** — along with a full **database object browser**, plus a wide range of enhancements and fixes across databases, terminals, and AI sessions.

### 🚀 Major New Features

- 💥 **Object Storage (OSS) assets** — connect to Amazon S3, Alibaba Cloud OSS, Tencent COS, Huawei OBS, Volcengine TOS, Qiniu Kodo, Cloudflare R2, Backblaze B2, DigitalOcean Spaces, Wasabi, MinIO, and generic S3-compatible endpoints. Browse buckets and prefixes, upload/download, copy/move/delete objects, preview supported images, monitor transfers, and create presigned upload/download URLs ([#223](https://github.com/opskat/opskat/pull/223)) (by @CodFrm)
- 💥 **RDP remote desktop assets** — open Windows remote desktops inside OpsKat with direct, SSH-tunnel, or SOCKS-proxy connectivity; fit/actual-size and fullscreen views; special-key shortcuts; reconnect controls; and bidirectional text/file clipboard support ([#225](https://github.com/opskat/opskat/pull/225)) (by @CodFrm)
- 💥 Database object browser (columns / indexes / foreign keys / views / procedures / functions / triggers) ([#206](https://github.com/opskat/opskat/pull/206)) (by @wfion)
- ✨ AI sessions can bind to an open tab with bidirectional sync ([#224](https://github.com/opskat/opskat/pull/224)) (by @CodFrm)
- ✨ SQL editor now offers column-level completion suggestions ([#214](https://github.com/opskat/opskat/pull/214)) (by @CodFrm)
- ✨ Table data supports Excel (XLSX) import/export ([#207](https://github.com/opskat/opskat/pull/207)) (by @wfion)
- ✨ Support for remote SQLite via VFS ([#200](https://github.com/opskat/opskat/pull/200)) (by @CodFrm)
- ✨ Code snippets integrated into the Ctrl+P command palette ([#217](https://github.com/opskat/opskat/pull/217)) (by @CodFrm)
- ✨ SSH terminal restores the last working directory on reconnect ([#215](https://github.com/opskat/opskat/pull/215)) (by @CodFrm)
- ✨ New SSH/TCP tuning settings (NoDelay / KeepAlive / keepalive interval / connect timeout) ([#204](https://github.com/opskat/opskat/pull/204)) (by @wfion)
- ✨ New "disable shortcuts in terminal" toggle that passes keys straight through when the terminal is focused ([#191](https://github.com/opskat/opskat/pull/191)) (by @EdWard0x)
- ✨ Split panes gain independent toolbars with pin/hide toggle ([#213](https://github.com/opskat/opskat/pull/213)) (by @CodFrm)

### 🐛 Bug Fixes

- 🐛 Markdown links now open in the system browser instead of hijacking the window ([#219](https://github.com/opskat/opskat/pull/219)) (by @CodFrm)
- 🐛 Fixed local kubectl PATH resolution ([#208](https://github.com/opskat/opskat/pull/208)) (by @youaremywind)
- 🐛 Fixed the K8s top-bar refresh not updating already-loaded resources ([#212](https://github.com/opskat/opskat/pull/212)) (by @Pililink)
- 🐛 Fixed a DeepSeek error when replaying history with empty tool results [#199](https://github.com/opskat/opskat/issues/199) ([#201](https://github.com/opskat/opskat/pull/201)) (by @CodFrm)
- 🐛 Fixed remote SQLite issues: opening WAL-mode databases, concurrent multi-table lock contention, and path validation
- 🐛 Fixed multi-driver metadata issues in the database object browser
- 🐛 Fixed SQL Server asset icon mapping
- 🐛 Fixed SSH directory-sync echo and default configuration
- 🐛 Fixed object refresh and terminal toolbar display

### 🎨 UI Improvements

- 💄 etcd panel aligned with the design spec: added a KV browser tab, removed the cluster bar, and synced copy
- 💄 Streamlined SSH idle-keepalive copy and pre-filled asset-level defaults

### ♻️ Refactoring

- ♻️ Asset form reworked into tabs with a config-driven refactor ([#205](https://github.com/opskat/opskat/pull/205)) (by @CodFrm)

**Full Changelog**: [v1.9.1...v1.10.0](https://github.com/opskat/opskat/compare/v1.9.1...v1.10.0)

## v1.9.1 (2026-06-16)

v1.9.1 is a patch release that fixes binary file corruption during ZMODEM (rz/sz) terminal transfers and refines the click behavior of highlighted links in the terminal.

### 🐛 Bug Fixes

- 🐛 Fixed binary file corruption during ZMODEM (rz/sz) terminal transfers ([#198](https://github.com/opskat/opskat/pull/198)) (by @CodFrm)

### 🎨 UI Improvements

- 🎨 Highlighted terminal links now open the browser on left-click only, avoiding accidental triggers ([#193](https://github.com/opskat/opskat/pull/193)) (by @wfion)

**Full Changelog**: [v1.9.0...v1.9.1](https://github.com/opskat/opskat/compare/v1.9.0...v1.9.1)

## v1.9.0 (2026-06-15)

This release centers on **terminal file transfer**: lrzsz (ZMODEM rz/sz) file transfer in the terminal, with drag-and-drop upload straight into the SSH terminal. Database/middleware assets gain SOCKS5 proxy connections; new additions include WindTerm config import, standalone AI-plugin uninstall, and a terminal server-status popup. It also fixes PostgreSQL table-tree schema display, missing output in the Windows ConPTY local terminal, split-pane sync, and more.

### 🚀 Major New Features

- 💥 Terminal file transfer: lrzsz (ZMODEM rz/sz) file transfer in the terminal, plus drag-and-drop files into the SSH terminal to upload via rz ([#170](https://github.com/opskat/opskat/pull/170)) ([#177](https://github.com/opskat/opskat/pull/177)) (by @CodFrm, @wfion)
- ✨ Database/middleware assets support SOCKS5 proxy connections ([#175](https://github.com/opskat/opskat/pull/175)) (by @CodFrm)
- ✨ Added WindTerm config import ([#166](https://github.com/opskat/opskat/pull/166)) (by @wfion)
- ✨ AI plugins can be uninstalled individually ([#184](https://github.com/opskat/opskat/pull/184)) (by @wfion)
- ✨ Added a terminal server-status popup ([#157](https://github.com/opskat/opskat/pull/157)) (by @2849236173)
- ✨ Improved terminal copy/paste and shortcut settings ([#185](https://github.com/opskat/opskat/pull/185)) (by @CodFrm)
- ✨ Improved SSH key import/export [#161](https://github.com/opskat/opskat/issues/161) ([#163](https://github.com/opskat/opskat/pull/163)) (by @CodFrm)
- ✨ Remember WebDAV backup parameters ([#186](https://github.com/opskat/opskat/pull/186)) (by @wfion)
- ✨ SQL syntax highlighting in the DDL dialog ([#145](https://github.com/opskat/opskat/pull/145)) (by @wfion)

### 🐛 Bug Fixes

- 🐛 Fixed PostgreSQL table tree not showing tables in non-public schemas [#187](https://github.com/opskat/opskat/issues/187) ([#188](https://github.com/opskat/opskat/pull/188)) (by @CodFrm)
- 🐛 Fixed missing output in the Windows ConPTY local terminal [#164](https://github.com/opskat/opskat/issues/164) ([#165](https://github.com/opskat/opskat/pull/165)) (by @Joker764)
- 🐛 Fixed terminal and file-manager sync after splitting panes ([#180](https://github.com/opskat/opskat/pull/180)) (by @wfion)
- 🐛 Fixed server-status window flicker on refresh ([#168](https://github.com/opskat/opskat/pull/168)) (by @2849236173)
- 🐛 Fixed Tabby key authentication import ([#162](https://github.com/opskat/opskat/pull/162)) (by @CodFrm)
- 🐛 Fixed multi-line clipboard paste not recognizing newlines on terminal right-click [#146](https://github.com/opskat/opskat/issues/146) ([#158](https://github.com/opskat/opskat/pull/158)) (by @CodFrm)
- 🐛 Fixed tab freeze when opening the same connection multiple times (added a random instance segment to the terminal session ID) ([#143](https://github.com/opskat/opskat/pull/143)) (by @CodFrm)
- 🐛 Fixed approval activation restoring a maximized window [#148](https://github.com/opskat/opskat/issues/148) ([#154](https://github.com/opskat/opskat/pull/154)) (by @CodFrm)
- 🐛 Fixed command-palette tab labels not using i18n translations ([#172](https://github.com/opskat/opskat/pull/172)) (by @YangFong)

### 🎨 UI Improvements

- 🎨 Added an upload button to the file manager [#147](https://github.com/opskat/opskat/issues/147) ([#149](https://github.com/opskat/opskat/pull/149)) (by @CodFrm)
- 🎨 Highlight URLs in the terminal and open them in the browser on click ([#153](https://github.com/opskat/opskat/pull/153)) (by @wfion)
- 🎨 Settings page uses scrollbar-gutter to reserve the scrollbar groove, eliminating tab-switch jitter ([#167](https://github.com/opskat/opskat/pull/167)) (by @YangFong)
- 🎨 Improved the popup direction of the context menu ([#151](https://github.com/opskat/opskat/pull/151)) (by @CodFrm)

**Full Changelog**: [v1.8.0...v1.9.0](https://github.com/opskat/opskat/compare/v1.8.0...v1.9.0)

## v1.8.0 (2026-06-04)

This release adds a local terminal asset (local) — open your machine's shell / PowerShell / WSL terminal directly inside the app, with split-screen support. The asset-type selector is upgraded to a dropdown with icons, grouping and search, backed by a unified type list. macOS shortcuts gain Ctrl support with a one-click ⌘⇄⌃ toggle. The macOS/Windows app icons are refreshed, and success toasts (such as copy) are moved to top-center.

### 🚀 Major New Features

- 💥 New local terminal asset (local): open your machine's shell / PowerShell / WSL terminal directly in the app, with split-screen (a new shell sharing the same config) and the Windows console black-window hidden [#70](https://github.com/opskat/opskat/issues/70) ([#140](https://github.com/opskat/opskat/pull/140)) (by @CodFrm)
- ✨ Asset-type selector upgraded to a dropdown with icons, grouping and search, backed by a unified type list ([#142](https://github.com/opskat/opskat/pull/142)) (by @CodFrm)
- ✨ macOS shortcuts now support Ctrl, with a one-click ⌘⇄⌃ toggle [#138](https://github.com/opskat/opskat/issues/138) ([#139](https://github.com/opskat/opskat/pull/139)) (by @CodFrm)

### 🐛 Bug Fixes

- 🐛 Fixed the scroll height of the asset-type filter dropdown (by @CodFrm)

### 🎨 UI Improvements

- 🎨 Refreshed the macOS / Windows app icons (Windows icon now fills the tile) [#134](https://github.com/opskat/opskat/issues/134) (by @CodFrm)
- 🎨 Moved success toasts (such as copy) to top-center with a shorter dwell time [#135](https://github.com/opskat/opskat/issues/135) (by @CodFrm)

**Full Changelog**: [v1.7.0...v1.8.0](https://github.com/opskat/opskat/compare/v1.7.0...v1.8.0)

## v1.7.0 (2026-05-30)

This release adds etcd asset management, SQL Server / SQLite database assets, and a full remote-file external-edit workflow (with a three-way merge workbench) as its three headline features. The SFTP file manager gains a major upgrade, asset-tree drag performance is improved, and several bugs are fixed: startup home-tab preference, terminal PTY sizing, command-palette overflow, and WebGL font rendering.

### 🚀 Major New Features

- 💥 etcd asset management: new etcd asset type, connection pool and built-in permission policy, with KV browsing/query/detail editing and cluster info, wired into the AI tool chain [#122](https://github.com/opskat/opskat/issues/122) ([#129](https://github.com/opskat/opskat/pull/129)) (by @CodFrm)
- 💥 SQL Server and SQLite database assets: MSSQL via a pure-Go driver with direct connection + SSH tunnel, SQLite via local file, with full query-panel dialect/pagination/read-only adaptation [#120](https://github.com/opskat/opskat/issues/120) ([#128](https://github.com/opskat/opskat/pull/128)) (by @CodFrm)
- 💥 Full remote-file external-edit workflow: pull a remote file into a local copy for continuous editing with auto write-back, including a three-way merge workbench, pending-decision consolidation and restart recovery ([#112](https://github.com/opskat/opskat/pull/112)) (by @2849236173)
- ✨ SFTP file manager upgrade: create file/folder, rename, cut/copy/paste, multi-select download/delete, drag-to-move, properties dialog, and permission/owner editing (chmod/chown, recursive) ([#124](https://github.com/opskat/opskat/pull/124)) (by @youaremywind)
- ✨ SFTP file manager: new "Copy file path" menu action ([#131](https://github.com/opskat/opskat/pull/131)) (by @youaremywind)

### ⚡️ Performance

- ⚡️ Optimized asset-tree drag performance and click-response latency (AssetRow re-renders during drag dropped from ~34/move to ~0.68/move) (by @CodFrm)

### 🐛 Bug Fixes

- 🐛 Fixed startup home-tab preference not taking effect [#132](https://github.com/opskat/opskat/issues/132) ([#133](https://github.com/opskat/opskat/pull/133)) (by @CodFrm)
- 🐛 Fixed SSH terminal not syncing PTY size on initial mount, causing full-screen programs like vi to display only half the screen [#125](https://github.com/opskat/opskat/issues/125) (by @CodFrm)
- 🐛 Fixed command palette overflowing the popover when content is too long [#126](https://github.com/opskat/opskat/issues/126) (by @CodFrm)
- 🐛 Fixed terminal WebGL font rendering glitch (by @CodFrm)

### ♻️ Refactoring

- ♻️ opsctl cp now skips approval, keeping audit only (by @CodFrm)

**Full Changelog**: [v1.6.2...v1.7.0](https://github.com/opskat/opskat/compare/v1.6.2...v1.7.0)

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
