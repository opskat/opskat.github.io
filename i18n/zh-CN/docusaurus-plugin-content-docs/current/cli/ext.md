---
sidebar_position: 9
sidebar_label: ext
---

# opsctl ext

列出已安装的 WebAssembly 扩展，或执行扩展声明的工具。

## 列出扩展

```bash
opsctl ext list
```

该命令扫描配置的扩展目录，并输出包含扩展元数据和工具名称的 JSON。

## 执行工具

```bash
opsctl ext exec <extension> <tool> --args '<json>'
```

桌面应用运行时，`opsctl` 通过 `approval.sock` 把调用委托给应用中已安装的扩展运行时。这条 `ext_tool` 委托路径会在扩展运行时中直接执行，不会显示常规审批对话框。无法连接应用时，`opsctl` 可以在本地加载并运行已安装的 WASM 扩展；两条路径都会执行清单能力校验。

```bash
opsctl ext exec example list_items --args '{"asset_id":1}'
```

工具名称和参数 Schema 由扩展定义。请使用 `opsctl ext list` 并查阅扩展自己的文档，不要假设所有扩展都提供相同操作。
