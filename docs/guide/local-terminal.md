---
sidebar_position: 9
sidebar_label: Local Terminal
---

# Local Terminal

Local terminal assets open a shell on **your own machine** rather than connecting to a remote server. This lets you keep local tooling next to your managed infrastructure in the same workspace.

## Creating a Local Terminal

Create a local asset (see [Asset Management](/docs/guide/asset-management)). Local terminals have no host, port, or credentials — only an optional shell configuration:

- **Shell** — the shell executable to launch. OpsKat probes your machine for available shells and offers them as presets:
  - On Unix/macOS, shells from `/etc/shells` (such as `bash` and `zsh`)
  - On Windows, PowerShell, Command Prompt, and any installed WSL distributions

  You can also type a custom path, or leave it empty to use the OS default.
- **Args** — optional startup arguments for the shell (e.g., `--login`)
- **Working Directory** — optional starting directory (default: `~`)

## Using the Terminal

Open the asset to start a terminal session running the configured shell on your local machine. Local terminals share the same terminal features as SSH sessions, including split panes and customizable themes — see [SSH Terminal](/docs/guide/ssh-terminal).

Because local terminals run on your machine, they are independent of any remote asset. The AI Agent's `local_*` tools operate on this same local environment, distinct from remote `run_command` execution.
