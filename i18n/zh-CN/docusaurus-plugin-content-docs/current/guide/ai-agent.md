---
sidebar_position: 1
sidebar_label: AI 智能体
---

# AI 智能体

OpsKat 的 AI 智能体允许你通过自然语言对话来管理基础设施。无需在菜单中导航，只需描述你的需求，智能体便会代你执行命令、查询和文件传输。

## 提供商配置

OpsKat 支持多个 AI 提供商。你可以在 **设置 > AI** 中配置和切换提供商，首次使用时也会出现设置向导。

### OpenAI 兼容 API（推荐）

兼容 OpenAI、DeepSeek、Azure OpenAI 以及任何 OpenAI 兼容的端点（例如通过 vLLM、Ollama 等自托管的模型）。

- **API 端点** — 基础 URL（例如 `https://api.openai.com/v1`）
- **API 密钥** — 你的 API 密钥
- **模型** — 模型名称（例如 `gpt-4o`、`deepseek-chat`）。点击**获取模型**自动发现可用模型，或手动输入 — 模型参数（最大输出 Token、上下文窗口）会根据已知预设自动填充。

智能体使用流式 SSE 实现实时响应传输，通过 OpenAI 函数调用进行工具调用。

### Anthropic API

原生支持 Anthropic Messages API，并带有 Prompt 缓存优化。

- **API 密钥** — 你的 Anthropic API 密钥
- **模型** — Claude 模型名称（例如 `claude-sonnet-4-20250514`）

支持对话接近上下文窗口限制时自动压缩上下文。

## 对话工作原理

每次对话是你与 AI 智能体之间的多轮对话。流程如下：

1. 你发送一条消息描述你想要执行的操作。
2. AI 根据你的请求决定调用哪些**工具**。
3. 每次工具调用被执行后，结果会反馈给 AI。
4. AI 处理结果，可能会调用更多工具或直接回复。
5. 这个循环每条消息最多执行 **10 轮**，以防止无限循环。

工具执行结果上限为 32KB。如果输出超过此限制，会被截断并建议使用更精确的过滤器（例如 `| head`、`| grep`）。

SSH 连接在单次对话中会被缓存和复用，以提高效率。

## 可用工具

智能体可以使用以下工具：

### 资产管理

| 工具 | 说明 |
|---|---|
| `list_assets` | 列出所有托管资产。支持按类型和分组过滤。 |
| `get_asset` | 获取特定资产的详细信息（连接配置、描述）。 |
| `add_asset` | 添加新资产（SSH、数据库或 Redis）。 |
| `update_asset` | 更新已有资产的属性。 |
| `list_groups` | 列出所有资产分组。 |
| `get_group` | 获取特定分组的详细信息。 |

### 远程操作

| 工具 | 说明 |
|---|---|
| `run_command` | 通过 SSH 在远程服务器上执行 shell 命令。 |
| `upload_file` | 通过 SFTP 将本地文件上传到远程服务器。 |
| `download_file` | 通过 SFTP 从远程服务器下载文件。 |
| `exec_sql` | 在数据库资产上执行 SQL（MySQL/PostgreSQL）。查询返回 JSON 格式的行数据，语句返回受影响的行数。 |
| `exec_redis` | 在 Redis 资产上执行 Redis 命令。 |

### 权限

| 工具 | 说明 |
|---|---|
| `request_permission` | 在执行前预先请求命令模式的审批。支持 `*` 通配符。一旦获批，匹配的命令在本次会话中将自动通过。 |

## AI 操作的策略执行

AI 智能体的每次工具调用都会经过与手动操作相同的策略管道：

1. **策略检查** — 命令/查询会根据资产的允许/拒绝规则和策略组进行评估。
2. **授权匹配** — 如果已有通过 `request_permission` 审批的授权会话，匹配的模式将自动通过。
3. **用户确认** — 如果策略和授权都未覆盖该操作，将提示你允许或拒绝。

AI 智能体可以主动调用 `request_permission` 提交命令模式进行批量审批，减少逐条确认的次数。

详见[策略执行](/docs/guide/policy)了解规则配置。

## AI 编程工具集成

OpsKat 与 **Claude Code**、**Codex**、**OpenCode** 和 **Gemini CLI** 等 AI 编程 CLI 工具集成。通过设置页面一键安装技能/插件，让这些 AI 助手学会使用 `opsctl`，从而直接管理服务器、执行命令、传输文件和查询数据库。

### 安装技能

1. 打开 **设置**，进入 **AI** 选项卡。
2. 点击目标 AI 工具旁边的 **安装**。

**Claude Code** 会以插件形式安装到 `~/.claude/plugins/`，提供以下技能命令：

| 命令 | 说明 |
|---|---|
| `/opsctl` | 完整的 opsctl CLI 参考 — 资产管理、exec、ssh、cp、sql、redis、grant、session |
| `/opsctl:init` | 服务器环境自动发现 — 通过 SSH 扫描服务器并生成结构化描述 |

其他工具的安装路径：

| 工具 | 安装路径 |
|---|---|
| Codex | `~/.agents/skills/opsctl/` |
| OpenCode | `~/.config/opencode/skills/opsctl/` |
| Gemini CLI | `~/.gemini/extensions/opsctl/` |

桌面端更新时，技能会自动同步更新。

安装后，这些 AI 编程工具便可在工作流中使用 `opsctl` 命令，所有操作都会经过 OpsKat 的策略和审计管道。
