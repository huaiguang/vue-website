import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'index'
  },
  {
    name: 'index',
    path: '/index',
    component: () => import('../view/index.vue')
  },
  {
    name: 'reset',
    path: '/reset',
    component: () => import('../view/ResetFields.vue')
  }
]

export default new VueRouter({
  routes
})
