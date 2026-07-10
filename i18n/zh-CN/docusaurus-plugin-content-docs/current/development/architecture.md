---
sidebar_position: 1
sidebar_label: 架构
---

# 架构概览

OpsKat 是一款采用 Go 后端和 React 前端的 Wails v2 桌面应用。桌面 UI 通过 Wails IPC 通信，正式发布的应用不提供 HTTP API。仓库还会构建独立的 `opsctl` CLI；扩展则以沙箱化 WebAssembly 模块的形式运行在后端进程内。

面向代码的权威子系统地图位于应用仓库的 [`docs/ARCHITECTURE.md`](https://github.com/opskat/opskat/blob/main/docs/ARCHITECTURE.md)。它随代码维护，负责描述详细的进程拓扑、分层规则、数据模型、AI 流程、扩展运行时和前端结构。本页只提供简要的贡献者导览，避免重复一份容易漂移的清单。

## 运行时拓扑

```text
React 前端 ── Wails IPC/事件 ── internal/app 绑定层
                                      │
                                      ▼
                              internal/service
                                      │
                                      ▼
                              internal/repository ── GORM/SQLite

opsctl ── approval.sock / sshpool.sock ── 运行中的桌面应用
扩展 ── wazero WASM 运行时 ── 经过能力校验的宿主函数
```

- 桌面进程负责数据库、凭据服务、连接池、AI 运行器、审批服务和扩展运行时。
- `opsctl` 与应用共享数据和业务辅助模块。桌面应用运行时，它可以通过本地 Unix 域套接字请求审批并复用 SSH 连接池；应用离线时，支持的命令可以回退为直连。
- `cmd/devserver` 是仅用于扩展开发的调试工具，带有本地 HTTP/WebSocket 接口；它不是正式桌面应用的通信方式。

## 后端分层

常规请求路径如下：

```text
internal/app（IPC 边界）→ internal/service（业务逻辑）
                       → internal/repository（数据访问）
                       → internal/model/entity（持久化领域数据）
```

绑定层负责解析和校验边界输入，然后委托给服务层。服务通过已注册的接口 getter 调用仓库，而不依赖具体实现或直接使用 GORM。协议特定行为通过处理器和策略注册表扩展，不在共享代码中按资产类型字符串分支。

`main.go` 是组合根。`internal/bootstrap` 打开 SQLite、解析凭据主密钥、注册仓库并执行追加式迁移。长生命周期的协议连接位于 `internal/sshpool` 和 `internal/connpool`。

## 前端

前端是使用 React、TypeScript、Vite、Tailwind CSS、Zustand 和共享 `@opskat/ui` 组件包构建的 pnpm 工作区。导航由 OpsKat 自己的标签页 store 管理，而非 React Router。后端调用使用 `frontend/wailsjs/` 下生成的绑定；后端到前端的流式数据和通知使用 Wails 事件。

状态按领域组织在 `frontend/src/stores/` 中。资产类型 UI 通过前端资产类型注册表接入；终端、数据控制台、RDP 和对象存储等交互界面各自管理与任务相关的事件生命周期。

## AI、策略与审计

`internal/ai/` 下的 AI 子系统为受支持的资产操作注册工具。操作执行前，对应策略类型可以返回 `Allow`、`Deny` 或 `NeedConfirm`；审批授权可以允许后续匹配的操作。工具执行会连同来源和决策详情写入审计日志。

内置策略类型目前覆盖 shell 命令、SQL、Redis、MongoDB、Kafka、Kubernetes 和 etcd。交互式 RDP 与内置对象存储浏览器目前没有自己的策略类型，也没有专用的 `opsctl` 操作命令。

扩展通过统一的 `exec_tool` 分发器向 AI 暴露工具。扩展清单声明工具、资产类型、能力和可选策略类型；宿主调用会校验声明的能力范围。

## 数据与凭据

- 应用状态通过 GORM 和 SQLite 存储在 `opskat.db` 中。
- 迁移采用追加模式，并从 `migrations/migrations.go` 注册。
- 资产删除使用实体的 `Status` 字段，而不是 GORM `DeletedAt`。
- 凭据加密由 `internal/service/credential_svc` 实现：Argon2id 派生加密密钥，AES-256-GCM 加密密文。主密钥按顺序从显式配置、操作系统 keyring 或受保护的数据目录密钥文件中解析。

## 贡献者参考

- [开发指南](https://github.com/opskat/opskat/blob/main/docs/DEVELOP.md) —— 命令、测试、CI、日志和生成文件
- [架构地图](https://github.com/opskat/opskat/blob/main/docs/ARCHITECTURE.md) —— 权威的子系统详情
- [添加资产类型](https://github.com/opskat/opskat/blob/main/docs/adding-an-asset-type.md) —— 后端与前端注册接缝
- [设计系统](https://github.com/opskat/opskat/blob/main/docs/DESIGN.md) —— UI 原语、设计 token 和界面模式
- [仓库开发约定](https://github.com/opskat/opskat/blob/main/AGENTS.md) —— 工程原则与修复策略
