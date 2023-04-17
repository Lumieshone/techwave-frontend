const Mock = require("mockjs");
const { param2Obj } = require("./utils");

const user = require("./user");
const post = require("./post");
const section = require("./section");
const account = require("./account");
const forum = require("./forum");
const getNews = require("./homepage");
const mocks = [
  ...user,
  ...post,
  ...section,
  ...account,
  ...forum,
  ...getNews,
];

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false;

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType;
      }
    }
    this.proxy_send(...arguments);
  };

  function XHR2ExpressReqWrap(respond) {
    return function (options) {
      let result = null;
      if (respond instanceof Function) {
        let { body, type, url } = options;
        // https://expressjs.com/en/4x/api.html#req

        if (!(body instanceof FormData)) {
          body = JSON.parse(body);
        }

        result = respond({
          method: type,
          body: body,
          query: param2Obj(url),
        });
      } else {
        result = respond;
      }
      return Mock.mock(result);
    };
  }

  for (const i of mocks) {
    Mock.mock(
      new RegExp(i.url),
      i.type || "get",
      XHR2ExpressReqWrap(i.response)
    );
  }
}

module.exports = {
  mocks,
  mockXHR,
};
