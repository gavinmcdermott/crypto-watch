import Vue from 'vue'
import Vuex from 'vuex'
import events from './plugins/events'
import keyboard from './modules/keyboard'
import checklists from './modules/checklists'
import currencies from './modules/currencies'
// import protection from './modules/protection'

Vue.use(Vuex)

const debug = process.execPath.match(/[\\/]electron/)

export default new Vuex.Store({
  plugins: [events],
  modules: {
    keyboard,
    currencies,
    checklists,
    // protection,
  },
  strict: debug,
})
