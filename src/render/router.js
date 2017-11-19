import Vue from 'vue'
import VueRouter from 'vue-router'
import Information from './components/Information'
import Transact from './components/Transact'

Vue.use(VueRouter)

// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
const routes = [
  { path: '/information', name: 'Information', component: Information },
  { path: '/transact', name: 'Transact', component: Transact },
]

export default new VueRouter({
  routes,
  linkActiveClass: 'link--state-active'
})
