let baseURL = process.env.VUE_APP_BASE_API;

module.exports = [
  {
    url: baseURL + "/transaction/tag",
    type: "get",
    response: () => {
      return {
        code: 20000,
        data:
           [
            {
              tagId: 1,
              tagName: "Apple",
              subtagList: [
                {
                  subtagId: 1,
                  subtagName: "iPhone",
                },
                {
                  subtagId: 2,
                  subtagName: "iPad",
                },
              ],
            },
            {
              tagId: 2,
              tagName: "Huawei",
              subtagList: [
                {
                  subtagId: 1,
                  subtagName: "matex",
                },
                {
                  subtagId: 2,
                  subtagName: "matebook",
                },
              ],
            },
          ],

      };
    },
  },

  // publish_transaction
  {
    url: baseURL + "/transaction/publish",
    type: "post",
    response: () => {
      return {
        code: 20000,
      };
    },
  },
  {
    url: baseURL + "/transaction/sale_info.*",
    type: "get",
    response: (config) => {
      let { searchContent, tagId, subtagId, campus, offset, limit, type } =
        config.query;
      // console.log(typeof limit); // string!!!!!!!!

      limit = Number(limit);
      offset = Number(offset);
      tagId = Number(tagId);
      subtagId = Number(subtagId);

      let sellData = [
        {
          id: 1,
          title: "iphone 14急出",
          price: 9999,
          coverImage:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus: "嘉定",
          summary:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说凑字数凑字数345tyuhytrcdfyguhiytfguhiYTFyguhiygftguHIgftyguhiygftguhi",
          tagId: 1,

          subtagId:1,
        },
        {
          id: 2,
          title: "iphone 13急出",
          price: 99299,
          coverImage:
            "https://picx.zhimg.com/v2-141592629306b41bff01a28a18a78acb_1440w.jpg?source=172ae18b",
          campus: "嘉定",
          summary: "集美们快充呀苹果爸爸就上了就是说",
          tagId: 1,

          subtagId:2,

        },
        {
          id: 3,
          title: "iphone 15急出",
          price: 9999,
          coverImage:
            "https://pic1.zhimg.com/80/v2-695b6d3d8b4e07d9f2b3dd1026ad4f08_1440w.webp",
          campus: "嘉定",
          summary:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 2,

          subtagId:1,


        },
        {
          id: 4,
          title: "iphone 11急出",
          price: 996599,
          coverImage:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus: "嘉定",
          summary:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 2,

          subtagId:2,

        },
        {
          id: 5,
          title: "iphne 14急出",
          price: 999,
          coverImage:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus: "四平",
          summary:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 1,

          subtagId:1,
        },
        {
          id: 6,
          title: "iphone 14急出",
          price: 9999,
          coverImage:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus: "四平",
          summary:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 1,

          subtagId:1,

        },
        {
          id: 7,
          title: "华为笔记本急出",
          price: 9999,
          coverImage:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus: "彰武",
          summary:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tagId: 2,
          subtagId: 2,
        },
        {
          id: 8,
          title: "华为手机急出",
          price: 9999,
          coverImage:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus: "四平",
          summary:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 1,

          subtagId:1,

        },
        {
          id: 9,
          title: "ph4急出",
          price: 999,
          coverImage:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus: "嘉定",
          summary:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 2,

          subtagId:2,

        },
        {
          id: 10,
          title: "iphone 14急出",
          price: 97899,
          coverImage:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus: "嘉定",
          summary:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 1,

          subtagId:2,
        },
        {
          id: 11,
          title: "华为笔记本12 13 14急出",
          price: 456,
          coverImage:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus: "嘉定",
          summary:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 2,

          subtagId:1,
        },
        {
          id: 12,
          title: "华为Mate50急出",
          price: 9999,
          coverImage:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus: "嘉定",
          summary:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 1,

          subtagId:1,
        },
        {
          id: 13,
          title: "iphone 16急出",
          price: 9999,
          coverImage:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus: "嘉定",
          summary:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 1,

          subtagId:1,
        },
      ];
      let seekData = [
        {
          id: 1,
          title: "iphone 14好想要啊啊啊啊",
          price: 9999,
          coverImage:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus: "嘉定",
          summary:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说凑字数凑字数345tyuhytrcdfyguhiytfguhiYTFyguhiygftguHIgftyguhiygftguhi",
          tagId: 1,

          subtagId:1,
        },
        {
          id: 2,
          title: "iphone 13想要",
          price: 99299,
          coverImage:
            "https://picx.zhimg.com/v2-141592629306b41bff01a28a18a78acb_1440w.jpg?source=172ae18b",
          campus: "嘉定",
          summary: "集美们快充呀苹果爸爸就上了就是说",
          tagId: 1,

          subtagId:1,


        },
        {
          id: 3,
          title: "iphone 1想要出",
          price: 9999,
          coverImage:
            "https://pic1.zhimg.com/80/v2-695b6d3d8b4e07d9f2b3dd1026ad4f08_1440w.webp",
          campus: "嘉定",
          summary:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 1,

          subtagId:1,

        },
        {
          id: 4,
          title: "iphone 11想要",
          price: 996599,
          coverImage:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus: "嘉定",
          summary:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 1,

          subtagId:1,
        },
        {
          id: 5,
          title: "iphne 14想要",
          price: 999,
          coverImage:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus: "四平",
          summary:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 1,

          subtagId:1,

        },
        {
          id: 6,
          title: "huawei 14想要要",
          price: 9999,
          coverImage:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus: "四平",
          summary:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 1,

          subtagId:1,

        },
        {
          id: 7,
          title: "matebook想要要",
          price: 9999,
          coverImage:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus: "彰武",
          summary:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 1,

          subtagId:1,

        },
        {
          id: 8,
          title: "iphone 4急出",
          price: 9999,
          coverImage:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus: "四平",
          summary:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 1,

          subtagId:1,

        },
        {
          id: 9,
          title: "ph4急出",
          price: 999,
          coverImage:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus: "嘉定",
          summary:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 1,

          subtagId:1,

        },
        {
          id: 10,
          title: "iphone 14急出",
          price: 97899,
          coverImage:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus: "嘉定",
          summary:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 1,

          subtagId:1,

        },
        {
          id: 11,
          title: "huawei12 13 14急出",
          price: 456,
          coverImage:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus: "嘉定",
          summary:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 2,

          subtagId:1,
        },
        {
          id: 12,
          title: "华为Mate50急出",
          price: 9999,
          coverImage:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus: "嘉定",
          summary:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 1,

          subtagId:2,
        },
        {
          id: 13,
          title: "iphone 16急出",
          price: 9999,
          coverImage:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus: "嘉定",
          summary:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tagId: 1,

          subtagId:1,


        },
      ];

      let filterData;
      if (type == "seek") {
        filterData = seekData;
      } else {
        filterData = sellData;
      }

      if (searchContent != "") {
        filterData = filterData.filter((t) => t.title.includes(searchContent));
      }
      console.log("00")
      console.log(filterData)
      if (campus != "") {
        filterData = filterData.filter((t) => t.campus == campus);
      }

      console.log("11")
      console.log(filterData)

      if (!isNaN(tagId)) {
        filterData = filterData.filter((t) => t.tagId == tagId);
      }
      console.log("22")
      console.log(filterData)

      if (!isNaN(subtagId)) {
        filterData = filterData.filter((t) => t.subtagId == subtagId);
      }
      console.log("33")
      console.log(filterData)

      return {
        code: 20000,
        data: {
          total: filterData.length,
          transactionPageVOList: filterData.slice(offset, offset + limit),
        },
      };
    },
  },
];
