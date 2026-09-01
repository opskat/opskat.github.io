---
sidebar_position: 3
sidebar_label: SSH Terminal
---

# SSH Terminal

OpsKat provides a full-featured SSH terminal with split pane, SFTP file browsing, startup commands, jump host chains, port forwarding, and proxy chains.

## Connecting to Assets

Select an SSH asset from the sidebar and click **Connect** (or double-click). A terminal session opens in a new tab. Credentials are resolved automatically from the encrypted credential store.

Multiple sessions can be open simultaneously in separate tabs.

## Startup Commands

An SSH asset can run commands automatically once its interactive shell is ready. Set **Run command after connecting** in the asset's advanced SSH configuration; multiple commands are separated by line breaks.

- Commands run on every connect *and* every reconnect, and in every split pane of the session.
- They are dispatched after the shell has settled, so the shell — not the line discipline — executes them.
- With **Restore last directory on reconnect** also enabled, the directory is restored first and the commands run afterwards.
- A command that cannot be written is logged as a warning; it does not tear down an established terminal.

Leaving the field empty stores nothing on the asset.

## Split Pane

The terminal supports splitting into multiple panes within a single tab using a binary tree structure:

- **Split horizontally** — Divide the current pane top/bottom
- **Split vertically** — Divide the current pane left/right

Each split creates a new terminal session. Pane proportions can be adjusted by dragging the divider. You can split any existing pane further, creating a grid of terminal sessions.

## Customizable Themes

Terminal appearance is fully customizable:

- Choose from built-in xterm color themes
- Create custom themes with the theme editor
- Customize colors for foreground, background, cursor, selection, and the 16 ANSI colors

Theme settings are stored per-user and apply to all terminal sessions.

## SFTP File Browser

Each SSH connection includes an integrated SFTP file browser for visual file management:

- Browse the remote filesystem with a tree/list view
- Upload files from your local machine to the remote server
- Download files from the remote server
- Navigate directories and view file metadata

## Jump Host Chains

For servers behind bastion hosts, configure jump host chains:

1. Create the bastion/jump host as an SSH asset.
2. When creating or editing the target asset, select the jump host in the **Jump Host** field.
3. OpsKat connects through the jump host automatically.

Jump hosts can be chained (e.g., Bastion A > Bastion B > Target Server). The maximum chain depth is **5** to prevent circular references.

## Port Forwarding

Set up SSH port forwarding (tunneling) for accessing remote services:

### Local Forwarding

Forward a local port to a remote host/port through the SSH connection. Useful for accessing remote services (databases, web apps) as if they were local.

- **Local Host / Port** — The local address to listen on
- **Remote Host / Port** — The destination reachable from the SSH server

### Remote Forwarding

Forward a remote port back to a local host/port. Useful for exposing local services to the remote network.

Port forwarding configurations are saved per-asset and can include multiple rules grouped into named configurations.

## Proxy Chain

Configure a proxy chain for the SSH connection. This is useful when the SSH server is only reachable through one or more intermediate hops.

Set the chain in the asset's SSH configuration. Each layer has:

- **Layer type** — SSH jump host, SOCKS5, or HTTP Tunnel (layers can be mixed and reordered)
- **Host / Port** — Proxy server address
- **Username / Password** — Optional proxy authentication

## Connection Pooling

OpsKat maintains an SSH connection pool to improve performance:

- Connections are reused across multiple operations (terminal, SFTP, AI Agent commands)
- The `opsctl` CLI can reuse the desktop app's pooled connections when both are running, communicating via a Unix socket server
- Connections are automatically cleaned up when idle
