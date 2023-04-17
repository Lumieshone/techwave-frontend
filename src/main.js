import Vue from 'vue'
import App from './App'
import store from './store'
import vuetify from './plugins/vuetify'
import router from './router'
import VueParticles from 'vue-particles'

import '@/icons' // icon
import '@/permission' // permission control

// Message
import Message from './components/Message/index.js'
Vue.prototype.$message = Message

Vue.config.productionTip = false

Vue.prototype.$baseURL = process.env.VUE_APP_BASE_API
Vue.use(VueParticles)

if (process.env.NODE_ENV === 'development') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')