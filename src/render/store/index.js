import Vue from 'vue'
import Vuex from 'vuex'
import clipboard from './modules/clipboard'
// import * as actions from './actions'
// import * as getters from './getters'

Vue.use(Vuex)

const debug = process.execPath.match(/[\\/]electron/)

export default new Vuex.Store({
  // actions,
  // getters,
  modules: {
    clipboard
  },
  strict: debug,
})
