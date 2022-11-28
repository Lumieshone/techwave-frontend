let baseURL = process.env.VUE_APP_BASE_API;

module.exports = [
  // get post info
  {
    url: baseURL + "/post_data.*",
    type: "get",
    response: (config) => {
      const { id } = config.query;
      console.log(id);
      return {
        post_data: {
          title: "an Apple a day keeps op away",
          layer_data: [
            {
              floor: 1,
              avatar:
                "https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_default_imgs/defaultImages.jpg",
              author: "baokker",
              time: new Date(),
              content:
                "apple nb,\n但是说到原神《原神》为我们的女儿我们唯一也是正确的能做的事。保护可莉！！！举报 八，我绝不后退. 删评证据，是谁在心虚. ",
              able_to_delete: false,
              comment_data: [
                {
                  comment_id: 1,
                  time: new Date(),
                  author: "ysj",
                  reply_to: "mb",
                  content: "woww it' s a little bit ee",
                  able_to_delete: false,
                },
                {
                  comment_id: 2,
                  time: new Date(),
                  author: "mb",
                  reply_to: "ysj",
                  content: "woww it' s a ssss bit ee",
                  able_to_delete: false,
                },
              ],
            },
            {
              floor: 2,
              avatar:
                "https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_default_imgs/defaultImages.jpg",
              author: "ph",
              time: new Date(),
              content: "iphone nb",
              able_to_delete: true,
              // comment
              comment_data: [
                {
                  comment_id: 3,
                  time: new Date(),
                  author: "ysj",
                  reply_to: "mb",
                  content: "woww it' s a little bit ee",
                  able_to_delete: false,
                },
                {
                  comment_id: 4,
                  time: new Date(),
                  author: "msdb",
                  reply_to: "yssdj",
                  content: "woww it' s a ssss bit ee",
                  able_to_delete: false,
                },
                {
                  comment_id: 5,
                  time: new Date(),
                  author: "fbc",
                  reply_to: "",
                  content: "jialguajian",
                  able_to_delete: true,
                },
              ],
            },
          ],
        },
      };
    },
  },
];
