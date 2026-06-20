---
sidebar_position: 7
sidebar_label: etcd
---

# etcd

OpsKat browses and edits etcd key/value data through a tree browser and a query bar — no command-line client required.

## Connecting

Create an etcd asset (see [Asset Management](/docs/guide/asset-management)) with:

- **Endpoints** — one or more `host:port` endpoints (default port: 2379)
- **Username** / **Password** — optional, when RBAC is enabled
- **TLS** — optional, with CA / client certificate / client key, skip-verify, and server name
- **Dial / Command Timeout** — optional timeouts in seconds
- **SSH Asset** — optional SSH tunnel

## KV Tree Browser

The etcd panel shows a key tree on the left that you navigate by prefix. Selecting a key opens its detail panel, where you can:

- View the value and metadata (revisions, version, lease ID)
- Edit and save the value
- Delete the key

Destructive operations (put, delete, transactions) prompt for confirmation.

## Query Bar

A query view lets you run etcd operations directly — `get`, `put`, `delete`, and transactions — with results shown in a table. Prefix listing is available from the tree browser.

## Policy

etcd operations are evaluated against the asset's [etcd policy](/docs/guide/policy) (allow/deny command patterns). New etcd assets default to read-only plus a dangerous-command deny list.
