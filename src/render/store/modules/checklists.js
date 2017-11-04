import _ from 'lodash'
import { DEFAULT_CURRENCY } from '../../../constants/currencies'
import CHECKLISTS from '../../../constants/vue/checklists'
import { SET_CHECKLIST, SET_CHECKLIST_ITEM_STATE } from '../../../constants/vue/mutations'

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
  [SET_CHECKLIST_ITEM_STATE] (state, { type, newState }) {
    const itemToUpdate = _.first(state.checklist.items.filter((item) => item.type === type))
    itemToUpdate.state = newState
  }
}

export default {
  state,
  getters,
  mutations,
}
