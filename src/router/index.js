import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/allcustomers',
    name: 'Allcustomers',
    component: () => import(/* webpackChunkName: "allcustomers" */ '../views/Allcustomers.vue')
  },
  {
    path: '/appointments',
    name: 'Allappointments',
    component: () => import(/* webpackChunkName: "allappointments" */ '../views/Allappointments.vue')
  },
  {
    path: '',
    name: 'calendar',
    component: () => import(/* webpackChunkName: "allappointments" */ '../views/Calendar.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
