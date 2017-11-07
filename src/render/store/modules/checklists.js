import _ from 'lodash'
import { DEFAULT_CURRENCY } from '../../../constants/currencies'
import CHECKLISTS from '../../../constants/vue/checklists'
import { SET_CHECKLIST } from '../../../constants/vue/mutations'

// Initial state
const state = {
  checklist: CHECKLISTS[DEFAULT_CURRENCY.name],
}

// Getters
const getters = {
  checklist: state => state.checklist,
}

// Mutations (commit = synchronous)
const mutations = {
  [SET_CHECKLIST] (state, { name }) {
    state.checklist = CHECKLISTS[name]
  },
}

export default {
  state,
  getters,
  mutations,
}
