import request from '@/utils/request'
// 获取代理用户列表
export function getUserList(data) {
  return request({
    url: '/admin/v1/auth/user',
    method: 'get',
    params: data
  })
}
// 获取代理用户详情
export function getAuterUser(data) {
  return request({
    url: '/admin/v1/auth/user/'+data.id,
    method: 'get',
    params: {}
  })
}
// 新增
export function addUser(data) {
  return request({
    url: '/admin/v1/auth/user',
    method: 'post',
    data: data
  })
}
// 编辑
export function updateUser(data) {
  return request({
    url: '/admin/v1/auth/user/'+data.id,
    method: 'put',
    data: data
  })
}
// 删除
export function deleteUser(data) {
  return request({
    url: '/admin/v1/auth/user/'+data.id,
    method: 'delete',
    data: data
  })
}

//操作日志 /admin/v1/auth/log/
export function getLogList(data) {
  return request({
    url: '/admin/v1/auth/log',
    method: 'get',
    params: data
  })
}
// 查询操作日志  /api/admin/v1/auth/log/698c2f338609fdf26a74af7a
export function getLogDetail(data) {
  return request({
    url: '/admin/v1/auth/log/'+data.id,
    method: 'get',
    params: {}
  })
}

// 删除操作日志 /api/admin/v1/auth/log/698c2f338609fdf26a74af7a
export function deleteLog(data) {
  return request({
    url: '/admin/v1/auth/log/'+data.id,
    method: 'delete',
    data: data
  })
}


