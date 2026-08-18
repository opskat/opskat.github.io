---
sidebar_position: 6
sidebar_label: policy
---

# opsctl policy

查看生效的授权并管理永久策略规则。只读命令不要求 TTY；所有写命令都必须由真人在交互终端中确认，自动化调用者不能给自己扩权。

## 命令

```bash
opsctl policy show  <资产> | --group <资产组>
opsctl policy allow <资产>... | --group <资产组>... [--type <资产类型>] -- <模式>...
opsctl policy deny  <资产>... | --group <资产组>... [--type <资产类型>] -- <模式>...
opsctl policy rm    <资产> | --group <资产组> <条目ID>

opsctl policy group list [--type <策略类型>]
opsctl policy group show <权限组ID>
opsctl policy group create --name <名称> --type <策略类型>
opsctl policy group copy <权限组ID> --name <名称>
opsctl policy group allow <权限组ID> -- <模式>...
opsctl policy group deny <权限组ID> -- <模式>...
opsctl policy group rm <权限组ID> [<条目ID>]

opsctl policy attach <资产> | --group <资产组> <权限组ID>...
opsctl policy detach <资产> | --group <资产组> <权限组ID>...
```

`show`、`group list`、`group show` 是只读入口。其他子命令会回显变更并要求终端确认；没有 TTY 时以退出码 3 和 `NEEDS TTY` 停止。

## 查看生效规则

```bash
opsctl policy show web-01
opsctl policy show --group production
```

资产视图会合并资产自身规则、所属资产组链和已挂载权限组，并标记被 deny 遮蔽的 allow，同时列出仍有效的桌面 grant。输出中的稳定条目 ID 可交给 `policy rm`；grant 条目使用 `g<id>`。

## 增删规则

```bash
opsctl policy allow web-01 -- 'systemctl status *' 'df -h'
opsctl policy deny web-01 -- 'rm -rf *'
opsctl policy rm web-01 2
opsctl policy rm web-01 g12
```

资产的真实类型决定策略形状，资产目标上的 `--type` 只是断言。资产组本身没有类型，因此以组为目标时必须指定 `--type`：

```bash
opsctl policy allow --group production --type ssh -- 'uptime'
```

文件传输使用结构化拒绝中给出的方向化主体，例如 `cp:read:/var/log/*` 和 `cp:write:/srv/releases/*`。

## 权限组

权限组 ID 可以是 `builtin:<名称>`、`ext:<名称>` 或用户组数字 ID。内置组和扩展组只读，需要先复制再修改。

```bash
opsctl policy group list --type command
opsctl policy group show builtin:linux-readonly
opsctl policy group copy builtin:linux-readonly --name production-readonly
opsctl policy group allow 5 -- 'journalctl *'
opsctl policy group rm 5 3
opsctl policy group rm 5
opsctl policy attach web-01 5
opsctl policy detach web-01 5
```

策略类型包括 `command`、`query`、`redis`、`mongo`、`kafka`、`k8s`、`etcd`、`oss`。权限组类型与目标不兼容时会在写入前失败。

## 非交互授权

`exec`、`cp`、`batch` 没有命中规则，且既无交互终端也无法连接桌面审批服务时，会以退出码 3 停止：stderr 首行固定为 `NEEDS AUTHORIZATION`，后面给出可直接复制的 `opsctl policy allow ...`。真人需在自己的终端运行并确认，再重试原操作。

`create`、`update`、`delete` 没有可被规则预授权的操作主体，相同条件下会输出 `NEEDS TTY`；请由真人交互执行原命令。
