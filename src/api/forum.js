import request from "@/utils/request";

export function getHotSections(page, perPage) {
  return request({
    url: "/section/hot",
    method: "get",
    params: { page: page, perPage: perPage },
  });
}

export function getSearchSections(searchContent, page, perPage) {
  return request({
    url: "/section/search",
    method: "get",
    params: { searchContent: searchContent, page: page, perPage: perPage },
  });
}
