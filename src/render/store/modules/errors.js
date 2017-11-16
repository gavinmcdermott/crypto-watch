import _ from 'lodash'
import { CHANGE_ERROR } from '../../../constants/vue/mutations'

// Initial state
const state = {
  error: null
}

// Getters
const getters = {
  error: state => state.error,
}

// Mutations
const mutations = {
  [CHANGE_ERROR] (state, { error }) {
    if (_.isNull(error) || _.isUndefined(error)) {
      state.error = null
      return
    }

    const msg = _.toString(error)
    state.error = new Error(msg)
  }
}

export default {
  state,
  getters,
  mutations,
}
