export const SITE = {
  name: '福利机场观察',
  description: '面向中文网络服务用户的独立内容博客，提供服务选择、方案对比、知识科普、福利信息与风险观察。',
  url: 'https://fulijichang.com',
  author: '编辑部',
};

export const CATEGORIES = {
  recommend: { name: '机场推荐', path: '/recommend/', intro: '用透明标准梳理选择方法与公开信息，帮助不同需求的读者建立候选清单。' },
  compare: { name: '机场对比', path: '/compare/', intro: '围绕价格、条款、售后和使用场景，提供可复核的横向比较框架。' },
  reviews: { name: '机场测评', path: '/reviews/', intro: '按推荐顺序整理 16 项服务，从线路、稳定性、高峰期、节假日、套餐和售后维度建立选择依据。' },
  knowledge: { name: '知识库', path: '/knowledge/', intro: '收录 35 篇小火箭、Clash、Platy、机场与 VPN 基础、故障排查和风险合规指南。' },
  deals: { name: '福利中心', path: '/deals/', intro: '汇总机场推荐榜优惠码、折后价格与适用套餐，并提供复制、核验和购买风险提示。' },
  risk: { name: '风险与失联观察', path: '/risk/', intro: '整理机场失联、停服与“跑路机场”相关的历史公开记录，帮助读者区分临时故障和持续异常，并提供购买前预防、证据保存、账户安全与损失控制方法。' },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;
