import Vue from 'vue'
import store from './store'
import router from './router'
import App from './components/App.vue'

console.log('\n\n============================================')
console.log('ADDRESSES TO TEST WITH')
console.log('0x0A860fbdbb2A9acB0fE1d7C7da1b35C2cF1bE751')
console.log('0xaa355cd4e9d5e476730c1cd619c4ecaf75fb8bda')
console.log('============================================\n\n\n')

new Vue({
  el: '#app',
  store,
  router,
  render: html => html(App)
})
