import 'normalize.css'
import 'src/assets/css/common.css'
import Vue from 'vue'
import app from './view/app.vue'

new Vue({
  el: '#app',
  render: h => h(app)
})
