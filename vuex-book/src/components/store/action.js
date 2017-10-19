const actions = {
  addNote ({commit}) {
    commit('ADD_NOTE')
  },
  addFavorite ({commit}) {
    commit('ADD_FAVORITE')
  },
  delNote ({commit}) {
  	commit('DEL_NOTE')
  }
}
export default actions
