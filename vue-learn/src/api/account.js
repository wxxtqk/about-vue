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
    url: 'http://192.168.199.206:8089/ods-backstage-web/user/list',
    method: 'post',
    data
  })
}
