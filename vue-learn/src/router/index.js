import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login'
import home from '@/view/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
    	component: home
    }, {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '/',
      name: 'home',
      component: home
    }
  ]
})
