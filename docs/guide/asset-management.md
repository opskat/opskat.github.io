---
sidebar_position: 2
sidebar_label: Asset Management
---

# Asset Management

OpsKat organizes your infrastructure into a tree-structured inventory. Assets represent individual servers, databases, message brokers, Kubernetes clusters, and more. Groups provide hierarchical organization.

## Asset Types

OpsKat's built-in asset types cover terminals, remote desktops, databases, data services, clusters, and object storage. Each type has its own connection form and task-appropriate surface; policy support applies to operation-capable types rather than every interactive asset.

### SSH

SSH server assets for terminal access, command execution, and file transfer.

- **Host** — Hostname or IP address
- **Port** — SSH port (default: 22)
- **Username** — Login user
- **Auth Type** — `password` or `key`
- **Jump Host** — Optional jump host chain for bastion access
- **Proxy** — Optional SOCKS5 proxy

### Local Terminal

Local terminal assets open a shell on **your own machine** — no remote connection. Useful for running local tooling alongside your managed servers.

- **Shell** — Optional shell executable. Pick from detected shells (the app probes the host, e.g. `/etc/shells` on Unix and WSL distributions / PowerShell / Command Prompt on Windows) or type a path. Leave empty to use the OS default.
- **Args** — Optional shell startup arguments (e.g., `--login`)
- **Working Directory** — Optional starting directory (default: `~`)

Local terminals have no host, port, or credentials.

### RDP

RDP assets open an embedded Windows remote-desktop session through the [RDP client](/docs/guide/rdp).

- **Host / Port** — Remote Windows endpoint (default port: 3389)
- **Username / Password / Domain** — Windows sign-in details; passwords can use managed credentials
- **Clipboard** — Optional bidirectional text and file clipboard synchronization
- **Connection** — Direct, SSH tunnel, or SOCKS proxy

### Database (MySQL / PostgreSQL / SQL Server / SQLite)

Database assets for SQL execution via the [Query Editor](/docs/guide/query-editor) or the AI Agent.

- **Driver** — `mysql`, `postgresql`, `mssql` (SQL Server), or `sqlite`
- **Host** / **Port** — Database server address (default ports: 3306 MySQL, 5432 PostgreSQL, 1433 SQL Server). Not used for SQLite.
- **Username** / **Password** — Database credentials (not used for SQLite)
- **Database** — Default database name
- **Read Only** — Enable to restrict to read-only connections
- **SSH Asset** — Optional SSH asset for tunnel connections (the database is accessed through an SSH tunnel to the selected server)

**SQLite** uses a file source instead of host/port:

- **Path** — Path to the SQLite database file
- **Source** — `local` (a file on your machine) or `remote_ssh_vfs` (a file on a remote server, accessed over SSH). The remote source requires an SSH asset.

### Redis

Redis assets for command execution and key browsing.

- **Host** / **Port** — Redis server address (default port: 6379)
- **Username** / **Password** — Optional authentication
- **Database** — DB index (default: 0)
- **TLS** — Enable TLS connections (CA / client cert / client key, skip-verify, and server name are supported)
- **SSH Asset** — Optional SSH asset for tunnel connections

### MongoDB

MongoDB assets for document queries via the [MongoDB panel](/docs/guide/mongodb) or the AI Agent.

- **Host** / **Port** — MongoDB server address (default port: 27017)
- **Username** / **Password** — Optional authentication (auth source defaults to `admin`)
- **Database** — Default database
- **SSH Asset** — Optional SSH asset for tunnel connections

### Kafka

Kafka cluster assets for broker, topic, consumer-group, ACL, and schema management via the [Kafka panel](/docs/guide/kafka).

- **Brokers** — One or more `host:port` bootstrap brokers (default port: 9092). A single host/port is also accepted.
- **Client ID** — Optional client identifier
- **SASL Mechanism** — `none`, `plain`, `scram-sha-256`, or `scram-sha-512`
- **Username** / **Password** — Required when SASL is enabled
- **TLS** — Enable TLS (CA / client cert / client key, skip-verify, server name)
- **SSH Asset** — Optional SSH asset for tunnel connections

### Kubernetes

Kubernetes cluster assets for browsing workloads and streaming logs via the [Kubernetes panel](/docs/guide/kubernetes), and running `kubectl` through the AI Agent.

- **Kubeconfig** — Kubeconfig YAML content (required, encrypted at rest)
- **Namespace** — Optional default namespace
- **Context** — Optional kubeconfig context
- **SSH Asset** — Optional SSH asset to reach the cluster API through a jump host

### etcd

etcd cluster assets for key/value browsing and operations via the [etcd panel](/docs/guide/etcd).

- **Endpoints** — One or more `host:port` endpoints (default port: 2379)
- **Username** / **Password** — Optional (when RBAC is enabled)
- **TLS** — Enable TLS (CA / client cert / client key, skip-verify, server name)
- **Dial / Command Timeout** — Optional connection and command timeouts (seconds)
- **SSH Asset** — Optional SSH asset for tunnel connections

### Serial

Serial port assets for connecting to devices over a serial console.

- **Port Path** — Serial device path (e.g., `COM3` on Windows, `/dev/ttyUSB0` on Linux/macOS) — required
- **Baud Rate** — e.g., `9600`, `115200` — required
- **Data Bits** — `5`, `6`, `7`, or `8` (default: `8`)
- **Stop Bits** — `1`, `1.5`, or `2` (default: `1`)
- **Parity** — `none`, `odd`, `even`, `mark`, or `space` (default: `none`)
- **Flow Control** — `none` or `hardware`

### Object Storage

Object-storage assets connect to S3-compatible services through the [Object Storage browser](/docs/guide/object-storage).

- **Provider** — Optional convenience presets for common cloud and self-hosted services. Any service exposing a compatible S3 API can be configured with its endpoint, region, and addressing mode.
- **Endpoint / Region** — Service endpoint and signing region
- **Access Key ID / Secret Access Key** — Directly encrypted or selected from managed credentials
- **SSL / Path Style / TLS verification** — Provider-specific connection settings
- **Transfer tuning** — Optional connection timeout and multipart part size

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

Managed secrets (including passwords, SSH private keys, and kubeconfigs) are encrypted with a key derived using **Argon2id** and stored using **AES-256-GCM**. OpsKat first resolves the master key from an explicit configuration, then the OS keyring, and can fall back to a protected key file in the application data directory:

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

OpsKat supports importing assets from external sources and exporting your inventory for backup.

### Import Sources

| Source | Description |
|---|---|
| **SSH Config** | Parse your `~/.ssh/config` file. Preview entries and select which ones to import. |
| **Tabby** | Import from a [Tabby](https://tabby.sh/) configuration file. |
| **WindTerm** | Import from a WindTerm session file. |
| **File** | Import from an OpsKat backup file (JSON format). |

When importing, you can preview entries before confirming, and choose whether to merge with existing assets.

### Export

Export your inventory to a local JSON backup file. The export includes assets, groups, credentials (encrypted), and policy configurations.
