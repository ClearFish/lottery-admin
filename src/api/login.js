import request from '@/utils/request'

// 登录方法
export function login(username, password, captcha, cap_id) {
  const data = {
    // username_desc:'用户名',
    // password_desc:'密码',
    // cap_id_desc:'验证码ID',
    // captcha_desc:'验证码',
    username,
    password,
    captcha,
    cap_id
  }
  return request({
    url: '/admin/v1/login',
    headers: {
      isToken: false,
      repeatSubmit: false
    },
    method: 'post',
    data: data
  })
}

// 注册方法
export function register(data) {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 解锁屏幕
export function unlockScreen(password) {
  return request({
    url: '/unlockscreen',
    method: 'post',
    data: { password }
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/admin/v1/captcha',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}