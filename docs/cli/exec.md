---
sidebar_position: 2
sidebar_label: exec
---

# opsctl exec

Execute a shell command on a remote server via SSH.

## Syntax

```bash
opsctl [global-flags] exec <asset> [--] <command>
```

## Arguments

| Argument | Description |
|----------|-------------|
| `asset` | Asset name or numeric ID. Use `group/name` to disambiguate. |
| `command` | Shell command to execute on the remote server. Use `--` to separate from opsctl flags. Everything after `--` is joined into a single command string. |

## Pipe Support

When stdin is not a terminal (i.e., data is piped in), it is forwarded to the remote command's stdin. The remote command's stdout and stderr are written directly to local stdout and stderr, enabling Unix pipe chains.

The exit code of the remote command is propagated as `opsctl`'s exit code.

## Approval

This command requires approval from the running desktop app:

- Commands matching the asset's **allow list** execute without approval
- Commands matching the **deny list** are rejected immediately
- A session is auto-created if not specified. Clicking "Remember" in the approval dialog stores the pattern, auto-approving matching subsequent commands in the same session
- When the desktop app is offline, only commands matching the allow-list policy or a pre-approved grant are permitted

## Examples

```bash
# Run a command by asset name
opsctl exec web-server -- uptime

# Run a command by asset ID
opsctl exec 1 -- ls -la /var/log

# Disambiguate by group/name
opsctl exec production/web-01 -- cat /etc/hosts

# Pipe data into a remote command
echo "hello" | opsctl exec web-server -- cat

# Use with an explicit session
opsctl --session $ID exec web-01 -- systemctl restart nginx

# Chain with local commands
opsctl exec web-server -- cat /etc/nginx/nginx.conf | grep upstream

# Check exit code
opsctl exec web-server -- test -f /opt/app/config.yml && echo "exists"
```
