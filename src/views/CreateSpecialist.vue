<template>
  <div class="main-content">
    <div class="panel-body">
        <div class="content-area">
            <div class="sub-bar">
                <div class="sub-title">
                <h4>Ajouter un service</h4>
                </div>
                <ul class="bread-crumb">
                <li><a href="#" title="">Services</a></li>
                <li>Dashbord</li>
                </ul>
            </div>
            <div class="inner-bg">
                
                <div class="pnl-bdy billing-sec">
                    <div class="row">
                        <div class="col-md-12 col-sm-12 field">
                            <label>Nom de la spécialiste<span>*</span> </label>
                            <input v-model="specialistObj.name" type="text">
                        </div>
                        <div class="col-md-12 col-sm-12 field">
                            <label>Description <span>*</span> </label>
                            <input placeholder="" type="text" v-model="specialistObj.desc">
                        </div>
                        <div class="col-md-9 col-sm-9 field">
                           <span class="upload-image">Ajouter une nouvelle image</span>
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
                            <div class="form-check form-check-inline" v-for="(item, index) in allServices" :key="index">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" :value="item.id" @change="getIdFromCheckBox($event)">
                                <label class="form-check-label" for="inlineCheckbox1">{{item.name}}</label>
                            </div>
                        </div>
                        <div class="mt-5">
                            <a href="#" class="btn-st rd-30 btn-md " @click="addSpecialist()">Enregistrer</a>
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


export default {
    name: "specialist",

    data(){
        return {
            
                workRef:  firebase.firestore().collection("work"), 
                employeeRef: firebase.firestore().collection("employee"),
                salonRef: firebase.firestore().collection("salons"), 
                salonId: 'XMLjEcqdOURe2Vwadm7V',
                Storage: firebase.storage().ref(),

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

            addSpecialist(){

                if (this.specialistObj.desc != "" && this.specialistObj.name != "" && this.specialistObj.image != null){

                    this.employeeRef.add(this.specialistObj).then((response) =>{
                         this.salonRef.doc(this.salonId).get().then((doc)=>{
                            if (doc.exists){
                                let obj = doc.data();
                                obj.employee.push(response.id);
    
                                this.salonRef.doc(this.salonId).update(obj).then(() =>{
    
                                    this.$router.replace({name:'Salon'});
    
                                });
                              }
                        })
                    })
                }
            },

            getIdFromCheckBox(event){

                this.specialistObj.works.push({"id": event.target.value})
            },

           uploadImage(event){
                let metadata = {
                    ContentLanguage : "fr",
                    contentType: "image/jpeg",
                }

                let file = event.target.files[0];
                let fileName = "profile-" + file.lastModified;

                this.Storage.child("img/" + fileName).put(file, metadata)
                .then(() =>{
                this.getImageUrl(fileName)
                }).catch((error) =>{
                    alert(error.message)
                })
            },

            getImageUrl(url){
                this.Storage.child("img/" + url).getDownloadURL().then((url) =>{
                 this.specialistObj.image = url;
                })
            },
        },

        created(){
            
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
                                 console.log("doc", doc.data())
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