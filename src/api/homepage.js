import request from "@/utils/request";

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

