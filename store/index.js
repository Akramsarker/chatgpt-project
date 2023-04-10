import Vuex from 'vuex'

const createStore = () => {
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
  })
}

export default createStore
