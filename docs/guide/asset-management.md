---
sidebar_position: 2
sidebar_label: Asset Management
---

# Asset Management

OpsKat organizes your infrastructure into a tree-structured inventory. Assets represent individual servers, databases, or Redis instances. Groups provide hierarchical organization.

## Asset Types

### SSH

SSH server assets for terminal access, command execution, and file transfer.

- **Host** — Hostname or IP address
- **Port** — SSH port (default: 22)
- **Username** — Login user
- **Auth Type** — `password` or `key`
- **Jump Host** — Optional jump host chain for bastion access
- **Proxy** — Optional SOCKS5/SOCKS4 proxy

### Database (MySQL / PostgreSQL)

Database assets for SQL query execution via the Query Editor or AI Agent.

- **Driver** — `mysql` or `postgresql`
- **Host** / **Port** — Database server address (default port: 3306 for MySQL, 5432 for PostgreSQL)
- **Username** / **Password** — Database credentials
- **Database** — Default database name
- **Read Only** — Enable to restrict to read-only connections
- **SSH Asset** — Optional SSH asset for tunnel connections (the database is accessed through an SSH tunnel to the selected server)

### Redis

Redis assets for command execution and key browsing.

- **Host** / **Port** — Redis server address (default port: 6379)
- **Username** / **Password** — Optional authentication
- **Database** — DB index (default: 0)
- **TLS** — Enable TLS connections
- **SSH Asset** — Optional SSH asset for tunnel connections

## Groups

Groups organize assets into a tree hierarchy using parent-child relationships. Every asset belongs to a group (or the root level).

- Create nested groups for environments (e.g., Production > Web Servers)
- Assets and groups can be reordered via drag-and-drop
- Groups can have their own [policy configurations](/docs/guide/policy), inherited by child assets

## Adding, Editing, and Deleting Assets

### Adding

Click the **+** button in the asset sidebar and select the asset type. Fill in the required fields and click **Save**.

### Editing

Select an asset and click **Edit** (or right-click > Edit). Modify any field and save.

### Deleting

Right-click an asset and select **Delete**. Assets are soft-deleted (marked as deleted rather than removed from the database), preserving audit history.

## Credential Management

All credentials (passwords and SSH private keys) are encrypted with AES-256-GCM before storage. The master encryption key is stored in your OS keyring:

- **macOS** — Keychain
- **Windows** — Windows Credential Manager
- **Linux** — Secret Service (GNOME Keyring / KDE Wallet)

The `opsctl` CLI can use a `--master-key` flag or the `OPSKAT_MASTER_KEY` environment variable to provide the encryption key in headless environments.

### SSH Key Management

You can import SSH private keys in two ways:

- **From file** — Select a key file from disk (e.g., `~/.ssh/id_rsa`)
- **From PEM** — Paste the PEM-encoded key content directly

Imported keys are stored as credentials and can be reused across multiple assets.

## Import / Export

OpsKat supports importing assets from external sources and exporting your inventory for backup or sharing.

### Import Sources

| Source | Description |
|---|---|
| **SSH Config** | Parse your `~/.ssh/config` file. Preview entries and select which ones to import. |
| **Tabby** | Import from a [Tabby](https://tabby.sh/) configuration file. |
| **File** | Import from an OpsKat backup file (JSON format). |
| **GitHub Gist** | Import from a GitHub Gist (requires a personal access token). |

When importing, you can preview entries before confirming, and choose whether to merge with existing assets.

### Export Targets

| Target | Description |
|---|---|
| **File** | Export to a local JSON backup file. |
| **GitHub Gist** | Export to a GitHub Gist (public or private). Requires a GitHub token with gist scope. |

Export includes assets, groups, credentials (encrypted), and policy configurations.
