---
sidebar_position: 8
sidebar_label: 资产与凭据
---

# 资产与凭据自动化

`opsctl` 可以通过统一命令创建任意已注册的内建资产类型，也能发现已有托管凭据和 SSH Agent 身份，同时不返回秘密材料。

## 创建资产

```bash
opsctl create asset --name <名称> [参数]
```

用 `--type` 选择已注册的内建类型（默认是 `ssh`）。必填字段、默认值、合法组合和未知字段校验由所选类型负责。运行 `opsctl help <type>` 可查看该类型的准确配置契约。

类型专属配置可以直接传入 JSON 对象，也可以从文件读取：

```bash
opsctl create asset \
  --type database \
  --name "生产数据库" \
  --config '{"driver":"mysql","host":"db.internal","username":"app"}' \
  --credential-id 4

opsctl create asset \
  --type k8s \
  --name "生产集群" \
  --kubeconfig-file ~/.kube/config \
  --context production
```

`--config` 与 `--config-file` 互斥。`--host`、`--port`、`--username`、`--driver`、`--database`、`--read-only`、`--ssh-asset` 和 Kubernetes 参数等现有便捷参数仍然可用。只有显式传入的便捷参数才会覆盖通用配置中的同名非秘密值。

字段校验和凭据引用检查会在桌面端审批前完成；只有审批成功后才会写入资产。

## 密码与认证引用

以下秘密/引用输入彼此互斥：

| 输入 | 行为 |
|---|---|
| `--password`（不带值） | 在终端里提示输入明文，输入过程不回显；这是推荐的明文输入方式。它需要交互式终端，没有终端时命令以退出码 3 和 `NEEDS TTY` 标记结束，并提示你自己去终端里执行。 |
| `--password <value>` | 从 argv 接收明文，并警告该值可能暴露在 Shell 历史、进程列表或 CI 日志中。`--password=<value>` 等价；值以 `-` 开头时必须用这种写法。 |
| `--credential-id <id>` | 复用已有且类型兼容的托管密码或 SSH 密钥凭据。 |
| `--agent-source-id <id>` 与 `--agent-key-fingerprint <fingerprint>` | 为 SSH Agent 认证选择已有 Agent 来源和身份。 |

例如：

```bash
opsctl create asset --type redis --name cache \
  --config '{"host":"redis.internal","username":"default"}' \
  --password
# 密码：（在终端里输入，不回显）
```

通过 `--password` 或允许的 JSON 秘密字段传入的明文会加密到资产中，**不会**隐式创建可复用的托管凭据。请先在桌面端密钥管理器中显式创建托管密码或导入 SSH 密钥，再通过 `--credential-id` 引用。

不要把 SSH 私钥或 passphrase 放进自动化配置。应先在桌面端密钥管理器中导入密钥，再引用其凭据 ID。Kubernetes kubeconfig 仍直接加密在资产中。不使用密码认证的资产类型会拒绝密码输入。

如果 JSON 配置文件包含明文秘密，请限制文件权限、不要提交到版本库，并在不再需要时删除。

## 安全发现凭据

列出统一密钥管理清单：

```bash
opsctl list credentials
opsctl list credentials --type password
opsctl list credentials --type ssh_key
opsctl list credentials --type ssh_agent
```

每项都有无歧义的类型化引用。详情查询必须使用该引用：

```bash
opsctl get credential credential:4
opsctl get credential agent-source:2
```

凭据详情不接受裸数字 ID，因为托管凭据与 SSH Agent 来源使用不同的 ID 空间。

这些命令只返回身份识别和使用情况元数据。根据类型，结果可能包含名称、用户名、指纹、密钥类型/长度、清理后的备注、可用状态、引用资产，以及 SSH 密钥的公钥。它们绝不会返回密码明文或密文、SSH 私钥或 passphrase、主密钥、SSH Agent endpoint 值、签名或 challenge 秘密。

AI 自动化通过 `list_credentials` 和 `get_credential` 使用相同的安全发现模型，并通过 `put_asset` 使用同一资产写入边界。

## 审批、输出与审计

审批详情和成功的资产结果会省略 write-only 秘密。`put_asset` 审计 producer 同样写入字段白名单投影：password、Secret Access Key、kubeconfig、私钥和 passphrase 字段会直接不存在，而不是替换成 `<redacted>`。

该资产写入专用投影不代表所有审计记录。其他已审计工具会保存审计 writer 实际收到的 command、request、result 和 error，同时继续受既有 canonical command、limited buffer 与截断规则约束。参见[审计与审批](../guide/audit.md#审计载荷边界)。
