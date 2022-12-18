let baseURL = process.env.VUE_APP_BASE_API;

module.exports = [
  // delete reply
  {
    url: baseURL + "/post/reply",
    type: "delete",
    response: () => {
      return {
        code: 20000,
      };
    },
  },
  // delete comment
  {
    url: baseURL + "/post/comment",
    type: "delete",
    response: () => {
      return {
        code: 20000,
      };
    },
  },
  // reply on post
  {
    url: baseURL + "/post/reply_on_post",
    type: "post",
    response: () => {
      return {
        code: 20000,
      };
    },
  },
  {
    url: baseURL + "/post/reply_on_comment",
    type: "post",
    response: () => {
      return {
        code: 20000,
      };
    },
  },
  {
    url: baseURL + "/post/reply_on_reply",
    type: "post",
    response: () => {
      return {
        code: 20000,
      };
    },
  },
  // collect post
  // add or cancel collection
  {
    url: baseURL + "/post/collect_post",
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
    url: baseURL + "/post/post_data.*",
    type: "get",
    response: (config) => {
      let fullCommentData = [
        {
          commentId: 1,
          avatar:
            "https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_default_imgs/defaultImages.jpg",
          authorName: "baokker",
          updateTime: new Date(),
          content: "apple n据，是谁在心虚. ",
          ableToDelete: false,
          replyVOList: [
            {
              replyId: 1,
              updateTime: new Date(),
              authorName: "ysj",
              replyTo: "mb",
              content: "woww it' s a little bit ee",
              ableToDelete: false,
            },
            {
              replyId: 2,
              updateTime: new Date(),
              authorName: "mb",
              replyTo: "ysj",
              content: "woww it' s a ssss bit ee",
              ableToDelete: false,
            },
          ],
        },
        {
          commentId: 2,
          avatar:
            "https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_default_imgs/defaultImages.jpg",
          authorName: "ph",
          updateTime: new Date(),
          content: "iphone nb",
          ableToDelete: true,
          // reply
          replyVOList: [
            {
              replyId: 3,
              updateTime: new Date(),
              authorName: "ysj",
              replyTo: "mb",
              content: "woww it' s a little bit ee",
              ableToDelete: false,
            },
            {
              replyId: 4,
              updateTime: new Date(),
              authorName: "msdb",
              replyTo: "yssdj",
              content: "woww it' s a ssss bit ee",
              ableToDelete: false,
            },
            {
              replyId: 5,
              updateTime: new Date(),
              authorName: "fbc",
              replyTo: "",
              content: "jialguajian",
              ableToDelete: true,
            },
          ],
        },
        {
          commentId: 3,
          avatar:
            "https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_default_imgs/defaultImages.jpg",
          authorName: "baokker",
          updateTime: new Date(),
          content:
            "apple nb,\n但是3l3l3l3l3的能做的事。保护可莉！！！举报 八，我绝不后退. 删评证据，是谁在心虚. ",
          ableToDelete: false,
          replyVOList: [],
        },
        {
          commentId: 4,
          avatar:
            "https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_default_imgs/defaultImages.jpg",
          authorName: "ph",
          updateTime: new Date(),
          content: "iphodadsdsdsa4l4l4l4lne nb",
          ableToDelete: true,
          // reply
          replyVOList: [],
        },
        {
          commentId: 6,
          avatar:
            "https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_default_imgs/defaultImages.jpg",
          authorName: "baokker",
          updateTime: new Date(),
          content:
            "apple nb,\n但是说到原神5l5l5l5l5l《原神》为我们的女儿我们唯一也是正确的能做的事。保护可莉！！！举报 八，我绝不后退. 删评证据，是谁在心虚. ",
          ableToDelete: false,
          replyVOList: [
            {
              replyId: 1,
              updateTime: new Date(),
              authorName: "ysj",
              replyTo: "mb",
              content: "woww it' s a little bit ee",
              ableToDelete: false,
            },
            {
              replyId: 2,
              updateTime: new Date(),
              authorName: "mb",
              replyTo: "ysj",
              content: "woww it' s a ssss bit ee",
              ableToDelete: false,
            },
          ],
        },
        {
          commentId: 7,
          avatar:
            "https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_default_imgs/defaultImages.jpg",
          authorName: "ph",
          updateTime: new Date(),
          content: "ipho6666666666ne nb",
          ableToDelete: true,
          // reply
          replyVOList: [
            {
              replyId: 3,
              updateTime: new Date(),
              authorName: "ysj",
              replyTo: "mb",
              content: "woww it' s a little bit ee",
              ableToDelete: false,
            },
            {
              replyId: 4,
              updateTime: new Date(),
              authorName: "msdb",
              replyTo: "yssdj",
              content: "woww it' s a ssss bit ee",
              ableToDelete: false,
            },
            {
              replyId: 5,
              updateTime: new Date(),
              authorName: "fbc",
              replyTo: "",
              content: "jialguajian",
              ableToDelete: true,
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
        // collect
        data: {
          title: "an Apple a day keeps op away",
          sectionId: 1,
          sectionName: "Apple",
          subsectionId: 2,
          subsectionName: "iPhone",
          isCollected: false,
          avatar:
              "https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_default_imgs/defaultImages.jpg",
          authorName: "baokker",
          updateTime: new Date(),
          browseNumber: 120,
          content:
              "apple nb,\n但是说到原神《原神》为我们的女儿我们唯一也是正确的能做的事。保护可莉！！！举报 八，我绝不后退. 删评证据，是谁在心虚. ",
          total: fullCommentData.length + 1,

          commentVOList: fullCommentData.slice(offset, offset + limit),
        },
      };
    },
  },
];
