// import Vue from 'vue'
import { initialState } from './state'
export const mutations = {
  resetState(state) {
    const s = initialState()
    Object.keys(s).forEach((key) => {
      state[key] = s[key]
    })
  }
}
