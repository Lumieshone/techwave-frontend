    import request from "@/utils/request";

export function getReply(page, perPage) {
  return request({
    url: "/message/reply",
    method: "get",
    params: { page: page, perPage: perPage },
  });
}

export function getLike(page, perPage) {
  return request({
    url: "/message/like",
    method: "get",
    params: { page: page, perPage: perPage },
  });
}

export function getNotification(page, perPage) {
  return request({
    url: "/message/notification",
    method: "get",
    params: { page: page, perPage: perPage },
  });
}

export function getCount(){
  return request({
      url: "/message/count",
      method: "get",
  });
}
export function readMessage(type) {
    return request({
        url: "/message/read",
        method: "post",
        data: { type: type},
    });
}
export function getMessageList() {
  return request({
    url: "/message/list",
    method: "get",
  });
}

export function getMessageHistory(targetId) {
    return request({
        url: "/message/history",
        method: "get",
        params: { targetId: targetId },
    });
}

export function clearMessageHistory(targetId) {
    return request({
        url: "/message/history",
        method: "delete",
        data: { targetId: targetId },
    });
}

export function blockUser(targetId) {
    return request({
        url: "/message/block",
        method: "post",
        data: { targetId: targetId },
    });
}

export function sendMessage(data) {
    return request({
        url: "/message/send_message",
        method: "post",
        data,
    });
}

export function reportUser(data) {
    return request({
        url: "/message/report_user",
        method: "post",
        data,
    });
}

