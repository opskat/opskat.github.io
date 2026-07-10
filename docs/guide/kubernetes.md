---
sidebar_position: 5
sidebar_label: Kubernetes
---

# Kubernetes

OpsKat connects to Kubernetes clusters with a kubeconfig and provides a visual cluster browser plus live log streaming. The AI Agent can run guarded `kubectl` operations against the same assets.

## Connecting

Create a Kubernetes asset (see [Asset Management](/docs/guide/asset-management)) with:

- **Kubeconfig** — the kubeconfig YAML content (encrypted at rest)
- **Namespace** — an optional default namespace
- **Context** — an optional kubeconfig context
- **SSH Asset** — optional, to reach the cluster API server through an SSH jump host

Select the asset to open the cluster page.

## Cluster Browser

The cluster page loads cluster info and lets you browse namespaced resources:

- **Pods** — name, image, status, ready, and restart counts; expand a pod for its detail and recent events
- **Deployments**
- **Services** — including ports, target ports, protocol, and node ports
- **ConfigMaps**
- **Secrets**

Resources are loaded per namespace, and you can expand namespaces to inspect their workloads.

## Pod Logs

Open a pod to stream its logs in real time. You can choose the container and a tail-lines limit. Log streams run until you stop them.

## Running kubectl

Kubernetes assets are operated through `kubectl`:

- In the **AI Agent**, the `exec_k8s` tool runs `kubectl` commands against the asset (the agent uses this rather than `run_command`).
- Commands can optionally be routed through an SSH jump host configured on the asset.

Every AI `kubectl` invocation is evaluated against the asset's [Kubernetes policy](/docs/guide/policy), whose allow/deny lists match `kubectl` command patterns (for example `kubectl get *` to allow and `kubectl delete *` to deny). New Kubernetes assets default to read-only plus a dangerous-command deny list. `opsctl` can create Kubernetes assets but currently has no dedicated command for running Kubernetes operations.
