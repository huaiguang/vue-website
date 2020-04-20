import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    name: 'index',
    path: '/index',
    component: () => import('../view/index.vue')
  },
  {
    name: 'combine',
    path: '/combine',
    component: () => import('../view/Combine.vue')
  }
]

export default new VueRouter({
  routes
})
