import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}

export function adminlogin(data) {
  return request({
    url: "/admin/login",
    method: "post",
    data,
  });
}

export function getInfo(token) {
  return request({
    url: "/user/info",
    method: "get",
    params: { token },
  });
}

export function logout() {
  return request({
    url: "/user/logout",
    method: "post",
  });
}

export function register(data) {
  return request({
    url: "/user/register",
    method: "post",
    data,
  });
}

export function find_password(data) {
  return request({
    url: "/user/find_password",
    method: "post",
    data,
  });
}

export function send_email_code(email) {
  return request({
    url: "/user/send-email-code",
    method: "get",
    params: { email: email },
  });
}

export function verify_and_modify_pwd(data) {
  return request({
    url: "/user/forget-pwd",
    method: "post",
    data,
  });
}
