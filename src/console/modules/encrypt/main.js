import 'common/assets/console-common-style.js'
import { Vue } from 'common/assets/console-common-script.js'

import app from './app.vue'
import router from './router'

new Vue({
  el: '#app',
  router,
  render: h => h(app)
})
