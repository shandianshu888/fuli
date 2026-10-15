---
title: "软路由 OpenWrt / iStoreOS 全屋科学上网指南：PassWall 与 OpenClash 选型、旁路由配置与防 DNS 污染实战"
description: "2026 年最新家庭与工作室全屋透明网络加速完全教程，深度对比 OpenClash、PassWall 与 HomeProxy，详解主路由/旁路由拓扑组网、DNS 分流防污染与游戏主机加速实操。"
publishDate: 2026-10-15
updatedDate: 2026-10-15
author: "林舟"
reviewer: "编辑部"
category: knowledge
tags: ["软路由", "OpenWrt", "iStoreOS", "OpenClash", "PassWall", "旁路由"]
cover: "../../assets/cover-guide.svg"
coverAlt: "家庭主路由与旁路由透明网关网络拓扑分流原理图"
draft: false
featured: true
sources:
  - title: "OpenWrt Project Official Network Configuration Guide"
    url: "https://openwrt.org/docs/guide-user/network/start"
    publisher: "OpenWrt Community"
    accessed: 2026-10-15
  - title: "RFC 7871: Client Subnet in DNS Queries (EDNS0)"
    url: "https://www.rfc-editor.org/rfc/rfc7871"
    publisher: "IETF"
    accessed: 2026-10-15
faq:
  - question: "全屋加速应该选择将软路由作为主路由还是旁路由？"
    answer: "强烈建议新手与家庭用户采用‘主路由拨号 + 软路由旁网关’的旁路由拓扑。主路由负责 PPPoE 拨号与 DHCP 广播，即便软路由需要重启升级或配置调整，全屋的基础网络、智能家居与电视盒子也不会出现全局断网事故。"
  - question: "OpenClash 与 PassWall 到底该选哪一个？"
    answer: "如果追求可视化仪表盘、精细的策略组按需选择及流媒体分流，推荐使用搭载 Mihomo 内核的 OpenClash；如果软路由硬件配置较低（如经典斐讯 N1、单核百兆盒子）或追求极简的节点故障自动无缝切换，PassWall 具有更低的内存占用与启动耗时。"
seoTitle: "软路由OpenWrt全屋科学上网指南：旁路由与分流配置手册"
noindex: false
---

**核心结论先行：在多设备共存的现代家庭与小型工作室场景中，在手机、平板、电脑和 Apple TV 上分别安装客户端不仅繁琐低效，更容易遭遇后台被杀进程、休眠断连以及游戏主机（Switch / PS5 / Xbox）无法便捷配置代理的物理瓶颈。依托 OpenWrt 或 iStoreOS 构建基于软路由的“全屋透明加速网关”，能够一次性实现局域网内任意终端无需安装额外软件、开箱即享低延迟专线加速。然而，软路由配置的核心难点不在于导入订阅，而在于‘旁网关网络拓扑’与‘DNS 双向防污染分流’的精确构建。**

---

## 一、软路由全屋加速网络拓扑规划：主路由 vs 旁路由

### 方案 A：单臂/双网口软路由作为主路由（All-in-One 模式）
- **拓扑逻辑**：光猫（桥接模式）→ 软路由 WAN 口（PPPoE 拨号并运行加速插件）→ 软路由 LAN 口 → AP / 交换机。
- **优缺点**：性能压榨极致，但容错率较低。一旦软路由发生插件死锁或系统崩溃，全屋网络彻底瘫痪，家人的日常上网将受到直接冲击。

### 方案 B：旁路由（旁网关 Bypass Gateway）模式 —— 推荐首选
- **拓扑逻辑**：
  1. 家用硬路由（如华硕、小米、TP-Link）负责光猫拨号，开启常规 DHCP 服务器；
  2. 软路由（OpenWrt / iStoreOS）仅插一根网线接入硬路由的 LAN 口，分派一个固定的局域网静态 IP（如 `192.168.1.2`）；
  3. 需要全屋透明加速的特定设备（如个人 Mac、海外电视盒子），只需将其网络设置中的“网关（Gateway）”与“DNS”手动指向软路由的 IP（`192.168.1.2`）；
  4. 其他不需要加速的老人手机、智能扫地机等仍默认走硬路由（`192.168.1.1`）。
