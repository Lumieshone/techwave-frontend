import request from '@/utils/request'

let baseURL = process.env.VUE_APP_BASE_API;

export function login(data) {
  return request({
    url: baseURL + '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: baseURL + '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: baseURL + '/user/logout',
    method: 'post'
  })
}
