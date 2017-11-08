import Vue from 'vue'
import Vuex from 'vuex'
import events from './plugins/events'
import currencies from './modules/currencies'
import keyboard from './modules/keyboard'
import copilot from './modules/copilot'
import tiles from './modules/tiles'

Vue.use(Vuex)

const debug = process.execPath.match(/[\\/]electron/)

export default new Vuex.Store({
  plugins: [events],
  modules: {
    currencies,
    keyboard,
    copilot,
    tiles,
  },
  strict: debug,
})
