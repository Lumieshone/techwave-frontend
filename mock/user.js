let baseURL = process.env.VUE_APP_BASE_API;

const tokens = {
  admin: {
    token: "admin-token",
  },
  "user_mail@qq.com": {
    token: "user-token",
  },
};

const users = {
  "admin-token": {
    roles: ["admin"],
    user_id: 123,
    introduction: "I am a super administrator",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Super Admin",
    is_authenticated: true,
  },
  "user-token": {
    roles: ["user"],
    user_id: 123,
    introduction: "I am an user",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Normal User",
    is_authenticated: true,
  },
};

module.exports = [
  // user login
  {
    url: baseURL + "/user/login",
    type: "post",
    response: (config) => {
      const { mail } = config.body;
      const token = tokens[mail];

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: "Acsmallcount and password are incorrect.",
        };
      }

      return {
        code: 20000,
        data: token,
      };
    },
  },

  // admin login
  {
    url: baseURL + "/admin/login",
    type: "post",
    response: (config) => {
      const { account } = config.body;
      const token = tokens[account];

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: "Account and password are incorrect.",
        };
      }

      return {
        code: 20000,
        data: token,
      };
    },
  },

  // get user info
  {
    url: baseURL + "/user/info.*",
    type: "get",
    response: (config) => {
      const { token } = config.query;
      const info = users[token];

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: "Login failed, unable to get user details.",
        };
      }

      return {
        code: 20000,
        data: info,
      };
    },
  },

  // user logout
  {
    url: baseURL + "/user/logout",
    type: "post",
    // eslint-disable-next-line no-unused-vars
    response: (_) => {
      return {
        code: 20000,
      };
    },
  },

  // user register
  {
    url: baseURL + "/user/register",
    type: "post",
    // eslint-disable-next-line no-unused-vars
    response: (config) => {
      const data = config.query;
      console.log(data);
      if (Math.random() < 0.9) {
        return {
          code: 20000,
          data: "success",
        };
      } else {
        return {
          code: 20001,
          message: "注册失败！",
        };
      }
    },
  },

  // find password
  {
    url: baseURL + "/user/find_password",
    type: "post",
    response: () => {
      if (Math.random() < 0.5) {
        return {
          code: 20000,
        };
      } else {
        return {
          code: 20001,
          message: "原密码错误！",
        };
      }
    },
  },
];
