import Vue from 'vue'
import Vuex from 'vuex'
import clipboard from './modules/clipboard'
import currencyFlows from './modules/currency-flows'
import currency from './modules/currency'

Vue.use(Vuex)

const debug = process.execPath.match(/[\\/]electron/)

export default new Vuex.Store({
  modules: {
    clipboard,
    currency,
    currencyFlows,
  },
  strict: debug,
})
