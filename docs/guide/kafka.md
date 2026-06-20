---
sidebar_position: 6
sidebar_label: Kafka
---

# Kafka

OpsKat manages Kafka clusters through a form-based panel — there is no query language to learn. Connect with one or more bootstrap brokers and operate the cluster across several views.

## Connecting

Create a Kafka asset (see [Asset Management](/docs/guide/asset-management)) with:

- **Brokers** — one or more `host:port` bootstrap brokers (a single host/port is also accepted)
- **Client ID** — optional client identifier
- **SASL Mechanism** — `none`, `plain`, `scram-sha-256`, or `scram-sha-512`; supply **Username** / **Password** when SASL is enabled
- **TLS** — optional, with CA / client certificate / client key, skip-verify, and server name
- **SSH Asset** — optional SSH tunnel

## Panel Views

The Kafka panel is organized into views you select from the sidebar:

### Overview

Cluster-level metrics: broker count, topic count, partition count, under-replicated and offline partitions, cluster ID, and controller info, plus a topic health summary.

### Brokers

The broker list (ID, host, port, rack). Select a broker to view its configuration; cluster-wide configuration is also available.

### Topics

Search and filter topics (optionally including internal topics), and create new topics (name, partitions, replication factor, configs). A topic detail view shows partitions/replicas/ISR, and lets you:

- **Browse messages** — pick a partition and start point (newest, oldest, a specific offset, or a timestamp), set a fetch limit and max bytes, and choose a decode mode (text, JSON, hex, base64)
- **Produce messages** — send a record with key, value, headers, and encodings
- Alter topic config, increase partitions, delete records, or delete the topic

### Consumer Groups

List consumer groups and inspect group details and member offsets.

### ACLs

Filter ACLs by resource type, name, pattern type, principal, host, operation, and permission. Create and delete ACLs.

### Schemas

Browse Schema Registry subjects, view schema versions and references, register new schema versions, and delete versions or subjects. (Requires a Schema Registry configured on the asset.)

### Connect

Manage Kafka Connect clusters configured on the asset.

## Policy

Kafka operations are evaluated against the asset's [Kafka policy](/docs/guide/policy) (allow/deny lists of action and resource patterns). New Kafka assets default to metadata read-only plus a dangerous-action deny list.