- **核心优势**：**物理隔离、零试错成本、故障零波及**。

---

## 二、主流软路由核心插件深度选型对比

| 评测维度 | OpenClash (Mihomo 内核) | PassWall | HomeProxy (Sing-box 内核) |
| :--- | :--- | :--- | :--- |
| **底层内核架构** | Clash Meta / Mihomo 现代化内核 | Xray / Trojan-Go / V2Ray 多内核调度 | 原生 Sing-box 纯 Go 模块化内核 |
| **内存与硬件开销** | 较高（建议 512MB 以上可用内存） | 极低（128MB 内存亦可流畅运转） | 极低（内存占用约 30MB 左右） |
| **可视化与策略控制** | 顶级（独立 Web 面板、分流图形化拖拽） | 基础（基于原生 LuCI 表单管理） | 现代（iStoreOS 官方深度定制界面） |
| **前沿协议支持度** | 全面支持 Hysteria 2、Reality、Trojan | 支持丰富，但部分协议需要单独依赖包 | 原生秒级支持前沿 UDP/QUIC 协议栈 |
| **适用人群** | 主力 x86 软路由、追求精细分流者 | ARM 盒子（N1 等）、极简轻量追求者 | iStoreOS 玩家、极客开发者 |

---

## 三、旁路由网络参数配置标准三步法

很多新手在配置旁路由时最容易踩的坑是：**“配置完毕后设备不仅连不上外网，甚至连局域网后台都打不开了”**。请严格按照以下步骤核验：

### 步骤 1：OpenWrt LAN 接口基础设置
- **IPv4 地址**：设置为与主路由同网段的不冲突静态地址（例如主路由为 `192.168.1.1`，软路由填 `192.168.1.2`）；
- **IPv4 子网掩码**：`255.255.255.0`；
- **IPv4 网关**：必须指向主路由的真实地址（`192.168.1.1`）；
- **自定义 DNS 服务器**：同样指向主路由（`192.168.1.1`）或可信公共 DNS（如 `223.5.5.5`）；
- **DHCP 服务**：勾选 **“忽略此接口”**（确保局域网内只有一个 DHCP 服务器在发号）。

### 步骤 2：核心“防火墙自定义规则（iptables/nftables）”补丁
在旁路由拓扑中，数据包往往呈现“单臂环形”流动，Linux 内核默认会因源地址非对称路由而丢弃数据包。必须在软路由 `网络 -> 防火墙 -> 自定义规则` 中添加以下伪装规则（NAT Masquerade）：
```bash
iptables -t nat -A PREROUTING -p udp --dport 53 -j REDIRECT --to-ports 53
iptables -t nat -A PREROUTING -p tcp --dport 53 -j REDIRECT --to-ports 53
iptables -t nat -A POSTROUTING -j MASQUERADE
```
> [!IMPORTANT]
> 如果你的 OpenWrt 版本已全面迁移到 `nftables`（FW4），无需手动编写 iptables，直接在防火墙常规设置中将 LAN 区域的“IP 动态伪装”选项打勾即可。

### 步骤 3：DNS 科学分流防污染配置（ChinaDNS-NG / Dnsmasq）
网络加速不仅是转发 TCP/UDP 数据，DNS 解析才是首要门神：
- **国内域名（ChinaList）**：由 `223.5.5.5` 或运营商本地 DNS 经由直连网络解析，返回国内最优 CDN 节点 IP，防止网页打开慢、排版错乱；
- **海外域名（GFWList）**：由经过代理安全加密的境外 DNS（如 `8.8.8.8` 或 `1.1.1.1` 通过 DoH/DoT）解析，杜绝 DNS 投毒与污染，确保秒级获取真实海外 IP。

---

## 四、安全运行与日常排错指南

1. **避免多重代理套娃**：终端设备既然已经指向了软路由透明网关，本机电脑上就不应再重复运行系统级客户端，否则双层 NAT 与多重 TUN 虚拟网卡容易造成连接死锁与严重的带宽损耗。
2. **警惕高并发下的软路由发热与降频**：部分基于 J1900、N4100 或工控机的小主机，在进行千兆并发测速或运行 Hysteria 2 高强度解密时 CPU 占用会骤升，应确保散热片通风良好，防止高温死机。
