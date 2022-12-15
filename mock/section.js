let baseURL = process.env.VUE_APP_BASE_API;

module.exports = [
    // get section info
    {
        url: baseURL + "/section/get_section_data.*",
        type: "get",
        response: () => {
            return {
                code: 20000,
                data: {
                    sectionName: "原神",
                    // collect
                    isCollected: false,
                    sectionSummary: "虚空鼓动，劫火高扬",
                    postCounts: 250,
                    subSectionList: [
                        {
                            id:1,
                            name:"冒险家协会",
                        },
                        {
                            id:2,
                            name:"和裕茶馆",
                        },
                        {
                            id:3,
                            name:"天命既定",
                        },
                        {
                            id:4,
                            name:"幽夜净土",
                        },
                        {
                            id:5,
                            name:"万文集舍",
                        },
                        {
                            id:6,
                            name:"蒸汽鸟报",
                        },
                        {
                            id:7,
                            name:"桓那兰那",
                        },
                        {
                            id:8,
                            name:"蒸汽鸟报",
                        },
                        {
                            id:9,
                            name:"旅行者指引广场",
                        },
                        {
                            id:10,
                            name:"蒲公英之风",
                        },
                        {
                            id:11,
                            name:"教令院期刊",
                        },
                    ],
                    postVOList: [
                        {
                            id: 1,
                            commentCounts: 2,
                            poster: "米哈游nmsl",
                            updateTime: '16:12',
                            summary: `感觉这次活动官方都明示了`,
                            title: '公子和宵宫是不是真的有一腿？',
                        },
                        {
                            id: 2,
                            commentCounts: 23,
                            poster: "信女愿顿顿吃素换小保底不歪",
                            updateTime: '17:35',
                            summary: `连续三次小保底都歪怎么说`,
                            title: '公子池逆天概率',
                        },
                        {
                            id: 3,
                            commentCounts: 213,
                            poster: "胡孝子",
                            updateTime: '11-28',
                            summary: '0命雷神除了雷国还有哪个队能进吗？',
                            title: '0命雷神就别劝新人抽了',
                        },
                        {
                            id: 4,
                            commentCounts: 102,
                            poster: "海豹1号",
                            updateTime: '11-23',
                            subtitle: '十连三黄，之前从来没这么欧过！！！！！',
                            title: 'xdm在蒙德教堂抽卡真的会有奇迹',
                        },
                        {
                            id: 5,
                            commentCounts: 0,
                            poster: "纳西妲今天吃什么",
                            updateTime: '10-05',
                            subtitle: '0命一精小羽毛球，点秋香满命常规武器，dps才4w',
                            title: '草神武装也就那样',
                        },
                        {
                            id: 6,
                            commentCounts: 2,
                            poster: "米哈游nmsl",
                            updateTime: '16:12',
                            subtitle: `感觉这次活动官方都明示了`,
                            title: '公子和宵宫是不是真的有一腿？',
                        },
                        {
                            id: 7,
                            commentCounts: 23,
                            poster: "信女愿顿顿吃素换小保底不歪",
                            updateTime: '17:35',
                            subtitle: `连续三次小保底都歪怎么说`,
                            title: '公子池逆天概率',
                        },
                        {
                            id: 8,
                            commentCounts: 213,
                            poster: "胡孝子",
                            updateTime: '11-28',
                            subtitle: '0命雷神除了雷国还有哪个队能进吗？',
                            title: '0命雷神就别劝新人抽了',
                        },
                        {
                            id: 9,
                            commentCounts: 102,
                            poster: "海豹1号",
                            updateTime: '11-23',
                            subtitle: '十连三黄，之前从来没这么欧过！！！！！',
                            title: 'xdm在蒙德教堂抽卡真的会有奇迹',
                        },
                        {
                            id: 10,
                            commentCounts: 0,
                            poster: "纳西妲今天吃什么",
                            updateTime: '10-05',
                            subtitle: '0命一精小羽毛球，点秋香满命常规武器，dps才4w',
                            title: '草神武装也就那样',
                        },
                    ],
                },
            };
        },
    },
    // get_posts_by_subsection
    {
        url: baseURL + "/section/get_posts_by_subsection.*",
        type: "get",
        response: () => {
            return {
                code: 20000,
                data:{
                    total: 230,
                    postDataVOList: [
                        {
                            id: 1,
                            commentCounts: 2,
                            poster: "米哈游nmsl",
                            updateTime: '16:12',
                            summary: `感觉这次活动官方都明示了`,
                            title: '公子和宵宫是不是真的有一腿？',
                        },
                        {
                            id: 2,
                            commentCounts: 23,
                            poster: "信女愿顿顿吃素换小保底不歪",
                            updateTime: '17:35',
                            summary: `连续三次小保底都歪怎么说`,
                            title: '公子池逆天概率',
                        },
                        {
                            id: 3,
                            commentCounts: 213,
                            poster: "胡孝子",
                            updateTime: '11-28',
                            summary: '0命雷神除了雷国还有哪个队能进吗？',
                            title: '0命雷神就别劝新人抽了',
                        },
                        {
                            id: 4,
                            commentCounts: 102,
                            poster: "海豹1号",
                            updateTime: '11-23',
                            summary: '十连三黄，之前从来没这么欧过！！！！！',
                            title: 'xdm在蒙德教堂抽卡真的会有奇迹',
                        },
                        {
                            id: 5,
                            commentCounts: 0,
                            poster: "纳西妲今天吃什么",
                            updateTime: '10-05',
                            summary: '0命一精小羽毛球，点秋香满命常规武器，dps才4w',
                            title: '草神武装也就那样',
                        },
                    ]
                }
            };
        },
    },
    {
        url: baseURL + "/section/collect_section.*",
        type: "post",
        response: () => {
            return {
                code: 20000,
                message: "okk"
            };
        },
    },
    {
        url: baseURL + "/section/publish_post.*",
        type: "post",
        response: () => {
            return {
                code: 20000,
                message: "okk"
            };
        },
    },
];