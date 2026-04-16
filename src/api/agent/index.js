import request from '@/utils/request'
// 获取代理用户列表
export function getUserList(data) {
  return request({
    url: '/admin/v1/agent/agent',
    method: 'get',
    params: data
  })
}
// 获取代理用户详情
export function getUserDetail(data) {
  return request({
    url: '/admin/v1/agent/agent/'+data.id,
    method: 'get',
    params: {}
  })
}
// 新增
export function addUser(data) {
  return request({
    url: '/admin/v1/agent/agent',
    method: 'post',
    data: data
  })
}
// 编辑
export function updateUser(data) {
  return request({
    url: '/admin/v1/agent/agent/'+data.id,
    method: 'put',
    data: data
  })
}
// 删除
export function deleteUser(data) {
  return request({
    url: '/admin/v1/agent/agent/'+data.id,
    method: 'delete',
    data: data
  })
}