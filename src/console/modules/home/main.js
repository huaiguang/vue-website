import 'common/assets/console-common-style.js'
import { Vue } from 'common/assets/console-common-script.js'
import app from './app.vue'

new Vue({
  el: '#app',
  render: h => h(app)
})