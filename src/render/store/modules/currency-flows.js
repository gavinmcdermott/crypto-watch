import CURRENCY_FLOWS from '../../constants/currency-flows'
import { DEFAULT_CURRENCY } from '../../constants/currency'
import { SET_CURRENCY_FLOW } from '../../constants/mutation-types'

// Initial state
const state = {
  flow: CURRENCY_FLOWS[DEFAULT_CURRENCY.name],
}

// Getters
const getters = {
  flow: state => state.flow,
}

// Mutations
const mutations = {
  [SET_CURRENCY_FLOW] (state, { name }) {
    state.flow = CURRENCY_FLOWS[name]
  }
}

export default {
  state,
  getters,
  mutations,
}
