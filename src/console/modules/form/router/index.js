import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: 'index',
    path: '/index',
    component: () => import('../view/index.vue')
  },
  {
    name: 'base',
    path: '/base',
    component: () => import('../view/FormBase.vue')
  },
  {
    name: 'valid',
    path: '/valid',
    component: () => import('../view/FormValid.vue')
  },
  {
    name: 'notFound',
    path: '/*',
    component: () => import('../view/index.vue')
  }
]

export default new VueRouter({
  routes
})
