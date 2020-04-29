import Vue from 'vue'
import ElementUI from 'element-ui'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
// import 'src/common/assets/css/common/theme.scss'
import 'src/common/assets/css/common/common.scss'
import app from './view/app.vue'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(app)
})
