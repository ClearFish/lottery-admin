import request from '@/utils/request'

// 列表 /api/admin/v1/game/configs/
export function getGameConfigList(data) {
  return request({
    url: '/admin/v1/game/configs',
    method: 'get',
    params: data
  })
}
//查看详情 /api/admin/v1/game/configs/{id}
export function getGameConfigDetail(data) {
  return request({
    url: '/admin/v1/game/configs/'+data.id,
    method: 'get',
    params: {}
  })
}
// 更新游戏 /api/admin/v1/game/configs/13
export function updateGameConfig(data) {
  return request({
    url: '/admin/v1/game/configs/'+data.id,
    method: 'put',
    data: data
  })
}
