import request from "@/utils/request";

export function collect_transaction(id) {
  return request({
    url: "/collect_transaction",
    method: "post",
    data: { id: id },
  });
}

export function get_transaction_info(id) {
  return request({
    url: "/transaction_data",
    method: "get",
    params: {
      id,
    },
  });
}
