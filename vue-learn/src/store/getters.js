const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  name: state => state.user.name,
  routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}
export default getters
