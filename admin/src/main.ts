import Vue from 'vue'
import App from './App.vue'
import './plugins/iview.ts'
import router from './router'
import Axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http  = Axios.create({
  baseURL:'http://localhost:3000'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
