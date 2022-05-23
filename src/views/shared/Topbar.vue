<template>
    <div>
        <div class="topbar">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-2">
                        <div class="logo">
                            <a href="#" title="">
                                <img src="/images/b-logo.png" width="40" height="40" alt="logo bioutycall">
                                BioutyCall
                            </a>
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
                                <button class="btn-st grn-clr" style="background: #333;" @click="signOut()">Se déconnecter</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <header :class="classValue">
            <div class="side-menus">
                <div class="side-header">
                    <div class="logo">
                    <a href ="/">
                        <img alt="" style="visibility: hidden" src="images/b-logo.png">
                    </a>
                    </div>
                    <div class="float-right px-5 btn-close" @click="classValue = 'hide-sidebar'">
                        <span class="icon-style"><i class="fa fa-close"></i></span>
                    </div>
                    <nav class="slide-menu">
                        <ul class="parent-menu">                                           
                            <li><router-link to="/home"><i class="fa fa-home"></i><span>Accueil</span></router-link></li>
                            <li><router-link to="/salon"><i class="fa fa-building"></i><span>Mon salon</span></router-link></li>
                            <li><router-link to="/appointments"><i class="fa fa-calendar"></i><span>Tous les rendez-vous</span></router-link></li>
                            <li><router-link to="/allcustomers"><i class="fa fa-users"></i><span>Tous les clients</span></router-link></li>
                            <!-- <li><router-link to="/statistics"><i class="fa fa-bar-chart"></i><span>Statistiques</span></router-link></li> -->
                            <li><router-link to="/payments"><i class="fa fa-credit-card"></i><span>Paiements</span></router-link></li>
                            <li><router-link to="/comments"><i class="fa fa-comment"></i><span>Notes et commentaires</span></router-link></li>
                            <li><router-link to="/gallery"><i class="fa fa-photo"></i><span>Galerie</span></router-link></li>
                            <li><router-link to="/user_profile"><i class="fa fa-user"></i><span>Mon profil</span></router-link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
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
            classValue : 'show-sidebar',
        }
    },
    methods:{
        signOut(){
            firebase.auth().signOut().then(() =>{
                this.$router.replace("/");
            })
            .catch((error) =>{
                console.log(error.message)
            })
        },
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
    a.router-link-active,
    a.router-link-exact-active {
      background-color: #f3f3f3;
    }
    .hide-sidebar{
      display: none;
    }
    .show-sidebar{
      display: block;
    }
</style>