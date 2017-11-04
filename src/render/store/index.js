import Vue from 'vue'
import Vuex from 'vuex'
import clipboard from './modules/clipboard'
import checklists from './modules/checklists'
import currency from './modules/currency'
import protection from './modules/protection'

Vue.use(Vuex)

const debug = process.execPath.match(/[\\/]electron/)

export default new Vuex.Store({
  modules: {
    clipboard,
    currency,
    checklists,
    protection,
  },
  strict: debug,
})
