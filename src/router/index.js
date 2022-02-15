import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/home", 
    component: () => import(/* webpackChunkName: "mainbar" */ '../views/shared/MainBar.vue'),
    children: [
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
        component: () => import(/* webpackChunkName: "allcustomers" */ '../views/AllcustomersView.vue')
      },
      {
        path: '/appointments',
        name: 'Allappointments',
        component: () => import(/* webpackChunkName: "allappointments" */ '../views/AllappointmentsView.vue')
      },
      {
        path: '/comments',
        name: 'Comments',
        component: () => import(/* webpackChunkName: "comments" */ '../views/CommentsView.vue')
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
      }
    ]
  },
  {
    name: "Login",
    path: "/",
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    name: "resetPassword",
    path: "/reset_password",
    component: () => import(/* webpackChunkName: "resetPassword" */ '../views/ResetPassword.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
