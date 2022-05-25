<template>
    <div class="main-content">
        <Loader v-if="loaderState"/>

        <MobileHeader/>  
    
        <!-- responsive header -->
        <div class="panel-body">
            <div class="content-area mt-5">
                <div class="sub-bar">
                  <div class="sub-title">
                      <h4>NOTES & COMMENTAIRES:</h4>
                  </div>
                  <ul class="bread-crumb">
                      <li><router-link to="/home" title="">Accueil</router-link></li>
                      <li>Commentaires</li>
                  </ul>
                </div>

                 <div class="gap no-gap pt-5">
                  <div class="inner-bg">
                    <div class="element-title">
                      <h4>Tous les Commentaires</h4>
                      <span>Tous les commentaires de vos clients</span> 
                    </div>
                    <div class="row remove-ext">
                      <p class="text-center p-3" v-if="comments.length == 0">Aucun commentaire pour le moment!</p>
                      <div class="col-md-4" v-for="(item, index) in comments" :key="index">
                        <div class="testimon style4">
                          <div class="testi-meta">
                            <p class="text-left">{{item.comment}}</p>
                            <div class="author-name">
                              <div class="testi-avatar"> <img src="/images/commentor.png" alt=""> </div>
                              <div class="author-name">
                                <h5>{{item.username}}</h5>
                                <span>{{item.stamp | formatDate}}</span> </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>       

                <!-- <li style="text-align: left; padding-left: 20px;">Nombre d'étoiles : <span>({{moyenneEtoile}})</span> <i v-for="index in moyenneEtoile" :key="index" class="fa fa-star text-warning"></i></li> -->

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

          if (arr_stars.length != 0){
            let sum =  arr_stars.reduce((acc, current_value) =>  acc + current_value);
            this.moyenneEtoile = Math.round(sum/arr_stars.length);
          } 
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

         this.calculNbEtoiles(stars);
         this.loaderState = false;

        });
    }
}
</script>

<style>

</style>