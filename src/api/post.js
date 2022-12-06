import request from "@/utils/request";

export function get_post_info(params) {
  return request({
    url: "/post_data",
    method: "get",
    params,
  });
}

export function collect_post(id) {
  return request({
    url: "/collect_post",
    method: "post",
    data: { id: id },
  });
}

export function delete_reply(reply_id) {
  return request({
    url: "/reply",
    method: "delete",
    data: { reply_id: reply_id },
  });
}

export function delete_comment(comment_id) {
  return request({
    url: "/comment",
    method: "delete",
    data: { comment_id:comment_id},
  });
}

export function reply_on_post(data) {
  return request({
    url: "/reply_on_post",
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export function reply_on_comment(data) {
  return request({
    url: "/reply_on_comment",
    method: "post",
    data,
  });
}
export function reply_on_reply(data) {
  return request({
    url: "/reply_on_reply",
    method: "post",
    data,
  });
}
