import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Link from '../views/home/Link.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'/link/list',
        name:'link',
        component:Link,
        meta: [{ name: "内容" }, { name: "链接管理" }],
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
