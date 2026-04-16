import request from '@/utils/request'
export function uploadFile(data) {
  return request({
    url: '/admin/v1/general/attachment',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: data
  })
}