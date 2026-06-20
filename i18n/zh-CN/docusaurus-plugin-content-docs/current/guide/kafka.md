---
sidebar_position: 6
sidebar_label: Kafka
---

# Kafka

OpsKat 通过一个基于表单的面板管理 Kafka 集群 —— 无需学习查询语言。使用一个或多个引导 Broker 连接，并通过多个视图操作集群。

## 连接

创建一个 Kafka 资产（见[资产管理](/docs/guide/asset-management)）：

- **Brokers** —— 一个或多个 `host:port` 引导 Broker（也接受单个主机/端口）
- **Client ID** —— 可选的客户端标识
- **SASL 机制** —— `none`、`plain`、`scram-sha-256` 或 `scram-sha-512`；启用 SASL 时需提供 **用户名** / **密码**
- **TLS** —— 可选，包含 CA / 客户端证书 / 客户端密钥、跳过校验和服务器名
- **SSH 资产** —— 可选的 SSH 隧道

## 面板视图

Kafka 面板由你从侧边栏选择的多个视图组成：

### 概览

集群级指标：Broker 数量、Topic 数量、分区数量、副本不足和离线分区、集群 ID 和 Controller 信息，以及 Topic 健康概要。

### Brokers

Broker 列表（ID、主机、端口、机架）。选择某个 Broker 可查看其配置；也可查看集群级配置。

### Topics

搜索和过滤 Topic（可选择包含内部 Topic），并创建新 Topic（名称、分区数、副本因子、配置）。Topic 详情视图展示分区/副本/ISR，并支持：

- **浏览消息** —— 选择分区和起始点（最新、最早、特定 offset 或时间戳），设置拉取条数和最大字节数，并选择解码模式（文本、JSON、十六进制、Base64）
- **生产消息** —— 发送一条带键、值、Headers 和编码的记录
- 修改 Topic 配置、增加分区、删除记录或删除 Topic

### 消费者组

列出消费者组，并查看组详情和成员 offset。

### ACLs

按资源类型、名称、模式类型、Principal、主机、操作和权限过滤 ACL。创建和删除 ACL。

### Schemas

浏览 Schema Registry 的 Subject，查看 Schema 版本和引用，注册新的 Schema 版本，删除版本或 Subject。（需要资产上配置了 Schema Registry。）

### Connect

管理资产上配置的 Kafka Connect 集群。

## 策略

Kafka 操作会与资产的 [Kafka 策略](/docs/guide/policy)（操作和资源模式的允许/拒绝列表）进行比对。新建的 Kafka 资产默认采用元数据只读策略加危险操作拒绝列表。
