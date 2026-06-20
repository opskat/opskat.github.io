---
sidebar_position: 9
sidebar_label: 本地终端
---

# 本地终端

本地终端资产在**你自己的机器**上打开一个 Shell，而不是连接远程服务器。这让你可以在同一个工作区中将本地工具放在受管基础设施旁边。

## 创建本地终端

创建一个本地资产（见[资产管理](/docs/guide/asset-management)）。本地终端没有主机、端口或凭据 —— 只有可选的 Shell 配置：

- **Shell** —— 要启动的 Shell 可执行文件。OpsKat 会探测你的机器以查找可用的 Shell，并将它们作为预设提供：
  - 在 Unix/macOS 上，来自 `/etc/shells` 的 Shell（例如 `bash` 和 `zsh`）
  - 在 Windows 上，PowerShell、命令提示符以及任何已安装的 WSL 发行版

  你也可以填写自定义路径，或留空以使用操作系统默认 Shell。
- **参数** —— 可选的 Shell 启动参数（例如 `--login`）
- **工作目录** —— 可选的起始目录（默认：`~`）

## 使用终端

打开该资产以启动一个在本机运行所配置 Shell 的终端会话。本地终端与 SSH 会话共享相同的终端功能，包括分屏和可自定义主题 —— 详见 [SSH 终端](/docs/guide/ssh-terminal)。

由于本地终端在你的机器上运行，它们独立于任何远程资产。AI 智能体的 `local_*` 工具操作的是同一个本地环境，与远程 `run_command` 执行相区分。
