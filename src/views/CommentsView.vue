<template>
    <div class="main-content">
        <Loader v-if="loaderState"/>

        <MobileHeader/>  
    
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
import MobileHeader from '../components/MobileHeader.vue'


export default {
    name: "Comments",
     components: {Loader, MobileHeader},

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
        this.appointment.where("salon", "==", this.salonId).orderBy("stamp", "desc").get().then((snapshot) =>{
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