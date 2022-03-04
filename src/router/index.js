import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from '../firebase/init'

Vue.use(VueRouter)

const routes = [
  {
    path: "/home", 
    component: () => import(/* webpackChunkName: "mainbar" */ '../views/shared/MainBar.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        meta:{
          requiresAuth: true,
          role:"manager"
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
      },
      {
        path: '/allcustomers',
        name: 'Allcustomers',
        meta:{
          requiresAuth: true,
          role:"manager"
        },
        component: () => import(/* webpackChunkName: "allcustomers" */ '../views/AllcustomersView.vue')
      },
      {
        path: '/appointments',
        name: 'Allappointments',
        meta:{
          requiresAuth: true,
          role:"manager"
        },
        component: () => import(/* webpackChunkName: "allappointments" */ '../views/AllappointmentsView.vue')
      },
      {
        path: '/comments',
        name: 'Comments',
        meta:{
          requiresAuth: true,
          role:"manager"
        },
        component: () => import(/* webpackChunkName: "comments" */ '../views/CommentsView.vue')
      },
      {
        path: '/gallery',
        name: 'Gallery',
        meta:{
          requiresAuth: true,
          role:"manager"
        },
        component: () => import(/* webpackChunkName: "gallery" */ '../views/GalleryView.vue')
      },
      {
        path: '/salon',
        name: 'Salon',
        meta:{
          requiresAuth: true,
          role:"manager"
        },
        component: () => import(/* webpackChunkName: "salon" */ '../views/SalonView.vue')
      },
      {
        path: '/service',
        name: 'createService',
        meta:{
          requiresAuth: true,
          role:"manager"
        },
        component: () => import(/* webpackChunkName: "createService" */ '../views/CreateService.vue')
      },
      {
        path: '/edit/:id',
        name: 'editService',
        meta:{
          requiresAuth: true,
          role:"manager"
        },
        component: () => import(/* webpackChunkName: "createService" */ '../views/EditService.vue')
      },
      {
        path: '/specialist',
        name: 'createSpecialist',
        meta:{
          requiresAuth: true,
          role:"manager"
        },
        component: () => import(/* webpackChunkName: "createService" */ '../views/CreateSpecialist.vue')
      },
      {
        path: '/editspec/:id',
        name: 'editSpecialist',
        meta:{
          requiresAuth: true,
          role:"manager"
        },
        component: () => import(/* webpackChunkName: "createService" */ '../views/EditSpec.vue')
      },
      {
        path: '/user-profile',
        name: 'userProfile',
        meta:{
          requiresAuth: true,
          role:"manager"
        },
        component: () => import(/* webpackChunkName: "createService" */ '../views/ProfileView.vue')
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

router.beforeEach((to, from, next) =>{
  let firebaseUser = "";
  
  if(firebase.auth().currentUser){

    let managerRef = firebase.firestore().collection("managers");
    let uid = firebase.auth().currentUser.uid;

    managerRef.doc(uid).get().then((doc) =>{
      if (doc.exists){

        let user_data = doc.data();

        if (user_data.role && user_data.role === "manager"){
          firebaseUser = firebase.auth();
          
          localStorage.setItem("user_id", doc.id);
          localStorage.setItem("salon_id", user_data.salonId);
          localStorage.setItem("username", user_data.username);

          const requiresAuth = to.matched.some(route => route.meta.requiresAuth); 

          if (!requiresAuth && firebaseUser) next({name: "Home"}) // Prevent from go to login or register page when the user is logged in
          else next();
        }
      }
      else {
        console.log("user doesn't exist")
      }
    })
    
  }
  else {
    const requiresAuth = to.matched.some(route => route.meta.requiresAuth); 
    if(requiresAuth && !firebaseUser) next({name: "Login"}); // Redirect to login page when the non logged in user try to access pages
    next();
  }
  
})

export default router
