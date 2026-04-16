import request from '@/utils/request'
// 获取代理用户列表
export function getUserList(data) {
  return request({
    url: '/admin/v1/auth/user',
    method: 'get',
    params: data
  })
}
export function addUser(data) {
  return request({
    url: '/admin/v1/auth/user',
    method: 'post',
    data: data
  })
}

export function updateUser(data) {
  return request({
    url: '/admin/v1/auth/user/1',
    method: 'put',
    data: data
  })
}

export function deleteUser(data) {
  return request({
    url: '/admin/v1/auth/user/1',
    method: 'delete',
    data: data
  })
}
