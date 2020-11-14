import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Picture from '../views/up/picture.vue'
import Setup from '../views/up/setup.vue'
import Login from '../views/Login.vue'


const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
        name: "picture",
        path: "/picture",
        component: Picture
      },
      {
        name: "setup",
        path: "/setup",
        component: Setup,
      }

    ]

  },
  {
    path: '/register',
    name: 'register',
    component: Login,
  }


]

const router = new VueRouter({
  routes
})

export default router