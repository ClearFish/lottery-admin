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
// 分类列表 /api/admin/v1/game/play-type/play
export function getClassificList(data) {
  return request({
    url: '/admin/v1/game/play-type/play',
    method: 'get',
    params: data
  })
}
// 分类游戏详情 /api/admin/v1/game/play-type/4000
export function getClassificDetail(data) {
  return request({
    url: '/admin/v1/game/play-type/'+data.id,
    method: 'get',
    params: {}
  })
}
// 新增分类游戏 /api/admin/v1/game/play-type
export function addClassific(data) {
  return request({
    url: '/admin/v1/game/play-type',
    method: 'post',
    data: data
  })
}
// 更新分类游戏 /api/admin/v1/game/play-type/4000
export function updateClassific(data) {
  return request({
    url: '/admin/v1/game/play-type/'+data.id,
    method: 'put',
    data: data
  })
}
// 删除分类游戏 /api/admin/v1/game/play-type/4000
export function deleteClassific(data) {
  return request({
    url: '/admin/v1/game/play-type/'+data.id,
    method: 'delete',
    params: {}
  })
}

// 玩法列表 /api/admin/v1/game/play/
export function getGameplayList(data) {
  return request({
    url: '/admin/v1/game/play',
    method: 'get',
    params: data
  })
}
// 更新玩法 /api/admin/v1/game/play/
export function updateGameplay(data) {
  return request({
    url: '/admin/v1/game/play/'+data.id,
    method: 'put',
    data: data
  })
}
// 查询玩法详情 /api/admin/v1/game/play/1258
export function getGameplayDetail(data) {
  return request({
    url: '/admin/v1/game/play/'+data.id,
    method: 'get',
    params: {}
  })
}
// 盘口列表 /api/admin/v1/game/play-market/
export function getOddsConfigList(data) {
  return request({
    url: '/admin/v1/game/play-market',
    method: 'get',
    params: data
  })
}
// 盘口详情 /api/admin/v1/game/play-market/1258
export function getOddsConfigDetail(data) {
  return request({
    url: '/admin/v1/game/play-market/'+data.id,
    method: 'get',
    params: {}
  })
}
// 新增盘口配置 /api/admin/v1/game/play-market
export function addOddsConfig(data) {
  return request({
    url: '/admin/v1/game/play-market',
    method: 'post',
    data: data
  })
}
// 更新盘口配置 /api/admin/v1/game/play-market/1258
export function updateOddsConfig(data) {
  return request({
    url: '/admin/v1/game/play-market/'+data.id,
    method: 'put',
    data: data
  })
}
// 删除盘口配置 /api/admin/v1/game/play-market/1258
export function deleteOddsConfig(data) {
  return request({
    url: '/admin/v1/game/play-market/'+data.id,
    method: 'delete',
    params: {}
  })
}

