---
sidebar_position: 2
sidebar_label: 构建
---

# 从源码构建

## 前置条件

- **Go 1.26**（使用 `go.mod` 声明的准确版本）
- **Node.js 22+** 与 pnpm
- **Wails v2** CLI（`go install github.com/wailsapp/wails/v2/cmd/wails@latest`）
- **golangci-lint**（用于 lint）
- 来自 `go.uber.org/mock` 的 **mockgen**（用于生成 mock）
- **Git**

## Make 命令

以下命令均在项目根目录（`opskat/`）运行。

### 桌面应用

| 命令 | 说明 |
|---|---|
| `make dev` | Wails 开发模式，前后端热重载 |
| `make build` | 生产构建，不内嵌 opsctl |
| `make build-embed` | 生产构建，内嵌 opsctl 二进制文件 |
| `make run` | 构建带内嵌 opsctl 的应用并运行 |
| `make install` | 安装前端依赖（`pnpm install`） |
| `make clean` | 清理构建产物（`build/bin`、`frontend/dist`、内嵌二进制文件和覆盖率文件） |

### opsctl CLI

| 命令 | 说明 |
|---|---|
| `make build-cli` | 将 CLI 构建到 `./build/bin/opsctl` |
| `make install-cli` | 将 CLI 安装到 `$GOPATH/bin` |
| `make install-skill` | 为开发注册本地 opsctl Claude Code 插件和 marketplace |

### 质量检查

| 命令 | 说明 |
|---|---|
| `make lint` | 使用 `golangci-lint` 检查 Go 代码（10 分钟超时，与 CI 一致） |
| `make lint-fix` | 运行 Go lint 并自动修复 |
| `make test` | 运行全部 Go 测试（`./internal/...` 与 `./cmd/opsctl/...`） |
| `make test-cover` | 运行覆盖率测试并在浏览器中打开 `coverage.html` |
| `make test-e2e` | 针对真实 Wails 应用运行 Playwright 测试套件 |

## 前端开发

前端源码位于 `frontend/`，以下命令从该目录运行：

```bash
cd frontend

pnpm install      # 安装依赖
pnpm dev          # Vite 开发服务器（独立前端开发）
pnpm build        # 类型检查（tsc -b）+ Vite 构建
pnpm lint         # ESLint
pnpm lint:fix     # ESLint 自动修复
pnpm test         # Vitest 测试套件
pnpm preview      # 预览生产构建
```

如需前后端同时热重载，请在项目根目录运行 `make dev`。

### 前端技术栈

- Vite 6（构建工具）
- TypeScript 5（通过 `tsc -b` 启用严格模式）
- React 19
- Tailwind CSS 4
- ESLint + Prettier

## 后端测试

运行与 CI 一致的全部测试：

```bash
make test
```

运行单个包：

```bash
go test -v ./internal/ai/...
```

运行覆盖率测试：

```bash
make test-cover
```

### 测试框架

- **GoConvey** —— BDD 风格的嵌套测试结构
- **testify** —— 断言
- **go.uber.org/mock** —— 通过 `mockgen` 生成接口 mock

## 生成 Wails TypeScript 绑定

`frontend/wailsjs/` 下的 Wails 绑定由工具生成且被 Git 忽略。修改绑定的 Go 方法后，通过正常的 Wails 开发/构建流程重新生成：

```bash
make dev
```

不要手工编辑生成的绑定。

## 生成 Mock

修改仓库接口后，运行仓库中的生成器：

```bash
go generate ./...
```

其他仓库接口也遵循相同方式。

## CI 流水线

GitHub Actions 会在 Pull Request 以及推送到 `main` 和 `develop/*` 分支时运行 Go lint/测试、前端 lint/测试和真实应用 GUI e2e 测试。准确的任务矩阵应查看当前分支的 workflow，不要复制到文档中形成另一份易漂移清单。

本地可用 `make test`、`make lint`、前端 `pnpm` 脚本和 `make test-e2e` 运行对应检查。

## 构建输出

| 平台 | 桌面应用路径 |
|---|---|
| macOS | `./build/bin/opskat.app/Contents/MacOS/opskat` |
| Linux | `./build/bin/opskat` |
| Windows | `./build/bin/opskat.exe` |

opsctl CLI 始终构建到 `./build/bin/opsctl`。

## 版本配置

构建版本默认为 `1.0.0`，可覆盖：

```bash
make build VERSION=2.0.0
```

版本通过 ldflags 注入 `github.com/cago-frame/cago/configs.Version`。
