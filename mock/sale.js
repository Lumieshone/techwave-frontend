let baseURL = process.env.VUE_APP_BASE_API;

module.exports = [
  {
    url: baseURL + "/transaction/tag",
    type: "get",
    response: () => {
      return {
        code: 20000,
        data: {
          tags: [
            {
              id: 1,
              name: "Apple",
              subtags: [
                {
                  id: 1,
                  name: "iPhone",
                },
                {
                  id: 2,
                  name: "iPad",
                },
              ],
            },
            {
              id: 2,
              name: "Huawei",
              subtags: [
                {
                  id: 1,
                  name: "matex",
                },
                {
                  id: 2,
                  name: "matebook",
                },
              ],
            },
          ],
        },
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
      let { searchContent, tagId, subtagId, campusZone, offset, limit, type } =
        config.query;
      // console.log(typeof limit); // string!!!!!!!!

      limit = Number(limit);
      offset = Number(offset);
      tagId = Number(tagId);
      subtagId = Number(subtagId);

      let sellData = [
        {
          transactionId: 1,
          title: "iphone 14急出",
          price: 9999,
          imageUrl:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campusZone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说凑字数凑字数345tyuhytrcdfyguhiytfguhiYTFyguhiygftguHIgftyguhiygftguhi",
          tagId: 1,
          subtagId: 1,
        },
        {
          transactionId: 2,
          title: "iphone 13急出",
          price: 99299,
          imageUrl:
            "https://picx.zhimg.com/v2-141592629306b41bff01a28a18a78acb_1440w.jpg?source=172ae18b",
          campusZone: "嘉定",
          description: "集美们快充呀苹果爸爸就上了就是说",

          tagId: 1,
          subtagId: 1,
        },
        {
          transactionId: 3,
          title: "iphone 15急出",
          price: 9999,
          imageUrl:
            "https://pic1.zhimg.com/80/v2-695b6d3d8b4e07d9f2b3dd1026ad4f08_1440w.webp",
          campusZone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tagId: 1,
          subtagId: 1,
        },
        {
          transactionId: 4,
          title: "iphone 11急出",
          price: 996599,
          imageUrl:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campusZone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tagId: 1,
          subtagId: 1,
        },
        {
          transactionId: 5,
          title: "iphne 14急出",
          price: 999,
          imageUrl:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campusZone: "四平",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tagId: 1,
          subtagId: 1,
        },
        {
          transactionId: 6,
          title: "iphone 14急出",
          price: 9999,
          imageUrl:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campusZone: "四平",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tagId: 1,
          subtagId: 1,
        },
        {
          transactionId: 7,
          title: "华为笔记本急出",
          price: 9999,
          imageUrl:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campusZone: "彰武",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tagId: 2,
          subtagId: 2,
        },
        {
          transactionId: 8,
          title: "华为手机急出",
          price: 9999,
          imageUrl:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campusZone: "四平",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 2,
          subtagId: 1,
        },
        {
          transactionId: 9,
          title: "ph4急出",
          price: 999,
          imageUrl:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campusZone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tag: "Apple",
          subtag: "iPhone",
        },
        {
          transactionId: 10,
          title: "iphone 14急出",
          price: 97899,
          imageUrl:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campusZone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tag: "Apple",
          subtag: "iPhone",
        },
        {
          transactionId: 11,
          title: "华为笔记本12 13 14急出",
          price: 456,
          imageUrl:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campusZone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tagId: 2,
          subtagId: 2,
        },
        {
          transactionId: 12,
          title: "华为Mate50急出",
          price: 9999,
          imageUrl:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campusZone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tagId: 2,
          subtagId: 1,
        },
        {
          transactionId: 13,
          title: "iphone 16急出",
          price: 9999,
          imageUrl:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campusZone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tagId: 1,
          subtagId: 1,
        },
      ];
      let seekData = [
        {
          transactionId: 1,
          title: "iphone 14好想要啊啊啊啊",
          price: 9999,
          imageUrl:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campusZone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说凑字数凑字数345tyuhytrcdfyguhiytfguhiYTFyguhiygftguHIgftyguhiygftguhi",
          tagId: 1,
          subtagId: 1,
        },
        {
          transactionId: 2,
          title: "iphone 13想要",
          price: 99299,
          imageUrl:
            "https://picx.zhimg.com/v2-141592629306b41bff01a28a18a78acb_1440w.jpg?source=172ae18b",
          campusZone: "嘉定",
          description: "集美们快充呀苹果爸爸就上了就是说",

          tagId: 1,
          subtagId: 1,
        },
        {
          transactionId: 3,
          title: "iphone 1想要出",
          price: 9999,
          imageUrl:
            "https://pic1.zhimg.com/80/v2-695b6d3d8b4e07d9f2b3dd1026ad4f08_1440w.webp",
          campusZone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 1,
          subtagId: 1,
        },
        {
          transactionId: 4,
          title: "iphone 11想要",
          price: 996599,
          imageUrl:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campusZone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 1,
          subtagId: 1,
        },
        {
          transactionId: 5,
          title: "iphne 14想要",
          price: 999,
          imageUrl:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campusZone: "四平",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 1,
          subtagId: 1,
        },
        {
          transactionId: 6,
          title: "huawei 14想要要",
          price: 9999,
          imageUrl:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campusZone: "四平",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 2,
          subtagId: 1,
        },
        {
          transactionId: 7,
          title: "matebook想要要",
          price: 9999,
          imageUrl:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campusZone: "彰武",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 2,
          subtagId: 2,
        },
        {
          transactionId: 8,
          title: "iphone 4急出",
          price: 9999,
          imageUrl:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campusZone: "四平",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 1,
          subtagId: 1,
        },
        {
          transactionId: 9,
          title: "ph4急出",
          price: 999,
          imageUrl:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campusZone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 1,
          subtagId: 1,
        },
        {
          transactionId: 10,
          title: "iphone 14急出",
          price: 97899,
          imageUrl:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campusZone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 1,
          subtagId: 1,
        },
        {
          transactionId: 11,
          title: "huawei12 13 14急出",
          price: 456,
          imageUrl:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campusZone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 2,
          subtagId: 1,
        },
        {
          transactionId: 12,
          title: "华为Mate50急出",
          price: 9999,
          imageUrl:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campusZone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 2,
          subtagId: 1,
        },
        {
          transactionId: 13,
          title: "iphone 16急出",
          price: 9999,
          imageUrl:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campusZone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",
          tagId: 1,
          subtagId: 1,
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

      console.log(filterData);

      if (campusZone != "全部") {
        filterData = filterData.filter((t) => t.campusZone == campusZone);
      }

      console.log(filterData);
      console.log(tagId);
      if (!isNaN(tagId)) {
        filterData = filterData.filter((t) => t.tagId == tagId);
      }
      console.log(filterData);

      if (!isNaN(subtagId)) {
        filterData = filterData.filter((t) => t.subtagId == subtagId);
      }

      return {
        code: 20000,
        data: {
          total: filterData.length,
          transactionsData: filterData.slice(offset, offset + limit),
        },
      };
    },
  },
];
