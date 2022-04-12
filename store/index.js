import Vuex from 'vuex'
import exam from './modules/exam/index'

const createStore = () => {
  // eslint-disable-next-line import/no-named-as-default-member
  return new Vuex.Store({
    state: {
      user: null,
    },
    getters: {},
    mutations: {
      setUser(state, payload) {
        state.user = payload
      },
    },
    actions: {
      resetState({ commit }) {
        commit('exam/resetState', null, { root: true })
      },
    },
    modules: {
      exam,
    },
  })
}

export default createStore
