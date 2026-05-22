import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
  return request({
    url: '/admin/v1/auth/user/menu',
    method: 'get'
  })
}