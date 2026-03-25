---
sidebar_position: 1
sidebar_label: 安装
---

# 安装

OpsKat 支持 macOS、Linux 和 Windows。

## 下载

从 [GitHub Releases](https://github.com/opskat/opskat/releases/latest) 下载最新版本：

| 平台 | 架构 | 文件 |
|---|---|---|
| macOS | Apple Silicon (M1/M2/M3/M4) | `opskat-vX.X.X-darwin-arm64.dmg` |
| macOS | Intel | `opskat-vX.X.X-darwin-amd64.dmg` |
| Windows | x64 | `opskat-vX.X.X-windows-amd64-installer.exe` |
| Linux | x64 | `opskat-vX.X.X-linux-amd64.deb` |

- **macOS** — 打开 `.dmg` 文件，将 OpsKat 拖入应用程序文件夹。
- **Windows** — 运行 `.exe` 安装程序，按提示完成安装。
- **Linux** — 安装 `.deb` 包：`sudo dpkg -i opskat-vX.X.X-linux-amd64.deb`

## 安装 opsctl

`opsctl` 命令行工具有两种安装方式：

1. **从桌面端安装（推荐）** — 在设置页面一键安装。内嵌的二进制文件会被释放到 `~/.local/bin/`（Linux/macOS）或 `%LOCALAPPDATA%/opsctl`（Windows）。
2. **从源码构建** — 执行 `make install-cli`，安装到 `$GOPATH/bin`。

验证安装：

```bash
opsctl --help
```

## 从源码构建

如果你希望从源码构建，需要以下依赖：

| 依赖 | 版本 | 用途 |
|---|---|---|
| [Go](https://go.dev/) | 1.25+ | 后端 |
| [Node.js](https://nodejs.org/) | 22+ | 前端构建 |
| [pnpm](https://pnpm.io/) | 最新版 | 前端包管理器 |
| [Wails v2 CLI](https://wails.io/docs/gettingstarted/installation) | v2 | 桌面应用框架 |

安装 Wails CLI：

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

克隆并构建：

```bash
git clone https://github.com/opskat/opskat.git
cd opskat
make install       # 安装前端依赖
make build-embed   # 生产构建（内嵌 opsctl）
```

构建产物在 `build/bin/` 目录下。

### 构建命令

| 命令 | 说明 |
|---|---|
| `make install` | 安装前端依赖 |
| `make dev` | 开发模式（热重载） |
| `make build` | 生产构建（不含 opsctl） |
| `make build-embed` | 生产构建（内嵌 opsctl） |
| `make build-cli` | 仅构建 opsctl CLI |
| `make install-cli` | 安装 opsctl 到 `$GOPATH/bin` |

## 平台支持

- **macOS** — Intel 和 Apple Silicon
- **Linux** — x86_64
- **Windows** — x86_64

## 数据目录

OpsKat 在以下位置存储数据库、配置和日志：

| 平台 | 路径 |
|---|---|
| macOS | `~/Library/Application Support/opskat` |
| Windows | `%APPDATA%/opskat` |
| Linux | `~/.config/opskat` |

`opsctl` CLI 默认使用相同目录，可通过 `--data-dir` 覆盖。
