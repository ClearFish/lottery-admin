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
// /api/admin/v1/auth/rule/
export function getPermissionList(data) {
  return request({
    url: '/admin/v1/auth/rule',
    method: 'get',
    params: data
  })
}
// /admin/v1/auth/rule
export function getPermissionDetail(data) {
  return request({
    url: '/admin/v1/auth/rule/'+data.id,
    method: 'get',
    params: {}
  })
}
// /api/admin/v1/auth/rule/17
export function updatePermission(data) {
  return request({
    url: '/admin/v1/auth/rule/'+data.id,
    method: 'put',
    data: data
  })
}
// /api/admin/v1/auth/rule/17
export function addPermission(data) {
  return request({
    url: '/admin/v1/auth/rule/',
    method: 'post',
    data: data
  })
}
// 系统配置 /admin/v1/general/config/
export function getGeneralConfig(data) {
  return request({
    url: '/admin/v1/general/config/',
    method: 'get',
    params: data
  })
}
// 附件管理 /v1/general/attachment/
export function getAttachmentList(data) {
  return request({
    url: '/admin/v1/general/attachment/',
    method: 'get',
    params: data
  })
}
// 权限分组列表 /admin/v1/auth/group/
export function getGroupList(data) {
  return request({
    url: '/admin/v1/auth/group/',
    method: 'get',
    params: data
  })
}
// 新增管理员及权限 /admin/v1/auth/rule/
export function addGroup(data) {
  return request({
    url: '/admin/v1/auth/group/',
    method: 'post',
    data: data
  })
}
// 编辑管理员及权限 /admin/v1/auth/group/
export function updateGroup(data) {
  return request({
    url: '/admin/v1/auth/group/'+data.id,
    method: 'put',
    data: data
  })
}
// 查看管理员及权限 /admin/v1/auth/group/
export function getGroupDetail(data) {
  return request({
    url: '/admin/v1/auth/group/'+data.id,
    method: 'get',
    params: {}
  })
} 





