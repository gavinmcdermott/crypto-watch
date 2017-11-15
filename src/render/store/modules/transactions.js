import _ from 'lodash'
import { CHANGE_TRANSACTION } from '../../../constants/vue/mutations'

// Initial state
const state = {
  transaction: {
    inProgress: false,
    error: null,
  }
}

// Getters
const getters = {
  transaction: state => state.transaction,
}

// Mutations
const mutations = {
  [CHANGE_TRANSACTION] (state, { inProgress, error }) {
    if (_.isBoolean(inProgress)) {
      state.transaction.inProgress = inProgress
    }
    if (_.isString(error) || _.isNull(error)) {
      state.transaction.error = error
    }
  }
}

export default {
  state,
  getters,
  mutations,
}
