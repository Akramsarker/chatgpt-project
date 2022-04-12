import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { initialState as state } from './state'

const namespaced = true

export const examModule = {
  namespaced,
  state,
  getters,
  mutations,
  actions,
}

export default examModule
