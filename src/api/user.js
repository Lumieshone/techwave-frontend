import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}

export function getInfo() {
  return request({
    url: "/user/info",
    method: "get",
    // params: { token },
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

export function sendEmailCode(email) {
  return request({
    url: "/user/send_email_code",
    method: "post",
    data: { email: email },
  });
}

export function verifyAndModifyPassword(data) {
  return request({
    url: "/user/reset_password",
    method: "post",
    data,
  });
}
