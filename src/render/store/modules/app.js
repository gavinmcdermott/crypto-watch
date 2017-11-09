import { CHANGE_APP_IS_TRANSACTING } from '../../../constants/vue/mutations'

// Initial state
const state = {
  isTransacting: false
}

// Getters
const getters = {
  isTransacting: state => state.isTransacting,
}

// Mutations
const mutations = {
  [CHANGE_APP_IS_TRANSACTING] (state, bool) {
    state.isTransacting = bool
  }
}

export default {
  state,
  getters,
  mutations,
}
