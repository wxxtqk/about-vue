import Vuex from 'vuex'
import Vue from 'vue'
import state from './state'
import getters from './getter'
import mutations from './mutation'
import actions from './action'
Vue.use(Vuex)
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
export default store
