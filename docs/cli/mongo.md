---
sidebar_position: 7
sidebar_label: mongo
---

# opsctl mongo

Execute a MongoDB operation against a MongoDB asset.

## Syntax

```bash
opsctl [global-flags] mongo <asset> -d <database> -c <collection> [-o <operation>] '<json>'
```

`-d` and `-c` are required. The operation defaults to `find`; examples include `find`, `insertOne`, `updateOne`, `deleteOne`, and `aggregate`. If the JSON argument is omitted, it defaults to `{}`.

The operation is evaluated against the asset's MongoDB policy and approval/grant flow. The asset's configured SSH tunnel or proxy is honored by the shared connection path.

## Examples

```bash
opsctl mongo prod-mongo -d app -c users '{"status":"active"}'
opsctl mongo prod-mongo -d app -c users -o insertOne '{"name":"Ada"}'
opsctl mongo prod-mongo -d app -c users -o aggregate '[{"$group":{"_id":"$status","count":{"$sum":1}}}]'
```

Use `group/name` or a numeric asset ID when a name is ambiguous.
