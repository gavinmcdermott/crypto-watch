import { ethereum } from '../../../common/crypto'
import { CURRENCIES } from '../../../constants/currencies'
import { MUTATION_TYPES } from '../../../constants/vue/mutations'
// Learning from: https://github.com/vuejs/vuex/blob/dev/examples/shopping-cart/store/modules/cart.js

// Initial state
const state = {
  keyboard: {
    isLocked: false,
    isWatchingCopy: false,
    isWatchingPaste: false,
  },
  paste: {
    inProgress: false,
    lastEvent: {
      value: null
    }
  },
  copy: {
    lastEvent: {
      value: null,
      replacedValue: null,
    }
  },
}

// Getters
const getters = {
  keyboard: state => state.keyboard,
  paste: state => state.paste,
  copy: state => state.copy,
}

// Mutations
const mutations = {
  [MUTATION_TYPES.CHANGE_KEYBOARD_LOCK] (state, { isLocked }) {
    state.keyboard.isLocked = isLocked
  },
  [MUTATION_TYPES.CHANGE_COPY_WATCHER] (state, { isWatching }) {
    state.keyboard.isWatchingCopy = isWatching
  },
  [MUTATION_TYPES.CHANGE_PASTE_WATCHER] (state, { isWatching }) {
    state.keyboard.isWatchingPaste = isWatching
  },
  [MUTATION_TYPES.CHANGE_PASTE_PROGRESS] (state, { inProgress }) {
    state.paste.inProgress = inProgress
  },
  [MUTATION_TYPES.CHANGE_PASTE_VALUE] (state, { value }) {
    state.paste.lastEvent.value = value
  },
  [MUTATION_TYPES.CHANGE_COPY_VALUE] (state, { newValue, oldValue }) {
    state.copy.lastEvent.value = newValue
    state.copy.lastEvent.replacedValue = oldValue
  },
}

export default {
  state,
  getters,
  mutations,
}
