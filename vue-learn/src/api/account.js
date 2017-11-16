import fetch from '@/utils/fetch-no-token'
import qs from 'qs'
// 获取用户列表
export function accountList (page, rows) {
  let data = {
    page,
    rows
  }
  data = qs.stringify(data)
  return fetch({
    url: 'https://easy-mock.com/mock/59f7d52e27a30f73db85fb88/test/getAccount',
    method: 'post',
    data
  })
}
// 上传头像
export function uploadFile (data) {
  return fetch({
    url: 'http://192.168.199.206:8089/ods-backstage-web/image/head',
    method: 'post',
    data: data
  })
}
// 获取增加用户需要的select选项
export function fetchSystem () {
  return fetch({
    url: 'https://easy-mock.com/mock/59f7d52e27a30f73db85fb88/test/sysytem',
    method: 'post'
  })
}
// 新增用户
export function addAccount (data) {
  data = qs.stringify(data)
  return fetch({
    url: 'http://192.168.199.206:8089/ods-backstage-web/user/add',
    method: 'post',
    data
  })
}
// 查询用户好友列表
export function fetchFriends (data) {
  data = qs.stringify(data)
  return fetch({
    url: 'http://192.168.199.206:8089/ods-backstage-web/frend/select/all',
    method: 'post',
    data
  })
}
// 新增好友
export function appendFriend (info) {
  info = qs.stringify(info)
  return fetch({
    url: 'http://192.168.199.206:8089/ods-backstage-web/frend/add',
    method: 'post',
    data: info
  })
}
// 移除好友
export function deleteFriend (info) {
  info = qs.stringify(info)
  return fetch({
    url: 'http://192.168.199.206:8089/ods-backstage-web/frend/delelt',
    method: 'post',
    data: info
  })
}
// 获取用户信息以便修改
export function fetchUserinfo (info) {
  info = qs.stringify(info)
  return fetch({
    url: 'http://192.168.199.206:8089/ods-backstage-web/user/getUser',
    method: 'post',
    data: info
  })
}
// 修改用户信息
export function modifyInfo (info) {
  info = qs.stringify(info)
  return fetch({
    url: 'http://192.168.199.206:8089/ods-backstage-web/user/modify',
    method: 'post',
    data: info
  })
}
// 修改用户密码
export function modifyPass (info) {
  info = qs.stringify(info)
  return fetch({
    url: 'http://192.168.199.206:8089/ods-backstage-web/user/updata/pwd',
    method: 'post',
    data: info
  })
}
// 删除用户
export function deleteAccount (userInfoId) {
  let data = {
    userInfoId
  }
  data = qs.stringify(data)
  return fetch({
    url: 'http://192.168.199.206:8089/ods-backstage-web/user/delete',
    // url: 'http://192.168.199.110:8083/user/delete',
    method: 'post',
    data
  })
}
