<template>     
    <div class="main-content">
        <Loader v-if="loaderState"/>
        <MobileHeader/>        
        <div class="panel-body">
            <div class="content-area mt-5">
                <div class="sub-bar">
                    <div class="sub-title">
                        <h4>Modifier un spécialiste</h4>
                    </div>
                    <p class="text-danger p-2">
                        {{errorMessage}}
                    </p>
                     <ul class="bread-crumb">
                        <li><router-link to="/salon" title="">Mon salon</router-link></li>
                        <li>spécialiste</li>
                    </ul>
                   
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
                            <!-- style="border: 1px solid; height: 200px;" -->
                            <div class="col-md-2 col-sm-2 field">
                                <div>
                                    <img :src="specialistObj.image"  alt="specialist profile">
                                </div>
                            </div>
                            <div class="col-md-12 col-sm-12">
                                <span style="display:block;" class="font-weight-bold pb-3">Choisir des services: </span>
                                <div class="form-check form-check-inline" v-for="(item, index) in allServices" :key="index">
                                    <input class="form-check-input" type="checkbox" :checked="isSelectedFunc(item.id)" id="inlineCheckbox1" :value="item.id" @change="getIdFromCheckBox($event)">
                                    <label class="form-check-label" for="inlineCheckbox1">{{item.name}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-2">
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
import specMixin from '../mixins/specMixin'
import Loader from './shared/Loader.vue'
import MobileHeader from '../components/MobileHeader.vue'


export default {
    name: "Specialist",
    components: {Loader, MobileHeader},
    mixins: [specMixin],

    data(){
        return {               
                short_image_url: null,
                isSelected: false
            }

        },

        methods:{

            // Ajouter un contrôle qui vérifie que tous les champs sont remplies
            // Ajouter un contrôle sur les champs numériques

            updateSpecialist(){

                if (this.specialistObj.desc != "" && this.specialistObj.name != "" && this.specialistObj.image != null){

                    this.loaderState = true;

                    this.specialistObj.image = this.short_image_url;

                    if (this.file !== null) this.buildImageUrl();

                    this.employeeRef.doc(this.id_spec).update(this.specialistObj).then(() =>{
                        this.$router.replace({name:'Salon'});
                        this.loaderState = true;
                    })
                }
                else {
                        this.errorMessage = "Champs obligatoires non remplis";
                        this.loaderState = false;
                    }

            },

            
            getIdFromCheckBox(event){

                if (!this.specialistObj.works.includes(event.target.value)) this.specialistObj.works.push({"id": event.target.value})
            },

            // check if the services belong to the specialist
            // if true checked it
            isSelectedFunc(id){
                
                this.isSelected = false;
                let services_id = [];
                let checked = false;

                 this.specialistObj.works.forEach((obj) =>{
                    services_id.push(obj.id);
                    checked = services_id.includes(id);
                })

                return checked;
            }

        },

        created(){


            this.id_spec = this.$route.params.id;
            
            this.employeeRef.doc(this.id_spec).get().then((doc) =>{
                if (doc.exists){
                    this.specialistObj.desc = doc.data().desc;
                    this.specialistObj.name = doc.data().name;

                    this.short_image_url = doc.data().image;

                    this.Storage.child("img/" + doc.data().image.split("/")[1]).getDownloadURL().then((url) =>{
                     this.specialistObj.image =  url;

                    }).catch(() => alert("L'image du salon n'a pas pu charger"))
               
                    this.specialistObj.works = doc.data().works;

                }
            })

            this.getAllServices();
           
        }

    }  

</script>

<style>

</style>