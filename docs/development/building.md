---
sidebar_position: 2
sidebar_label: Building
---

# Building from Source

## Prerequisites

- **Go 1.26** (use the exact version declared by `go.mod`)
- **Node.js 22+** with pnpm
- **Wails v2** CLI (`go install github.com/wailsapp/wails/v2/cmd/wails@latest`)
- **golangci-lint** (for linting)
- **mockgen** from `go.uber.org/mock` (for generating mocks)
- **Git**

## Make Commands

All commands are run from the project root (`opskat/`).

### Desktop App

| Command | Description |
|---|---|
| `make dev` | Wails dev mode with frontend + backend hot reload |
| `make build` | Production build (without embedded opsctl) |
| `make build-embed` | Production build with embedded opsctl binary |
| `make run` | Build with embedded opsctl and run the app |
| `make install` | Install frontend dependencies (`pnpm install`) |
| `make clean` | Clean build artifacts (`build/bin`, `frontend/dist`, embedded binary, coverage files) |

### opsctl CLI

| Command | Description |
|---|---|
| `make build-cli` | Build CLI to `./build/bin/opsctl` |
| `make install-cli` | Install CLI to `$GOPATH/bin` |
| `make install-skill` | Register the local opsctl Claude Code plugin and marketplace for development |

### Quality

| Command | Description |
|---|---|
| `make lint` | Go lint with `golangci-lint` (10 minute timeout, matches CI) |
| `make lint-fix` | Go lint with auto-fix |
| `make test` | Run all Go tests (`./internal/...` and `./cmd/opsctl/...`) |
| `make test-cover` | Run tests with coverage report, opens `coverage.html` in browser |
| `make test-e2e` | Run the Playwright suite against the real Wails app |

## Frontend Development

Frontend source is in `frontend/`. All commands run from that directory.

```bash
cd frontend

pnpm install          # Install dependencies
pnpm dev          # Vite dev server (for standalone frontend development)
pnpm build        # Type check (tsc -b) + Vite build
pnpm lint         # ESLint
pnpm lint:fix     # ESLint with auto-fix
pnpm test         # Vitest test suite
pnpm preview      # Preview production build
```

For full-stack development with hot reload on both frontend and backend, use `make dev` from the project root instead.

### Frontend Tech Stack

- Vite 6 (build tool)
- TypeScript 5 (strict mode via `tsc -b`)
- React 19
- Tailwind CSS 4
- ESLint + Prettier

## Backend Testing

Run all tests (matches what CI runs):

```bash
make test
```

Run a single package:

```bash
go test -v ./internal/ai/...
```

Run with coverage:

```bash
make test-cover
```

### Testing Frameworks

- **GoConvey** -- BDD-style nested test structure
- **testify** -- Assertions
- **go.uber.org/mock** -- Interface mocking with `mockgen`

## Generating Wails TypeScript Bindings

Wails bindings under `frontend/wailsjs/` are generated and gitignored. After changing a bound Go method, regenerate them through the normal Wails development/build workflow:

```bash
make dev
```

Do not hand-edit generated bindings.

## Generating Mocks

After changing repository interfaces, run the repository's generators:

```bash
go generate ./...
```

Follow the same pattern for other repository interfaces.

## CI Pipeline

GitHub Actions runs Go lint/tests, frontend lint/tests, and the real-app GUI e2e suite on pull requests and pushes to `main` and `develop/*` branches. Consult the workflows on the branch for the exact job matrix rather than copying it into documentation.

Use `make test`, `make lint`, the frontend `pnpm` scripts, and `make test-e2e` for the corresponding local checks.

## Build Outputs

| Platform | Desktop App Path |
|---|---|
| macOS | `./build/bin/opskat.app/Contents/MacOS/opskat` |
| Linux | `./build/bin/opskat` |
| Windows | `./build/bin/opskat.exe` |

The opsctl CLI always builds to `./build/bin/opsctl`.

## Version Configuration

The build version defaults to `1.0.0` and can be overridden:

```bash
make build VERSION=2.0.0
```

Version is injected via ldflags into `github.com/cago-frame/cago/configs.Version`.
