<template>     
    <div class="main-content">
        <Loader v-if="loaderState"/>
        <div class="panel-body">
            <div class="content-area mt-5">
                <div class="sub-bar">
                    <div class="sub-title">
                        <h4>Ajouter un nouveau spécialiste</h4>
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
                                <p class="font-italics">Taille recommandée: 205 x 246 Pixels</p>                                <label class="fileContainer"> <span>Ajouter</span>
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
                        <a href="#" class="btn-st rd-30 btn-st" @click="addSpecialist()">Enregistrer</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Loader from './shared/Loader.vue'
import specMixin from '../mixins/specMixin'

export default {
    name: "Specialist",
    components: {Loader},
    mixins: [specMixin],

    data(){
        return {
                

            }

        },

        methods:{

            // Ajouter un contrôle qui vérifie que tous les champs sont remplies
            // Ajouter un contrôle sur les champs numériques

            addSpecialist(){

                if (this.specialistObj.desc != "" && this.specialistObj.name != "" && this.specialistObj.image != null){
                
                    this.loaderState = true;

                    this.buildImageUrl();
                
                    this.employeeRef.add(this.specialistObj).then((response) =>{
                         this.salonRef.doc(this.salonId).get().then((doc)=>{
                            if (doc.exists){
                                let obj = doc.data();
                                obj.employee.push(response.id);
    
                                this.salonRef.doc(this.salonId).update(obj).then(() =>{
    
                                    this.$router.replace({name:'Salon'});
                                    this.loaderState = false;
                                });
                              }
                        })
                    })
                }
                else this.errorMessage = "Tous ces champs sont obligatoires"

            },

            getIdFromCheckBox(event){

                this.specialistObj.works.push({"id": event.target.value})
            },

        },

        created(){

            this.loaderState = true;

            this.getAllServices();
        }

    }  

</script>

<style>

</style>