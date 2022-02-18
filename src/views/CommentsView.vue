<template>
    <div class="main-content">
        <Loader v-if="loaderState"/>
        <div class="responsive-header">
            <div class="logo-area">
                <ul class="notify-area">
                    <li>
                        <div class="nav-icon3"> <span></span> <span></span> <span></span> <span></span> </div>
                    </li>
                    <li class="notifications"><a href="#" title=""><i class="fa fa-comment-o"></i></a><span class="red-bg">02</span>
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
            <div class="content-area mt-5">
                <div class="sub-bar">
                <div class="sub-title">
                    <h4>Dashboard:</h4>
                </div>
                <ul class="bread-crumb">
                    <li><a href="#" title="">Home</a></li>
                    <li>Dashbord</li>
                </ul>
                </div>
                <div class="gap no-gap">
                <div class="email-box-wrap inner-bg">
                    <div class="email-box-nav">
                    <div class="email-title">
                        <!-- <h4>Notation</h4> -->
                    <ul>
                        <li>Nombre d'étoiles : <span>({{moyenneEtoile}})</span> <i v-for="index in moyenneEtoile" :key="index" class="fa fa-star text-warning"></i></li>
                    </ul>
                    </div>
                    <div class="email-box-content">
                    <div class="email-list">
                        <div class="email-list-inf">
                        <div class="slc">
                            <select>
                            <option>Tous les commentaires</option>
                            <option>Semaine dernière</option>
                            <option>Mois passé</option>
                            </select>
                        </div>
                        </div>
                        <ul>
                            <li v-for="(item, index) in comments" :key="index" @click="getCurrentComment(item.comment)">
                                <div class="email-list-item"> <i class="fa fa-comment"></i>
                                <div class="email-message-inf">
                                    <h4>@{{item.username}}</h4>
                                    <span>{{item.stamp | formatDate}}</span>
                                    <p>{{item.comment}}...</p>
                                </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="email-compose">
                        <div class="email-compose-info"> <span>Vue de commentaire</span>
                        
                        </div>
                        <form>
                        <textarea v-model="currentComment" disabled>
                                    
                        </textarea>
                        </form>
                        
                    </div>
                    </div>
                </div>
                </div>
            </div>
            
            </div>
        </div>
    </div>
</template>

<script>
import firebase from '../firebase/init'
import Loader from './shared/Loader.vue'

export default {
    name: "Comments",
     components: {Loader},

    data(){
         return{
            comments: [],
            appointment: firebase.firestore().collection("appointment"), 
            currentComment: "",
            moyenneEtoile: "",
            loaderState: false,
            salonId: null,
        }
    },

    methods:{
        getCurrentComment(comment){
            this.currentComment = comment; 
        },

        calculNbEtoiles(arr_stars){
           let sum =  arr_stars.reduce((acc, current_value) =>  acc + current_value);
           this.moyenneEtoile = Math.round(sum/arr_stars.length);
        }
    },
    created(){

        this.salonId = localStorage.getItem("salon_id");
        this.loaderState = true;

        let stars = [];
        this.appointment.where("salon", "==", this.salonId).orderBy("stamp", "desc").onSnapshot((snapshot) =>{
        if(!snapshot.empty){
                this.comments = [];
                snapshot.forEach((doc) =>{
                    
                let obj = doc.data();
                obj.id = doc.id;

                if (obj.rate) stars.push(obj.rate); // Get all stars

                if(obj.rate_text) this.comments.push({username: obj.customer_name, comment: obj.rate_text, stamp:obj.stamp, id:obj.id})
            });
             this.loaderState = false;
          }

         this.calculNbEtoiles(stars)
        });
    }
}
</script>

<style>

</style>