<template>
    <div class="topbar">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-2">
                    <div class="logo">
                        <router-link to="/home" title="">
                            <img src="/images/b-logo.png" width="40" height="40" alt="">
                            BioutyCall
                        </router-link>
                    </div>
                </div>
                <div class="col-lg-9">
                    <ul class="notify-area">
                        <li class="notifications mt-3">
                            <router-link to="/appointments/notif" title="Notifications">
                            <i class="fa fa-bell-o"></i></router-link><span class="red-bg">{{nb_notif}}</span>
                        </li>
                        <li class="text-white mt-3">{{username}}</li>
                        <li class="mt-2" id="mr-minus">
                            <button class="btn-st rd-30 btn-md" style="background: #333;">Se déconnecter</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import authMixin from '../../mixins/authMixin'
import firebase from '../../firebase/init'

export default {
    name: 'Topbar',
    mixins: [authMixin],
    
    data(){
        return {
            username: null,
            isVisible: false,
            cancel_appointments: [],
            appointCancelRef: firebase.firestore().collection("appointment"), 
            last_size: 0,
            first_size: 0,
            nb_notif: 0,
            salonRef: firebase.firestore().collection("salons"), 
        }
    },
    methods:{
        
    },
    
  created(){
      
      this.username = localStorage.getItem("username");
      this.appointCancelRef.where("status", "==", "cancelled_by_user").where("read", "==", false).orderBy("stamp", "desc").onSnapshot((snapshot) =>{
      
      if(!snapshot.empty){
          this.nb_notif = snapshot.size;
        }
      else this.nb_notif = 0;
    })

  }
}
</script>

<style scoped>
    .drop-bottom:hover{
        background: #20988e;
    }
</style>