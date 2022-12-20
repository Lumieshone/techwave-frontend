import request from "@/utils/request";

export function get_user_info() {
  return request({
    url: "/user/account/get_user_info",
    method: "get",
    params: {},
  });
}
export function change_avatar(fd) {
  return request({
    url: "/user/account/change_avatar",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: fd,
  });
}

export function edit_info(form) {
  return request({
    url: "/user/account/edit_info",
    method: "post",
    data: form,
  });
}

export function edit_password(oldPassword, newPassword) {
  return request({
    url: "/user/account/edit_password",
    method: "post",
    data: {
      oldPassword: oldPassword,
      newPassword: newPassword,
    },
  });
}

export function edit_email(password, email) {
  return request({
    url: "/user/account/edit_email",
    method: "post",
    data: {
      password: password,
      email: email,
    },
  });
}
export function get_folders() {
  return request({
    url: "/user/account/get_folders",
    method: "get",
    params: {},
  });
}
export function get_collect_info(folderId, curPage, limit) {
  return request({
    url: "/user/account/get_collect_info",
    method: "get",
    params: {
      folderId,
      curPage,
      limit,
    },
  });
}

export function rename_folder(folderId, folderName) {
  return request({
    url: "/user/account/rename_folder",
    method: "post",
    data: {
      folderId: folderId,
      folderName: folderName,
    },
  });
}
export function create_folder(folderName) {
  return request({
    url: "/user/account/create_folder",
    method: "post",
    data: {
      folderName: folderName,
    },
  });
}

export function delete_folder(folderId) {
  return request({
    url: "/user/account/delete_folder",
    method: "delete",
    data: {
      folderId: folderId,
    },
  });
}

export function get_my_post(curPage, limit) {
  return request({
    url: "/user/account/get_my_post",
    method: "get",
    params: {
      type: "post",
      curPage: curPage,
      limit: limit,
    },
  });
}

export function delete_my_post(postId) {
  return request({
    url: "/user/account/delete_my_post",
    method: "delete",
    data: {
      postId: postId,
    },
  });
}
export function publish_certify(fd) {
  return request({
    url: "/user/account/apply_to_student",
    method: "post",
    data: fd,
  });
}

export function get_my_sell_transaction(params) {
  return request({
    url: "/user/account/get_my_sell_transaction",
    method: "get",
    params: params,
  });
}

export function get_my_seek_transaction(params) {
  return request({
    url: "/user/account/get_my_seek_transaction",
    method: "get",
    params: params,
  });
}

export function get_my_collect_transaction(params) {
  return request({
    url: "/user/account/get_my_collect_transaction",
    method: "get",
    params: params,
  });
}

export function delete_my_sell_transaction(id) {
  return request({
    url: "/user/account/delete_my_sell_transaction",
    method: "delete",
    data: {
      id: id,
    },
  });
}

export function delete_my_seek_transaction(id) {
  return request({
    url: "/user/account/delete_my_seek_transaction",
    method: "delete",
    data: {
      id: id,
    },
  });
}

export function get_my_comment_and_reply(params) {
  return request({
    url: "/user/get_my_reply",
    method: "get",
    params: params,
  });
}

export function get_user_sections() {
  return request({
    url: "/user/account/get_user_sections",
    method: "get",
    params: {},
  });
}

export function create_section(fd) {
  return request({
    url: "/user/account/create_section",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: fd,
  });
}

export function add_subsection(id,name) {
  return request({
    url: "/user/account/add_subsection",
    method: "post",
    data: {
      id:id,
      name:name
    },
  });
}

export function delete_subsection(id) {
  return request({
    url: "/user/account/delete_subsection",
    method: "delete",
    data: {
      id: id,
    },
  });
}

export function rename_subsection(id,name) {
  return request({
    url: "/user/account/rename_subsection",
    method: "post",
    data: {
      id:id,
      name:name
    },
  });
}