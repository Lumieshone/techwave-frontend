import request from "@/utils/request";

export function get_post_info(params) {
    return request({
        url: "/post/post_data",
        method: "get",
        params,
    });
}

export function collect_post(id, folderId) {
    return request({
        url: "/post/collect_post",
        method: "post",
        data: {id: id, folderId: folderId},
    });
}

export function delete_reply(replyId) {
    return request({
        url: "/post/reply",
        method: "delete",
        data: {replyId: replyId},
    });
}

export function delete_comment(commentId) {
    return request({
        url: "/post/comment",
        method: "delete",
        data: {commentId: commentId},
    });
}

export function reply_on_post(data) {
    return request({
        url: "/post/reply_on_post",
        method: "post",
        data,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export function reply_on_comment(data) {
    return request({
        url: "/post/reply_on_comment",
        method: "post",
        data,
    });
}

export function reply_on_reply(data) {
    return request({
        url: "/post/reply_on_reply",
        method: "post",
        data,
    });
}
