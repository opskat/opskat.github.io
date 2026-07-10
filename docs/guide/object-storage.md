---
sidebar_position: 5
sidebar_label: Object Storage
---

# Object Storage

OpsKat provides a built-in object-storage asset and browser for S3-compatible services. You can browse buckets and prefixes, inspect objects, transfer files, organize keys, and create temporary presigned links from the same workspace as your other infrastructure.

## Compatibility and Presets

Object Storage is an S3-compatible asset category, not a closed vendor list. Any cloud or self-hosted service exposing a compatible S3 API can be connected by entering its endpoint, region, credentials, and addressing mode.

The connection form currently provides convenience presets for:

- Amazon S3
- Alibaba Cloud OSS
- Tencent Cloud COS
- Huawei Cloud OBS
- Volcengine TOS
- Qiniu Kodo
- Cloudflare R2
- Backblaze B2
- DigitalOcean Spaces
- Wasabi
- MinIO
- Generic S3-compatible endpoints

These presets only prefill typical endpoint, region, and path-style values. They do not limit compatibility. For another S3-compatible service, select the generic option and enter the values from that service's documentation. Always confirm preset values against the bucket's actual region and deployment configuration.

## Create an Object-Storage Asset

Add an asset and select **Object Storage**. Configure:

- **Provider** — Select a preset or generic S3 compatibility.
- **Endpoint / Region** — The service endpoint and signing region.
- **Access Key ID / Secret Access Key** — Stored locally with the same encrypted credential system as other OpsKat assets. A managed credential can also be selected.
- **Use SSL** — Enabled by default.
- **Path-style access** — Required by some S3-compatible services, including many local MinIO installations.
- **Skip TLS verification** — Available for explicitly trusted development endpoints; avoid it in production.
- **Connection timeout / multipart part size** — Optional connection and transfer tuning.

Use **Test connection** before saving. The test lists the account's buckets through the configured endpoint.

## Browse and Manage Objects

Open the asset to launch the object browser. It supports:

- Listing buckets and navigating folder-like prefixes.
- List and grid views with paginated loading.
- Object metadata and supported image previews/thumbnails.
- Creating folder placeholders.
- Uploading with the file picker or drag and drop, and downloading objects.
- Copying or moving objects between keys and buckets.
- Deleting one or multiple objects.
- Generating temporary presigned download and upload URLs.
- Monitoring active, completed, failed, and cancelled transfers in the transfer dock.

Object storage is flat: folders are key prefixes, and an explicitly created folder is represented by a zero-byte object whose key ends in `/`.

## Security and Scope

Grant the access key only the bucket permissions required for the intended workflow. Presigned URLs temporarily delegate access to anyone who receives the URL, so choose the shortest practical expiry and share them carefully.

The built-in object browser currently has no allow/deny policy kind and no dedicated `opsctl oss` command. Its operations are initiated from the desktop UI rather than the AI operation helpers.
