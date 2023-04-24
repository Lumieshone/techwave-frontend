import request from "@/utils/request";
export function getHotSections(page, perPage) {
  return request({
    url: "/homepage/section",
    method: "get",
    params: { page: page, perPage: perPage },
  });
}
export function getCollectSections(page, perPage) {
  return request({
    url: "/homepage/collect",
    method: "get",
    params: { page: page, perPage: perPage },
  });
}

export function getSearchSections(searchContent, page, perPage) {
  return request({
    url: "/homepage/search",
    method: "get",
    params: { searchContent: searchContent, page: page, perPage: perPage },
  });
}

export function getNews() {
  return request({
    url: "/homepage/news",
    method: "get",
  });
}

export function getHotPosts() {
  return request({
    url: "/homepage/post",
    method: "get",
  });
}

