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

export function denyReport(reportId) {
  return request({
    url: `/admin/report/${reportId}`,
    method: "delete",
    
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

export function adminLogin(data) {
  return request({
    url: "/admin/login",
    method: "post",
    data,
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

export function getBanList(){
  return request({
    url:"/admin/ban_user",
    method:"get",

  })
}

export function unbanUser(data){
  return request({
    url:"admin/unban_user",
    method:"post",
    data
  })
}