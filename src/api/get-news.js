import request from "@/utils/request";

export function get_news() {
  return request({
    url: "/news",
    method: "get",
  });
}

export function get_hot_posts() {
  return request({
    url: "/hot_post",
    method: "get",
  });
}
