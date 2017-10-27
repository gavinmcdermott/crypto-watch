import _ from 'lodash'
import CHECKLISTS from '../../constants/checklists'
import { DEFAULT_CURRENCY } from '../../constants/currency'
import { SET_CHECKLIST, SET_CHECKLIST_ITEM_STATE } from '../../constants/mutation-types'

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
  [SET_CHECKLIST_ITEM_STATE] (state, { title, newState }) {
    const stepToUpdate = _.first(state.checklist.items.filter((item) => item.title === title))
    stepToUpdate.state = newState
  }
}

export default {
  state,
  getters,
  mutations,
}
