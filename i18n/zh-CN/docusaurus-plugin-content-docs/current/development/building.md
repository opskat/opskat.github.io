---
sidebar_position: 2
sidebar_label: 从源码构建
---

# 从源码构建

## 前提条件

- **Go 1.25+**（具体版本见 `go.mod`）
- **Node.js 22+** 及 **pnpm 10+**
- **Wails v2** CLI（`go install github.com/wailsapp/wails/v2/cmd/wails@latest`）
- **golangci-lint**（用于代码检查）
- **mockgen**，来自 `go.uber.org/mock`（用于生成 mock）
- **UPX**（可选，用于压缩构建产物）
- **Git**

## Make 命令

所有命令在项目根目录（`opskat/`）下执行。

### 桌面应用

| 命令 | 说明 |
|---|---|
| `make dev` | Wails 开发模式，前端 + 后端热重载 |
| `make build` | 生产构建（不包含内嵌的 opsctl） |
| `make build-embed` | 生产构建，内嵌 opsctl 二进制文件 |
| `make build-upx` | 生产构建，使用 UPX 压缩（需要安装 `upx`） |
| `make run` | 构建内嵌 opsctl 并运行应用 |
| `make install` | 安装前端依赖（`pnpm install`） |
| `make clean` | 清理构建产物（`build/bin`、`frontend/dist`、内嵌二进制文件、覆盖率文件） |

### opsctl CLI

| 命令 | 说明 |
|---|---|
| `make build-cli` | 构建 CLI 到 `./build/bin/opsctl` |
| `make build-cli-upx` | 使用 UPX 压缩构建 CLI |
| `make install-cli` | 安装 CLI 到 `$GOPATH/bin` |
| `make install-skill` | 安装 Claude Code 技能（创建符号链接到 `~/.claude/skills/opsctl`） |

### 质量保障

| 命令 | 说明 |
|---|---|
| `make lint` | 使用 `golangci-lint` 进行 Go 代码检查（10 分钟超时，与 CI 一致） |
| `make lint-fix` | Go 代码检查并自动修复 |
| `make test` | 运行所有 Go 测试（`./internal/...` 和 `./cmd/opsctl/...`） |
| `make test-cover` | 运行测试并生成覆盖率报告，在浏览器中打开 `coverage.html` |

## 前端开发

前端源码位于 `frontend/`。以下命令在该目录下执行。

```bash
cd frontend

pnpm install          # 安装依赖
pnpm run dev          # Vite 开发服务器（用于独立的前端开发）
pnpm run build        # 类型检查 (tsc -b) + Vite 构建
pnpm run lint         # ESLint 检查
pnpm run lint:fix     # ESLint 检查并自动修复
pnpm run preview      # 预览生产构建
```

如需前后端同时热重载的全栈开发，请在项目根目录使用 `make dev`。

### 前端技术栈

- Vite 6（构建工具）
- TypeScript 5（通过 `tsc -b` 启用严格模式）
- React 19
- Tailwind CSS 4
- ESLint 10 + Prettier

## 后端测试

运行所有测试（与 CI 执行的一致）：

```bash
go test ./internal/... ./cmd/opsctl/...
```

运行单个包的测试：

```bash
go test -v ./internal/ai/...
```

生成覆盖率报告：

```bash
make test-cover
```

### 测试框架

- **GoConvey** -- BDD 风格的嵌套测试结构
- **testify** -- 断言库
- **go.uber.org/mock** -- 基于接口的 mock 生成，使用 `mockgen`

## 生成 Wails TypeScript 绑定

修改 `app.go` 中 `App` 结构体的公开方法后，需要重新生成前端调用的 TypeScript 绑定：

```bash
wails generate module
```

这会更新 `frontend/src/wailsjs/go/main/App` 下的生成文件。

## 生成 Mock

修改仓库层接口后，使用 `mockgen` 重新生成 mock：

```bash
mockgen -source=internal/repository/asset_repo/asset.go \
  -destination=internal/repository/asset_repo/mock_asset_repo/asset.go \
  -package=mock_asset_repo
```

其他仓库层接口遵循相同模式。

## CI 流水线

GitHub Actions（`.github/workflows/ci.yml`）在所有 Pull Request 以及推送到 `main` 和 `develop/*` 分支时运行。

### 任务

**1. Go 代码检查**

运行 `golangci-lint`，包含 gofmt/goimports 格式化器。创建占位的 `frontend/dist` 目录，因为 Wails 构建需要它。

```yaml
- uses: golangci/golangci-lint-action@v9
  with:
    version: latest
```

**2. Go 测试**

```bash
go test ./internal/... ./cmd/opsctl/...
```

**3. 前端检查**

运行代码检查 + 类型检查 + 构建，使用锁定的依赖文件：

```bash
cd frontend && pnpm install --frozen-lockfile
cd frontend && pnpm run lint
cd frontend && pnpm run build
```

### 并发控制

CI 使用并发组（`ci-${{ github.ref }}`），启用 `cancel-in-progress: true`，因此向同一分支推送新提交会取消前一次运行。

## 构建产物

| 平台 | 桌面应用路径 |
|---|---|
| macOS | `./build/bin/opskat.app/Contents/MacOS/opskat` |
| Linux | `./build/bin/opskat` |
| Windows | `./build/bin/opskat.exe` |

opsctl CLI 始终构建到 `./build/bin/opsctl`。

## 版本配置

构建版本默认为 `1.0.0`，可以覆盖：

```bash
make build VERSION=2.0.0
```

版本通过 ldflags 注入到 `github.com/cago-frame/cago/configs.Version`。
