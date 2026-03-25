---
sidebar_position: 4
sidebar_label: cp
---

# opsctl cp

在本地与远程主机之间，或两台远程主机之间传输文件。

## 语法

```bash
opsctl [global-flags] cp <source> <destination>
```

## 路径格式

| 格式 | 说明 |
|------|------|
| `/path/to/file` 或 `./relative/path` | 本地路径 |
| `<asset>:<remote-path>` | 远程路径（资产名称或 ID） |

源路径和目标路径中至少有一个必须是远程路径。远程路径必须以 `/` 开头。

## 传输模式

| 模式 | 说明 |
|------|------|
| **本地到远程** | 通过 SFTP 将文件上传到远程服务器 |
| **远程到本地** | 通过 SFTP 从远程服务器下载文件 |
| **远程到远程** | 在两个资产之间直接传输文件（不经过本地磁盘） |

## 审批

文件传输需要桌面应用审批。如果未指定会话，系统会自动创建一个。

## 示例

```bash
# 通过资产名称上传文件
opsctl cp ./config.yml web-server:/etc/app/config.yml

# 通过资产 ID 下载文件
opsctl cp 1:/var/log/app.log ./app.log

# 在两台远程服务器之间直接传输
opsctl cp 1:/etc/hosts 2:/tmp/hosts

# 使用 分组/名称 格式消歧上传文件
opsctl cp ./deploy.sh production/web-01:/opt/scripts/deploy.sh

# 使用显式会话
opsctl --session $ID cp ./app.tar.gz web-server:/opt/releases/
```
