<template>
    <div class="main-content mt-5">
            <div class="responsive-header">
                <div class="logo-area">
                    <ul class="notify-area">
                        <li>
                            <div class="nav-icon3"> <span></span> <span></span> <span></span> <span></span> </div>
                        </li>
                        <li class="notifications"><i class="fa fa-bell-o"></i><span class="red-bg">02</span>
                            <div class="drop notify"> <span class="drop-head">Notifications</span>
                                <ul class="drop-meta">
                                    <li> <i class="notifi-icon blue">N</i>
                                        <div class="notifi-meta">
                                            <h4><a href="#" title="">Nulla Vel Metus Scelerisque Ante Commodo. </a></h4>
                                            <span>02:34PM</span> </div>
                                    </li>
                                    <li> <i class="notifi-icon red">C</i>
                                        <div class="notifi-meta">
                                            <h4><a href="#" title="">Nulla Vel Metus Scelerisque Ante Commodo. </a></h4>
                                            <span>02:34PM</span> </div>
                                    </li>
                                    <li> <i class="notifi-icon yellow">A</i>
                                        <div class="notifi-meta">
                                            <h4><a href="#" title="">Nulla Vel Metus Scelerisque Ante Commodo. </a></h4>
                                            <span>02:34PM</span> </div>
                                    </li>
                                    <li> <i class="notifi-icon blue">N</i>
                                        <div class="notifi-meta">
                                            <h4><a href="#" title="">Nulla Vel Metus Scelerisque Ante Commodo. </a></h4>
                                            <span>02:34PM</span> </div>
                                    </li>
                                </ul>
                                <span class="drop-bottom"><a href="#" title="">View More Notifications</a></span> </div>
                        </li>
                        <li class="messages"><a href="#" title=""><i class="fa fa-envelope-o"></i></a><span class="blue-bg">10</span>
                            <div class="drop messages"> <span class="drop-head">3 New Message <i class="fa fa-pencil-square-o"></i></span>
                                <ul class="drop-meta">
                                    <li> <i class="notifi-icon"><img src="images/resources/user-mesg.jpg" alt=""></i>
                                        <div class="notifi-meta"> <span>02:34PM</span>
                                            <h4><a href="#" title="">Hi Teddy, Just wanted to let you...</a></h4>
                                        </div>
                                    </li>
                                    <li> <i class="notifi-icon"><img src="images/resources/user-mesg2.jpg" alt=""></i>
                                        <div class="notifi-meta"> <span>02:34PM</span>
                                            <h4><a href="#" title="">Hi Teddy, Just wanted to let you...</a></h4>
                                        </div>
                                    </li>
                                    <li> <i class="notifi-icon"><img src="images/resources/user-mesg3.jpg" alt=""></i>
                                        <div class="notifi-meta"> <span>02:34PM</span>
                                            <h4><a href="#" title="">Hi Teddy, Just wanted to let you...</a></h4>
                                        </div>
                                    </li>
                                    <li> <i class="notifi-icon"><img src="images/resources/user-mesg.jpg" alt=""></i>
                                        <div class="notifi-meta"> <span>02:34PM</span>
                                            <h4><a href="#" title="">Hi Teddy, Just wanted to let you...</a></h4>
                                        </div>
                                    </li>
                                    <li> <i class="notifi-icon"><img src="images/resources/user-mesg2.jpg" alt=""></i>
                                        <div class="notifi-meta"> <span>02:34PM</span>
                                            <h4><a href="#" title="">Hi Teddy, Just wanted to let you...</a></h4>
                                        </div>
                                    </li>
                                </ul>
                                <span class="drop-bottom"><a href="#" title="">View More messages</a></span> </div>
                        </li>
                    </ul>
                    
                    <div class="user-head">
                    <div class="admin">
                        <div class="admin-avatar"> <img src="images/resources/admin.png" alt=""> <i class="online"></i> </div>
                    </div>
                    <div class="drop setting"> <span class="drop-head">stifen Doe <i>30 days trial</i></span>
                        <ul class="drop-meta">
                            <li> <a href="#" title=""><i class="fa fa-eyedropper"></i>Edit Profile</a> </li>
                            <li> <a href="#" title=""><i class="fa fa-envelope-o"></i>My Inbox</a> </li>
                            <li> <a href="#" title=""><i class="fa fa-adjust"></i>task</a> </li>
                            <li> <a href="#" title=""><i class="fa fa-calendar"></i>Calender</a> </li>
                            <li> <a href="#" title=""><i class="fa fa-align-right"></i>Balance Report</a> </li>
                        </ul>
                        <span class="drop-bottom"><a href="#" title=""><i class="fa fa-sign-out"></i>log Out</a></span> </div>
                    </div>
                    <ul class="seting-area">
                    <li class="langages">
                        <a title="" href="#">Eng</a>
                        <ul class="drop language">
                            <li class="lang-selected"><a href="#"><i class="fa fa-check"></i> Eng</a></li>
                            <li><a href="#">Rus</a></li>
                            <li><a href="#">Jap</a></li>
                            <li><a href="#">Arb</a></li>
                        </ul>
                    </li>
                    <li class="setting-panel"><a title="" href="#"><i class="icon-equalizer"></i></a></li>
                </ul>
                </div>
                <div class="t-search">
                    <form method="post">
                        <input type="text" placeholder="Enter Your Keyword">
                        <button type="submit"><i class="fa fa-search"></i></button>
                    </form>
                </div>
            </div>
            <!-- responsive header -->
            <div class="panel-body">
              <div class="content-area">
                <div class="sub-bar">
                  <div class="sub-title">
                    <h4>Profile</h4>
                    <!-- <span>Welcome To web Admin Panel!</span> -->
                  </div>
                  <ul class="bread-crumb">
                    <li><router-link to="/home" title="">Accueil</router-link></li>
                    <li>Profile</li>
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
                                Numéro Airtel Money : {{userInfo.payout_mobile_airtel}}
                            </li>
                            <li style="border-bottom: 1px solid #eaeaea;">
                                <img src="/images/moov-africa-small.png" alt="moov africa image">
                                Numéro Moov : {{userInfo.payout_mobile_moov}}
                            </li>
                            <li style="border-bottom: 1px solid #eaeaea;">
                                <img src="/images/pay-dunia-small.png" alt="pay dunia image">
                                Numéro Pay Dunia : {{userInfo.payout_mobile_paydunia}}
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

export default {

    name: "userProfile",

    data(){
      return{
          userInfo: {}
      }
    },

    methods:{

    },

    created(){

      if(firebase.auth().currentUser){

        let managerRef = firebase.firestore().collection("managers");
        let uid = firebase.auth().currentUser.uid;

        managerRef.doc(uid).get().then((doc) =>{

          if (doc.exists){

            let user_data = doc.data();

            if (user_data.role && user_data.role === "manager"){  
              
              this.userInfo = doc.data();
              console.log(doc.data());
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