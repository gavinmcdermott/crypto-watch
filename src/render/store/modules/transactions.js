import _ from 'lodash'
import { CHANGE_TRANSACTION } from '../../../constants/vue/mutations'

// Initial state
const state = {
  transaction: {
    inProgress: false,
  }
}

// Getters
const getters = {
  transaction: state => state.transaction,
}

// Mutations
const mutations = {
  [CHANGE_TRANSACTION] (state, bool) {
    if (_.isBoolean(bool)) {
      state.transaction.inProgress = bool
    }
  }
}

export default {
  state,
  getters,
  mutations,
}
