import Vue from 'vue'
import Router from 'vue-router'
import login from '../view/login'
import home from '../view/home'
import params from '../view/params'
import homeChild from '../view/home-child'
import nameRoute from '../view/name-route'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/login', component: login, name: 'login'},
    {path: '/home', component: home, children: [{path:'', component: homeChild}]},
    {path: '/params/:id', component: params},
    {path: '/nameroute/:nameId', component: nameRoute, name: 'nameroute'},
  ]
})
