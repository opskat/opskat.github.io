---
sidebar_position: 3
sidebar_label: 贡献指南
---

# 参与贡献

欢迎通过 Issue 和 Pull Request 参与贡献。修改代码前，请先阅读仓库中当前有效的贡献者资料：

- [`CONTRIBUTING.md`](https://github.com/opskat/opskat/blob/main/CONTRIBUTING.md) —— 环境准备、分支、Pull Request 与 CI 流程
- [`AGENTS.md`](https://github.com/opskat/opskat/blob/main/AGENTS.md) —— 工程原则、TDD 修复策略、防御性错误处理与复用规则
- [`docs/DEVELOP.md`](https://github.com/opskat/opskat/blob/main/docs/DEVELOP.md) —— 命令、提交约定、测试、日志与生成文件
- [`docs/ARCHITECTURE.md`](https://github.com/opskat/opskat/blob/main/docs/ARCHITECTURE.md) —— 权威的子系统与依赖关系地图

这些文件与实现一起维护，是事实来源。特别要注意：提交标题以 emoji 字形开头，后接简短说明，但不要求使用某一种特定语言。

## 开发流程

1. Fork 并克隆仓库。
2. 从目标基础分支创建范围明确的分支。
3. 修复缺陷时，先用失败的 Go 或 Vitest 测试复现，再修改实现。
4. 将改动限制在职责所属的子系统内，优先复用已有注册表、服务、store、hook 和 UI 原语。
5. 先运行相关包测试，再执行开发指南中更广泛的检查。
6. 提交 Pull Request，说明问题、根因修复以及完成的验证。

不要手工编辑生成的 Wails 绑定、mock、内嵌二进制文件或 lockfile；使用文档中规定的生成器或包管理器命令。

## 架构规则摘要

- `internal/app/` 中的 Wails 绑定是 IPC 边界；业务逻辑属于 `internal/service/`，持久化属于 `internal/repository/`。
- 服务通过已注册的 getter 依赖仓库接口，而不是具体实现或 GORM。
- 新内置资产类型需要实现并注册 `assettype.AssetTypeHandler`，前端再注册对应资产定义。请遵循[添加资产类型指南](https://github.com/opskat/opskat/blob/main/docs/adding-an-asset-type.md)，不要复制旧资产类型。
- AI 工具与策略通过各自注册表扩展。不要在共享代码中增加 `switch assetType` 或协议字符串分支。
- 面向用户的前端文本使用 i18next；后端错误使用既有的本地化错误码路径。

## 测试与验证

仓库根目录下常用的检查包括：

```bash
make test
make lint
cd frontend && pnpm test
cd frontend && pnpm lint
make test-e2e
```

根据改动风险选择相称的验证方式。GUI 行为应通过真实 Wails e2e 工具、结构化日志、数据库/审计副作用或适用的无界面 `opsctl` 流程观察，不能只凭编译成功推断。

工具链和构建命令参见[从源码构建](./building.md)。
