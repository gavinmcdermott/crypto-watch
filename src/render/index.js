import Vue from 'vue'
import App from './App.vue'

// import { ipcRenderer } from 'electron'
// import { log, logError } from '../common/debug'




// Point of app injection
const app = new Vue(App).$mount('#app')






// ipcRenderer.on('clipboard_changed', (e, d) => {
//   log('captured in render process', e, d)
// })
