---
sidebar_position: 5
sidebar_label: Kubernetes
---

# Kubernetes

OpsKat 通过 kubeconfig 连接 Kubernetes 集群，提供可视化的集群浏览器和实时日志流。AI 智能体可以针对同一资产运行受保护的 `kubectl` 操作。

## 连接

创建一个 Kubernetes 资产（见[资产管理](/docs/guide/asset-management)）：

- **Kubeconfig** —— kubeconfig YAML 内容（静态存储时加密）
- **命名空间** —— 可选的默认命名空间
- **上下文（Context）** —— 可选的 kubeconfig 上下文
- **SSH 资产** —— 可选，用于通过 SSH 跳板机访问集群 API 服务器

选择该资产以打开集群页面。

## 集群浏览器

集群页面加载集群信息，并支持浏览各命名空间下的资源：

- **Pods** —— 名称、镜像、状态、就绪情况和重启次数；展开某个 Pod 可查看其详情和近期事件
- **Deployments**
- **Services** —— 包含端口、目标端口、协议和 NodePort
- **ConfigMaps**
- **Secrets**

资源按命名空间加载，可以展开命名空间以查看其工作负载。

## Pod 日志

打开某个 Pod 以实时查看其日志流。可以选择容器和 tail 行数限制。日志流会持续运行，直到你停止它。

## 运行 kubectl

Kubernetes 资产通过 `kubectl` 操作：

- 在 **AI 智能体** 中，`exec_k8s` 工具对资产运行 `kubectl` 命令（智能体使用此工具而非 `run_command`）。
- 命令可选择通过资产上配置的 SSH 跳板机路由。

AI 发起的每次 `kubectl` 调用都会与资产的 [Kubernetes 策略](/docs/guide/policy)进行比对，其允许/拒绝列表匹配 `kubectl` 命令模式（例如允许 `kubectl get *`、拒绝 `kubectl delete *`）。新建的 Kubernetes 资产默认采用只读策略加危险命令拒绝列表。`opsctl` 可以创建 Kubernetes 资产，但目前没有用于执行 Kubernetes 操作的专用命令。
