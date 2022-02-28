<template>     
    <div class="main-content">
        <Loader v-if="loaderState"/>
        <div class="panel-body">
            <div class="content-area mt-5">
                <div class="sub-bar">
                    <div class="sub-title">
                        <h4>Modifier un spécialiste</h4>
                    </div>
                    <p class="text-danger p-2">
                        {{errorMessage}}
                    </p>
                   
                </div>
                <div class="inner-bg mb-5">
                    
                    <div class="pnl-bdy billing-sec">
                        <div class="row">
                            <div class="col-md-12 col-sm-12 field">
                                <label class="font-weight-bold">Nom du spécialiste<span>*</span> </label>
                                <input v-model="specialistObj.name" type="text">
                            </div>
                            <div class="col-md-12 col-sm-12 field">
                                <label class="font-weight-bold">Description <span>*</span> </label>
                                <input placeholder="" type="text" v-model="specialistObj.desc">
                            </div>
                            <div class="col-md-9 col-sm-9 field">
                                <p class="text-warning">{{loading}}</p>
                                <span class="upload-image font-weight-bold">Ajouter une nouvelle image </span>
                                <p class="font-italics">Taille recommandée: 205 x 246 Pixels</p>
                                <label class="fileContainer"> <span>Ajouter</span>
                                    <input type="file" accept="image/*" @change="uploadImage($event)">
                                </label>
                            </div>
                            <div class="col-md-2 col-sm-2 field">
                                <div style="border: 1px solid; height: 200px;">
                                    <img :src="specialistObj.image"  alt="specialist profile">
                                </div>
                            </div>
                            <div class="col-md-12 col-sm-12">
                                <span style="display:block;" class="font-weight-bold pb-3">Choisir des services: </span>
                                <div class="form-check form-check-inline" v-for="(item, index) in allServices" :key="index">
                                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" :value="item.id" @change="getIdFromCheckBox($event)">
                                    <label class="form-check-label" for="inlineCheckbox1">{{item.name}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-5">
                    <div class="float-left">
                        <router-link to="/salon" class="btn-st rd-30 org-clr">Retour au salon</router-link>
                    </div>
                    <div class="float-right">
                        <a href="#" class="btn-st rd-30 btn-st" @click="updateSpecialist()">Modifier</a>
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
    name: "Specialist",
    components: {Loader},

    data(){
        return {
                loading: null,
                workRef:  firebase.firestore().collection("work"), 
                employeeRef: firebase.firestore().collection("employee"),
                salonRef: firebase.firestore().collection("salons"), 
                salonId: null,
                Storage: firebase.storage().ref(),
                loaderState: false,
                errorMessage: null,
                allServices: [],
                specialistObj: {
                    "desc": "",
                    "board": "",
                    "name": "",
                    "image": null,
                    "works": []
                }

            }

        },

        methods:{

            // Ajouter un contrôle qui vérifie que tous les champs sont remplies
            // Ajouter un contrôle sur les champs numériques

            updateSpecialist(){

                if (this.specialistObj.desc != "" && this.specialistObj.name != "" && this.specialistObj.image != null){

                    this.loaderState = true;

                    this.employeeRef.doc(this.id_spec).update(this.specialistObj).then(() =>{
                        this.$router.replace({name:'Salon'});
                        this.loaderState = true;
                    })
                }
                else this.errorMessage = "Tous ces champs sont obligatoires"

            },

            getIdFromCheckBox(event){

                this.specialistObj.works.push({"id": event.target.value})
            },

           uploadImage(event){

               this.loading = "Chargement de l'image en cours ..."

                let metadata = {
                    ContentLanguage : "fr",
                    contentType: "image/jpeg",
                }

                let file = event.target.files[0];
                let fileName = "profile-" + file.lastModified;

                this.Storage.child("img/" + fileName).put(file, metadata)
                .then(() =>{
                this.getImageUrl(fileName)
                }).catch(() =>{
                    this.loading = "Erreur de chargement"
                })
            },

            getImageUrl(url){
                this.Storage.child("img/" + url).getDownloadURL().then((url) =>{
                 this.specialistObj.image = url;
                 this.loading = "Chargement réussi! la preview s'affichera dans un instant"
                })
            },
        },

        created(){

            this.loaderState = true;

            this.salonId = localStorage.getItem("salon_id");


            this.id_spec = this.$route.params.id;
            
            this.employeeRef.doc(this.id_spec).get().then((doc) =>{
                if (doc.exists){
                    this.specialistObj.desc = doc.data().desc;
                    this.specialistObj.name = doc.data().name;

                    this.Storage.child("img/" + doc.data().image.split("/")[1]).getDownloadURL().then((url) =>{
                     this.specialistObj.image =  url;

                    }).catch(() => alert("L'image du salon n'a pas pu charger"))
               
                    this.specialistObj.works = doc.data().works;
                }
            })



            this.salonRef.doc(this.salonId).get().then((doc)=>{
                if (doc.exists){
                    let obj = doc.data();
                    obj.id = doc.id;
                    
                    obj.works.forEach(id => {
                        
                        this.workRef.doc(id).get().then((doc) =>{
                             if (doc.exists){
                                 let obj = doc.data();
                                 obj.id = doc.id;
                                 this.allServices.push(obj)
                                 this.loaderState = false;
                             }
                        })
                    });
                }

             });
        }

    }  

</script>

<style>

</style>