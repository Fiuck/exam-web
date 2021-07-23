import { request } from "utils/request"

// 登录
export function login(data) {
  return request({
    url: "/auth/login",
    method: "post",
    data,
  })
}

// 获取用户信息
export function info() {
  return request({
    url: "/auth/info",
    method: "get"
  })
}

// 注销
export function logout() {
  return request({
    url: "/auth/logout",
    method: "post"
  })
}