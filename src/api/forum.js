import request from "@/utils/request";

export function get_collect_sections() {
  return request({
    url: "/homepage/collect_section",
    method: "get",
  });
}

export function get_hot_sections() {
  return request({
    url: "/homepage/hot_section",
    method: "get",
  });
}

export function get_search_sections(search_content) {
  return request({
    url: "/homepage/search_section",
    method: "get",
    params: { search_content: search_content },
  });
}
