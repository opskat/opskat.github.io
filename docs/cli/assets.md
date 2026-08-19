---
sidebar_position: 8
sidebar_label: Assets & Credentials
---

# Asset & Credential Automation

`opsctl` can create every registered built-in asset type through one generic command and can discover existing managed credentials and SSH Agent identities without returning secret material.

## Create an Asset

```bash
opsctl create asset --name <name> [flags]
```

Use `--type` to select a registered built-in type (the default is `ssh`). The selected type owns its required fields, defaults, legal combinations, and unknown-field validation. Run `opsctl help <type>` for its exact configuration contract.

Type-specific configuration can be passed as a JSON object or read from a file:

```bash
opsctl create asset \
  --type database \
  --name "Production DB" \
  --config '{"driver":"mysql","host":"db.internal","username":"app"}' \
  --credential-id 4

opsctl create asset \
  --type k8s \
  --name "Production Cluster" \
  --kubeconfig-file ~/.kube/config \
  --context production
```

`--config` and `--config-file` are mutually exclusive. Existing convenience flags such as `--host`, `--port`, `--username`, `--driver`, `--database`, `--read-only`, `--ssh-asset`, and the Kubernetes flags remain available. Only explicitly supplied convenience flags override matching non-secret values from generic configuration.

Validation and credential-reference checks finish before desktop approval. The asset is written only after approval succeeds.

## Passwords and Authentication References

The supported secret/reference inputs are mutually exclusive:

| Input | Behavior |
|---|---|
| `--password` (bare) | Prompts for the plaintext in your terminal and reads it without echo. This is the recommended plaintext path. It needs an interactive terminal: without one the command exits with code 3 and a `NEEDS TTY` marker telling you to run it yourself. |
| `--password <value>` | Accepts plaintext in argv and prints a warning because the value may be exposed in shell history, process listings, or CI logs. `--password=<value>` is equivalent, and is required when the value starts with `-`. |
| `--credential-id <id>` | Reuses an existing compatible managed password or SSH-key credential. |
| `--agent-source-id <id>` with `--agent-key-fingerprint <fingerprint>` | Selects an existing SSH Agent source and identity for SSH Agent authentication. |

For example:

```bash
opsctl create asset --type redis --name cache \
  --config '{"host":"redis.internal","username":"default"}' \
  --password
# Password: (typed in your terminal, never echoed)
```

Plaintext supplied through `--password`, or an accepted JSON secret field, is encrypted in the asset. It does **not** create a reusable managed credential. Create managed passwords and SSH keys explicitly in the desktop key manager, then reference them with `--credential-id`.

Do not put SSH private keys or passphrases into automation configuration. Import the key in the desktop key manager and reference its credential ID. Kubernetes kubeconfig remains encrypted directly in the asset. Asset types without password authentication reject password inputs.

If a JSON config file contains plaintext secrets, restrict its file permissions, do not commit it, and remove it when it is no longer needed.

## Discover Credentials Safely

List the unified key-management inventory:

```bash
opsctl list credentials
opsctl list credentials --type password
opsctl list credentials --type ssh_key
opsctl list credentials --type ssh_agent
```

Every item has an unambiguous typed reference. Use that reference for detail lookup:

```bash
opsctl get credential credential:4
opsctl get credential agent-source:2
```

Bare numeric IDs are rejected for credential detail because managed credentials and SSH Agent sources use different ID spaces.

These commands return identification and usage metadata only. Depending on the kind, that can include names, usernames, fingerprints, key type/size, sanitized comments, availability, referencing assets, and an SSH key's public key. They never return password plaintext or ciphertext, SSH private keys or passphrases, master keys, SSH Agent endpoint values, signatures, or challenge secrets.

AI automation exposes the same safe discovery model through `list_credentials` and `get_credential`, and uses the same asset-write boundary through `put_asset`.

## Approval, Output, and Audit

Approval details and successful asset results omit write-only secrets. The `put_asset` audit producer also writes an allowlisted request projection: password, Secret Access Key, kubeconfig, private-key, and passphrase fields are absent rather than replaced with `<redacted>`.

This special asset-write projection does not describe every audit record. Other audited tools store the command, request, result, and error received by the audit writer, subject to their existing canonical-command, limited-buffer, and truncation behavior. See [Audit & Approval](../guide/audit.md#audit-payload-boundaries).
