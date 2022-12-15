import request from "@/utils/request";

export function get_sale_info(params) {
  return request({
    url: "/transaction/sale_info",
    method: "get",
    params,
  });
}

export function publish_transaction(data) {
  return request({
    url: "/transaction/publish",
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function get_all_first_tags() {
  return request({
    url: "/transaction/tag",
    method: "get",
  });
}
