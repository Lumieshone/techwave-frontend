import request from "@/utils/request";

export function passSectionRequest(data) {
  return request({
    url: "/admin/section_request",
    method: "post",
    data,
  });
}

export function banUser(data) {
  return request({
    url: "/admin/ban_user",
    method: "post",
    data,
  });
}

export function denyReport(data) {
  return request({
    url: "/admin/report",
    method: "delete",
    data,
  });
}

export function getSectionRequest(page, perPage) {
  return request({
    url: "/admin/section_request",
    method: "get",
    params: {
        page,
        perPage,
    },
  });
}

export function getReport(page, perPage) {
  return request({
    url: "/admin/report",
    method: "get",
    params: {
        page,
        perPage,
    },
  });
}