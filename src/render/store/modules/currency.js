import { CURRENCIES, DEFAULT_CURRENCY } from '../../../constants/currencies'


// Initial state
const state = {
  currency: CURRENCIES[DEFAULT_CURRENCY.name],
  // currencies: CURRENCIES,
}

// Getters
const getters = {
  currency: state => state.currency,
  // currencies: state => state.currencies,
}

// // Mutations
// const mutations = {
//   [SET_CURRENCY] (state, { name }) {
//     // TODO: safety check in the call!
//     state.currency = CURRENCIES[name]
//   }
// }

export default {
  state,
  getters,
  // mutations,
}
