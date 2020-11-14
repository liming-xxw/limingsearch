import Vue from "vue";
import App from "./App.vue";
import "./plugins/iview.ts";
import router from "./router";
import Axios from "axios";

Vue.config.productionTip = false;
const http = Axios.create({
  // baseURL: process.env.VUE_APP_API_URL || "/web",
  baseURL: 'http://localhost:3000/admin'
});

Vue.prototype.$http = http;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
