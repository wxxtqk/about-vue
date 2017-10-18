import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const moduleA = {
	state: {
		count: 0
	},
	mutations: {
		sumCount (state) {
			state.count++
		}
	},
	getters: {
		doubleCount (state) {
			return state.count * 2
		},
		sumWithRootCount (state, getters, rootState){
			return state.count + rootState.a.count
		}
	},
	actions: {
		incrementIfOddOnRootSum ({ state, commit, rootState }) {
				commit('sumCount')

		}
	}
}
const store = new Vuex.Store({
	modules: {
		a: moduleA
	}
})
export default store