---
sidebar_position: 3
sidebar_label: 贡献指南
---

# 贡献指南

## 代码规范

### 提交信息

- 提交信息使用**中文**编写。
- 禁止在提交信息中添加 `Co-Authored-By: Claude`。

### 错误处理

- 禁止静默忽略错误（不允许使用 `_ =` 忽略错误）。
- 使用 cago zap 日志记录器，而非标准库的 `log` 包：

```go
import (
    "github.com/cago-frame/cago/pkg/logger"
    "go.uber.org/zap"
)

logger.Default().Warn("something happened", zap.Error(err))
logger.Default().Error("operation failed", zap.Error(err))
```

### 错误码

支持国际化的错误码定义在 `internal/pkg/code/` 中，同时支持 zh-CN 和 en。

### 软删除

资产使用 `Status = StatusDeleted` 而非硬删除。禁止硬删除资产记录。

### 输入法兼容性

`Input` 组件内置了输入法保护机制 -- 在中文输入法组合输入过程中自动阻止 Enter 键的 `onKeyDown` 事件。对于非 Input 组件（如 `<textarea>`），请使用 `@/hooks/useIMEComposing` 中的 `useIMEComposing` hook。

## 测试模式

### 框架

- **GoConvey** -- BDD 风格的嵌套测试结构
- **testify** -- 断言库
- **go.uber.org/mock** -- Mock 生成与注入

### 方法论

遵循 **TDD**（测试驱动开发）：先写测试，再实现功能。

- **实体测试**：纯单元测试，无外部依赖。
- **服务层测试**：使用 mock 仓库层。

### Mock 注入

仓库层使用 `Register` 模式进行依赖注入。在测试中注册 mock，并通过 `t.Cleanup` 恢复：

```go
func setupTest(t *testing.T) (context.Context, *mock_asset_repo.MockAssetRepo) {
    mockCtrl := gomock.NewController(t)
    t.Cleanup(func() { mockCtrl.Finish() })
    mockRepo := mock_asset_repo.NewMockAssetRepo(mockCtrl)
    asset_repo.RegisterAsset(mockRepo)
    return context.Background(), mockRepo
}
```

### 运行测试

```bash
# 运行所有测试（与 CI 一致）
go test ./internal/... ./cmd/opsctl/...

# 运行单个包的测试，启用详细输出
go test -v ./internal/ai/...

# 生成覆盖率报告
make test-cover
```

## 国际化规范

### 前端 (i18next)

所有面向用户的文本通过 `react-i18next` 使用 i18next 键。翻译文件位于 `frontend/src/i18n/`，支持 zh-CN 和 en。

### 后端 (cago i18n)

`internal/pkg/code/` 中的错误码使用 cago 的国际化系统。后端方法通过 `a.langCtx()` 根据前端的语言设置设定语言上下文，确保错误信息以正确的语言返回。

## 项目结构

```
opskat/
├── main.go                     # Wails 应用入口
├── app.go                      # Wails App 结构体（绑定层）
├── cmd/opsctl/                 # opsctl CLI 入口
├── internal/
│   ├── ai/                     # AI 代理（Provider、工具、策略、审计）
│   ├── app/                    # 应用级辅助函数
│   ├── approval/               # opsctl 的 Unix socket 审批协议
│   ├── bootstrap/              # 共享初始化（数据库、仓库层、凭证、迁移）
│   ├── connpool/               # 数据库/Redis 连接池，支持 SSH 隧道
│   ├── embedded/               # 内嵌的 opsctl 二进制文件（桌面应用用）
│   ├── model/entity/           # 包含业务逻辑的富领域实体
│   ├── pkg/code/               # 支持国际化的错误码
│   ├── repository/             # 数据访问接口及实现
│   ├── service/                # 业务逻辑服务层
│   ├── sshpool/                # SSH 连接池 + Unix socket 服务器
│   └── wailsapp/               # Wails 应用配置
├── migrations/                 # gormigrate 数据库迁移
├── frontend/
│   └── src/
│       ├── components/         # React 组件
│       ├── stores/             # Zustand 状态 Store
│       ├── hooks/              # 自定义 React Hook
│       ├── i18n/               # i18next 翻译文件
│       ├── lib/                # 工具函数
│       └── wailsjs/            # 生成的 Wails TypeScript 绑定
└── skill/                      # Claude Code 技能定义
```

## 如何添加新的资产类型

1. **定义实体**：在 `internal/model/entity/` 中添加新的配置结构体和类型常量。在资产实体上添加 `Get<Type>Config()` / `Set<Type>Config()` 方法。

2. **添加仓库层支持**：确保资产仓库层能够持久化和查询新类型。

3. **添加服务层逻辑**：在 `internal/service/` 中创建或扩展服务，处理类型特定的操作（连接测试、命令执行等）。

4. **添加连接池**（如需要）：在 `internal/connpool/` 中添加新的连接工厂，支持可选的 SSH 隧道。

5. **添加 AI 工具支持**：在 `internal/ai/tool_registry.go` 中注册新的工具处理器。如果该资产类型支持命令执行，还需添加相应的策略类型。

6. **添加策略支持**：在 `internal/ai/` 中创建新的策略文件（如 `<type>_policy.go`），实现允许/拒绝列表评估逻辑。在 `internal/service/policy_group_svc/` 中添加内置策略组。

7. **前端**：为新资产类型的配置、连接面板和查询界面添加 UI 组件。如需要，添加对应的 Zustand Store 状态。

8. **迁移**：如需 Schema 变更，在 `migrations/migrations.go` 中添加 gormigrate 迁移。

## 如何添加新的 AI 工具

1. **定义工具**：通过 `AllToolDefs()` 在 `internal/ai/tool_registry.go` 中添加 `ToolDef` 条目。每个工具包含名称、描述、输入 Schema 和处理函数。

2. **实现处理函数**：处理函数接收解析后的输入，返回结果字符串。可使用现有的辅助函数：
   - `ssh_helper.go` 用于 SSH 操作（`ExecWithStdio`、`CopyBetweenAssets`）
   - `database_helper.go` 用于通过连接池执行 SQL
   - `redis_helper.go` 用于通过连接池执行 Redis 命令

3. **添加策略检查**（如果工具执行命令）：调用 `permission.go` 中的 `CheckPermission()`，它会根据资产类型路由到相应的策略检查器。处理三种可能的判定结果：`Allow`、`Deny`、`NeedConfirm`。

4. **审计日志**：如果使用 `AuditingExecutor`（默认包装器），审计日志会自动记录。对于自定义流程，直接调用 `WriteAuditLog()`。

5. **连接缓存**：使用 `SSHClientCache` 或 `ConnCache[C]` 在对话中复用连接，而非每次工具调用都创建新连接。

6. **与 opsctl 共享**：在 `AllToolDefs()` 中定义的工具会自动同时对 AI 代理和 opsctl 可用。
