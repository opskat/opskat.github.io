---
sidebar_label: 更新日志
sidebar_position: 100
---

# 更新日志

## v1.9.1 (2026-06-16)

v1.9.1 是一个补丁版本，修复了 ZMODEM(rz/sz) 终端传输二进制文件损坏的问题，并优化了终端高亮链接的点击交互。

### 🐛 Bug 修复

- 🐛 修复 ZMODEM(rz/sz) 终端传输二进制文件损坏 ([#198](https://github.com/opskat/opskat/pull/198)) (by @CodFrm)

### 🎨 UI 改进

- 🎨 终端高亮链接改为仅左键点击弹出浏览器，避免误触 ([#193](https://github.com/opskat/opskat/pull/193)) (by @wfion)

**完整更新记录**: [v1.9.0...v1.9.1](https://github.com/opskat/opskat/compare/v1.9.0...v1.9.1)

## v1.9.0 (2026-06-15)

本次版本以**终端文件传输**为核心：新增 lrzsz (ZMODEM rz/sz) 终端文件传输并支持直接拖拽文件到 SSH 终端上传；数据库/中间件资产支持 SOCKS5 代理连接；新增 WindTerm 配置导入、AI 插件单独卸载、终端服务器状态弹窗等功能；并修复 PostgreSQL 表树 schema 展示、Windows ConPTY 本地终端无输出、分屏同步等多个问题。

### 🚀 主要新功能

- 💥 终端文件传输：新增 lrzsz (ZMODEM rz/sz) 终端文件传输，并支持直接拖拽文件到 SSH 终端通过 rz 上传 ([#170](https://github.com/opskat/opskat/pull/170)) ([#177](https://github.com/opskat/opskat/pull/177)) (by @CodFrm, @wfion)
- ✨ 数据库/中间件资产支持 SOCKS5 代理连接 ([#175](https://github.com/opskat/opskat/pull/175)) (by @CodFrm)
- ✨ 新增 WindTerm 配置导入 ([#166](https://github.com/opskat/opskat/pull/166)) (by @wfion)
- ✨ AI 插件支持单独卸载 ([#184](https://github.com/opskat/opskat/pull/184)) (by @wfion)
- ✨ 新增终端服务器状态弹窗 ([#157](https://github.com/opskat/opskat/pull/157)) (by @2849236173)
- ✨ 优化终端复制粘贴与快捷键设置 ([#185](https://github.com/opskat/opskat/pull/185)) (by @CodFrm)
- ✨ 优化 SSH 密钥导入导出 [#161](https://github.com/opskat/opskat/issues/161) ([#163](https://github.com/opskat/opskat/pull/163)) (by @CodFrm)
- ✨ 记住 WebDAV 备份参数 ([#186](https://github.com/opskat/opskat/pull/186)) (by @wfion)
- ✨ DDL 弹窗 SQL 语法高亮 ([#145](https://github.com/opskat/opskat/pull/145)) (by @wfion)

### 🐛 Bug 修复

- 🐛 修复 PostgreSQL 表树漏显示非 public schema 表 [#187](https://github.com/opskat/opskat/issues/187) ([#188](https://github.com/opskat/opskat/pull/188)) (by @CodFrm)
- 🐛 修复 Windows ConPTY 本地终端无输出 [#164](https://github.com/opskat/opskat/issues/164) ([#165](https://github.com/opskat/opskat/pull/165)) (by @Joker764)
- 🐛 修复分屏后终端与文件管理器同步问题 ([#180](https://github.com/opskat/opskat/pull/180)) (by @wfion)
- 🐛 修复服务器状态窗口刷新时抖动 ([#168](https://github.com/opskat/opskat/pull/168)) (by @2849236173)
- 🐛 修复 Tabby 密钥认证导入 ([#162](https://github.com/opskat/opskat/pull/162)) (by @CodFrm)
- 🐛 修复终端右键粘贴多行内容换行符不识别 [#146](https://github.com/opskat/opskat/issues/146) ([#158](https://github.com/opskat/opskat/pull/158)) (by @CodFrm)
- 🐛 修复多开同一连接后 tab 卡死（终端会话 ID 增加随机实例段） ([#143](https://github.com/opskat/opskat/pull/143)) (by @CodFrm)
- 🐛 修复审批激活还原最大化窗口 [#148](https://github.com/opskat/opskat/issues/148) ([#154](https://github.com/opskat/opskat/pull/154)) (by @CodFrm)
- 🐛 修复命令面板 tab 标签未使用 i18n 翻译 ([#172](https://github.com/opskat/opskat/pull/172)) (by @YangFong)

### 🎨 UI 改进

- 🎨 文件管理器新增上传按钮 [#147](https://github.com/opskat/opskat/issues/147) ([#149](https://github.com/opskat/opskat/pull/149)) (by @CodFrm)
- 🎨 终端 URL 高亮并支持点击用浏览器打开 ([#153](https://github.com/opskat/opskat/pull/153)) (by @wfion)
- 🎨 设置页改用 scrollbar-gutter 预留滚动条槽位，消除切 Tab 抖动 ([#167](https://github.com/opskat/opskat/pull/167)) (by @YangFong)
- 🎨 优化右键菜单弹出方向 ([#151](https://github.com/opskat/opskat/pull/151)) (by @CodFrm)

**完整更新记录**: [v1.8.0...v1.9.0](https://github.com/opskat/opskat/compare/v1.8.0...v1.9.0)

## v1.8.0 (2026-06-04)

本次版本新增本地终端资产（local），可在应用内直接打开本机 shell / PowerShell / WSL 终端并支持分屏；资产类型选择器升级为带图标、分组与搜索的下拉并统一类型清单；macOS 快捷键新增 Ctrl 支持与 ⌘⇄⌃ 一键切换；同时更新了 macOS/Windows 应用图标，并将复制等成功提示移到顶部居中。

### 🚀 主要新功能

- 💥 新增本地终端资产 (local)：在应用内直接打开本机 shell / PowerShell / WSL 终端，支持分屏（新开同配置 shell）并隐藏 Windows 终端黑窗 [#70](https://github.com/opskat/opskat/issues/70) ([#140](https://github.com/opskat/opskat/pull/140)) (by @CodFrm)
- ✨ 资产类型选择器升级为图标 + 分组 + 搜索的下拉，统一类型清单 ([#142](https://github.com/opskat/opskat/pull/142)) (by @CodFrm)
- ✨ macOS 快捷键支持 Ctrl，并提供 ⌘⇄⌃ 一键切换 [#138](https://github.com/opskat/opskat/issues/138) ([#139](https://github.com/opskat/opskat/pull/139)) (by @CodFrm)

### 🐛 Bug 修复

- 🐛 修复资产类型过滤下拉滚动高度 (by @CodFrm)

### 🎨 UI 改进

- 🎨 更新 macOS / Windows 应用图标（Windows 图标填满图块） [#134](https://github.com/opskat/opskat/issues/134) (by @CodFrm)
- 🎨 复制等成功提示移到顶部居中并缩短停留时间 [#135](https://github.com/opskat/opskat/issues/135) (by @CodFrm)

**完整更新记录**: [v1.7.0...v1.8.0](https://github.com/opskat/opskat/compare/v1.7.0...v1.8.0)

## v1.7.0 (2026-05-30)

本次版本新增 etcd 资产管理、SQL Server / SQLite 数据库资产，以及远程文件 external edit 全链路（含三方 merge 工作台）三大功能；SFTP 文件管理器大幅增强；优化资产树拖拽性能；并修复启动首页偏好、终端 PTY 尺寸、命令面板溢出、WebGL 字体渲染等问题。

### 🚀 主要新功能

- 💥 接入 etcd 资产管理：新增 etcd 资产类型、连接池与内置权限策略，支持 KV 浏览/查询/详情编辑与集群信息，接入 AI 工具链 [#122](https://github.com/opskat/opskat/issues/122) ([#129](https://github.com/opskat/opskat/pull/129)) (by @CodFrm)
- 💥 新增 SQL Server 与 SQLite 数据库资产：MSSQL 纯 Go 驱动支持直连 + SSH 隧道，SQLite 本地文件直连，查询面板方言/分页/只读拦截完整适配 [#120](https://github.com/opskat/opskat/issues/120) ([#128](https://github.com/opskat/opskat/pull/128)) (by @CodFrm)
- 💥 新增远程文件 external edit 全链路：远端文件拉起为本地副本持续编辑、自动回写，含三方 merge 工作台、pending 决策收口与重启恢复 ([#112](https://github.com/opskat/opskat/pull/112)) (by @2849236173)
- ✨ SFTP 文件管理器增强：新建文件/文件夹、重命名、剪切/复制/粘贴、多选下载/删除、拖拽移动、属性弹窗与权限/属主编辑（chmod/chown，可递归） ([#124](https://github.com/opskat/opskat/pull/124)) (by @youaremywind)
- ✨ SFTP 文件管理新增"复制文件路径"菜单项 ([#131](https://github.com/opskat/opskat/pull/131)) (by @youaremywind)

### ⚡️ 性能优化

- ⚡️ 优化资产树拖拽性能与单击响应延迟（拖动时 AssetRow 重渲染从 ~34/move 降到 ~0.68/move） (by @CodFrm)

### 🐛 Bug 修复

- 🐛 修复启动首页偏好失效 [#132](https://github.com/opskat/opskat/issues/132) ([#133](https://github.com/opskat/opskat/pull/133)) (by @CodFrm)
- 🐛 修复 SSH 终端初次挂载未同步 PTY 尺寸导致 vi 等全屏程序只显示一半 [#125](https://github.com/opskat/opskat/issues/125) (by @CodFrm)
- 🐛 修复命令面板内容过多时溢出弹层 [#126](https://github.com/opskat/opskat/issues/126) (by @CodFrm)
- 🐛 修复终端 WebGL 字体渲染异常 (by @CodFrm)

### ♻️ 重构与兼容性

- ♻️ opsctl cp 跳过审批，仅保留审计 (by @CodFrm)

**完整更新记录**: [v1.6.2...v1.7.0](https://github.com/opskat/opskat/compare/v1.6.2...v1.7.0)

## v1.6.2 (2026-05-18)

修复 xterm WebGL 终端选区高频更新时选中文字出现字体"变样"的渲染问题。

### 🎨 UI 改进

- 🎨 终端选区显式设置前景色，消除选区高频更新时选中文字字体变样 (by @CodFrm)

**完整更新记录**: [v1.6.1...v1.6.2](https://github.com/opskat/opskat/compare/v1.6.1...v1.6.2)

## v1.6.1 (2026-05-18)

修复 SSH 终端在按空格/大写字母时被 rollover 旁路误判而双发字符的回归；端口转发启停过程加上 loading 反馈，避免拨号期间用户误以为无响应反复点击导致连接被拆。

### 🐛 Bug 修复

- 🐛 修复 SSH 终端按空格被双发（rollover 旁路对走 keypress 路径的字符误判补发） (by @CodFrm)

### 🎨 UI 改进

- 🎨 端口转发启停增加 loading 反馈（按钮 spinner + 状态区"处理中…"，拨号中禁用资产下拉以防止隐式 restart） (by @CodFrm)

**完整更新记录**: [v1.6.0...v1.6.1](https://github.com/opskat/opskat/compare/v1.6.0...v1.6.1)

## v1.6.0 (2026-05-17)

本次版本新增串口（COM/TTY）资产与 AI 串口命令执行，为 AI 助手加入资产上下文选择能力，将 AI 子系统迁移到 cago-frame/agents 框架；新增 VSCode 风搜索/命令面板、资产树拖拽重排、SSH 资产右键文件管理、SSH 60s 保活心跳、Anthropic/OpenAI provider 思考模式等多项功能，并在数据库查询面板与 AI 流式输出做了显著性能优化；修复 SSH 私钥 + MFA 接续认证、更新后重启未自动启动、终端 IME 丢字、SSH Powerline/Nerd Font 渲染等多项问题。

### 🚀 主要新功能

- 💥 支持串口（COM/TTY）资产、终端连接与 AI 串口命令 ([#89](https://github.com/opskat/opskat/pull/89)) (by @fqscfqj)
- 💥 支持 AI 助手选择资产上下文 ([#121](https://github.com/opskat/opskat/pull/121)) (by @CodFrm)
- ✨ 顶部增加 VSCode 风搜索/命令面板与资产、AI 面板折叠按钮 ([#113](https://github.com/opskat/opskat/pull/113)) (by @CodFrm)
- ✨ SSH 资产右键支持一键打开文件管理 ([#104](https://github.com/opskat/opskat/pull/104)) (by @lonelyman0108)
- ✨ 资产树支持拖拽重排 + 修复嵌套分组添加资产回填错分组 ([#101](https://github.com/opskat/opskat/pull/101)) (by @lonelyman0108)
- ✨ 密钥关联用户名 + 资产表单根据所选密钥自动填 username ([#88](https://github.com/opskat/opskat/pull/88)) (by @CodFrm)
- ✨ SSH 60s 保活心跳 + 断开后回车重连 ([#81](https://github.com/opskat/opskat/pull/81)) (by @CodFrm)
- ✨ 新增公共 SSH 客户端包 ([#82](https://github.com/opskat/opskat/pull/82)) (by @CodFrm)
- ✨ 为 Anthropic provider 添加思考模式（reasoning effort）支持 ([#76](https://github.com/opskat/opskat/pull/76)) (by @CodFrm)
- ✨ 为 OpenAI 兼容 provider 添加思考模式（reasoning effort）支持 ([#74](https://github.com/opskat/opskat/pull/74)) (by @fqscfqj)
- ✨ 保存窗口尺寸配置 (by @CodFrm)

### ⚡️ 性能优化

- ⚡️ 数据库查询面板连接复用 + OpenTable 首屏合并 + 大表虚拟化 ([#116](https://github.com/opskat/opskat/pull/116)) (by @CodFrm)
- ⚡️ AI 流式输出性能优化 + 组件拆分重构 ([#93](https://github.com/opskat/opskat/pull/93)) (by @CodFrm)

### ♻️ 重构

- ♻️ 将 AI 子系统迁移到 cago-frame/agents 框架 ([#92](https://github.com/opskat/opskat/pull/92)) (by @CodFrm)
- ♻️ 代码瘦身与前端体验优化 ([#119](https://github.com/opskat/opskat/pull/119)) (by @CodFrm)
- ♻️ AI 本地工具改名 local_* 与远程工具视觉隔离 ([#110](https://github.com/opskat/opskat/pull/110)) (by @CodFrm)

### 🔒 安全性

- 🔒 加固组合命令权限校验 ([#107](https://github.com/opskat/opskat/pull/107)) (by @CodFrm)

### 🐛 Bug 修复

- 🐛 修复 SSH 私钥认证后无法继续 keyboard-interactive(MFA/OTP) ([#109](https://github.com/opskat/opskat/pull/109)) (by @CodFrm)
- 🐛 修复更新后立即重启未自动启动 ([#106](https://github.com/opskat/opskat/pull/106)) (by @CodFrm)
- 🐛 修复 SSH 终端 Powerline/Nerd Font 图标渲染为方框 + 字体下拉改读系统字体推荐/其他两区 + 主题切换回显当前选中 ([#103](https://github.com/opskat/opskat/pull/103)) (by @lonelyman0108)
- 🐛 设置子标签持久化 + 资产测试连接可取消 + 重构资产表单布局 ([#102](https://github.com/opskat/opskat/pull/102)) (by @lonelyman0108)
- 🐛 修复 SFTP 传输进度 tab 作用域 ([#95](https://github.com/opskat/opskat/pull/95)) (by @CodFrm)
- 🐛 Terminal IME：旁路 xterm key-rollover input 丢字 bug ([#105](https://github.com/opskat/opskat/pull/105)) (by @CodFrm)
- 🐛 Terminal IME：抽 TerminalInputBridge + isComposing 早返回 [#94](https://github.com/opskat/opskat/issues/94) ([#98](https://github.com/opskat/opskat/pull/98)) (by @CodFrm)
- 🐛 修复 AI 助手输入框快捷换行 ([#111](https://github.com/opskat/opskat/pull/111)) (by @CodFrm)
- 🐛 修复未分组资产树展开 ([#73](https://github.com/opskat/opskat/pull/73)) (by @CodFrm)
- 🐛 修复 AI mention 弹出兜底 ([#72](https://github.com/opskat/opskat/pull/72)) (by @CodFrm)

### 📄 文档

- 📄 为 README 添加介绍视频链接 ([#87](https://github.com/opskat/opskat/pull/87)) (by @Pililink)

**完整更新记录**: [v1.5.0...v1.6.0](https://github.com/opskat/opskat/compare/v1.5.0...v1.6.0)

## v1.5.0 (2026-05-06)

本次版本带来 K8S 资产与集群资源管理、Kafka 管理两大全新模块，Redis 管理面板大幅完善，新增 VSCode 风格的 Cmd+P 快速打开、终端字体预设、终端与在线目录的 cwd 双向同步；MySQL 完善了表格编辑、导入导出与筛选流程，并对资产路径做了重构以优化前端打包体积；同时修复了 AI 误传 group_id=0/parent_id=0 导致资产或分组被意外解绑、SSH 登录提示被遮挡、设置页配置 AI 提供商后助手仍要求重新配置等多项问题。

### 🚀 主要新功能

- 💥 支持 K8S 资产与集群资源管理 ([#58](https://github.com/opskat/opskat/pull/58)) (by @shanaiardor)
- 💥 支持 Kafka 管理 ([#68](https://github.com/opskat/opskat/pull/68)) (by @Pililink)
- ✨ 完善 Redis 管理体验与运维面板 ([#53](https://github.com/opskat/opskat/pull/53)) (by @Pililink)
- ✨ 完善 MySQL 表格编辑、导入导出与筛选流程 ([#59](https://github.com/opskat/opskat/pull/59)) (by @youaremywind)
- ✨ Cmd+P 快速打开（VSCode 风格） ([#55](https://github.com/opskat/opskat/pull/55)) (by @CodFrm)
- ✨ 支持终端字体预设 ([#66](https://github.com/opskat/opskat/pull/66)) (by @CodFrm)
- ✨ 终端与在线目录支持 cwd 双向同步 ([#63](https://github.com/opskat/opskat/pull/63)) (by @2849236173)
- ✨ database 表右键菜单支持删除表/清空表，二次确认避免误操作 (by @CodFrm)

### 🐛 Bug 修复

- 🐛 修复 SSH 登录提示被隐藏 ([#67](https://github.com/opskat/opskat/pull/67)) (by @CodFrm)
- 🐛 修复 AI 误传 group_id=0/parent_id=0 导致资产或分组被意外解绑 (by @CodFrm)
- 🐛 修复首次在设置中配置 AI 提供商后助手仍要求重新配置 [#61](https://github.com/opskat/opskat/issues/61) (by @CodFrm)
- 🐛 修复侧边助手发送后输入框未清空 [#60](https://github.com/opskat/opskat/issues/60) (by @CodFrm)
- 🐛 修复数据库树刷新功能 (by @CodFrm)
- 🐛 修复 SSH 资产测试连接未传递托管密码凭据 [#57](https://github.com/opskat/opskat/issues/57) (by @CodFrm)

### ♻️ 重构

- ♻️ 重构资产路径并优化前端打包体积 ([#64](https://github.com/opskat/opskat/pull/64)) (by @CodFrm)

**完整更新记录**: [v1.4.1...v1.5.0](https://github.com/opskat/opskat/compare/v1.4.1...v1.5.0)

## v1.4.1 (2026-04-28)

本次版本对资产树和 SSH 终端做了体验优化，并修复非中英文系统下 i18n 兜底语言的问题。

### ✨ 新功能

- ✨ 资产树支持隐藏空文件夹 (by @CodFrm)
- ✨ SSH 终端回滚缓冲区可配置，默认调整为 25000 行 (by @CodFrm)

### 🐛 Bug 修复

- 🐛 修复非中英文系统下 i18n 兜底为中文的问题 (by @CodFrm)

**完整更新记录**: [v1.4.0...v1.4.1](https://github.com/opskat/opskat/compare/v1.4.0...v1.4.1)

## v1.4.0 (2026-04-27)

本次版本带来代码片段（Snippets）复用系统与 WebDAV 备份提供方，AI 助手扩展为多会话标签栏并支持会话重命名、历史消息编辑重发与工具卡片展开；首页分区与设置页完成整合，资产树新增类型筛选，Redis 面板补齐 Stream 类型展示；同时修复了终端分屏内容丢失、Ctrl+A 全选、DeepSeek thinking 模式 400 等多项问题。

### 🚀 主要新功能

- 💥 代码片段（Snippets）复用系统 (by @CodFrm)
- 💥 新增 WebDAV 备份提供方 ([#47](https://github.com/opskat/opskat/pull/47)) (by @Pililink)
- 💥 侧边 AI 助手多会话标签与右侧会话栏 ([#35](https://github.com/opskat/opskat/pull/35)) (by @2849236173)
- ✨ 新增 AI 会话重命名功能 ([#38](https://github.com/opskat/opskat/pull/38)) (by @2849236173)
- ✨ 支持 AI 对话编辑历史消息后重发 ([#30](https://github.com/opskat/opskat/pull/30)) (by @2849236173)
- ✨ AI 工具卡片可展开查看调用参数 (by @CodFrm)
- ✨ AI 资产工具补齐密码/私钥/分组管理并触发左侧树刷新 (by @CodFrm)
- ✨ 实现 Redis Stream 类型数据展示 ([#36](https://github.com/opskat/opskat/pull/36)) (by @shanaiardor)
- ✨ 资产树类型筛选 + 移除 Sidebar 分区按钮 ([#51](https://github.com/opskat/opskat/pull/51)) (by @CodFrm)
- ✨ 首页分区与设置页整合，修复列表交互状态 ([#37](https://github.com/opskat/opskat/pull/37)) (by @tangqiu0205)
- ✨ 设置页新增 Bug 反馈、Debug 日志开关与打开日志目录 (by @CodFrm)
- ✨ 设置页显示仓库地址 ([#45](https://github.com/opskat/opskat/pull/45)) (by @Pililink)
- ✨ 扩展框架支持通用 TCP IO、deadline、action 取消与 textarea 格式化 ([#31](https://github.com/opskat/opskat/pull/31)) (by @CodFrm)

### 🐛 Bug 修复

- 🐛 修复 SSH 分屏后已存在终端内容被清空 (by @CodFrm)
- 🐛 修复 Ctrl+A 全选导致整页文本被选中 [#48](https://github.com/opskat/opskat/issues/48) (by @CodFrm)
- 🐛 修复终端 Ctrl+F 硬编码导致用户改绑无效 ([#32](https://github.com/opskat/opskat/pull/32)) (by @CodFrm)
- 🐛 修复 DeepSeek thinking 模式下多轮对话报 400 错误的问题 ([#42](https://github.com/opskat/opskat/pull/42)) (by @shanaiardor)
- 🐛 修复 Windows 环境下 OpenDirectory 因隐藏界面而无法正常显示 explorer 的问题 ([#41](https://github.com/opskat/opskat/pull/41)) (by @shanaiardor)
- 🐛 修复 GitHub Releases 手动安装链接 ([#50](https://github.com/opskat/opskat/pull/50)) (by @Pililink)

**完整更新记录**: [v1.3.0...v1.4.0](https://github.com/opskat/opskat/compare/v1.3.0...v1.4.0)

## v1.3.0 (2026-04-23)

本次版本带来侧边 AI 助手面板与全新 Sidebar 布局，数据库面板补齐建库/建表/设计表全流程并接入 Monaco 编辑器，AI 对话支持 @ 提及资产与 Token 用量展示，同时大幅优化查询面板性能，修复了 AI 助手、SSH/SOCKS 代理、终端等大量稳定性问题。

### 🚀 主要新功能

- ✨ 侧边 AI 助手面板：aiStore 重构 + 常驻 SideAssistantPanel ([#18](https://github.com/opskat/opskat/pull/18)) (by @CodFrm)
- ✨ 侧边 Tab 布局：ActivityBar → Sidebar 合并 + 左右布局切换 ([#17](https://github.com/opskat/opskat/pull/17)) (by @CodFrm)
- ✨ 数据库面板补齐建库/建表/设计表流程并统一 SQL 预览确认 ([#27](https://github.com/opskat/opskat/pull/27)) (by @tangqiu0205)
- ✨ 数据库面板接入 Monaco 编辑器并优化查询体验 (by @CodFrm)
- ✨ AI 对话 @ 提及资产 + 统一资产搜索（支持拼音） ([#22](https://github.com/opskat/opskat/pull/22)) (by @CodFrm)
- ✨ AI 对话框展示 Token 用量 + 复制优化 (by @CodFrm)
- ✨ MongoDB 结果面板向 database 对齐：复用 QueryResultTable + FILTER/SORT 查询栏 (by @CodFrm)
- ✨ 资产分组折叠状态持久化 (by @CodFrm)

### ⚡️ 性能优化

- ⚡️ 查询面板编辑/拖拽/渲染链路重构，消除键入与拖拽卡顿 (by @CodFrm)

### 🐛 Bug 修复

- 🐛 修复 AI 助手 run_command 卡死与会话丢失问题 ([#20](https://github.com/opskat/opskat/pull/20)) (by @2849236173)
- 🐛 修复 AI 助手复制与输入历史交互 ([#25](https://github.com/opskat/opskat/pull/25)) (by @2849236173)
- 🐛 修复 AI 助手侧边历史下拉无法滚动且删除无效 (by @CodFrm)
- 🐛 修复切换 AI 供应商后仍使用旧 provider 的问题 (by @CodFrm)
- 🐛 修复关闭软件时丢失 AI 对话在途内容 (by @CodFrm)
- 🐛 修复 AI 停止会话在 SFTP 文件传输时卡死的问题 (by @CodFrm)
- 🐛 统一 SSH dial 路径，修复 AI 命令忽略 SOCKS5 代理 (by @CodFrm)
- 🐛 移除 SOCKS4 / HTTP 代理类型残留 (by @CodFrm)
- 🐛 修复 SSH 资产从跳板机切回直连后保存不生效 (by @CodFrm)
- 🐛 修复 PostgreSQL 表格内联编辑生成 UPDATE 时 WHERE 列出所有列 (by @CodFrm)
- 🐛 修复 SSH 终端右键菜单关闭后失去焦点 (by @CodFrm)
- 🐛 修复 IME 合成中 Enter 误触发问题 (by @CodFrm)
- 🐛 修复页面切换时文字重叠残影 ([#26](https://github.com/opskat/opskat/pull/26)) (by @tangqiu0205)
- 🐛 修复 Tab 过滤弹窗被 DropdownMenu 卸载误关 / 退出动画 focus-outside 问题 (by @CodFrm)

### 🎨 UI 改进

- 🎨 Tab 过滤入口文案改为"查找标签页"并修复 DatabasePanel 格式 (by @CodFrm)

**完整更新记录**: [v1.2.0...v1.3.0](https://github.com/opskat/opskat/compare/v1.2.0...v1.3.0)

## v1.2.0 (2026-04-16)

本次版本新增 MongoDB 完整集成支持，优化了终端和查询面板的交互体验。

### 🚀 主要新功能

- ✨ MongoDB 集成：完整的 MongoDB 资产管理与查询功能 ([#15](https://github.com/opskat/opskat/pull/15)) (by @CodFrm)
- ✨ SSH 终端复制提示

### 🎨 UI 改进

- ✨ 优化 tab 栏：等宽压缩自适应 + 颜色指示条
- ✨ SQL 查询分页、结果表列宽调整与终端快捷键提示

**完整更新记录**: [v1.1.0...v1.2.0](https://github.com/opskat/opskat/compare/v1.1.0...v1.2.0)

## v1.1.0

### 新增功能

- **多 Provider AI 配置** — 基于数据库的 Provider 管理，支持完整 CRUD API。新增原生 Anthropic Messages API 支持，与 OpenAI 兼容 Provider 并存。
- **AI Agent 增强** — 动态系统提示词、Sub Agent 支持、并行工具执行、批量命令处理。
- **统一审批系统** — 合并 AI 与 opsctl 审批弹窗为统一工作流。支持批量确认、Grant 机制（可编辑命令模式）和记住模式。
- **AI 模型智能化** — 模型参数预设，选择模型时自动填充参数；上下文窗口自动压缩；Anthropic Prompt 缓存优化。
- **多资产权限申请** — `request_permission` 工具支持多资产 `items` 参数，与 `opsctl grant` 保持一致。
- **opsctl 改进** — Redis `-n` 参数切换数据库；`create/update asset` 支持 `--icon` 参数。

### UI/UX 改进

- **AI 设置向导重构** — 新增 opsctl 插件引导横幅，优化 Provider 选择卡片，提取共享 `AIProviderForm` 组件。
- **AI 对话 UI 重构** — Chat Header、角色标签、实色助手气泡、独立审批块渲染。
- **Terminal Aesthetic 主题** — 全新应用视觉风格。
- **AI 设置增强** — 从 API 获取模型列表、模型搜索选择器、Token 参数配置。
- **审批块优化** — single/batch/grant 三种类型差异化渲染；仅 pending 状态的审批打断消息流。
- **ToolBlock 与 AgentBlock 微调** — 优化间距、行高、运行状态指示器、错误状态图标。
- **GFM Markdown 支持** — AI 对话支持渲染 GitHub Flavored Markdown（表格、删除线、任务列表）。
- **数据库与 Redis UX** — 优化查询模块前端用户体验。

### Bug 修复

- 修复 Windows 下启动子进程黑窗一闪而过的问题
- 修复新建 SSH 资产默认端口为 6379 而非 22 的问题
- 修复 `SSHPool.Close()` 重复调用导致 panic
- 修复 opsctl `exec_sql`/`exec_redis`/`cp` 审计日志未记录决策和决策来源

### 后端改进

- **用户拒绝处理** — 用户拒绝命令时返回强制停止指令；系统提示词增加拒绝引导，防止 AI 尝试绕过。
- **并发安全** — 审批回调通过 context 传递会话 ID，替代实例变量。
- AI 模块错误信息统一为英文，提升 LLM 理解效果。

### 其他

- 添加 GPLv3 许可证
- 更新 README 链接至 opskat.github.io
- 新增审批按钮和批量操作的 i18n 翻译

**完整更新记录**: [v1.0.2...v1.1.0](https://github.com/opskat/opskat/compare/v1.0.2...v1.1.0)

## v1.0.2

### 新增功能

- **opsctl batch 命令** — 支持批量执行 SSH 命令、文件传输和数据库/Redis 操作
- **批量审批对话框** — 桌面应用中一次审批多个操作
- **插件系统重构** — `skill/` 目录迁移至 `plugin/`，支持多平台插件注册（Claude Code、Codex、Gemini CLI）
- **构建信息模块** — 将 commit ID 嵌入二进制文件，便于版本追溯

### 测试与质量

- 新增 16 个前端测试文件，覆盖 stores、hooks、组件和工具函数
- 新增 opsctl batch 命令测试和 GitHub 备份服务测试
- 改进 golangci-lint 错误处理：`os.Remove`/`os.RemoveAll` 改用 logger 记录错误，去除 `//nolint`

### CI/CD

- Release/Nightly 构建优化
- CI 集成前端 Vitest 测试

### 其他改进

- 前端组件无障碍属性完善
- 新增批量操作相关 i18n 翻译
- GitHub 备份服务重构
- 自动更新服务修复

**完整更新记录**: [v1.0.1...v1.0.2](https://github.com/opskat/opskat/compare/v1.0.1...v1.0.2)

## v1.0.0

OpsKat 是一款服务器资产管理与远程运维桌面应用，集成 AI 智能助手，支持 SSH 终端、数据库查询、Redis 操作和文件传输。

### 主要功能

- **资产管理** — 服务器、数据库、Redis 资产的分组与管理，支持凭证加密存储
- **SSH 终端** — 多标签页终端，支持分屏、跳板机链式连接、端口转发和 SOCKS 代理
- **数据库查询** — MySQL / PostgreSQL 查询编辑器，支持 SSH 隧道连接
- **Redis 操作** — Redis 命令执行，支持 SSH 隧道连接
- **SFTP 文件管理** — 远程文件浏览与传输
- **AI 智能助手** — 支持 OpenAI 兼容 API、Claude CLI、Codex CLI 多种后端，可通过自然语言执行运维操作
- **安全策略** — SSH 命令、SQL 语句、Redis 命令三类策略，支持策略组继承和预审批授权
- **审计日志** — 所有操作自动记录，可追溯查询
- **opsctl CLI** — 独立命令行工具，支持资产管理、远程执行、文件传输等操作

**完整更新记录**: [v1.0.0](https://github.com/opskat/opskat/commits/v1.0.0)
