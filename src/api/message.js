import request from "@/utils/request";

export function getReply(page, perPage) {
  return request({
    url: "/message/reply",
    method: "get",
    params: { page: page, perPage: perPage },
  });
}

export function getLike() {
  return request({
    url: "/message/like",
    method: "get",
  });
}

export function getNotification() {
  return request({
    url: "/message/notification",
    method: "get",
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

