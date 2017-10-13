import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		count: 5,
		todos: [
			{ id: 1, text: '过滤数据', done: true },
			{ id: 2, text: '过滤数据案列', done: false },
		]
	},
	// 过滤一些数据
	getters: {
		doneTodos: state => {
			return state.todos.filter(data => data.done)
		}
	},
	mutations: {
		sumCount (state) {
			state.count++
		}
	}
})
export default store