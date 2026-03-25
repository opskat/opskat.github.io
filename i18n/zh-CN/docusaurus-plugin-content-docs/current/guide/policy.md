---
sidebar_position: 5
sidebar_label: 策略
---

# 策略执行

OpsKat 对每一个操作都执行允许/拒绝规则 — 无论是通过 AI 智能体、查询编辑器还是 `opsctl` CLI 触发的操作。三种策略类型分别覆盖 SSH 命令、SQL 语句和 Redis 操作。

## 策略类型

### SSH 命令策略

控制哪些 shell 命令可以在 SSH 资产上执行。

- **允许列表** — 自动放行的命令模式（例如 `ls *`、`cat *`、`systemctl status *`）
- **拒绝列表** — 始终阻止的命令模式（例如 `rm -rf /*`、`shutdown *`）
- **分组** — 引用策略组，其规则会被合并

命令使用 shell 解析器（`mvdan.cc/sh`）进行精确匹配。`*` 通配符匹配任意参数。

### SQL 查询策略

控制哪些 SQL 语句可以在数据库资产上执行。

- **允许类型** — 允许的语句类型（例如 `SELECT`、`SHOW`、`DESCRIBE`、`EXPLAIN`、`USE`）
- **拒绝类型** — 阻止的语句类型（例如 `DROP TABLE`、`DROP DATABASE`、`TRUNCATE`、`GRANT`、`REVOKE`、`CREATE USER`、`DROP USER`、`ALTER USER`）
- **拒绝标记** — 阻止的模式：
  - `no_where_delete` — 不带 `WHERE` 子句的 `DELETE`
  - `no_where_update` — 不带 `WHERE` 子句的 `UPDATE`
  - `prepare` — `PREPARE` 语句
  - `call` — `CALL` 语句
- **分组** — 引用策略组

SQL 语句通过 **TiDB Parser** 进行分析，用于分类语句类型和检测危险模式。

### Redis 策略

控制哪些 Redis 命令可以在 Redis 资产上执行。

- **允许列表** — 允许的命令模式（例如 `GET`、`HGETALL`、`KEYS`、`INFO`）
- **拒绝列表** — 阻止的命令模式（例如 `FLUSHDB`、`FLUSHALL`、`CONFIG SET *`、`SHUTDOWN *`）
- **分组** — 引用策略组

支持多词 Redis 命令（例如 `CONFIG SET`、`ACL DELUSER`）。

## 决策流程

当操作被评估时，策略引擎会产生以下三种决策之一：

| 决策 | 含义 |
|---|---|
| **允许（Allow）** | 命令匹配了允许规则，立即执行。 |
| **拒绝（Deny）** | 命令匹配了拒绝规则，被阻止。 |
| **需要确认（NeedConfirm）** | 没有匹配的规则，提示用户允许或拒绝。 |

评估顺序为：

1. 首先检查**拒绝列表** — 如果匹配，操作立即被拒绝。
2. 然后检查**允许列表** — 如果匹配，操作被允许。
3. **无匹配** — 决策为 `NeedConfirm`，需要用户审批。

## 策略组

策略组是可复用的规则集合，可以被多个资产和分组引用。

### 内置策略组

OpsKat 内置了以下策略组（不可修改）：

#### SSH 命令组

| 组名 | 说明 |
|---|---|
| **Linux Read-Only** | 常用的 Linux 只读命令（`ls`、`cat`、`head`、`tail`、`grep`、`ps`、`df`、`netstat` 等） |
| **Kubernetes Read-Only** | Kubernetes 只读命令（`kubectl get`、`kubectl describe`、`kubectl logs` 等） |
| **Docker Read-Only** | Docker 只读命令（`docker ps`、`docker images`、`docker logs` 等） |
| **Dangerous Deny** | 阻止危险的系统命令（`rm -rf /*`、`mkfs`、`dd`、`shutdown`、`reboot` 等） |

#### SQL 查询组

| 组名 | 说明 |
|---|---|
| **SQL Read-Only** | 仅允许 `SELECT`、`SHOW`、`DESCRIBE`、`EXPLAIN`、`USE` |
| **SQL Dangerous Deny** | 阻止 `DROP TABLE`、`DROP DATABASE`、`TRUNCATE`、`GRANT`、`REVOKE`、用户管理，以及标记 `no_where_delete`、`no_where_update`、`prepare` |

#### Redis 组

| 组名 | 说明 |
|---|---|
| **Redis Read-Only** | 仅允许只读命令（`GET`、`HGETALL`、`LRANGE`、`SMEMBERS`、`ZRANGE`、`INFO`、`KEYS` 等） |
| **Redis Dangerous Deny** | 阻止 `FLUSHDB`、`FLUSHALL`、`CONFIG SET`、`SHUTDOWN`、`DEBUG`、`SLAVEOF`、ACL 修改等 |

### 自定义策略组

你可以创建自定义策略组：

1. 打开策略组管理页面。
2. 点击 **创建**，选择策略类型（命令、查询或 Redis）。
3. 定义允许/拒绝规则。
4. 保存策略组。

你也可以**复制**一个内置策略组来创建基于它的自定义策略组。

### 分配策略组

策略组通过资产或分组的策略配置进行分配。当资产或分组引用了一个策略组时，该策略组的规则会被合并到资产的有效策略中。

默认情况下，新建的 SSH 资产会引用 **Linux Read-Only** 和 **Dangerous Deny** 策略组。新建的数据库资产会引用 **SQL Read-Only** 和 **SQL Dangerous Deny**。新建的 Redis 资产会引用 **Redis Read-Only** 和 **Redis Dangerous Deny**。

## 策略组继承

资产树中的分组可以拥有自己的策略。评估资产的有效策略时：

1. 加载资产自身的策略规则和引用的策略组。
2. 同时考虑父分组的策略（如果有）。
3. 所有引用的策略组被解析，其规则合并到最终的允许/拒绝列表中。

这使你可以在分组级别设置组织范围的规则，同时允许资产级别的自定义覆盖。

## 策略测试

OpsKat 为三种策略类型都提供了实时策略测试器。输入命令、SQL 语句或 Redis 命令，即可查看它是否会被允许、拒绝或需要确认，以及匹配了哪条规则。
