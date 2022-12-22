import request from "@/utils/request";

export function collect_transaction(fd) {
  return request({
    url: "/transaction/collect_transaction",
    method: "post",
    data: fd,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function get_transaction_info(id) {
  return request({
    url: "/transaction/post",
    method: "get",
    params: {
      id,
    },
  });
}
