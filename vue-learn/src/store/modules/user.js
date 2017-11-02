import { login, userInfo } from '@/api/login' // 登录
import { getToken, setToken, removeToken } from '@/utils/auth' // cookie的设置
const SUCCES_STATE = 200
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    // 用户登录
    Login ({commit}, userInfo) {
      const username = userInfo.name
      const password = userInfo.password
      return new Promise((resolve, reject) => {
        login(username, password).then((response) => {
          response = response.data
          if (response.state === SUCCES_STATE) {
            const data = response.data
            setToken(data.token)
            commit('SET_TOKEN', data.token)
            resolve(true)
          } else {
            resolve(false)
          }
        }).catch((error) => {
          reject(error)
        })
      })
    },
    // 拉取用户的权限
    UserInfo ({commit, state}) {
      console.log(state.token)
      return new Promise((resolve, reject) => {
        userInfo(state.token).then((response) => {
          response = response.data
          if (response.state === SUCCES_STATE) {
            const data = response.data
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.avatar)
            commit('SET_ROLES', data.roles)
            resolve(true)
          } else {
            resolve(false)
          }
        }).catch((error) => {
          reject(error)
        })
      })
    },
    // 前端退出登录
    FedLogOut ({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}
export default user
