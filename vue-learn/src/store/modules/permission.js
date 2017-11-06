import { stateRoute, asyncRoute } from '@/router'
const permisssion = {
  state: {
    routers: stateRoute,
    addRouters: []
  },
  mutations: {
    SET_ROUTER: (state, routers) => {
      state.addRouters = routers
      state.routers = stateRoute.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({commit}, data) {
      return new Promise(resolve => {
        const roles = data
        let activeRouters
        // 使用admin做测试
        if (roles.indexOf('admin') >= 0) {
          activeRouters = asyncRoute
        } else {
          activeRouters = []
        }
        resolve()
        commit('SET_ROUTER', activeRouters)
      })
    }
  }
}
export default permisssion
