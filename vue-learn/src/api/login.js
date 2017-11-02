import fetch from '@/utils/fetch'
// 验证用户,并获取token
export function login (username, password) {
  return fetch({
    url: 'https://easy-mock.com/mock/59f7d52e27a30f73db85fb88/test/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}// 获取用户的权限
export function userInfo (token) {
  return fetch({
    url: 'https://easy-mock.com/mock/59f7d52e27a30f73db85fb88/test/get/userIf',
    method: 'post',
    data: {
      token
    }
  })
}
