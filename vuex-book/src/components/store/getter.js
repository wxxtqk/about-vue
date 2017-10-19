const getters = {
	// 过滤所有笔记和喜欢的笔记
  getNotes (state) {
  	if (state.notesType === 'all') {
  		return state.notes
  	} else {
	  	return state.notes.filter(data => data.favorite)
  	}
  }
}
export default getters
