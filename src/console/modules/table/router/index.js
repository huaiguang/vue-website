import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: 'screen',
    path: '/screen',
    component: () => import('../view/TableScreen.vue')
  },
  {
    name: 'combine',
    path: '/combine',
    component: () => import('../view/TableCombine.vue')
  },
  {
    name: '404',
    path: '/*',
    component: () => import('../view/TableScreen.vue')
  }
]

export default new VueRouter({
  routes
})
