import request from "@/utils/request";

export function get_sale_info(params) {
  return request({
    url: "/sale_info",
    method: "get",
    params,
  });
}
