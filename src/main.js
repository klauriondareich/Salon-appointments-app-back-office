import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import firebase from "./firebase/init"
import VCalendar from 'v-calendar'
// import store from './store/store'



Vue.use(VueRouter)

Vue.config.productionTip = false

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'vc',
});

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
      user,
      render: h => h(App),
    }).$mount('#app')
  }
})

