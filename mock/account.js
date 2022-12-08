let baseURL = process.env.VUE_APP_BASE_API;

module.exports = [
    // get user info
    {
        url: baseURL + "/account/get_user_info.*",
        type: "get",
        response: () => {
            return {
                code: 20000,
                username: 'wlf',
                nickname: 'wlf2323',
                email:'2053382@tongji.edu.cn',
                gender:'男',
                phone:'19890604918',
                intro:'你说的对，但我玩原神一天可以赚150原石',
                avatar:"https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_default_imgs/defaultImages.jpg"
            };
        },
    },
    // change avatar
    {
        url: baseURL + "/account/change_avatar.*",
        type: "post",
        response: () => {
            return {
                code: 20000,
                message:"okk"
            };
        },
    },
    // edit user info
    {
        url: baseURL + "/account/edit_info.*",
        type: "post",
        response: () => {
            return {
                code: 20000,
                message:"okk"
            };
        },
    },
    // edit password
    {
        url: baseURL + "/account/edit_password.*",
        type: "post",
        response: () => {
            return {
                code: 20000,
                result: 1,
                message:"okk"
            };
        },
    },
    // edit email
    {
        url: baseURL + "/account/edit_email.*",
        type: "post",
        response: () => {
            return {
                code: 20000,
                result: 1,
                message:"okk"
            };
        },
    },
    // get folders
    {
        url: baseURL + "/account/get_folders.*",
        type: "get",
        response: () => {
            return {
                code: 20000,
                folders:[
                    {
                        id:0,
                        name:'默认收藏夹'
                    },
                    {
                        id:1,
                        name:'苹果'
                    },
                    {
                        id:2,
                        name:'华为'
                    },
                    {
                        id:3,
                        name:'小米'
                    },
                    {
                        id:4,
                        name:'一加'
                    },
                    {
                        id:5,
                        name:'戴尔'
                    },
                    {
                        id:6,
                        name:'戴尔'
                    },
                    {
                        id:7,
                        name:'戴尔'
                    },
                    {
                        id:8,
                        name:'戴尔'
                    }
                ]
            };
        },
    },
    // get collect info
    {
        url: baseURL + "/account/get_collect_info.*",
        type: "get",
        response: () => {
            return {
                code: 20000,
                total:15,
                collects:[
                    {
                        id: 1,
                        poster: "米哈游nmsl",
                        time: '16:12',
                        section:'原神',
                        title: '公子和宵宫是不是真的有一腿？',
                    },
                    {
                        id: 2,
                        poster: "信女愿顿顿吃素换小保底不歪",
                        time: '17:35',
                        section: `原神`,
                        title: '公子池逆天概率',
                    },
                    {
                        id: 3,
                        poster: "胡孝子",
                        time: '11-28',
                        section: `原神`,
                        title: '0命雷神就别劝新人抽了',
                    },
                    {
                        id: 4,
                        poster: "海豹1号",
                        time: '11-23',
                        section: `原神`,
                        title: 'xdm在蒙德教堂抽卡真的会有奇迹',
                    },
                    {
                        id: 5,
                        poster: "纳西妲今天吃什么",
                        time: '10-05',
                        section: `原神`,
                        title: '草神武装也就那样',
                    },
                    {
                        id: 6,
                        poster: "纳西妲今天吃什么",
                        time: '10-05',
                        section: `原神`,
                        title: '草神武装也就那样',
                    },
                    {
                        id: 7,
                        poster: "纳西妲今天吃什么",
                        time: '10-05',
                        section: `原神`,
                        title: '草神武装也就那样',
                    },
                    {
                        id: 8,
                        poster: "纳西妲今天吃什么",
                        time: '10-05',
                        section: `原神`,
                        title: '草神武装也就那样',
                    },
                ]
            };
        },
    },
    // rename folder
    {
        url: baseURL + "/account/rename_folder.*",
        type: "post",
        response: () => {
            return {
                code: 20000,
                message:"okk"
            };
        },
    },
    // create folder
    {
        url: baseURL + "/account/create_folder.*",
        type: "post",
        response: () => {
            return {
                code: 20000,
                message:"okk"
            };
        },
    },
    // delete folder
    {
        url: baseURL + "/account/delete_folder.*",
        type: "delete",
        response: () => {
            return {
                code: 20000,
                message:"okk"
            };
        },
    },
]