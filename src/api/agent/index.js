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

// 余额钱包 /admin/v1/currency/agent-wallet
export function getAgentWallet(data) {
  return request({
    url: '/admin/v1/currency/agent-wallet',
    method: 'get',
    params: data
  })
}

// 新增钱包 /admin/v1/currency/agent-wallet/
export function addAgentWallet(data) {
  return request({
    url: '/admin/v1/currency/agent-wallet',
    method: 'post',
    data: data
  })
}
// 查询钱包 /admin/v1/currency/agent-wallet/{id}
export function getAgentWalletDetail(data) {
  return request({
    url: '/admin/v1/currency/agent-wallet/'+data.id,
    method: 'get',
    params: {}
  })
}
// 增减余额 /admin/v1/currency/agent-wallet/balance
export function updateAgentWalletBalance(data) {
  return request({
    url: '/admin/v1/currency/agent-wallet/balance',
    method: 'patch',
    data: data
  })
}
// 代理用户余额记录列表 /admin/v1/currency/agent-balance-logs/
export function getAgentBalanceLogsList(data) {
  return request({
    url: '/admin/v1/currency/agent-balance-logs/',
    method: 'get',
    params: {}
  })
}
// 代理白名单列表 /api/admin/v1/agent/ip-whitelist/
export function getAgentWhiteListList(data) {
  return request({
    url: '/admin/v1/agent/ip-whitelist/',
    method: 'get',
    params: {}
  })
}
// 代理白名单详情 /api/admin/v1/agent/ip-whitelist/{id}
export function getAgentWhiteListDetail(data) {
  return request({
    url: '/admin/v1/agent/ip-whitelist/'+data.id,
    method: 'get',
    params: {}
  })
}
// 新增代理白名单 /api/admin/v1/agent/ip-whitelist/
export function addAgentWhiteList(data) {
  return request({
    url: '/admin/v1/agent/ip-whitelist/',
    method: 'post',
    data: data
  })
}

// 编辑代理白名单 /api/admin/v1/agent/ip-whitelist/{id}
export function updateAgentWhiteList(data) {
  return request({
    url: '/admin/v1/agent/ip-whitelist/'+data.id,
    method: 'put',
    data: data
  })
}
// 删除代理白名单 /api/admin/v1/agent/ip-whitelist/{id}
export function deleteAgentWhiteList(data) {
  return request({
    url: '/admin/v1/agent/ip-whitelist/'+data.id,
    method: 'delete',
    data: data
  })
}


