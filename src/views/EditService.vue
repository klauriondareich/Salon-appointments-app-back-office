<template>
  <div class="main-content">
       <Loader v-if="loaderState"/>
       <MobileHeader/> 
        <div class="panel-body">
            <div class="content-area mt-5">
                <div class="sub-bar">
                    <div class="sub-title">
                        <h4>Modifier le service</h4>
                    </div>
                    <p class="text-danger p-2">
                        {{errorMessage}}
                    </p>
                    <ul class="bread-crumb">
                        <li><a href="#" title="">Services</a></li>
                        <li>Dashbord</li>
                    </ul>
                </div>
                <div class="inner-bg mb-5">
                    
                    <div class="pnl-bdy billing-sec">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 field">
                                <label>Nom <span>*</span> </label>
                                <input v-model="serviceObj.name" type="text">
                            </div>
                            <div class="col-md-6 col-sm-6 field">
                                <label>Prix <span>*</span> </label>
                                <vue-numeric currency="FCFA" separator="." currency-symbol-position="suffix" v-model="serviceObj.price"></vue-numeric>
                            </div>
                            <div class="col-md-6 col-sm-6 field">
                                <label>Catégorie <span>*</span> </label>
                                <select style="background:#f4f8ff; padding-left: 10px;" @change="changeCategory($event)" >
                                    <option value="">Choisir une catégorie</option>
                                    <option :value="category.id" v-for="(category, index) in categories" :key="index"
                                >{{category.name}}</option>
                                
                                </select>
                            </div>
                            <div class="col-md-6 col-sm-6 field">
                                <label>Durée <span>*</span> </label>
                                <select style="background:#f4f8ff; padding-left: 10px;" @change="changeDuration($event)">
                                    <option value="">Choisir une durée</option>
                                    <option v-for="(duration, index) in durations" :key="index">{{duration.value}} {{duration.libelle}}</option>
                                </select>
                            </div>
                            <div class="col-md-12 col-sm-12 field">
                                <label>Description <span>*</span> </label>
                                <input placeholder="" type="text" v-model="serviceObj.desc">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-5">
                    <div class="float-left">
                        <router-link to="/salon" class="btn-st rd-30 org-clr">Retour au salon</router-link>
                    </div>
                    <div class="float-right">
                        <a href="#" class="btn-st rd-30 btn-st" @click="updateService()">Modifier</a>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import firebase from '../firebase/init'
import Loader from './shared/Loader.vue'
import VueNumeric from 'vue-numeric'
import MobileHeader from '../components/MobileHeader.vue'



export default {
    name: "editService",
    
    components: {Loader, VueNumeric, MobileHeader}, 

    data(){
        return {
            durations: [
                    {
                        "value": 10,
                        "libelle": "min"
                    },
                    {
                        "value": 15,
                        "libelle": "min"
                    },
                    {
                        "value": 20,
                        "libelle": "min"
                    },
                    {
                        "value": 25,
                        "libelle": "min"
                    },
                    {
                        "value": 30,
                        "libelle": "min"
                    },
                    {
                        "value": 35,
                        "libelle": "min"
                    },
                    {
                        "value": 40,
                        "libelle": "min"
                    },
                    {
                        "value": 45,
                        "libelle": "min"
                    },
                    {
                        "value": 50,
                        "libelle": "min"
                    },
                    {
                        "value": 55,
                        "libelle": "min"
                    },
                    {
                        "value": 1,
                        "libelle": "heure"
                    },
                    {
                        "value": 2,
                        "libelle": "heure"
                    },
                    {
                        "value": 3,
                        "libelle": "heure"
                    }
                ],
                workRef:  firebase.firestore().collection("work"), 
                categoryRef: firebase.firestore().collection("category"),
                salonRef: firebase.firestore().collection("salons"), 
                salonId: null,
                id_service: null,
                loaderState: false,
                errorMessage: null,
                categories: [],
                serviceObj: {
                    "desc": "",
                    "duration": null,
                    "name": "",
                    "price": "",
                }

            }

        },

        methods:{

            // Ajouter un contrôle qui vérifie que tous les champs sont remplies
            // Ajouter un contrôle sur les champs numériques

            updateService(){

                if (this.serviceObj.desc != "" && this.serviceObj.name != "" && this.serviceObj.duration != null && this.serviceObj.duration != null){
                    
                    this.loaderState = true;

                    this.workRef.doc(this.id_service).update(this.serviceObj).then(() =>{
                        this.$router.replace({name:'Salon'});
                        this.loaderState = false;
                    })
                }
                else this.errorMessage = "Tous ces champs sont obligatoires"

            },

            changeCategory(event){
                this.serviceObj.categoryId = event.target.value;
            },

            changeDuration(event){
                this.serviceObj.duration = event.target.value.split(" ")[0];
            }
        },

        created(){
            
            this.id_service = this.$route.params.id;

            this.loaderState = true;

            this.workRef.doc(this.id_service).get().then((doc) =>{
                if (doc.exists){
                    this.serviceObj.desc = doc.data().desc;
                    this.serviceObj.duration = doc.data().duration;
                    this.serviceObj.name = doc.data().name;
                    this.serviceObj.price = doc.data().price;
                    this.loaderState = false;
                }
            })

            // Get all categories of services
            this.categoryRef.where("visible", "==", true).get().then((snapshot) =>{
            
                if(!snapshot.empty){
                    
                    snapshot.forEach((doc) =>{
                        let obj = doc.data();
                        obj.id = doc.id;
                        this.categories.push(obj);
                        this.loaderState = false;
                    })
                }
            })
        }

    }  

</script>

<style>

</style>