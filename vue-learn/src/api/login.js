// import fetch from '@/utils/fetch'
import fetchNoToken from '@/utils/fetch-no-token'
import qs from 'qs'
// 验证用户,并获取token
export function login (username, password) {
  let data = {
    userAccount: username,
    userPassword: password
  }
  data = qs.stringify(data)
  return fetchNoToken({
    // url: 'http://192.168.199.206:8089/ods-sso-web/user/login',
    url: 'https://easy-mock.com/mock/59f7d52e27a30f73db85fb88/test/login',
    method: 'post',
    data
  })
}
// 获取用户的权限
export function userInfo (token) {
  let data = {
    token
  }
  data = qs.stringify(data)
  return fetchNoToken({
    // url: 'http://192.168.199.206:8089/ods-sso-web/user/token',
    url: 'https://easy-mock.com/mock/59f7d52e27a30f73db85fb88/test/get/userIf',
    method: 'post',
    data
  })
}
