import { CHANGE_COPILOT_IS_ACTIVE } from '../../../constants/vue/mutations'

// Initial state
const state = {
  copilot: {
    isActive: false,
  }
}

// Getters
const getters = {
  copilot: state => state.copilot,
}

// Mutations
const mutations = {
  [CHANGE_COPILOT_IS_ACTIVE] (state, bool) {
    state.copilot.isActive = bool
  }
}

export default {
  state,
  getters,
  mutations,
}
