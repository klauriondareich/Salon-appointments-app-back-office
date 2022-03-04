<template>
  <div class="main-content">
    <Loader v-if="loaderState"/>
    <div class="panel-body">
        <div class="content-area mt-5">
            <div class="sub-bar">
                <div class="sub-title">
                    <h4>Ajouter un service</h4>
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
                    <a href="#" class="btn-st rd-30 btn-st" @click="addService()">Enregistrer</a>
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

export default {
    name: "createService",
    components: {Loader, VueNumeric},

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
                errorMessage: null,
                loaderState: false,
                categories: [],
                serviceObj: {
                    "categoryId": null,
                    "desc": "",
                    "duration": null,
                    "name": "",
                    "price": 0,
                    "visible": false
                }

            }

        },

        methods:{

            addService(){
                
                 if (this.serviceObj.desc != "" && this.serviceObj.name != "" && this.serviceObj.duration != null && this.serviceObj.duration != null){
                    this.loaderState = true;
                    this.workRef.add(this.serviceObj).then((response) =>{
                     this.salonRef.doc(this.salonId).get().then((doc)=>{
                        if (doc.exists){
                            let obj = doc.data();
                            obj.works.push(response.id);

                            this.salonRef.doc(this.salonId).update(obj).then(() =>{

                                this.$router.replace({name:'Salon'});
                                this.loaderState = true;
                            });
                          }
                        })
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
            
            this.salonId = localStorage.getItem("salon_id");

            // Get all categories of services
            this.categoryRef.where("visible", "==", true).get().then((snapshot) =>{
            
                if(!snapshot.empty){
                    
                    snapshot.forEach((doc) =>{
                        let obj = doc.data();
                        obj.id = doc.id;
                        this.categories.push(obj)
                    })
                }
            })
        }

    }  

</script>

<style>

</style>