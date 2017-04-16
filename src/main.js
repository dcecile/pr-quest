import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './app.vue'
import Home from './home.vue'
import Details from './details.vue'
import List from './list.vue'
import Embed from './embed.vue'
import dynamicRoutes from './dynamic-routes.js'

const routes = [
  { path: '/', redirect: '/report-vote' },
  { path: '/report-vote', component: Home },
  { path: '/report-vote/progress', component: List },
  { path: '/report-vote/data', component: Embed },
  { path: dynamicRoutes.details.serve, component: Details, props: true }
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { selector: to.hash }
    }
  },
  routes
})

Vue.use(VueRouter)

window.mainVue = new Vue({
  el: '.vue-app',
  render: createElement => createElement(App),
  router
})
