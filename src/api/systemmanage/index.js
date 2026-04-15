import request from '@/utils/request'
// 获取代理用户列表
export function getUserList(data) {
  return request({
    url: '/admin/v1/auth/user',
    method: 'get',
    params: data
  })
}
