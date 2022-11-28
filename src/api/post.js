import request from "@/utils/request";

export function get_post_info(id) {
  return request({
    url: "/post_data",
    method: "get",
    params: {
      id,
    },
  });
}
