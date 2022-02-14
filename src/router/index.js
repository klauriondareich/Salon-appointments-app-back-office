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
    path: '/comments',
    name: 'Comments',
    component: () => import(/* webpackChunkName: "comments" */ '../views/Comments.vue')
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: () => import(/* webpackChunkName: "gallery" */ '../views/GalleryView.vue')
  },
  {
    path: '/salon',
    name: 'Salon',
    component: () => import(/* webpackChunkName: "salon" */ '../views/SalonView.vue')
  },
  {
    path: '/service',
    name: 'createService',
    component: () => import(/* webpackChunkName: "createService" */ '../views/CreateService.vue')
  },
  {
    path: '/specialist',
    name: 'createSpecialist',
    component: () => import(/* webpackChunkName: "createService" */ '../views/CreateSpecialist.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
