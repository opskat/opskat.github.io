---
sidebar_label: 更新日志
sidebar_position: 100
---

# 更新日志

## v1.1.0

### 新增功能

- **多 Provider AI 配置** — 基于数据库的 Provider 管理，支持完整 CRUD API。新增原生 Anthropic Messages API 支持，与 OpenAI 兼容 Provider 并存。
- **AI Agent 增强** — 动态系统提示词、Sub Agent 支持、并行工具执行、批量命令处理。
- **统一审批系统** — 合并 AI 与 opsctl 审批弹窗为统一工作流。支持批量确认、Grant 机制（可编辑命令模式）和记住模式。
- **AI 模型智能化** — 模型参数预设，选择模型时自动填充参数；上下文窗口自动压缩；Anthropic Prompt 缓存优化。
- **多资产权限申请** — `request_permission` 工具支持多资产 `items` 参数，与 `opsctl grant` 保持一致。
- **opsctl 改进** — Redis `-n` 参数切换数据库；`create/update asset` 支持 `--icon` 参数。

### UI/UX 改进

- **AI 设置向导重构** — 新增 opsctl 插件引导横幅，优化 Provider 选择卡片，提取共享 `AIProviderForm` 组件。
- **AI 对话 UI 重构** — Chat Header、角色标签、实色助手气泡、独立审批块渲染。
- **Terminal Aesthetic 主题** — 全新应用视觉风格。
- **AI 设置增强** — 从 API 获取模型列表、模型搜索选择器、Token 参数配置。
- **审批块优化** — single/batch/grant 三种类型差异化渲染；仅 pending 状态的审批打断消息流。
- **ToolBlock 与 AgentBlock 微调** — 优化间距、行高、运行状态指示器、错误状态图标。
- **GFM Markdown 支持** — AI 对话支持渲染 GitHub Flavored Markdown（表格、删除线、任务列表）。
- **数据库与 Redis UX** — 优化查询模块前端用户体验。

### Bug 修复

- 修复 Windows 下启动子进程黑窗一闪而过的问题
- 修复新建 SSH 资产默认端口为 6379 而非 22 的问题
- 修复 `SSHPool.Close()` 重复调用导致 panic
- 修复 opsctl `exec_sql`/`exec_redis`/`cp` 审计日志未记录决策和决策来源

### 后端改进

- **用户拒绝处理** — 用户拒绝命令时返回强制停止指令；系统提示词增加拒绝引导，防止 AI 尝试绕过。
- **并发安全** — 审批回调通过 context 传递会话 ID，替代实例变量。
- AI 模块错误信息统一为英文，提升 LLM 理解效果。

### 其他

- 添加 MIT 许可证
- 更新 README 链接至 opskat.github.io
- 新增审批按钮和批量操作的 i18n 翻译

**完整更新记录**: [v1.0.2...v1.1.0](https://github.com/opskat/opskat/compare/v1.0.2...v1.1.0)

## v1.0.2

### 新增功能

- **opsctl batch 命令** — 支持批量执行 SSH 命令、文件传输和数据库/Redis 操作
- **批量审批对话框** — 桌面应用中一次审批多个操作
- **插件系统重构** — `skill/` 目录迁移至 `plugin/`，支持多平台插件注册（Claude Code、Codex、Gemini CLI）
- **构建信息模块** — 将 commit ID 嵌入二进制文件，便于版本追溯

### 测试与质量

- 新增 16 个前端测试文件，覆盖 stores、hooks、组件和工具函数
- 新增 opsctl batch 命令测试和 GitHub 备份服务测试
- 改进 golangci-lint 错误处理：`os.Remove`/`os.RemoveAll` 改用 logger 记录错误，去除 `//nolint`

### CI/CD

- Release/Nightly 构建优化
- CI 集成前端 Vitest 测试

### 其他改进

- 前端组件无障碍属性完善
- 新增批量操作相关 i18n 翻译
- GitHub 备份服务重构
- 自动更新服务修复

**完整更新记录**: [v1.0.1...v1.0.2](https://github.com/opskat/opskat/compare/v1.0.1...v1.0.2)

## v1.0.0

OpsKat 是一款服务器资产管理与远程运维桌面应用，集成 AI 智能助手，支持 SSH 终端、数据库查询、Redis 操作和文件传输。

### 主要功能

- **资产管理** — 服务器、数据库、Redis 资产的分组与管理，支持凭证加密存储
- **SSH 终端** — 多标签页终端，支持分屏、跳板机链式连接、端口转发和 SOCKS 代理
- **数据库查询** — MySQL / PostgreSQL 查询编辑器，支持 SSH 隧道连接
- **Redis 操作** — Redis 命令执行，支持 SSH 隧道连接
- **SFTP 文件管理** — 远程文件浏览与传输
- **AI 智能助手** — 支持 OpenAI 兼容 API、Claude CLI、Codex CLI 多种后端，可通过自然语言执行运维操作
- **安全策略** — SSH 命令、SQL 语句、Redis 命令三类策略，支持策略组继承和预审批授权
- **审计日志** — 所有操作自动记录，可追溯查询
- **opsctl CLI** — 独立命令行工具，支持资产管理、远程执行、文件传输等操作

**完整更新记录**: [v1.0.0](https://github.com/opskat/opskat/commits/v1.0.0)
