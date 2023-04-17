import request from "@/utils/request";

export function editSectionAvatar(fd) {
  return request({
    url: "/moderator/edit_avatar",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: fd,
  });
}

export function editSectionDescription(sectionId, description) {
  return request({
    url: "/moderator/edit_description",
    method: "post",
    data: {
      sectionId: sectionId,
      description: description,
    },
  });
}

export function changeSectionName(sectionId, name) {
  return request({
    url: "/moderator/edit_section_name",
    method: "post",
    data: {
      sectionId: sectionId,
      name: name,
    },
  });
}

export function addSubsection(sectionId, name) {
  return request({
    url: "/moderator/add_subsection",
    method: "post",
    data: {
      sectionId,
      name,
    },
  });
}

export function deleteSubsection(id) {
  return request({
    url: "/moderator/subsection",
    method: "delete",
    data: {
      subsectionId: id,
    },
  });
}

export function renameSubsection(id, name) {
  return request({
    url: "/moderator/rename_subsection",
    method: "post",
    data: {
      subsectionId: id,
      name: name,
    },
  });
}

export function getSubsectionInfo(id) {
  return request({
    url: "/moderator/subsection_info",
    method: "get",
    params: {
      subsectionId: id,
    },
  });
}

export function getSectionInfo(sectionId) {
  return request({
    url: `/moderator/section/${sectionId}`,
    method: "get",
  });
}

export function searchUser(content, page, perPage) {
    return request({
        url: "/moderator/search",
        method: "get",
        params: {
            content,
            page,
            perPage,
        },
    });
}

export function transferSection(sectionId, transferredId) {
    return request({
        url: "/moderator/transfer_section",
        method: "post",
        data: {
            sectionId,
            transferredId,
        },
    });
}

export function getPostReport(page, perPage, sectionId) {
    return request({
        url: "/moderator/post_report",
        method: "get",
        params: {
            page,
            perPage,
            sectionId,
        },
    });
}

export function getCommentReport(page, perPage, sectionId) {
    return request({
        url: "/moderator/comment_report",
        method: "get",
        params: {
            page,
            perPage,
            sectionId,
        },
    });
}

export function denyPostReport(data) {
    return request({
        url: "/moderator/post_report",
        method: "delete",
        data,
    });
}

export function acceptPostReport(data) {
    return request({
        url: "/moderator/post",
        method: "delete",
        data,
    });
}

export function denyCommentReport(data) {
    return request({
        url: "/moderator/comment_report",
        method: "delete",
        data,
    });
}

export function acceptCommentReport(data) {
    return request({
        url: "/moderator/comment",
        method: "delete",
        data,
    });
}

export function getPinnedPosts(sectionId) {
    return request({
        url: "/moderator/pinned_post",
        method: "get",
        params: {
            sectionId,
        },
    });
}

export function pinOrNotPinPost(data) {
    return request({
        url: "/moderator/pin_post",
        method: "post",
        data,
    });
}

export function getHighlightedPosts(sectionId) {
    return request({
        url: "/moderator/highlighted_post",
        method: "get",
        params: {
            sectionId,
        },
    });
}

export function highlightOrNotHighlightPost(data) {
    return request({
        url: "/moderator/highlight_post",
        method: "post",
        data,
    });
}

export function getBannedUsers(sectionId) {
    return request({
        url: "/moderator/banned_user",
        method: "get",
        params: {
            sectionId,
        },
    });
}

export function banUser(data) {
    return request({
        url: "/moderator/ban_user",
        method: "post",
        data,
    });
}

export function unbanUser(data) {
    return request({
        url: "/moderator/ban_user",
        method: "delete",
        data,
    });
}

