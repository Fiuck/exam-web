import { request } from '@/utils/request'

// 获取路由
export function getRouters() {
  return request({
    url: '/api/auth/routers',
    method: 'get'
  })
}