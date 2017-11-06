import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
// import { Message } from 'element-ui'
const whiteList = ['/login'] // 不不定向白名单
router.beforeEach((to, from, next) => {
  console.log(to.path)
  if (getToken()) {
    if (to.path === '/login') {
      next({path: '/home'})
    } else {
      // 拉取用户信息
      if (store.getters.roles.length === 0) {
        store.dispatch('UserInfo').then((res) => {
          if (!res) {
            Message.error('拉取用户信息失败')
            store.dispatch('FedLogOut').then(() => {
              next({path: '/login'})
            })
          } else {
            store.dispatch('GenerateRoutes', store.getters.roles).then(() => {
              console.log('路由表', store.getters.addRouters)
              router.addRoutes(store.getters.addRouters) // 动态添加可访问的路由
              next({...to}) // hack方法,确保addRutes已完成
              // next() // 直接使用该方法刷新页面后不会保留在历史页，而页面是空白的
            })
          }
        }).catch(() => {
          Message.error('拉取用户信息失败!请重新登录')
          store.dispatch('FedLogOut').then(() => {
            next({path: '/login'})
          })
        })
      } else {
        next()
      }
    }
  } else {
    // 执行登录操作
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
