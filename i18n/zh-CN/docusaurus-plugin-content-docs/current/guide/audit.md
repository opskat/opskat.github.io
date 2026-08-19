---
sidebar_position: 12
sidebar_label: 审计
---

# 审计与审批

OpsKat 会记录 AI 与 `opsctl` 工具执行的来源、结果和可用的策略决策上下文。永久规则、仍有效的 grant 和真人审批共同控制 CLI 操作。

## 审计字段

记录可包含来源（`ai`、`opsctl`、`desktop`）、工具名、资产、命令、请求/结果、成功状态、决策、决策来源、命中模式、内部会话 ID、AI 对话 ID、grant 会话 ID 和时间。常见决策来源包括 `policy_allow`、`policy_deny`、`user_allow`、`user_deny`、`grant_allow`、`grant_deny`。

桌面审计查看器可按来源、工具、资产、决策和时间筛选并查看详情。无需桌面或交互终端，也可以使用只读 CLI：

```bash
opsctl list audit
opsctl list audit --asset web-01 --limit 50
```

输出按时间倒序，原样展示已存储行的时间、来源、资产、工具、命令摘要和决策来源。

## 载荷边界

审计写入默认不会扫描命令、请求、结果或错误并猜测其中的秘密；请求最多保留 4KB，结果最多保留 32KB。资产创建/更新以及安全资产/凭据查询使用窄字段投影，不写入密码、Secret Access Key、kubeconfig、私钥或 passphrase。

不要假设审计或 UI 会替命令参数脱敏。优先使用托管凭据引用或命令明确提供的无回显输入通道，例如[不带值的 `opsctl create asset --password`](/docs/cli/assets#密码与认证引用)——它在终端里提示输入，不经过 argv。

## opsctl 审批流程

1. 先检查永久 deny/allow，再检查仍有效的 grant。
2. 有 TTY 时，opsctl 在当前终端显示操作并询问允许一次、永久允许（适用时）或拒绝。
3. 无 TTY 但桌面可达时，可以经 `<data-dir>/approval.sock` 请求桌面审批。
4. 两条审批路径都不可用时，可被规则授权的操作输出 `NEEDS AUTHORIZATION`；资产变更输出 `NEEDS TTY`，退出码均为 3。

这适用于 `exec`、`cp`、`batch`、`create`、`update`、`delete` 各自的审批路径。扩展工具也经 `approval.sock` 委托，但在桌面扩展运行时中直接执行，不显示常规审批弹窗；桌面不可达时 `ext exec` 安全失败。

`exec` 和 `batch` 的审批类型由资产真实类型推导：SSH 为 `exec`，数据库为 `sql`，另有 `redis`、`mongo`、`etcd`、`kafka`、`k8s`、`oss`、`serial`。`cp`、`create`、`update`、`delete` 使用固定类型；delete 永远不能预授权。

## Grant 与永久规则

桌面审批可以在按数据目录复用的内部会话中保存临时 grant。opsctl 能用 `policy show` 查看、用 `policy rm` 撤销仍有效的 grant，但没有创建临时 grant 的命令。

需要持久预授权时，真人在交互终端运行 `opsctl policy allow`。每次策略写入都会单独审计；AI 和其他非交互调用者执行策略写命令会得到 `NEEDS TTY`。

审批会话是内部实现细节，按数据目录复用并在 24 小时后过期。不存在 `opsctl session` 子命令或公开 session 参数。
