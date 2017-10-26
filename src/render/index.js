import Vue from 'vue'
import store from './store'
import App from './components/App.vue'

// vuex
// Vue.use(Vuex)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
