import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'rsa-encrypt'
  },
  {
    name: 'rsaEncrypt',
    path: '/encrypt-rsa',
    component: () => import('../view/RsaEncrypt.vue')
  },
  {
    name: 'aesEncrypt',
    path: '/encrypt-aes',
    component: () => import('../view/AesEncrypt.vue')
  }
]

export default new VueRouter({
  routes
})
