import { UPDATE_CLIPBOARD } from '../mutation-types'
// Learning from: https://github.com/vuejs/vuex/blob/dev/examples/shopping-cart/store/modules/cart.js

// Initial state
const state = {
  clipboardVal: null,
  clipboardPrevVal: null
}

// Getters
const getters = {
  clipboardVal: state => state.clipboardVal,
  clipboardPrevVal: state => state.clipboardPrevVal,
}

// Actions
// const actions = ({ commit }, value) => {
//   commit(UPDATE_CLIPBOARD, {
//     value
//   })
// }

// Mutations
const mutations = {
  [UPDATE_CLIPBOARD] (state, { current, previous }) {
    state.clipboardPrevVal = state.clipboardVal
    state.clipboardVal = current
  }
}

export default {
  state,
  getters,
  // actions,
  mutations,
}
