import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import router from './router'
import firebase from "./firebase/init"
import vuetify from '@/plugins/vuetify' // path to vuetify export
import store from './store/store'
import VueSweetalert2 from 'vue-sweetalert2'


Vue.use(VueRouter)

Vue.use(VueSweetalert2);


Vue.config.productionTip = false

Vue.filter('formatDate', function(value){
  let months = ["01","02","03","04","05","06","07","08","09","10","11","12"];
  let date = new Date(value);
  let formatted_date =  date.getDate() + "/"   + months[date.getMonth()] +  "/" + " " + date.getFullYear(); 
  return formatted_date
})



let app ;
firebase.auth().onAuthStateChanged(user => {
  if(!app){
    app = new Vue({
      router,
      store,
      vuetify,
      user,
      render: h => h(App),
    }).$mount('#app')
  }
})


