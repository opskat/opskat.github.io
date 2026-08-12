---
sidebar_position: 5
sidebar_label: VNC Remote Desktop
---

# VNC Remote Desktop

OpsKat includes a built-in VNC client for Linux desktops, macOS hosts, hypervisor consoles, and anything else speaking RFB. Sessions open inside the workspace, alongside terminal and data tabs, without launching a separate viewer.

Use VNC where the host speaks RFB and [RDP](/docs/guide/rdp) where it speaks Windows Remote Desktop — the two are separate asset types with separate panels.

## Create a VNC Asset

Add an asset and select **VNC**. Configure:

- **Host / Port** — The remote host and VNC port (default: `5900`).
- **Username** — Optional; only needed when the VNC server asks for one. Many servers authenticate with a password alone.
- **Password** — Stored encrypted on the asset, or select a managed credential.
- **SSH/SFTP file channel** — Optional SSH asset used to move files to and from the same machine. VNC itself carries no file transfer; leave it empty to disable the Files button.
- **Connection** — Connect directly, or through an ordered proxy chain of SSH-tunnel / SOCKS5 / HTTP-tunnel layers.

Use **Test connection** before saving to verify that the endpoint and credentials work.

## Use the Remote Desktop

Double-click the asset or choose **Connect** to open the VNC page. The toolbar provides:

- **Fit** and **1:1** display modes.
- **Fullscreen** mode.
- A **Special keys** menu.
- A runtime clipboard toggle.
- A **Files** button, enabled only when the asset has an SSH/SFTP file channel.
- Disconnect and reconnect controls.

## Clipboard

Clipboard synchronization is on by default and can be toggled from the toolbar for the running session. Text copied locally can be pasted into the remote desktop, and remote text can be copied back.

Clipboard access crosses a trust boundary. Turn it off from the toolbar when connecting to an untrusted host.

## Files

VNC has no file-transfer channel of its own. When the asset names an SSH asset as its **SSH/SFTP file channel**, the toolbar's Files button opens an SFTP browser against that asset, so uploads and downloads travel over SSH rather than over the VNC connection. Without it, the button stays disabled.

## Server Identity Verification

When a server uses encrypted authentication, OpsKat shows its **RSA SHA-256** fingerprint and waits for you to confirm before continuing. Cancelling aborts the connection rather than falling back to an unverified one.

If authentication fails or the security type is incompatible, check the password, the server's configured VNC security type, and the proxy chain.

## Connectivity Notes

- **Direct** connects from the machine running OpsKat to the VNC endpoint.
- **Proxy chain** routes the VNC TCP connection through its layers in order — an SSH asset for an SSH-tunnel layer, or the configured server for a SOCKS5 / HTTP-tunnel layer.

VNC is an interactive desktop surface. It defines no allow/deny [policy](/docs/guide/policy) kind, and `opsctl exec` does not support it — there is no command surface to script. `opsctl` can still create, update, and delete VNC assets.
