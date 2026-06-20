---
sidebar_position: 8
sidebar_label: MongoDB
---

# MongoDB

MongoDB 资产拥有自己的控制台 —— 与 SQL 编辑器分开 —— 将集合浏览器与 mongosh 风格的查询编辑器结合在一起。

## 连接

创建一个 MongoDB 资产（见[资产管理](/docs/guide/asset-management)）：

- **主机** / **端口** —— MongoDB 服务器地址（默认端口：27017）
- **用户名** / **密码** —— 可选（认证源默认为 `admin`）
- **数据库** —— 可选的默认数据库
- **SSH 资产** —— 可选的 SSH 隧道

选择该资产并打开 **查询** 标签页。连接可以通过 SSH 资产进行隧道连接。

## 集合浏览器

左侧的集合浏览器列出数据库和集合。打开某个集合可浏览其文档，支持：

- **过滤** 输入框（JSON，例如 `{"status": "active"}`）
- **排序** 输入框（JSON，例如 `{"createdAt": -1}`）
- 分页（skip/limit，默认 limit 为 100）和刷新

文档以结果视图展示。

## 查询编辑器

查询编辑器接受 mongosh 风格的 JavaScript 语法，提供：

- 数据库选择器
- 针对 `db.<collection>.<method>` 的方法自动补全 —— 包括 `find`、`findOne`、`insertOne`、`insertMany`、`updateOne`、`updateMany`、`deleteOne`、`deleteMany`、`aggregate` 和 `countDocuments`
- 解析后的查询预览（例如 "find on db.collection"）
- 片段插入，以及 **Ctrl/Cmd+Enter** 执行

结果带分页展示，`find` 查询支持 skip/limit 分页。

## 策略

MongoDB 操作会与资产的 [MongoDB 策略](/docs/guide/policy)进行比对，其允许/拒绝列表按操作类型分类（例如允许 `find` 和 `aggregate`、拒绝 `dropDatabase` 和 `dropCollection`）。新建的 MongoDB 资产默认采用只读策略加危险操作拒绝列表。
