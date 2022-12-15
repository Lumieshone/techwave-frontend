let baseURL = process.env.VUE_APP_BASE_API;

module.exports = [
    // get user info
    {
        url: baseURL + "/account/get_user_info.*",
        type: "get",
        response: () => {
            return {
                code: 20000,
                data:{
                    username: 'wlf',
                    nickname: 'wlf2323',
                    email:'2053382@tongji.edu.cn',
                    gender:'男',
                    phoneNumber:'19890604918',
                    summary:'你说的对，但我玩原神一天可以赚150原石',
                    avatar:"https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_default_imgs/defaultImages.jpg",
                    isStudent:true
                }
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
                data:{
                    result: 1
                },
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
                data:{
                    result: 1
                },
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
                data:{
                    folders:[
                        {
                            id:0,
                            folderName:'默认收藏夹'
                        },
                        {
                            id:1,
                            folderName:'苹果'
                        },
                        {
                            id:2,
                            folderName:'华为'
                        },
                        {
                            id:3,
                            folderName:'小米'
                        },
                        {
                            id:4,
                            folderName:'一加'
                        },
                        {
                            id:5,
                            folderName:'戴尔'
                        },
                        {
                            id:6,
                            folderName:'戴尔'
                        },
                        {
                            id:7,
                            folderName:'戴尔'
                        },
                        {
                            id:8,
                            folderName:'戴尔'
                        }
                    ]
                }
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
                data:{
                    total:15,
                    folderPostDTOList:[
                        {
                            postId: 1,
                            posterName: "米哈游nmsl",
                            time: '16:12',
                            sectionName:'原神',
                            title: '公子和宵宫是不是真的有一腿？',
                        },
                        {
                            postId: 2,
                            posterName: "信女愿顿顿吃素换小保底不歪",
                            time: '17:35',
                            sectionName: `原神`,
                            title: '公子池逆天概率',
                        },
                        {
                            postId: 3,
                            posterName: "胡孝子",
                            time: '11-28',
                            sectionName: `原神`,
                            title: '0命雷神就别劝新人抽了',
                        },
                        {
                            postId: 4,
                            posterName: "海豹1号",
                            time: '11-23',
                            sectionName: `原神`,
                            title: 'xdm在蒙德教堂抽卡真的会有奇迹',
                        },
                        {
                            postId: 5,
                            posterName: "纳西妲今天吃什么",
                            time: '10-05',
                            sectionName: `原神`,
                            title: '草神武装也就那样',
                        },
                        {
                            postId: 6,
                            posterName: "纳西妲今天吃什么",
                            time: '10-05',
                            sectionName: `原神`,
                            title: '草神武装也就那样',
                        },
                        {
                            postId: 7,
                            posterName: "纳西妲今天吃什么",
                            time: '10-05',
                            sectionName: `原神`,
                            title: '草神武装也就那样',
                        },
                        {
                            postId: 8,
                            posterName: "纳西妲今天吃什么",
                            time: '10-05',
                            sectionName: `原神`,
                            title: '草神武装也就那样',
                        },
                    ]
                }
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
    // delete my post
    {
        url: baseURL + "/account/delete_my_post.*",
        type: "delete",
        response: () => {
            return {
                code: 20000,
                message:"okk"
            };
        },
    },
    // get my post
    {
        url: baseURL + "/account/get_my_post.*",
        type: "get",
        response: () => {
            return {
                code: 20000,
                data:{
                    total:30,
                    myPosts:[
                        {
                            postId: 1,
                            updateTime: '16:12',
                            commentCount:10,
                            sectionName:'原神',
                            title: '公子和宵宫是不是真的有一腿？',
                        },
                        {
                            postId: 2,
                            updateTime: '17:35',
                            commentCount:10,
                            sectionName: `原神`,
                            title: '公子池逆天概率',
                        },
                        {
                            postId: 3,
                            updateTime: '11-28',
                            commentCount:10,
                            sectionName: `原神`,
                            title: '0命雷神就别劝新人抽了',
                        },
                        {
                            postId: 4,
                            updateTime: '11-23',
                            commentCount:10,
                            sectionName: `原神`,
                            title: 'xdm在蒙德教堂抽卡真的会有奇迹',
                        },
                        {
                            postId: 5,
                            updateTime: '10-05',
                            commentCount:10,
                            sectionName: `原神`,
                            title: '草神武装也就那样',
                        },
                        {
                            postId: 6,
                            updateTime: '10-05',
                            commentCount:10,
                            sectionName: `原神`,
                            title: '草神武装也就那样',
                        },
                        {
                            postId: 7,
                            updateTime: '10-05',
                            commentCount:10,
                            sectionName: `原神`,
                            title: '草神武装也就那样',
                        },
                        {
                            postId: 8,
                            updateTime: '10-05',
                            commentCount:10,
                            sectionName: `原神`,
                            title: '草神武装也就那样',
                        }
                    ]
                }
            };
        },
    },
]