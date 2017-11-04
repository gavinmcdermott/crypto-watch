import { SET_PROTECTION_MODE } from '../../../constants/vue/mutations'

// Initial state
const state = {
  protectionMode: false,
}

// Getters
const getters = {
  protectionMode: state => state.protectionMode,
}

// Mutations
const mutations = {
  [SET_PROTECTION_MODE] (state, bool) {
    state.protectionMode = bool
  }
}

export default {
  state,
  getters,
  mutations,
}
