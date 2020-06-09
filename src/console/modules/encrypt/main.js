import Vue from 'vue'
import ElementUI from 'element-ui'

import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/common/assets/css/common/common.scss'

import app from './app.vue'
import router from './router'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  render: h => h(app)
})
