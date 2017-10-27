import { SET_CLIPBOARD } from '../../constants/mutation-types'
// Learning from: https://github.com/vuejs/vuex/blob/dev/examples/shopping-cart/store/modules/cart.js

// Initial state
const state = {
  clipboard: {
    currentValue: null,
    previousValue: null,
  }
}

// Getters
const getters = {
  clipboardVal: state => state.clipboard.currentValue,
  clipboardPrevVal: state => state.clipboard.previousValue,
}

// Mutations
const mutations = {
  [SET_CLIPBOARD] (state, { current, previous }) {
    state.clipboard.previousValue = state.clipboard.currentValue
    state.clipboard.currentValue = current
  }
}

export default {
  state,
  getters,
  mutations,
}
