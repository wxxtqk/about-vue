import * as type from './mutation-type'
const mutations = {
  // 添加笔记
  [type.ADD_NOTE] (state) {
    const newNote = {
      text: '这是内容',
      favorite: false,
      header: '这是标题'
    }
    state.notes.push(newNote) // 添加笔记
    state.activeNote = newNote
  },
  // 设置活动笔记
  [type.SET_ACTIVE] (state, note) {
    state.activeNote = note
  },
  // 修改笔记内容
  [type.EDIT_NOTE] (state, text) {
    state.activeNote.text = text
  },
  // 标记为喜欢
  [type.ADD_FAVORITE] (state) {
    for (let val of state.notes) {
      if (val === state.activeNote) {
      	val.favorite = !val.favorite
      }
    }
  },
  // 删除笔记
  [type.DEL_NOTE] (state) {
  	if (state.notes.length > 0) {
  		let index = state.notes.indexOf(state.activeNote) // 获取活动笔记的位置
  		state.notes.splice(index, 1) // 删除
  		// 如果删除后笔记数组还有值就默认设置第一个为活动笔记
  		if (state.notes.length > 0) state.activeNote = state.notes[0]
  	}
  },
  // 记录活动在所有笔记还是在喜欢
  [type.ALL_FAVOR] (state, type) {
    state.notesType = type
  }
}
export default mutations
