---
sidebar_position: 4
sidebar_label: 查询编辑器
---

# 查询编辑器

OpsKat 为每种数据资产类型都内置了控制台。每种类型使用最契合其数据模型的界面，因此**没有一个适用于所有类型的统一编辑器**：

| 资产类型 | 控制台 |
|---|---|
| MySQL / PostgreSQL / SQL Server / SQLite | 共享的 Monaco **SQL 编辑器**（见下文） |
| MongoDB | 专用的 [MongoDB 面板](/docs/guide/mongodb) —— 集合浏览器 + mongosh 风格查询编辑器 |
| Redis | [键浏览器 + 命令控制台](#redis)（无 SQL 编辑器） |
| etcd | 专用的 [etcd 面板](/docs/guide/etcd) —— KV 树浏览器 + 查询栏 |
| Kafka | 专用的 [Kafka 面板](/docs/guide/kafka) —— 基于表单的 Broker/Topic/消费者组/ACL/Schema 界面 |
| 对象存储 | 专用的[对象存储浏览器](/docs/guide/object-storage) —— Bucket、前缀、对象、传输与预签名链接 |

数据库连接可以通过 SSH 隧道进行安全访问。

## SQL 编辑器

四种 SQL 驱动 —— **MySQL、PostgreSQL、SQL Server 和 SQLite** —— 共享同一个基于 Monaco 的 SQL 编辑器。

### 连接

从侧边栏选择数据库资产并打开 **查询** 标签页。如果数据库资产配置了 SSH 隧道，OpsKat 会先建立 SSH 连接，再通过隧道连接数据库。

左侧的库/表树可用于浏览数据库和表，并直接在数据网格中打开某张表。

### 编写和执行查询

- 在编辑器中编写 SQL，支持语法高亮和表名自动补全
- 按 **Ctrl/Cmd+Enter** 执行（选中的文本，若未选中则执行整个编辑器内容）
- `SELECT`、`SHOW`、`DESCRIBE` 和 `EXPLAIN` 语句以行的形式返回结果
- `INSERT`、`UPDATE` 和 `DELETE` 语句返回受影响的行数
- 可以从下拉菜单为特定查询覆盖默认数据库
- 查询历史弹窗保留最近的语句，并可从代码片段库插入 SQL 片段
- 危险语句（如 `DELETE`、`DROP`、`TRUNCATE`、`ALTER`）在执行前会要求确认

### SQL 分析

OpsKat 使用 **TiDB Parser** 在执行前分析 SQL 语句。这提供了以下能力：

- **语句分类** — 自动识别语句类型（SELECT、INSERT、UPDATE、DELETE、DROP、TRUNCATE 等）
- **危险模式检测** — 标记高风险操作，例如：
  - 不带 `WHERE` 子句的 `DELETE` 或 `UPDATE`
  - `PREPARE` 语句
  - `CALL` 语句
- **策略执行** — 语句类型和标记会在执行前与资产的[查询策略](/docs/guide/policy)进行比对

### 结果网格

查询结果以分页表格形式展示：

- 列标题与查询输出的列名对应
- 每页行数可配置（50 / 100 / 200 / 500 行）
- `INSERT` / `UPDATE` / `DELETE` 会显示受影响的行数
- 结果可以导出

## Redis

Redis 资产**不**使用 SQL 编辑器，而是打开一个键浏览器加命令控制台。

### 连接

选择 Redis 资产并打开 **查询** 标签页。与数据库类似，Redis 连接也可以通过 SSH 资产进行隧道连接。

### 键浏览器

键浏览器提供了可视化界面来浏览 Redis 数据：

- 以**树形**（按分隔符分组，默认 `:`）或扁平**列表**视图浏览键
- 使用 glob 模式过滤键（基于 `SCAN`，例如 `user:*`）
- 从底部选择器切换数据库（db0、db1 …）
- 打开某个键以查看和编辑其值、类型和 TTL —— 针对字符串、哈希、列表、集合、有序集合和流提供专用编辑器
- 创建和删除键，以及编辑或移除 TTL

### 命令控制台

每个键的详情视图都包含一个命令输入框，用于运行任意 Redis 命令，结果会根据命令返回类型（字符串、整数、列表、哈希、nil）格式化。**概览** 标签页展示 `INFO` 的服务器/内存/键空间统计，并可选择自动刷新。

## 策略执行

通过这些控制台执行的所有查询和命令都与 AI 智能体操作遵循相同的[策略规则](/docs/guide/policy)：

- **SQL** — 根据资产的查询策略检查（允许/拒绝的语句类型、危险模式标记）
- **Redis** — 根据资产的 Redis 策略检查（允许/拒绝的命令模式）
- **MongoDB**、**etcd** 和 **Kafka** — 根据各自的策略类别检查

对象存储浏览器是交互式文件管理界面，目前没有放行/拦截策略类型。

如果操作被策略拒绝，将不会执行。如果需要确认，执行前会提示你进行审批。
