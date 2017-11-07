// import { ethereum } from '../../../common/crypto'
// import { MUTATION_TYPES } from '../../../constants/vue/mutations'
// import { CURRENCIES } from '../../../constants/currencies'
// // Learning from: https://github.com/vuejs/vuex/blob/dev/examples/shopping-cart/store/modules/cart.js

// // Initial state
// const state = {
//   clipboard: {
//     value: null,
//     addressType: null,
//   }
// }

// // Getters
// const getters = {
//   clipboard: state => state.clipboard,
// }

// // Mutations
// const mutations = {
//   [MUTATION_TYPES.CHANGE_CLIPBOARD_VALUE] (state, { newValue, oldValue }) {
//     state.clipboard.value = newValue,
//     state.clipboard.addressType = ethereum.isAddress(newValue)
//                                     ? CURRENCIES.Ethereum.name
//                                     : null
//   },
// }

// export default {
//   state,
//   getters,
//   mutations,
// }
