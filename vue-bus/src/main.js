// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import bus from './bus.js'  // 引入全局的空的vue实例
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$bus = bus // 添加到Vue的实例上,这样以后使用就不会每个组件都引入bus.js

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
