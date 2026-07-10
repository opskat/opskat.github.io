---
sidebar_position: 9
sidebar_label: ext
---

# opsctl ext

List installed WebAssembly extensions or execute one of their declared tools.

## List Extensions

```bash
opsctl ext list
```

The command scans the configured extensions directory and prints JSON containing extension metadata and tool names.

## Execute a Tool

```bash
opsctl ext exec <extension> <tool> --args '<json>'
```

When the desktop app is running, `opsctl` delegates the call through `approval.sock` to the app's installed extension runtime. This delegated `ext_tool` path executes directly in that runtime; it does not display the normal approval dialog. If the app cannot be reached, `opsctl` can load and run the installed WASM extension locally. Manifest capability checks still apply in both paths.

```bash
opsctl ext exec example list_items --args '{"asset_id":1}'
```

Tool names and argument schemas are extension-defined. Use `opsctl ext list` and the extension's own documentation rather than assuming every extension exposes the same operations.
