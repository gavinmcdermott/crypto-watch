import Vue from 'vue'
import Vuex from 'vuex'
import ipcEvents from './plugins/ipc-events'
import storeSubscriptions from './plugins/store-subscriptions'
import currencies from './modules/currencies'
import keyboard from './modules/keyboard'
import transactions from './modules/transactions'
import address from './modules/address'
import errors from './modules/errors'
import tiles from './modules/tiles'

Vue.use(Vuex)

const debug = process.execPath.match(/[\\/]electron/)

export default new Vuex.Store({
  plugins: [ ipcEvents, storeSubscriptions ],
  modules: {
    currencies,
    keyboard,
    transactions,
    address,
    errors,
    tiles,
  },
  strict: debug,
})
