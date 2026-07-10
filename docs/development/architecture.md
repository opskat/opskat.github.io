---
sidebar_position: 1
sidebar_label: Architecture
---

# Architecture Overview

OpsKat is a Wails v2 desktop application with a Go backend and React frontend. The desktop UI uses Wails IPC—there is no HTTP API for the shipped app. The repository also builds the standalone `opsctl` CLI, while extensions run as sandboxed WebAssembly modules inside the backend.

For the canonical, code-oriented subsystem map, read [`docs/ARCHITECTURE.md`](https://github.com/opskat/opskat/blob/main/docs/ARCHITECTURE.md) in the application repository. It is maintained together with the code and owns the detailed process topology, layering rules, data model, AI flow, extension runtime, and frontend structure. This page gives contributors a shorter orientation without duplicating that changing inventory.

## Runtime Topology

```text
React frontend ── Wails IPC/events ── internal/app bindings
                                      │
                                      ▼
                              internal/service
                                      │
                                      ▼
                              internal/repository ── GORM/SQLite

opsctl ── approval.sock / sshpool.sock ── running desktop app
extensions ── wazero WASM runtime ── capability-checked host functions
```

- The desktop process owns the database, credential services, connection pools, AI runner, approval server, and extension runtime.
- `opsctl` shares the application data and business helpers. When the app is running, it can request approval and reuse pooled SSH connections through local Unix-domain sockets; supported commands can fall back to direct connections when it is offline.
- `cmd/devserver` is a development-only extension harness with a local HTTP/WebSocket interface. It is not the shipped desktop application's transport.

## Backend Layers

The normal request path is:

```text
internal/app (IPC boundary) → internal/service (business logic)
                            → internal/repository (data access)
                            → internal/model/entity (persisted domain data)
```

Bindings parse and validate boundary input, then delegate. Services call repository interfaces through their registered getters rather than concrete implementations or GORM. Protocol-specific behavior is registered through handlers and policy registries instead of type-string switches.

`main.go` is the composition root. `internal/bootstrap` opens SQLite, resolves the credential master key, registers repositories, and runs append-only migrations. Long-lived protocol connections live in `internal/sshpool` and `internal/connpool`.

## Frontend

The frontend is a pnpm workspace built with React, TypeScript, Vite, Tailwind CSS, Zustand, and the shared `@opskat/ui` component package. Navigation uses OpsKat's tab store rather than React Router. Backend calls use generated bindings under `frontend/wailsjs/`; backend-to-frontend streams and notifications use Wails events.

State is organized by domain in `frontend/src/stores/`. Asset-type UI is registered through the frontend asset-type registry; detailed interactive surfaces such as terminals, data consoles, RDP, and object storage own their task-specific event lifecycle.

## AI, Policy, and Audit

The AI subsystem under `internal/ai/` registers tools for supported asset operations. Before an operation runs, its policy kind can produce `Allow`, `Deny`, or `NeedConfirm`; approval grants can authorize later matching operations. Tool execution is audited with its source and decision details.

Built-in policy kinds currently cover shell commands, SQL, Redis, MongoDB, Kafka, Kubernetes, and etcd. Interactive RDP and built-in object-storage browsing do not currently add their own policy kinds or dedicated `opsctl` operation commands.

Extensions expose AI tools through one `exec_tool` dispatcher. Their manifests declare tools, asset types, capabilities, and optional policy types; host calls enforce the declared capability surface.

## Data and Credentials

- Application state is stored in `opskat.db` through GORM and SQLite.
- Migrations are append-only and registered from `migrations/migrations.go`.
- Asset deletion uses the entity `Status` field rather than GORM `DeletedAt`.
- Credential encryption is implemented by `internal/service/credential_svc`: Argon2id derives the encryption key and AES-256-GCM encrypts secrets. The master key is resolved from an explicit value, the OS keychain, or the protected data-directory key file.

## Contributor References

- [Development guide](https://github.com/opskat/opskat/blob/main/docs/DEVELOP.md) — commands, tests, CI, logging, and generated files
- [Architecture map](https://github.com/opskat/opskat/blob/main/docs/ARCHITECTURE.md) — canonical subsystem details
- [Adding an asset type](https://github.com/opskat/opskat/blob/main/docs/adding-an-asset-type.md) — backend and frontend registration seams
- [Design system](https://github.com/opskat/opskat/blob/main/docs/DESIGN.md) — UI primitives, tokens, and surface patterns
- [Repository guidance](https://github.com/opskat/opskat/blob/main/AGENTS.md) — engineering principles and fix policy
