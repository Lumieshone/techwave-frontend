import request from "@/utils/request";

export function get_user_info() {
    return request({
        url: "/account/get_user_info",
        method: "get",
        params: {
        },
    });
}
export function change_avatar(fd) {
    return request({
        url: "/account/change_avatar",
        method: "post",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: fd
    });
}

export function edit_info(form) {
    return request({
        url: "/account/edit_info",
        method: "post",
        data: form
    });
}

export function edit_password(oldPassword,newPassword) {
    return request({
        url: "/account/edit_password",
        method: "post",
        data: {
            oldPassword:oldPassword,
            newPassword:newPassword
        }
    });
}

export function edit_email(password,email) {
    return request({
        url: "/account/edit_email",
        method: "post",
        data: {
            password:password,
            email:email
        }
    });
}
export function get_folders() {
    return request({
        url: "/account/get_folders",
        method: "get",
        params: {
        },
    });
}
export function get_collect_info(folderId, curPage, limit) {
    return request({
        url: "/account/get_collect_info",
        method: "get",
        params: {
            folderId,
            curPage,
            limit
        },
    });
}

export function rename_folder(folderId,folderName) {
    return request({
        url: "/account/rename_folder",
        method: "post",
        data: {
            folderId:folderId,
            folderName:folderName
        }
    });
}
export function create_folder(folderName) {
    return request({
        url: "/account/create_folder",
        method: "post",
        data: {
            folderName:folderName
        }
    });
}

export function delete_folder(folderId) {
    return request({
        url: "/account/delete_folder",
        method: "delete",
        data: {
            folderId:folderId
        }
    });
}