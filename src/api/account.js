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
