---
sidebar_position: 5
sidebar_label: sql
---

# opsctl sql

针对数据库资产执行 SQL。网络数据库驱动包括 MySQL、PostgreSQL 和 SQL Server；SQLite 资产使用其配置的本地或远程文件来源。网络连接会遵循资产配置的 SSH 隧道或代理。

## 语法

```bash
opsctl [global-flags] sql <asset> [flags] "<SQL>"
```

## 参数

| 参数 | 说明 |
|------|------|
| `asset` | 数据库资产名称或数字 ID |

## 选项

| 选项 | 说明 |
|------|------|
| `-f <file>` | 从文件读取 SQL，而非命令行参数 |
| `-d <database>` | 覆盖本次执行的默认数据库 |

## 审批

SQL 语句会根据资产的查询策略进行检查：

- **允许的语句类型**（如 `SELECT`）无需审批即可执行
- **禁止的语句类型**（如 `DROP TABLE`）会被立即拒绝
- 其他语句需要用户通过桌面应用确认
- 当桌面应用离线时，仅允许执行匹配白名单策略的语句

## 示例

```bash
# 执行查询
opsctl sql prod-db "SELECT * FROM users LIMIT 10"

# 插入数据
opsctl sql prod-db "INSERT INTO logs (msg) VALUES ('test')"

# 从文件读取 SQL
opsctl sql prod-db -f migration.sql

# 覆盖数据库
opsctl sql prod-db -d other_db "SHOW TABLES"

# 使用显式会话
opsctl --session $ID sql prod-db "UPDATE settings SET value='true' WHERE key='maintenance'"
```
