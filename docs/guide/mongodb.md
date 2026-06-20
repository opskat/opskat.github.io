---
sidebar_position: 8
sidebar_label: MongoDB
---

# MongoDB

MongoDB assets have their own console — separate from the SQL editor — combining a collection browser with a mongosh-style query editor.

## Connecting

Create a MongoDB asset (see [Asset Management](/docs/guide/asset-management)) with:

- **Host** / **Port** — MongoDB server address (default port: 27017)
- **Username** / **Password** — optional (auth source defaults to `admin`)
- **Database** — optional default database
- **SSH Asset** — optional SSH tunnel

Select the asset and open the **Query** tab. Connections can be tunneled through an SSH asset.

## Collection Browser

A collection browser on the left lists databases and collections. Open a collection to browse its documents with:

- A **filter** input (JSON, e.g. `{"status": "active"}`)
- A **sort** input (JSON, e.g. `{"createdAt": -1}`)
- Pagination (skip/limit, default limit 100) and refresh

Documents are shown in a result view.

## Query Editor

The query editor accepts mongosh-style JavaScript syntax. It offers:

- A database selector
- Method auto-completion for `db.<collection>.<method>` — including `find`, `findOne`, `insertOne`, `insertMany`, `updateOne`, `updateMany`, `deleteOne`, `deleteMany`, `aggregate`, and `countDocuments`
- A parsed query preview (e.g. "find on db.collection")
- Snippet insertion and **Ctrl/Cmd+Enter** to execute

Results are displayed with pagination, and `find` queries support skip/limit paging.

## Policy

MongoDB operations are evaluated against the asset's [MongoDB policy](/docs/guide/policy), whose allow/deny lists are keyed by operation type (for example `find` and `aggregate` to allow, `dropDatabase` and `dropCollection` to deny). New MongoDB assets default to read-only plus a dangerous-operation deny list.
