import Cookies from 'js-cookie'
const userToken = 'Aamin-Token'
export function getToken () {
  return Cookies.get(userToken)
}
export function setToken (token) {
  return Cookies.set(userToken, token)
}
export function removeToken () {
  return Cookies.remove(userToken)
}
