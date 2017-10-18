import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const state = {
  notes: [],
  activeNote: []
}
const mutations = {
  ADD_NOTE (state) {
    const newNote = {
      text: '这是内容',
      favorite: false,
      header: '这是标题'
    }
    console.log('+++')
    state.notes.push(newNote) // 添加笔记
    state.activeNote = newNote
  }
}
const actions = {
  addNote ({commit}) {
    commit('ADD_NOTE')
  }
}
const store = new Vuex.Store({
  state,
  mutations,
  actions
})
export default store
