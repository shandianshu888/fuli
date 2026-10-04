export interface RecommendedService {
  name: string;
  url: string;
  featured: boolean;
  coupon?: string;
  couponLabel?: string;
  discountRate?: number;
  recommendation?: string;
  researchNote?: string;
  sources?: Array<{ label: string; url: string }>;
  plans?: Array<{
    name: string;
    period: string;
    quota: string;
    price: number;
    audience: string;
  }>;
}

// 前六名为固定编辑顺序；其余条目已随机排列并固定，避免页面刷新时排名变化。
export const recommendedServices: RecommendedService[] = [
  {
    name: '闪电鼠', url: 'https://chenpin.shandianshuaff.com/#/?code=m28TvPVX', featured: true, coupon: 'sd88',
    recommendation: '套餐跨度清晰，适合从轻量浏览到多设备影音需求的用户。',
    plans: [
      { name: '限时钜惠小包', period: '年付', quota: '60GB/月', price: 96, audience: '小流量、新手用户' },
      { name: '轻快版', period: '月付', quota: '120GB/月', price: 22, audience: '日常浏览、AI 与影音' },
      { name: '疾速版', period: '月付', quota: '250GB/月', price: 40, audience: '学习办公与多端使用' },
      { name: '雷霆版', period: '月付', quota: '500GB/月', price: 70, audience: '高频影音与多设备用户' },
    ],
  },
  {
    name: '大佬云', url: 'https://chenpin01.dalaoyunaff.com/#/?code=GQ6CL6Km', featured: true, coupon: 'dly88',
    recommendation: '同时提供月付、年付和一次性套餐，适合希望灵活选择周期的用户。',
    plans: [
      { name: '年付活动包', period: '年付', quota: '60GB/月', price: 96, audience: '小流量、新手用户' },
      { name: '初云入门版', period: '月付', quota: '130GB/月', price: 23, audience: '日常浏览、社交与学习' },
      { name: '凌云基础版', period: '月付', quota: '300GB/月', price: 43, audience: '工作、学习与休闲' },
      { name: '御云高级版', period: '月付', quota: '600GB/月', price: 73, audience: '远程办公与高需求影音' },
      { name: '闲云随心包', period: '一次性', quota: '78GB 总量', price: 99, audience: '低频、轻量使用' },
      { name: '悠云长享包', period: '一次性', quota: '160GB 总量', price: 199, audience: '长期低频、希望更多余量' },
    ],
  },
  {
    name: '环球梯', url: 'https://chenpingan01.huanqiutiaff.com/#/?code=FGCcYdFo', featured: true, coupon: 'hq66',
    recommendation: '覆盖年付、月付与一次性流量包，适合学生、个人和多人多设备场景。',
    plans: [
      { name: '学生套餐', period: '年付', quota: '60GB/月', price: 96, audience: '轻量学生与个人用户' },
      { name: '轻享', period: '月付', quota: '120GB/月', price: 22, audience: '日常浏览与轻量影音' },
      { name: '畅游', period: '月付', quota: '240GB/月', price: 39, audience: '中频使用与多设备用户' },
      { name: '尊享', period: '月付', quota: '600GB/月', price: 69, audience: '高频影音与多人使用' },
      { name: '随行包', period: '一次性', quota: '80GB 总量', price: 99, audience: '偶尔使用、不需要月付' },
      { name: '灵活包', period: '一次性', quota: '400GB 总量', price: 299, audience: '长期按需使用' },
    ],
  },
  {
    name: '榴莲云', url: 'https://chenpingan.liulianyunaff.com/#/?code=7pdjs9zt', featured: true, coupon: 'll88',
    recommendation: '月付流量档位丰富，适合从日常浏览到高流量影音的不同需求。',
    plans: [
      { name: '年付特惠版', period: '年付', quota: '60GB/月', price: 96, audience: '小流量、新手用户' },
      { name: '轻享包', period: '月付', quota: '140GB/月', price: 24, audience: '日常浏览与轻量影音' },
      { name: '畅享包', period: '月付', quota: '260GB/月', price: 40, audience: '学习、下载与中频影音' },
      { name: '尊享包', period: '月付', quota: '420GB/月', price: 60, audience: '高频使用与多设备用户' },
      { name: '榴莲王', period: '月付', quota: '750GB/月', price: 100, audience: '大流量影音与高频下载' },
    ],
  },
  {
    name: '云界线', url: 'https://chenpingan.yunjiexianaff.com/#/?code=xLJGaIHM', featured: true, coupon: 'yjx888',
    recommendation: '既有常规月付套餐，也有一次性流量包，适合希望控制订阅周期的用户。',
    plans: [
      { name: '年付小包', period: '年付', quota: '60GB/月', price: 96, audience: '小流量、新手用户' },
      { name: '轻云基础版', period: '月付', quota: '150GB/月', price: 22, audience: '日常浏览、轻量影音' },
      { name: '凌云进阶版', period: '月付', quota: '300GB/月', price: 40, audience: '日常工作与中频使用' },
      { name: '御云尊享版', period: '月付', quota: '600GB/月', price: 66, audience: '高频影音与多设备' },
      { name: '闲云随心包', period: '一次性', quota: '100GB 总量', price: 99, audience: '低频、按需使用' },
      { name: '悠云长享包', period: '一次性', quota: '200GB 总量', price: 199, audience: '长期低频使用' },
    ],
  },
  {
    name: '神行加速', url: 'https://chenpingan01.shenxingaff.com/#/?code=RZ48f9wP', featured: true, coupon: 'sx0077',
    recommendation: '月付方案从基础到高流量覆盖，适合重视套餐梯度和多设备使用的用户。',
    plans: [
      { name: '基础包 120G', period: '月付', quota: '120GB/月', price: 23, audience: '日常浏览与轻量使用' },
      { name: '基础包 260G', period: '月付', quota: '260GB/月', price: 40, audience: '学习办公与中频影音' },
      { name: '尊享包', period: '月付', quota: '520GB/月', price: 72, audience: '高频影音与多设备用户' },
      { name: '年付特惠版', period: '年付', quota: '60GB/月', price: 96, audience: '小流量、新手用户' },
    ],
  },
  {
    name: '青云梯', url: 'https://inv02.qytaff.cc/register?aff=WkyKiasW', featured: false,
    recommendation: '公开资料多次提到低门槛年付小包，适合轻量使用者先核对结算页与流量规则。',
    researchNote: 'Bing 检索中，多处资料显示年付小包约 ¥96/年、60GB/月；另有页面显示 ¥99/年，存在版本或活动差异。月付档位公开摘要出现 ¥23 与 ¥34，具体流量需登录后核验。未找到可由本站确认仍有效的通用优惠码。',
    plans: [
      { name: '年付小包', period: '年付', quota: '60GB/月', price: 96, audience: '轻量浏览、预算敏感用户' },
      { name: '极速版', period: '月付', quota: '流量待核验', price: 23, audience: '希望先月付体验的用户' },
      { name: '流光版', period: '月付', quota: '流量待核验', price: 34, audience: '中等流量需求用户' },
    ],
    sources: [
      { label: 'Bing：Airport 年付小包摘要', url: 'https://airportvpn.top/' },
      { label: 'Bing：青云梯套餐摘要', url: 'https://qingyuntizi.my/' },
    ],
  },
  {
    name: '泡芙云', url: 'https://www.paofu.cloud/auth/register?code=qC0O', featured: false,
    recommendation: '公开结果提到月付、年付与专线方案，但价格摘要不足，适合先查看注册页当前套餐再做比较。',
    researchNote: 'Bing 可检索到多个套餐与 8 折活动介绍页面，但搜索摘要未提供可交叉核验的完整价格表和明确优惠码；部分结果还提示同名旧站或失效域名，购买前应确认域名、收款主体和售后入口。',
    sources: [
      { label: 'Bing：泡芙云公开站点摘要', url: 'https://www.paofu.cloud/' },
      { label: 'Bing：泡芙云套餐评测摘要', url: 'https://www.jichang.blog/posts/paofu-review/' },
    ],
  },
  {
    name: 'Flybit', url: 'https://www.fastfastfast.buzz/#/register?code=tuAiVVbP', featured: false,
    coupon: 'flybit', couponLabel: '公开资料称 9 折码', discountRate: 0.9,
    recommendation: '月付和不限时流量包并存，适合希望低门槛试用或按需购买流量的用户。',
    researchNote: '多处 Bing 结果一致提到月付 ¥15/128GB 起，以及不限时流量包 ¥36/128GB 起；优惠码 flybit 被多处页面标注为 9 折，但有效期与适用套餐仍应以结算页为准。',
    plans: [
      { name: '月付入门档', period: '月付', quota: '128GB/月', price: 15, audience: '日常浏览、轻量影音' },
      { name: '不限时流量包', period: '一次性', quota: '128GB 总量', price: 36, audience: '低频使用、按需消耗' },
    ],
    sources: [
      { label: 'Bing：Siilas 套餐摘要', url: 'https://siilas.com/airport/flybit/' },
      { label: 'Bing：NodeRadar 套餐摘要', url: 'https://noderadar.online/airports/flybit/' },
    ],
  },
  {
    name: '网际快车', url: 'https://johhhu.xn--66tw07h.com', featured: false,
    recommendation: '以不限时流量包和短期日享包为主要公开卖点，适合低频或临时需求用户比较。',
    researchNote: '多处 Bing 结果一致出现 ¥6.8/20GB 永久流量包，以及 ¥28 起的 30 天日享方案。未找到可确认仍有效的通用优惠码，套餐命名和节点规则请以登录后的商店为准。',
    plans: [
      { name: '永久流量包', period: '一次性', quota: '20GB 总量', price: 6.8, audience: '低频、备用需求' },
      { name: '日享方案', period: '30 天', quota: '流量待核验', price: 28, audience: '短期集中使用' },
    ],
    sources: [
      { label: 'Bing：Siilas 套餐摘要', url: 'https://siilas.com/airport/interexpress/' },
      { label: 'Bing：VPSKnow 评测摘要', url: 'https://vpsknow.com/reviews/airports/wangji-express-airport-review/' },
    ],
  },
  {
    name: '二猫云', url: 'https://server.ermaotztz3.homes/#/?code=Vf45aB7S', featured: false,
    coupon: 'TIZIZHINAN', couponLabel: '第三方页面标注 8 折', discountRate: 0.8,
    recommendation: '公开资料显示其采用月付分档并提供年付轻量方案，适合先从小档位核验体验。',
    researchNote: 'Bing 结果中多处出现 ¥20/100GB 月付起、¥89/年轻量包；第三方页面标注优惠码 TIZIZHINAN 为 8 折，另有节日活动按周期 8 折或 85 折。优惠是否可叠加、年付小包是否参与，应以结算页为准。',
    plans: [
      { name: '月付入门档', period: '月付', quota: '100GB/月', price: 20, audience: '日常浏览与轻量使用' },
      { name: '年付轻量包', period: '年付', quota: '流量待核验', price: 89, audience: '低频长期用户' },
    ],
    sources: [
      { label: 'Bing：二猫子套餐摘要', url: 'https://www.ermao.net/blog/ermaoyun/' },
      { label: 'Bing：梯子指南优惠摘要', url: 'https://tizizhinan.co/brands/ermaoyun/' },
    ],
  },
  {
    name: '边缘节点', url: 'https://bcbhk40y.ztymforedge.lol/#/?code=HgD5cJEh', featured: false,
    coupon: 'xk808', couponLabel: '公开资料称 8 折码', discountRate: 0.8,
    recommendation: '公开资料显示同时提供月付、年付和不限时流量包，适合希望比较多种付费周期的用户。',
    researchNote: 'Bing 结果对最低价存在 ¥9、¥15 与 ¥25 三种说法，可能对应不同套餐或时期。较具体的近期摘要列出 ¥15/50GB 月付、¥22/120GB 月付及 ¥98 年付 45GB/月，并提到优惠码 xk808；建议以结算页核验。',
    plans: [
      { name: '体验档', period: '月付', quota: '50GB/月', price: 15, audience: '轻量体验用户' },
      { name: '标准档', period: '月付', quota: '120GB/月', price: 22, audience: '日常浏览与影音' },
      { name: '年付轻量档', period: '年付', quota: '45GB/月', price: 98, audience: '长期低流量用户' },
    ],
    sources: [
      { label: 'Bing：YP7 套餐与优惠摘要', url: 'https://yp7.net/' },
      { label: 'Bing：Siilas 价格摘要', url: 'https://siilas.com/' },
    ],
  },
  {
    name: '大哥云', url: 'https://a03.dgy02.com/#/register?code=vjFaxWEI', featured: false,
    coupon: 'VPNOOL.COM', couponLabel: '第三方页面标注 85 折', discountRate: 0.85,
    recommendation: '公开资料多次出现 19.9 元入门月付方案，适合先用小额月付验证实际体验。',
    researchNote: '多个 Bing 结果一致显示 ¥19.9/100GB 月付起；第三方页面标注 VPNOOL.COM 为 85 折码。另有历史资料提到年付 ¥199/300GB 每月，但时间较早，未纳入当前价格表。',
    plans: [
      { name: '月付入门档', period: '月付', quota: '100GB/月', price: 19.9, audience: '新手、日常浏览用户' },
    ],
    sources: [
      { label: 'Bing：Tiziline 价格摘要', url: 'https://tiziline.com/posts/dageyun' },
      { label: 'Bing：二猫子评测摘要', url: 'https://www.ermao.net/blog/dageyun/' },
    ],
  },
  {
    name: '光速云', url: 'https://sjds8ds.guangsut.sbs/#/?code=RrfZcKT5', featured: false,
    recommendation: '公开资料显示套餐覆盖轻量到重度，并包含年付与一次性方案，适合比较多档流量需求。',
    researchNote: 'Bing 结果显示最低年付折算约 ¥8.25/月、59GB/月；常规月付摘要出现 ¥17 起或 ¥23 起，可能是套餐口径不同。检索结果明确写有“暂无”优惠码，因此不展示未经确认的折扣码。',
    plans: [
      { name: '年付轻量档', period: '年付折算', quota: '59GB/月', price: 8.25, audience: '低流量长期用户' },
      { name: '月付入门档', period: '月付', quota: '流量待核验', price: 17, audience: '希望短周期体验的用户' },
    ],
    sources: [
      { label: 'Bing：Tiziline 价格摘要', url: 'https://tiziline.com/' },
      { label: 'Bing：NodeUno 价格摘要', url: 'https://tech.nodeuno.com/' },
    ],
  },
  {
    name: '龙猫云', url: 'https://inv06.lmaff01.cc/register?aff=PIB8x7dJ', featured: false,
    coupon: 'mid85', couponLabel: '月/季/半年付 85 折', discountRate: 0.85,
    recommendation: '公开资料显示月付门槛较低，并提供按付款周期区分的折扣码，适合长期方案对比。',
    researchNote: 'Bing 结果出现 ¥15/100GB 月付和 ¥19.9 月付起两种公开摘要，可能来自不同活动或套餐版本。公开页面标注月付/季付/半年付使用 mid85，年付及更长周期使用 mid80；最终折扣请以结算页为准。',
    plans: [
      { name: '月付轻量档', period: '月付', quota: '100GB/月', price: 15, audience: '日常浏览、轻量影音' },
      { name: '公开常规起步价', period: '月付', quota: '档位待核验', price: 19.9, audience: '希望比较常规套餐的用户' },
    ],
    sources: [
      { label: 'Bing：龙猫云价格页摘要', url: 'https://longmaoyun.github.io/pricing/' },
      { label: 'Bing：GitHub 优惠说明摘要', url: 'https://github.com/jichangbaike/totorocloud' },
    ],
  },
  {
    name: '星岛梦', url: 'https://rweqr.xdmttt4.click/#/?code=lSVhHFnY', featured: false,
    recommendation: '公开资料显示月付、年付、一次性与定制方案并存，适合需要多种周期选择的用户。',
    researchNote: 'Bing 结果出现 ¥16/100GB 月付起和 ¥25 月付起两种摘要，可能对应不同套餐或更新时间。未找到可交叉核验的当前通用优惠码，因此仅展示公开起步档并提醒结算页复核。',
    plans: [
      { name: '月付轻量档', period: '月付', quota: '100GB/月', price: 16, audience: '日常浏览与轻量使用' },
      { name: '公开常规起步价', period: '月付', quota: '档位待核验', price: 25, audience: '希望比较更多套餐的用户' },
    ],
    sources: [
      { label: 'Bing：二猫子价格摘要', url: 'https://www.ermao.net/' },
      { label: 'Bing：机场笔记套餐摘要', url: 'https://jichangnote.com/reviews/xingdaomeng/' },
    ],
  },
];
