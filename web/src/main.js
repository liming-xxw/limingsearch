import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js'
import './plugins/AntDesing'
// import './plugins/jsonp'
import Axios from 'axios'
import {
  VueJsonp
} from 'vue-jsonp'
Vue.use(VueJsonp)

const http = Axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web'
  // baseURL: 'http://localhost:3001'
})

Vue.prototype.$http = http

http.interceptors.request.use(function (config) {
  if (localStorage.token) {
    config.headers.Authorization = "Bearer " + localStorage.token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')