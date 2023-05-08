import request from "@/utils/request";
export function getPostInfo(postId, page, perPage, isOnlyHost) {
  // console.log("getPostInfo", postId, page, perPage, isOnlyHost)
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
    url: `/post/reply/${replyId}`,
    method: "delete",
  });
}

export function deleteComment(commentId) {
  return request({
    url: `/post/comment/${commentId}`,
    method: "delete",
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

export function followOrUnfollowUser(userId) {
  return request({
    url: "/post/follow_user",
    method: "post",
    data: {
      followingId: userId,
    },
  });
}

export function getIfFollowUser(userId) {
  return request({
    url: "/post/is_follow/" + userId,
    method: "get",
  });
}

export function deletePost(postId) {
  return request({
    url: "/post/" + postId,
    method: "delete",
  });
}
