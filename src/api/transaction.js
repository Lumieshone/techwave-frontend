import request from "@/utils/request";

export function collect_transaction(id) {
  return request({
    url: "/transaction/collect_transaction",
    method: "post",
    data: { id: id },
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
