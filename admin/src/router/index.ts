import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Link from '../views/home/Link.vue'
import User from '../views/home/User.vue'
import Image1 from '../views/home/Baimg.vue'
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
      }, {
        path:'/image/list',
        name:'Image1',
        component:Image1,
        meta: [{ name: "内容" }, { name: "背景图片管理" }],
      },{
        path:'/users/list',
        name:'user',
        component:User,
        meta: [{ name: "用户" }, { name: "网站用户" }],
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
