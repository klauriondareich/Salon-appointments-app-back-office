import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "../firebase/init"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isConnected: false,
  }
})

firebase.auth().onAuthStateChanged( user =>{
    if(user) {
        store.state.isConnected = true;
    }
})

export default store