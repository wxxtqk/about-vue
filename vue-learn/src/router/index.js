import Vue from 'vue'
import Router from 'vue-router'
// import login from '@/view/login'
// import home from '@/view/home'
const _import = require('./_import_' + process.env.NODE_ENV)
// 如果是在开发模式下关闭懒加载，在生产版本中实现懒加载
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: _import('home'),
      children: [
        {path: 'account', name: 'account', component: _import('account/index')},
        {path: 'water', name: 'water', component: _import('water/index')},
        {path: '', redirect: 'account'}
      ]
    }, {
      path: '/login',
      name: 'login',
      component: _import('login')
    }, {
      path: '/',
      name: 'home',
      redirect: '/home',
      component: _import('home')
    }
  ]
})
