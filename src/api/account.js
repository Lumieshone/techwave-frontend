import request from "@/utils/request";

export function getUserInfo() {
  return request({
    url: "/account/info",
    method: "get",
  });
}

export function changeAvatar(fd) {
  return request({
    url: "/account/change_avatar",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: fd,
  });
}

export function editInfo(form) {
  return request({
    url: "/account/info",
    method: "post",
    data: form,
  });
}

export function editPassword(oldPassword, newPassword) {
  return request({
    url: "/account/modify_password",
    method: "post",
    data: {
      oldPassword,
      newPassword,
    },
  });
}

export function editEmail(password, email) {
  return request({
    url: "/account/modify_email",
    method: "post",
    data: {
      password,
      email,
    },
  });
}
export function getFolders() {
  return request({
    url: "/account/getFolders",
    method: "get",
  });
}
export function getCollectInfo(folderId, page, perPage) {
  return request({
    url: "/account/collect",
    method: "get",
    params: {
      folderId,
      page,
      perPage,
    },
  });
}

export function renameFolder(folderId, folderName) {
  return request({
    url: "account/rename_folder",
    method: "post",
    data: {
      folderId,
      folderName,
    },
  });
}
export function createFolder(folderName) {
  return request({
    url: "/account/create_folder",
    method: "post",
    data: {
      folderName,
    },
  });
}

export function deleteFolder(folderId) {
  return request({
    url: "/account/folder",
    method: "delete",
    data: {
      folderId,
    },
  });
}

export function getMyPost(page, perPage) {
  return request({
    url: "/account/post",
    method: "get",
    params: {
      type: "post",
      curPage: page,
      limit: perPage,
    },
  });
}

export function deleteMyPost(postId) {
  return request({
    url: "/account/post",
    method: "delete",
    data: {
      postId: postId,
    },
  });
}


export function getUserSections() {
  return request({
    url: "/account/section",
    method: "get",
  });
}

export function createSection(fd) {
  return request({
    url: "/account/create_section",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: fd,
  });
}


