let baseURL = process.env.VUE_APP_BASE_API;

module.exports = [
  // collect post
  // add or cancel collection
  {
    url: baseURL + "/collect_post",
    type: "post",
    response: (config) => {
      // eslint-disable-next-line no-unused-vars
      const { id } = config.body;
      return {
        code: 20000,
        message: "add or cancel collection",
      };
    },
  },
  // get post info
  {
    url: baseURL + "/post_data.*",
    type: "get",
    response: (config) => {
      let full_layer_data = [
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
        {
          floor: 3,
          avatar:
            "https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_default_imgs/defaultImages.jpg",
          author: "baokker",
          time: new Date(),
          content:
            "apple nb,\n但是3l3l3l3l3的能做的事。保护可莉！！！举报 八，我绝不后退. 删评证据，是谁在心虚. ",
          able_to_delete: false,
          comment_data: [],
        },
        {
          floor: 4,
          avatar:
            "https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_default_imgs/defaultImages.jpg",
          author: "ph",
          time: new Date(),
          content: "iphodadsdsdsa4l4l4l4lne nb",
          able_to_delete: true,
          // comment
          comment_data: [],
        },
        {
          floor: 5,
          avatar:
            "https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_default_imgs/defaultImages.jpg",
          author: "baokker",
          time: new Date(),
          content:
            "apple nb,\n但是说到原神5l5l5l5l5l《原神》为我们的女儿我们唯一也是正确的能做的事。保护可莉！！！举报 八，我绝不后退. 删评证据，是谁在心虚. ",
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
          floor: 6,
          avatar:
            "https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_default_imgs/defaultImages.jpg",
          author: "ph",
          time: new Date(),
          content: "ipho6666666666ne nb",
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
      ];
      // eslint-disable-next-line no-unused-vars
      let { id, offset, limit } = config.query;
      offset = Number(offset);
      limit = Number(limit);

      return {
        code: 20000,
        post_data: {
          title: "an Apple a day keeps op away",
          // collect
          is_collected: false,
          tags: ['Apple','iPhone',],
          section_id:1,
          section_name: 'Apple',
          subsection_id: 2,
          subsection_name: 'iPhone',
          total: full_layer_data.length,
          layer_data: full_layer_data.slice(
            offset,
            offset + limit
          ),
        },
      };
    },
  },
];
