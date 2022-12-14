let baseURL = process.env.VUE_APP_BASE_API;

let sectionsInfo = [
  {
    sectionId: 1,
    name: "Apple",
    avatar:
      "http://www.wallcoo.com/photograph/fruit_apple/images/fruit_apple_apple-tree_wallpaper_Vol_014_SN004.JPG",
    summary: "nbnbnbnbnb",
  },
  {
    sectionId: 2,
    name: "Huawei",
    avatar:
      "https://dss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/-1077697442_1813604402_367_252.jpg",
    summary: "nbnbnbasdsdnbnb",
  },
  {
    sectionId: 3,
    name: "XiaoMi",
    avatar:
      "https://dss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/-1077697442_1813604402_367_252.jpg",
    summary: "nbnbnbasdsdnbnb",
  },
  {
    sectionId: 4,
    name: "OnePlus",
    avatar:
      "https://dss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/-1077697442_1813604402_367_252.jpg",
    summary: "nbnbnbasdsdnbnb",
  },
  {
    sectionId: 5,
    name: "Realme",
    avatar:
      "https://dss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/-1077697442_1813604402_367_252.jpg",
    summary: "nbnbnbasdsdnbnb",
  },
  {
    sectionId: 6,
    name: "Lenovo",
    avatar:
      "https://dss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/-1077697442_1813604402_367_252.jpg",
    summary: "nbnbnbasdsdnbnb",
  },
  {
    sectionId: 7,
    name: "Dell",
    avatar:
      "https://dss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/-1077697442_1813604402_367_252.jpg",
    summary: "nbnbnbassdsddsdnbnb",
  },
  {
    sectionId: 8,
    name: "Honor",
    avatar:
      "https://dss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/-1077697442_1813604402_367_252.jpg",
    summary: "dsdsdsdsdsdsdsd",
  },
  {
    sectionId: 9,
    name: "Tesla",
    avatar:
      "https://dss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/-1077697442_1813604402_367_252.jpg",
    summary: "45678767878976",
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
        data: [
          ...sectionsInfo.slice(0, 2)
        ],
      };
    },
  },
  {
    url: baseURL + "/hot_section",
    type: "get",
    response: () => {
      return {
        code: 20000,
        data: [
            ...sectionsInfo,
        ],
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
        data: [
          ...sectionsInfo.filter((s) =>
            s.name.includes(search_content)
          ),
        ],
      };
    },
  },
];
