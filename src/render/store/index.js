import Vue from 'vue'
import Vuex from 'vuex'
import ipcEvents from './plugins/ipc-events'
import currencies from './modules/currencies'
import keyboard from './modules/keyboard'
import transactions from './modules/transactions'
import errors from './modules/errors'
import tiles from './modules/tiles'

Vue.use(Vuex)

const debug = process.execPath.match(/[\\/]electron/)

export default new Vuex.Store({
  plugins: [ipcEvents],
  modules: {
    currencies,
    keyboard,
    transactions,
    errors,
    tiles,
  },
  strict: debug,
})
