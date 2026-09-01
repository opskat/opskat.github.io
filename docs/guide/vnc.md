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
- **Encryption policy** — How much transport encryption the session requires. See [Session Encryption](#session-encryption). Defaults to **Let server choose**, so existing assets connect exactly as before.
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

Once connected, the toolbar also reports the security mode that was actually negotiated — the protocol name plus whether the session is encrypted, only the authentication was protected, or the session is unencrypted.

## Clipboard

Clipboard synchronization is on by default and can be toggled from the toolbar for the running session. Text copied locally can be pasted into the remote desktop, and remote text can be copied back.

Clipboard access crosses a trust boundary. Turn it off from the toolbar when connecting to an untrusted host.

## Files

VNC has no file-transfer channel of its own. When the asset names an SSH asset as its **SSH/SFTP file channel**, the toolbar's Files button opens an SFTP browser against that asset, so uploads and downloads travel over SSH rather than over the VNC connection. Without it, the button stays disabled.

## Session Encryption

The VNC client supports the RSA-AES security family — RA2, RA2ne, RA2r and their AES-256 counterparts — alongside the traditional VNC password authentication. The asset's **Encryption policy** decides which of the modes a server offers are acceptable:

| Policy | Behaviour |
|---|---|
| **Let server choose** | No client preference. Negotiates in the server's own order among all supported modes. This is the default. |
| **Always maximum encryption** | Allows only the AES-256 full-session modes. Connection fails explicitly if the server offers neither. |
| **Always encrypt session** | Allows only modes that keep the whole session encrypted. Authentication-only and plaintext transports are rejected. |
| **Prefer encrypted session** | Prefers a fully encrypted session, falling back to the remaining supported modes when none is available. |
| **Prefer unencrypted session** | Prefers non-encrypted-session modes, using a fully encrypted mode only when nothing else is offered. |

A strict policy never silently downgrades: when the server offers no permitted mode, the connection fails with an explicit policy error instead of negotiating something weaker.

## Server Identity Verification

Servers using RSA-AES authentication present a public key before any credentials are sent. OpsKat stores the approved key per host and port, so verification behaves like SSH known-hosts:

- **First connection** — The **RSA SHA-256** fingerprint is shown and the connection waits for you to trust it. Cancelling aborts the connection rather than falling back to an unverified one.
- **Later connections** — A key matching the stored one is accepted silently.
- **Changed key** — The connection stops with a warning showing both the previously trusted and the newly presented fingerprint. A changed key can mean interception or a replaced server; trust is only replaced if you explicitly confirm.

If authentication fails or the security type is incompatible, check the password, the server's configured VNC security type, the asset's encryption policy, and the proxy chain.

## Connectivity Notes

- **Direct** connects from the machine running OpsKat to the VNC endpoint.
- **Proxy chain** routes the VNC TCP connection through its layers in order — an SSH asset for an SSH-tunnel layer, or the configured server for a SOCKS5 / HTTP-tunnel layer.

VNC is an interactive desktop surface. It defines no allow/deny [policy](/docs/guide/policy) kind, and `opsctl exec` does not support it — there is no command surface to script. `opsctl` can still create, update, and delete VNC assets.
