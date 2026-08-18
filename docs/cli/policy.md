---
sidebar_position: 6
sidebar_label: policy
---

# opsctl policy

Inspect effective authorization and manage permanent policy rules. Read-only commands work without a TTY. Every write command requires a human-operated interactive terminal; automation cannot grant itself access.

## Commands

```bash
opsctl policy show  <asset> | --group <group>
opsctl policy allow <asset>... | --group <group>... [--type <asset-type>] -- <pattern>...
opsctl policy deny  <asset>... | --group <group>... [--type <asset-type>] -- <pattern>...
opsctl policy rm    <asset> | --group <group> <entry-id>

opsctl policy group list [--type <policy-type>]
opsctl policy group show <group-id>
opsctl policy group create --name <name> --type <policy-type>
opsctl policy group copy <group-id> --name <name>
opsctl policy group allow <group-id> -- <pattern>...
opsctl policy group deny <group-id> -- <pattern>...
opsctl policy group rm <group-id> [<entry-id>]

opsctl policy attach <asset> | --group <group> <group-id>...
opsctl policy detach <asset> | --group <group> <group-id>...
```

`show`, `group list`, and `group show` are read-only and do not require a TTY. All write subcommands echo the proposed change and ask for confirmation in an interactive terminal. Without a TTY they stop with exit code 3 and `NEEDS TTY`.

## Inspect Effective Rules

```bash
opsctl policy show web-01
opsctl policy show --group production
```

For an asset, `show` merges its own rules, its group chain, and attached policy groups. It marks allow rules shadowed by a deny and lists still-valid desktop grants. Its stable entry IDs are accepted by `policy rm`; grant IDs use `g<id>`.

## Add or Remove Rules

```bash
opsctl policy allow web-01 -- 'systemctl status *' 'df -h'
opsctl policy deny web-01 -- 'rm -rf *'
opsctl policy rm web-01 2
opsctl policy rm web-01 g12
```

An asset's real type selects its policy shape. `--type` on an asset is only an assertion. An asset group has no type, so `--type` is required when targeting one:

```bash
opsctl policy allow --group production --type ssh -- 'uptime'
```

For file transfers, use the direction-qualified subjects printed by an authorization refusal, such as `cp:read:/var/log/*` and `cp:write:/srv/releases/*`.

## Policy Groups

Policy group IDs are `builtin:<name>`, `ext:<name>`, or the numeric ID of a user group. Built-in and extension groups are read-only; copy one before editing it.

```bash
opsctl policy group list --type command
opsctl policy group show builtin:linux-readonly
opsctl policy group copy builtin:linux-readonly --name production-readonly
opsctl policy group allow 5 -- 'journalctl *'
opsctl policy group rm 5 3
opsctl policy group rm 5
opsctl policy attach web-01 5
opsctl policy detach web-01 5
opsctl policy attach --group production builtin:sql-readonly
```

Supported policy types are `command`, `query`, `redis`, `mongo`, `kafka`, `k8s`, `etcd`, and `oss`. Attachment fails before writing when a policy group's type is incompatible with the target.

## Non-interactive Authorization

When `exec`, `cp`, or `batch` has no matching rule and neither an interactive terminal nor the desktop approval service is available, opsctl exits with code 3. The first stderr line is `NEEDS AUTHORIZATION`, followed by a paste-ready `opsctl policy allow ...` command. A human must run that line in their own terminal, confirm it, and then retry the original operation.

`create`, `update`, and `delete` have no rule subject that can be pre-authorized. Under the same conditions they emit `NEEDS TTY`; run the original command interactively instead of retrying it from automation.
