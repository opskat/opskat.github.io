---
sidebar_position: 1
sidebar_label: 概览
---

# opsctl CLI 概览

`opsctl` 是与 OpsKat 共享数据、凭据和业务服务的独立 CLI，可用于内建资产管理、命令执行、文件传输、授权与审计。扩展执行仍需桌面扩展运行时。

## 安装

可在桌面应用中一键安装到 `~/.local/bin/opsctl`（macOS / Linux）或 `%LOCALAPPDATA%/opskat/opsctl.exe`（Windows），也可从源码构建：

```bash
make build-cli
make install-cli
```

## 全局参数

| 参数 | 环境变量 | 说明 |
|---|---|---|
| `--data-dir <path>` | — | 覆盖应用数据目录 |
| `--master-key <key>` | `OPSKAT_MASTER_KEY` | 覆盖凭据解密主密钥 |

## 桌面应用集成

桌面应用运行时，opsctl 可通过 `sshpool.sock` 复用 SSH 连接；非交互调用也可通过 `approval.sock` 请求桌面审批。桌面未运行时，内建协议可以使用共享数据库和凭据直连。`ext exec` 是例外：它必须委托桌面进程中的 WASM 运行时，无法连接时会安全失败。

## 资产引用

- 数字 ID：`opsctl exec 1 -- uptime`
- 名称：`opsctl exec web-server -- uptime`
- 分组/名称：`opsctl exec production/web-01 -- uptime`

## 命令

| 命令 | 说明 |
|---|---|
| [`exec`](./exec.md) | 按资产真实类型执行命令 |
| [`batch`](./batch.md) | 跨资产并行执行多条命令 |
| [`ssh`](./ssh.md) | 打开交互式 SSH 终端 |
| [`cp`](./cp.md) | 在本地、远程服务器和对象存储之间复制文件 |
| [`policy`](./policy.md) | 查看生效授权，管理永久规则和权限组 |
| [`ext`](./ext.md) | 列出扩展或委托桌面端执行扩展工具 |
| `help` | 查看 CLI 或指定资产类型的权威命令语法 |
| [`list`](./assets.md#安全发现凭据) | 列出资产、分组、安全凭据元数据或审计记录（`list audit`） |
| [`get`](./assets.md#安全发现凭据) | 获取资产或安全凭据详情 |
| [`create`](./assets.md#创建资产) | 创建内建资产或分组 |
| `update` | 更新资产或分组 |
| `delete` | 删除资产或分组，始终需要真人确认 |
| `version` | 输出版本 |

## 授权与审批

`exec` 按资产自身类型对应的策略检查。处理顺序是永久规则、仍有效的 grant、真人审批：

1. deny 命中立即拒绝，allow 命中直接执行；
2. 仍有效的桌面 grant 可以授权匹配操作；
3. 交互运行时在当前终端提问；非交互运行时可在桌面可达时请求桌面审批。

既无交互终端也无桌面审批服务时，`exec`、`cp`、`batch` 以退出码 3 输出 `NEEDS AUTHORIZATION` 和可复制的 `opsctl policy allow` 命令。真人在自己的终端执行并确认后，再重试原操作。`create`、`update`、`delete` 无法被规则预授权，会输出 `NEEDS TTY`；应由真人交互执行原命令。

审批会话是按数据目录复用、24 小时过期的内部概念。不存在 `session` 子命令、`--session`、`OPSKAT_SESSION_ID` 或项目级 `.opskat/sessions/`。

## 输出语言

给人阅读的策略、审批和审计输出依次按 `LC_ALL`、`LC_MESSAGES`、`LANG` 选择语言。`NEEDS AUTHORIZATION`、`NEEDS TTY` 以及可复制的命令保持稳定英文 ASCII。需要确定性英文显示文本时使用 `LC_ALL=C`。
