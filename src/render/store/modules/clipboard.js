import { SET_CLIPBOARD } from '../../../constants/vue/mutations'
// Learning from: https://github.com/vuejs/vuex/blob/dev/examples/shopping-cart/store/modules/cart.js

// Initial state
const state = {
  clipboard: {
    newValue: null,
    oldValue: null,
  }
}

// Getters
const getters = {
  clipboardNewValue: state => state.clipboard.newValue,
  clipboardOldValue: state => state.clipboard.oldValue,
}

// Mutations
const mutations = {
  [SET_CLIPBOARD] (state, { newValue, oldValue }) {
    state.clipboard.oldValue = oldValue
    state.clipboard.newValue = newValue
  }
}

export default {
  state,
  getters,
  mutations,
}
