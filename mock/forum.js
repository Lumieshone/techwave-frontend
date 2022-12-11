let baseURL = process.env.VUE_APP_BASE_API;

let sectionsInfo = [
  {
    id: 1,
    name: "Apple",
    avatar:
      "http://www.wallcoo.com/photograph/fruit_apple/images/fruit_apple_apple-tree_wallpaper_Vol_014_SN004.JPG",
    intro: "nbnbnbnbnb",
  },
  {
    id: 2,
    name: "Huawei",
    avatar:
      "https://dss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/-1077697442_1813604402_367_252.jpg",
    intro: "nbnbnbasdsdnbnb",
  },
  {
    id: 3,
    name: "XiaoMi",
    avatar:
      "https://dss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/-1077697442_1813604402_367_252.jpg",
    intro: "nbnbnbasdsdnbnb",
  },
  {
    id: 4,
    name: "OnePlus",
    avatar:
      "https://dss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/-1077697442_1813604402_367_252.jpg",
    intro: "nbnbnbasdsdnbnb",
  },
  {
    id: 5,
    name: "Realme",
    avatar:
      "https://dss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/-1077697442_1813604402_367_252.jpg",
    intro: "nbnbnbasdsdnbnb",
  },
  {
    id: 6,
    name: "Lenovo",
    avatar:
      "https://dss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/-1077697442_1813604402_367_252.jpg",
    intro: "nbnbnbasdsdnbnb",
  },
  {
    id: 7,
    name: "Dell",
    avatar:
      "https://dss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/-1077697442_1813604402_367_252.jpg",
    intro: "nbnbnbassdsddsdnbnb",
  },
  {
    id: 8,
    name: "Honor",
    avatar:
      "https://dss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/-1077697442_1813604402_367_252.jpg",
    intro: "dsdsdsdsdsdsdsd",
  },
  {
    id: 9,
    name: "Tesla",
    avatar:
      "https://dss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/-1077697442_1813604402_367_252.jpg",
    intro: "45678767878976",
  },
];

module.exports = [
  // get collection sections
  {
    url: baseURL + "/collect_section",
    type: "get",
    response: () => {
      return {
        code: 20000,
        data: {
          sectionsInfo: sectionsInfo.slice(0, 2),
        },
      };
    },
  },
  {
    url: baseURL + "/hot_section",
    type: "get",
    response: () => {
      return {
        code: 20000,
        data: {
          sectionsInfo: sectionsInfo,
        },
      };
    },
  },
  {
    url: baseURL + "/search_section",
    type: "get",
    response: (config) => {
      const { search_content } = config.query;
      return {
        code: 20000,
        data: {
          sectionsInfo: sectionsInfo.filter((s) =>
            s.name.includes(search_content)
          ),
        },
      };
    },
  },
];
