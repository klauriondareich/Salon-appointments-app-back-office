<template>
    <div class="main-content">
            <Loader v-if="loaderState"/>    
            
            <MobileHeader/>        

            <!-- responsive header -->
            <div class="panel-body">
              <div class="content-area mt-5">
                <div class="sub-bar">
                  <div class="sub-title">
                    <h4>MON PROFIL</h4>
                    <!-- <span>Welcome To web Admin Panel!</span> -->
                  </div>
                  <ul class="bread-crumb">
                    <li><router-link to="/home" title="">Accueil</router-link></li>
                    <li>Profil</li>
                  </ul>
                </div>
                <div class="inner-bg">
                  <div class="element-title">
                    <h4>INFORMATIONS DE COMPTE</h4>
                  </div>
                 
                  <div class="mega-menu demo">
                    <div class="row mega-style1">
                      <div class="col-md-6 col-sm-6">
                        <div class="mega-post-info"> <span>Informations personnelles</span>
                          <ul>
                            <li>Nom : {{userInfo.name}}</li>
                            <li>Prénom(s) : {{userInfo.firstname}}</li>
                            <li>Email : {{userInfo.email}}</li>
                            <li>Nom d'utilisateur : {{userInfo.username}}</li>
                            <li>Numéro de téléphone : {{userInfo.personal_phone_number}}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mega-menu demo">
                    <div class="row mega-style1">
                      <div class="col-md-6 col-sm-6">
                        <div class="mega-post-info"> <span>Informations salon</span>
                          <ul>
                            <li>Nom du salon : {{userInfo.salon_name}}</li>
                            <li>Status du compte : {{userInfo.isBlocked}}
                               <span v-if="userInfo.isActive" class="priority low">Activé</span>
                               <span v-if="!userInfo.isActive" class="priority high">Désactivé</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mega-menu demo">
                    <div class="row mega-style1">
                      <div class="col-md-6 col-sm-6">
                        <div class="mega-post-info"> <span>Informations Paiement</span>
                          <ul>
                            <li style="border-bottom: 1px solid #eaeaea;">
                                <img src="/images/airtel-money-small.jpg" alt="airtel money image">
                                Airtel Money : {{userInfo.payout_mobile_airtel}}
                            </li>
                            <li style="border-bottom: 1px solid #eaeaea;">
                                <img src="/images/moov-africa-small.png" alt="moov africa image">
                                Moov : {{userInfo.payout_mobile_moov}}
                            </li>
                            <li style="border-bottom: 1px solid #eaeaea;">
                                <img src="/images/pay-dunia-small.png" alt="pay dunia image">
                                Pay Dunia : {{userInfo.payout_mobile_paydunia}}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- bottombar --> 
            </div>
          </div>
</template>

<script>

import firebase from '../firebase/init'
import Loader from './shared/Loader.vue'
import MobileHeader from '../components/MobileHeader.vue'


export default {

    name: "userProfile",
    components: {Loader, MobileHeader},

    data(){
      return{
          userInfo: {},
          loaderState: false,
      }
    },

    methods:{

    },

    created(){

      this.loaderState = true;
      
      if(firebase.auth().currentUser){

        let managerRef = firebase.firestore().collection("managers");
        let uid = firebase.auth().currentUser.uid;

        managerRef.doc(uid).get().then((doc) =>{

          if (doc.exists){

            let user_data = doc.data();

            if (user_data.role && user_data.role === "manager"){  
              
              this.userInfo = doc.data();
              this.loaderState = false
            }
          }
          else {
            console.log("user doesn't exist")
          }
        })
    
      }
    }
}
</script>

<style>

</style>