---
sidebar_position: 4
sidebar_label: cp
---

# opsctl cp

Transfer files between local paths, remote hosts, and object storage — in any combination, including directly between two assets.

## Syntax

```bash
opsctl [global-flags] cp [-r] <source>... <destination>
```

## Path Format

| Format | Description |
|--------|-------------|
| `/path/to/file` or `./relative/path` | Local path |
| `<asset>:/<remote-path>` | SSH server path (asset name, ID, or `group/name`) |
| `<asset>:/<bucket>/<key>` | Object storage path |

At least one of source or destination must be on an asset. Any combination of the two sides works, including SSH server to object storage.

## Flags

| Flag | Description |
|------|-------------|
| `-r`, `--recursive` | Transfer a directory tree / object prefix |

## Multiple Sources

With `-r`, a glob pattern, or more than one source, the destination must end with `/`. Each entry lands at `<destination>/<path relative to the source base>`.

Quote remote globs so your local shell does not expand them first. Symlinks encountered during expansion are skipped and reported.

## Approval

Every asset endpoint is authorized separately under that asset's own policy, before any byte is transferred. Recursive and glob transfers approve the source and destination directory / object-prefix scopes before listing their contents.

A session is auto-created if not specified.

## Examples

```bash
# Upload a file by asset name
opsctl cp ./config.yml web-server:/etc/app/config.yml

# Download a file by asset ID
opsctl cp 1:/var/log/app.log ./app.log

# Transfer directly between two remote servers
opsctl cp 1:/etc/hosts 2:/tmp/hosts

# Upload using group/name disambiguation
opsctl cp ./deploy.sh production/web-01:/opt/scripts/deploy.sh

# Object storage, in either direction
opsctl cp ./dump.sql.gz s3-prod:/backups/dump.sql.gz
opsctl cp s3-prod:/backups/dump.sql.gz ./dump.sql.gz

# Server straight to object storage — no local disk involved
opsctl cp web-01:/var/log/app.log s3-prod:/logs/app.log

# A directory tree
opsctl cp -r ./dist s3-prod:/releases/v2/

# A remote glob (quoted so the local shell leaves it alone)
opsctl cp 'web-01:/var/log/*.log' s3-prod:/logs/

# Use with an explicit session
opsctl --session $ID cp ./app.tar.gz web-server:/opt/releases/
```
