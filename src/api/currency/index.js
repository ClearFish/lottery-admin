import request from '@/utils/request'

// 货币列表 /admin/v1/currency/config/
export function getCurrencyConfigList(data) {
  return request({
    url: '/admin/v1/currency/config',
    method: 'get',
    params: data
  })
}
// 查看详情 /admin/v1/currency/config/{id}
export function getCurrencyConfigDetail(data) {
  return request({
    url: '/admin/v1/currency/config/' + data.id,
    method: 'get',
    params: {}
  })
}
// 新增 /admin/v1/currency/config
export function addCurrencyConfig(data) {
  return request({
    url: '/admin/v1/currency/config',
    method: 'post',
    data: data
  })
}
// 更新 /api/admin/v1/currency/config/1
export function updateCurrencyConfig(data) {
  return request({
    url: '/admin/v1/currency/config/' + data.id,
    method: 'put',
    data: data
  })
}
// 删除 /admin/v1/currency/config/{id}
export function deleteCurrencyConfig(data) {
  return request({
    url: '/admin/v1/currency/config/' + data.id,
    method: 'delete',
    params: {}
  })
}
