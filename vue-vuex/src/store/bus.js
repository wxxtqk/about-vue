import Vuex from 'vuex'
import Vue from 'vue'
import {SUN_COUNT, ACTION_A, ACTION_B} from './mution-types'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		count: 5,
		actionA: '',
		actionB: '',
		todos: [
			{ id: 1, text: '过滤数据', done: true },
			{ id: 2, text: '过滤数据案列', done: false },
		]
	},
	// 过滤一些数据
	getters: {
		// 过滤掉done为false的值
		doneTodos: state => {
			return state.todos.filter(data => data.done)
		},
		// 获取过滤掉done为false的值后长度
		doneTodosLen: (state, getters) => {
			return getters.doneTodos.length
		},
		// 返回一个通过id查询的值
		doneTodosId: (state, getters) => (id) => {
			return state.todos.filter(data => data.id === id)
		}
	},
	// 这是是同步的操作
	mutations: {
		[SUN_COUNT] (state, payload) {
			state.count += payload.amount
		},
		[ACTION_A] (state, payload) {
			state.actionA = payload.actionA
		},
		[ACTION_B] (state, payload) {
			state.actionB = payload.actionB
		}
	},
	// 这个是可以包含任意异步操作
	actions: {
		sumCount ({commit}, payload) {
			// 实行异步操作1000ms后在执行
			setTimeout(() =>{
				commit('SUN_COUNT', payload)	
			},1000)
		},
		// actionA和actionB组合进行使用
		actionA ({commit}, payload) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					commit('ACTION_A', payload)
					resolve()
				},1000)
			});
		},
		actionB ({commit}, payload) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					commit('ACTION_B', payload)
					resolve()
				},1000)
			});
		}
	}
})
export default store