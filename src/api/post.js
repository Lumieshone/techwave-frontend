import request from "@/utils/request";

export function getUserCards(userId) {
  return request({
    url: `/account/${userId}/card`,
    method: "get",
  });
}

export function getPostInfo(postId, page, perPage, isOnlyHost) {
  return request({
    url: `/post/${postId}`,
    method: "get",
    params: {
      page: page,
      perPage: perPage,
      isOnlyHost: isOnlyHost,
    },
  });
}

export function collectOrUncollectPost(data) {
  return request({
    url: "/post/collect",
    method: "post",
    data,
  });
}

export function deleteReply(replyId) {
  return request({
    url: "/post/reply",
    method: "delete",
    data: { replyId: replyId },
  });
}

export function deleteComment(commentId) {
  return request({
    url: "/post/comment",
    method: "delete",
    data: { commentId: commentId },
  });
}

export function replyOnPost(data) {
  return request({
    url: "/post/reply_on_post",
    method: "post",
    data,
  });
}

export function replyOnComment(data) {
  return request({
    url: "/post/reply_on_comment",
    method: "post",
    data,
  });
}

export function replyOnReply(data) {
  return request({
    url: "/post/reply_on_reply",
    method: "post",
    data,
  });
}

export function reportInPost(data) {
  return request({
    url: "/post/report",
    method: "post",
    data,
  });
}

export function likeOrUnlikePost(data) {
  return request({
    url: "/post/like",
    method: "post",
    data,
  });
}

export function followOrUnfollowUser(data) {
  return request({
    url: "/post/follow_user",
    method: "post",
    data,
  });
}