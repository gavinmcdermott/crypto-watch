import _ from 'lodash'
import { DEFAULT_CURRENCY } from '../../../constants/currencies'
import { TILES } from '../../../constants/vue/tiles'
import { CHANGE_TILES } from '../../../constants/vue/mutations'

// Initial state
const state = {
  tiles: TILES[DEFAULT_CURRENCY.name],
}

// Getters
const getters = {
  tiles: state => state.tiles,
}

// Mutations (commit = synchronous)
const mutations = {
  [CHANGE_TILES] (state, { name }) {
    state.tiles = TILES[name]
  },
}

export default {
  state,
  getters,
  mutations,
}
