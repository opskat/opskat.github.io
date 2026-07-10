---
sidebar_position: 3
sidebar_label: Contributing
---

# Contributing

Contributions are welcome through issues and pull requests. Before changing code, read the repository's current contributor sources:

- [`CONTRIBUTING.md`](https://github.com/opskat/opskat/blob/main/CONTRIBUTING.md) — setup, branch, pull-request, and CI workflow
- [`AGENTS.md`](https://github.com/opskat/opskat/blob/main/AGENTS.md) — engineering principles, TDD fix policy, defensive error handling, and reuse rules
- [`docs/DEVELOP.md`](https://github.com/opskat/opskat/blob/main/docs/DEVELOP.md) — commands, commit convention, tests, logging, and generated files
- [`docs/ARCHITECTURE.md`](https://github.com/opskat/opskat/blob/main/docs/ARCHITECTURE.md) — canonical subsystem and dependency map

Those files live beside the implementation and are the source of truth. In particular, commit subjects use an emoji glyph followed by a short description; they are not required to be written in one specific language.

## Development Workflow

1. Fork and clone the repository.
2. Create a focused branch from the intended base branch.
3. Reproduce fixes with a failing Go or Vitest test before changing implementation.
4. Keep changes inside the owning subsystem and reuse existing registries, services, stores, hooks, and UI primitives.
5. Run the relevant package tests first, then the broader checks described in the development guide.
6. Open a pull request that explains the problem, the root-cause change, and the verification performed.

Do not edit generated Wails bindings, mocks, embedded binaries, or lockfiles manually. Use their documented generator or package-manager command.

## Architecture Rules in Brief

- Wails bindings in `internal/app/` are IPC boundaries; business logic belongs in `internal/service/`, and persistence belongs in `internal/repository/`.
- Services depend on repository interfaces through registered getters, not concrete implementations or GORM.
- New built-in asset types implement and register an `assettype.AssetTypeHandler`; the frontend registers the matching asset definition. Follow the [asset-type guide](https://github.com/opskat/opskat/blob/main/docs/adding-an-asset-type.md) rather than copying an older type.
- AI tools and policies use their registries. Do not add shared `switch assetType` or protocol-string branches.
- User-facing frontend text uses i18next. Backend errors use the established localized error-code path.

## Testing and Verification

Common checks from the repository root include:

```bash
make test
make lint
cd frontend && pnpm test
cd frontend && pnpm lint
make test-e2e
```

Choose verification in proportion to the change. GUI behavior should be observed through the real Wails e2e harness, structured logs, database/audit side effects, or an applicable headless `opsctl` flow—not inferred from compilation alone.

See [Building from Source](./building.md) for toolchain and build commands.
