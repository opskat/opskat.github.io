---
sidebar_label: 更新日志
sidebar_position: 100
---

# 更新日志

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
