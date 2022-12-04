import request from "@/utils/request";

export function get_sale_info(params) {
  return request({
    url: "/sale_info",
    method: "get",
    params,
  });
}

export function publish_transaction(data) {
  return request({
    url: "/transaction",
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function get_all_first_tags() {
  return request({
    url: "/tag",
    method: "get",
  });
}

export function get_subtags(tag_id) {
  return request({
    url: "/subtag",
    method: "get",
    params: { id: tag_id },
  });
}
