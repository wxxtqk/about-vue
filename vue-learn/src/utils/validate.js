// 验证用户名
export function isValidUserName (str) {
  const userWrap = ['admin', 'test']
  return userWrap.indexOf(str.trim()) >= 0
}
