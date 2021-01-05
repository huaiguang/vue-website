import 'common/assets/console-common-style.js'
import { Vue } from 'common/assets/console-common-script.js'

import app from './app.vue'
import router from './router'

// compiler
// new Vue({
//   el: '#app',
//   router: router,
//   store: store,
//   template: '<App/>',
//   components: { App }
// })

// runtime
new Vue({
  router,
  render: h => h(app)
}).$mount('#app')
