---
sidebar_position: 7
sidebar_label: mongo
---

# opsctl mongo

针对 MongoDB 资产执行 MongoDB 操作。

## 语法

```bash
opsctl [global-flags] mongo <asset> -d <database> -c <collection> [-o <operation>] '<json>'
```

`-d` 和 `-c` 为必填参数。操作默认为 `find`，还可使用 `insertOne`、`updateOne`、`deleteOne` 和 `aggregate` 等。省略 JSON 参数时默认为 `{}`。

操作会经过资产的 MongoDB 策略与审批/授权流程。共享连接路径会遵循资产配置的 SSH 隧道或代理。

## 示例

```bash
opsctl mongo prod-mongo -d app -c users '{"status":"active"}'
opsctl mongo prod-mongo -d app -c users -o insertOne '{"name":"Ada"}'
opsctl mongo prod-mongo -d app -c users -o aggregate '[{"$group":{"_id":"$status","count":{"$sum":1}}}]'
```

名称存在歧义时，请使用 `分组/名称` 或数字资产 ID。
