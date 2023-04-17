let baseURL = process.env.VUE_APP_BASE_API;

let hotPosts = [
  {
    id: 1,
    commentCounts: 2,
    poster: "米哈游nmsl",
    updateTime: "16:12",
    summary: `感觉这次活动官方都明示了`,
    title: "公子和宵宫是不是真的有一腿？",
  },
  {
    id: 2,
    commentCounts: 23,
    poster: "信女愿顿顿吃素换小保底不歪",
    updateTime: "17:35",
    summary: `连续三次小保底都歪怎么说`,
    title: "公子池逆天概率",
  },
  {
    id: 3,
    commentCounts: 213,
    poster: "胡孝子",
    updateTime: "11-28",
    summary: "0命雷神除了雷国还有哪个队能进吗？",
    title: "0命雷神就别劝新人抽了",
  },
  {
    id: 4,
    commentCounts: 102,
    poster: "海豹1号",
    updateTime: "11-23",
    summary: "十连三黄，之前从来没这么欧过！！！！！",
    title: "xdm在蒙德教堂抽卡真的会有奇迹",
  },
  {
    id: 5,
    commentCounts: 0,
    poster: "纳西妲今天吃什么",
    updateTime: "10-05",
    summary: "0命一精小羽毛球，点秋香满命常规武器，dps才4w",
    title: "草神武装也就那样",
  },
  {
    id: 6,
    commentCounts: 2,
    poster: "米哈游nmsl",
    updateTime: "16:12",
    summary: `感觉这次活动官方都明示了`,
    title: "公子和宵宫是不是真的有一腿？",
  },
  {
    id: 7,
    commentCounts: 23,
    poster: "信女愿顿顿吃素换小保底不歪",
    updateTime: "17:35",
    summary: `连续三次小保底都歪怎么说`,
    title: "公子池逆天概率",
  },
  {
    id: 8,
    commentCounts: 213,
    poster: "胡孝子",
    updateTime: "11-28",
    summary: "0命雷神除了雷国还有哪个队能进吗？",
    title: "0命雷神就别劝新人抽了",
  },
  {
    id: 9,
    commentCounts: 102,
    poster: "海豹1号",
    updateTime: "11-23",
    summary: "十连三黄，之前从来没这么欧过！！！！！",
    title: "xdm在蒙德教堂抽卡真的会有奇迹",
  },
  {
    id: 10,
    commentCounts: 0,
    poster: "纳西妲今天吃什么",
    updateTime: "10-05",
    summary: "0命一精小羽毛球，点秋香满命常规武器，dps才4w",
    title: "草神武装也就那样",
  },
];

let news = [
  {
    id: 1,
    commentCounts: 2,
    poster: "官方",
    updateTime: "16:12",
    summary: `站柜成为必修课？OPPO Reno9夺舍成功不止产品经理还有设计师！`,
    title: "OPPO Reno9",
  },
  {
    id: 2,
    commentCounts: 23,
    poster: "官方",
    updateTime: "17:35",
    summary: `美女产品经理无敌，OPPO Ace2首发40W无线闪充干翻一众厂商？`,
    title: "OPPO Ace2",
  },
  {
    id: 3,
    commentCounts: 213,
    poster: "官方",
    updateTime: "11-28",
    summary: "荣耀进入叛逆期！荣耀80/Magic VS不仅藕断丝连还要遥遥领先？",
    title: "荣耀80/Magic VS",
  },
  {
    id: 4,
    commentCounts: 102,
    poster: "官方",
    updateTime: "11-23",
    summary: "超越想象懂的都懂？vivo X90实力质变拉满牌面亮相世界杯！！",
    title: "vivo X90",
  },
  {
    id: 5,
    commentCounts: 0,
    poster: "官方",
    updateTime: "10-05",
    summary: "不对劲但又说不上来？OriginOS 3自带秒开APP的原地复活！",
    title: "OriginOS 3",
  },
];

module.exports = [
  {
    url: baseURL + "/hot_post",
    type: "get",
    response: () => {
      return {
        code: 20000,
        data: [
          ...hotPosts,
        ],
      };
    },
  },
  {
    url: baseURL + "/news",
    type: "get",
    response: () => {
      return {
        code: 20000,
        data: [
          ...news,
        ],
      };
    },
  },
];
