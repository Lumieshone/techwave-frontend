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
    }
]