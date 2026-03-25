---
sidebar_position: 1
sidebar_label: Installation
---

# Installation

OpsKat runs on macOS, Linux, and Windows.

## Download

Download the latest release from [GitHub Releases](https://github.com/opskat/opskat/releases/latest):

| Platform | Architecture | File |
|---|---|---|
| macOS | Apple Silicon (M1/M2/M3/M4) | `opskat-vX.X.X-darwin-arm64.dmg` |
| macOS | Intel | `opskat-vX.X.X-darwin-amd64.dmg` |
| Windows | x64 | `opskat-vX.X.X-windows-amd64-installer.exe` |
| Linux | x64 | `opskat-vX.X.X-linux-amd64.deb` |

- **macOS** — Open the `.dmg` file and drag OpsKat to the Applications folder.
- **Windows** — Run the `.exe` installer and follow the prompts.
- **Linux** — Install the `.deb` package: `sudo dpkg -i opskat-vX.X.X-linux-amd64.deb`

## Installing opsctl

The `opsctl` CLI tool can be installed in two ways:

1. **From the desktop app (recommended)** — One-click install from the Settings page. The embedded binary is extracted to `~/.local/bin/` (Linux/macOS) or `%LOCALAPPDATA%/opsctl` (Windows).
2. **From source** — Run `make install-cli` to build and install to `$GOPATH/bin`.

Verify the installation:

```bash
opsctl --help
```

## Building from Source

If you prefer to build from source, you'll need:

| Dependency | Version | Purpose |
|---|---|---|
| [Go](https://go.dev/) | 1.25+ | Backend |
| [Node.js](https://nodejs.org/) | 22+ | Frontend build |
| [pnpm](https://pnpm.io/) | latest | Frontend package manager |
| [Wails v2 CLI](https://wails.io/docs/gettingstarted/installation) | v2 | Desktop app framework |

Install the Wails CLI:

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

Clone and build:

```bash
git clone https://github.com/opskat/opskat.git
cd opskat
make install       # Install frontend dependencies
make build-embed   # Production build with embedded opsctl
```

The built application will be in the `build/bin/` directory.

### Build Commands

| Command | Description |
|---|---|
| `make install` | Install frontend dependencies |
| `make dev` | Development mode with hot reload |
| `make build` | Production build (without opsctl) |
| `make build-embed` | Production build with embedded opsctl |
| `make build-cli` | Build the opsctl CLI only |
| `make install-cli` | Install opsctl to `$GOPATH/bin` |

## Platform Support

- **macOS** — Intel and Apple Silicon
- **Linux** — x86_64
- **Windows** — x86_64

## App Data Directory

OpsKat stores its database, configuration, and logs in:

| Platform | Path |
|---|---|
| macOS | `~/Library/Application Support/opskat` |
| Windows | `%APPDATA%/opskat` |
| Linux | `~/.config/opskat` |

The `opsctl` CLI uses the same directory by default. Override with `--data-dir`.
