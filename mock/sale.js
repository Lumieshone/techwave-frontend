let baseURL = process.env.VUE_APP_BASE_API;

module.exports = [
  {
    url: baseURL + "/sale_info",
    type: "get",
    response: (config) => {
      let { search_content, campus_zone, offset, limit, type } = config.query;
      console.log(typeof(limit)) // string!!!!!!!!
      limit = Number(limit)
      offset = Number(offset)

      let sell_data = [
        {
          transaction_id: 1,
          title: "iphone 14急出",
          price: 9999,
          image_url:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus_zone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说凑字数凑字数345tyuhytrcdfyguhiytfguhiYTFyguhiygftguHIgftyguhiygftguhi",
          tag1: "Apple",
          tag2: "iPhone",
        },
        {
          transaction_id: 2,
          title: "iphone 13急出",
          price: 99299,
          image_url:
            "https://picx.zhimg.com/v2-141592629306b41bff01a28a18a78acb_1440w.jpg?source=172ae18b",
          campus_zone: "嘉定",
          description: "集美们快充呀苹果爸爸就上了就是说",

          tag1: "Apple",
          tag2: "iPhone",
        },
        {
          transaction_id: 3,
          title: "iphone 15急出",
          price: 9999,
          image_url:
            "https://pic1.zhimg.com/80/v2-695b6d3d8b4e07d9f2b3dd1026ad4f08_1440w.webp",
          campus_zone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tag1: "Apple",
          tag2: "iPhone",
        },
        {
          transaction_id: 4,
          title: "iphone 11急出",
          price: 996599,
          image_url:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus_zone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tag1: "Apple",
          tag2: "iPhone",
        },
        {
          transaction_id: 5,
          title: "iphne 14急出",
          price: 999,
          image_url:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus_zone: "四平",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tag1: "Apple",
          tag2: "iPhone",
        },
        {
          transaction_id: 6,
          title: "iphone 14急出",
          price: 9999,
          image_url:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus_zone: "四平",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tag1: "Apple",
          tag2: "iPhone",
        },
        {
          transaction_id: 7,
          title: "iphone 19急出",
          price: 9999,
          image_url:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus_zone: "彰武",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tag1: "Apple",
          tag2: "iPhone",
        },
        {
          transaction_id: 8,
          title: "iphone 4急出",
          price: 9999,
          image_url:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus_zone: "四平",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tag1: "Apple",
          tag2: "iPhone",
        },
        {
          transaction_id: 9,
          title: "ph4急出",
          price: 999,
          image_url:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus_zone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tag1: "Apple",
          tag2: "iPhone",
        },
        {
          transaction_id: 10,
          title: "iphone 14急出",
          price: 97899,
          image_url:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus_zone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tag1: "Apple",
          tag2: "iPhone",
        },
        {
          transaction_id: 11,
          title: "小米12 13 14急出",
          price: 456,
          image_url:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus_zone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tag1: "小米（Mi）",
          tag2: "数字系列",
        },
        {
          transaction_id: 12,
          title: "华为Mate50急出",
          price: 9999,
          image_url:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus_zone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tag1: "Huawei",
          tag2: "Mate",
        },
        {
          transaction_id: 13,
          title: "iphone 16急出",
          price: 9999,
          image_url:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus_zone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tag1: "Apple",
          tag2: "iPhone",
        },
      ];
      let seek_data = [
        {
          transaction_id: 1,
          title: "iphone 14急出",
          price: 9999,
          image_url:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus_zone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说凑字数凑字数345tyuhytrcdfyguhiytfguhiYTFyguhiygftguHIgftyguhiygftguhi",
          tag1: "Apple",
          tag2: "iPhone",
        },
        {
          transaction_id: 2,
          title: "iphone 13急出",
          price: 99299,
          image_url:
            "https://picx.zhimg.com/v2-141592629306b41bff01a28a18a78acb_1440w.jpg?source=172ae18b",
          campus_zone: "嘉定",
          description: "集美们快充呀苹果爸爸就上了就是说",

          tag1: "Apple",
          tag2: "iPhone",
        },
        {
          transaction_id: 3,
          title: "iphone 15急出",
          price: 9999,
          image_url:
            "https://pic1.zhimg.com/80/v2-695b6d3d8b4e07d9f2b3dd1026ad4f08_1440w.webp",
          campus_zone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tag1: "Apple",
          tag2: "iPhone",
        },
        {
          transaction_id: 4,
          title: "iphone 11急出",
          price: 996599,
          image_url:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus_zone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tag1: "Apple",
          tag2: "iPhone",
        },
        {
          transaction_id: 5,
          title: "iphne 14急出",
          price: 999,
          image_url:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus_zone: "四平",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tag1: "Apple",
          tag2: "iPhone",
        },
        {
          transaction_id: 6,
          title: "iphone 14急出",
          price: 9999,
          image_url:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus_zone: "四平",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tag1: "Apple",
          tag2: "iPhone",
        },
        {
          transaction_id: 7,
          title: "iphone 19急出",
          price: 9999,
          image_url:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus_zone: "彰武",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tag1: "Apple",
          tag2: "iPhone",
        },
        {
          transaction_id: 8,
          title: "iphone 4急出",
          price: 9999,
          image_url:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus_zone: "四平",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tag1: "Apple",
          tag2: "iPhone",
        },
        {
          transaction_id: 9,
          title: "ph4急出",
          price: 999,
          image_url:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus_zone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tag1: "Apple",
          tag2: "iPhone",
        },
        {
          transaction_id: 10,
          title: "iphone 14急出",
          price: 97899,
          image_url:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus_zone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tag1: "Apple",
          tag2: "iPhone",
        },
        {
          transaction_id: 11,
          title: "小米12 13 14急出",
          price: 456,
          image_url:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus_zone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tag1: "小米（Mi）",
          tag2: "数字系列",
        },
        {
          transaction_id: 12,
          title: "华为Mate50急出",
          price: 9999,
          image_url:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus_zone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tag1: "Huawei",
          tag2: "Mate",
        },
        {
          transaction_id: 13,
          title: "iphone 16急出",
          price: 9999,
          image_url:
            "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.large_2x.jpg",
          campus_zone: "嘉定",
          description:
            "集美们快充呀苹果爸爸就是我的神哈哈哈哈一整个爱上了就是说",

          tag1: "Apple",
          tag2: "iPhone",
        },
      ];

      let filter_data;
      if (type == "seek") {
        filter_data = seek_data;
      } else {
        filter_data = sell_data;
      }

      if (search_content != "") {
        filter_data = filter_data.filter((t) =>
          t.title.includes(search_content)
        );
      }

      if (campus_zone != "全部") {
        filter_data = filter_data.filter((t) => t.campus_zone == campus_zone);
      }

      console.log(limit+offset);
      filter_data = filter_data.slice(offset, offset+limit);

      return {
        code: 20000,
        total: 20,
        transactions_data: filter_data,
      };
    },
  },
];
