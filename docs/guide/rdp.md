---
sidebar_position: 4
sidebar_label: RDP Remote Desktop
---

# RDP Remote Desktop

OpsKat includes a built-in RDP client for Windows servers and desktops. Sessions open inside the workspace, alongside terminal and data tabs, without launching a separate remote-desktop application.

## Create an RDP Asset

Add an asset and select **RDP**. Configure:

- **Host / Port** — The remote Windows host and RDP port (default: `3389`).
- **Username / Password** — The Windows sign-in credentials. You can store the password on the asset or select a managed credential.
- **Domain** — Optional Active Directory domain.
- **Clipboard** — Enables clipboard synchronization; on by default.
- **Connection** — Connect directly, through an SSH tunnel, or through a SOCKS proxy. SSH tunnel and proxy modes are mutually exclusive.

Use **Test connection** before saving to verify that the endpoint and credentials work.

## Use the Remote Desktop

Double-click the asset or choose **Connect** to open the RDP page. The toolbar provides:

- **Fit** and **Actual size** display modes.
- **Fullscreen** mode.
- Shortcuts for **Ctrl+Alt+Del**, **Alt+Tab**, and **Esc**.
- A runtime clipboard toggle.
- Disconnect and reconnect controls.

Mouse movement, buttons, wheel input, keyboard scancodes, Unicode text, remote cursor shapes, and framebuffer updates are handled inside the embedded session.

## Clipboard and Files

When clipboard synchronization is enabled:

- Text copied locally can be pasted into the remote desktop, and remote text can be copied back locally.
- Files copied locally can be offered to the remote desktop through RDP clipboard file transfer.
- Files copied on the remote desktop can be received into a temporary local directory before OpsKat exposes them to the operating system clipboard.

Clipboard access crosses a trust boundary. Disable it from the toolbar or asset settings when connecting to an untrusted host.

## Connectivity Notes

- **Direct** connects from the machine running OpsKat to the RDP endpoint.
- **SSH tunnel** routes the RDP TCP connection through a selected SSH asset.
- **SOCKS proxy** routes the connection through the configured proxy.
- The requested desktop size follows the mounted panel, with the saved asset dimensions used as defaults.

RDP is currently an interactive desktop surface. It does not define an allow/deny policy kind and does not add a dedicated `opsctl rdp` command.
