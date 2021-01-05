import 'common/assets/console-common-style.js'
import { Vue } from 'common/assets/console-common-script.js'
import app from './app.vue'

new Vue({
  render: h => h(app)
}).$mount('#app')
