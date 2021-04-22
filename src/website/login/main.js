import 'common/assets/console-common-style.js'
import { Vue } from 'common/assets/console-common-script.js'
import app from './view/app.vue'
import { httpGet, httpPost } from '@/common/service'

Vue.prototype.$httpGet = httpGet
Vue.prototype.$httpPost = httpPost

new Vue({
  render: h => h(app)
}).$mount('#app')
