---
sidebar_position: 4
sidebar_label: cp
---

# opsctl cp

在本地路径、远程主机和对象存储之间传输文件，任意两端组合均可，也包括两个资产之间直传。

## 语法

```bash
opsctl [global-flags] cp [-r] <source>... <destination>
```

## 路径格式

| 格式 | 说明 |
|------|------|
| `/path/to/file` 或 `./relative/path` | 本地路径 |
| `<asset>:/<remote-path>` | SSH 服务器路径（资产名称、ID 或 `分组/名称`） |
| `<asset>:/<bucket>/<key>` | 对象存储路径 |

源路径和目标路径中至少有一个必须位于资产上。两端可以任意组合，包括从 SSH 服务器直传到对象存储。

## 参数选项

| 选项 | 说明 |
|------|------|
| `-r`、`--recursive` | 传输整个目录树 / 对象前缀 |

## 多个源

使用 `-r`、通配符或指定多个源时，目标路径必须以 `/` 结尾，每一项会落到 `<destination>/<相对源基准的路径>`。

远程通配符请加引号，避免被本地 shell 抢先展开。展开过程中遇到的符号链接会被跳过并报告。

## 审批

在传输任何一个字节之前，每一端的资产都会按其自身的策略单独授权。递归 / 通配符传输会先对源和目标的目录（或对象前缀）范围完成审批，再去列举其内容。

未命中规则时，交互调用会在当前终端提问。既无 TTY 也无桌面审批服务时，以退出码 3 输出 `NEEDS AUTHORIZATION` 和可复制的 `opsctl policy allow`；真人执行授权后再重试。

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

# 对象存储，上传与下载
opsctl cp ./dump.sql.gz s3-prod:/backups/dump.sql.gz
opsctl cp s3-prod:/backups/dump.sql.gz ./dump.sql.gz

# 从服务器直传对象存储，不经过本地磁盘
opsctl cp web-01:/var/log/app.log s3-prod:/logs/app.log

# 传输整个目录树
opsctl cp -r ./dist s3-prod:/releases/v2/

# 远程通配符（加引号，避免本地 shell 展开）
opsctl cp 'web-01:/var/log/*.log' s3-prod:/logs/

# 在交互终端预授权远端写入范围
opsctl policy allow web-server -- 'cp:write:/opt/releases/*'
```
