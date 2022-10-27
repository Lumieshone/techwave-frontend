import Vue from 'vue'
import App from './App'
import store from './store'

import vuetify from './plugins/vuetify'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

Vue.config.productionTip = false

Vue.prototype.$baseURL = process.env.VUE_APP_BASE_API

if (process.env.NODE_ENV === 'development') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
