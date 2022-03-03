<template>
   <div class="main-content">
        <Loader v-if="loaderState"/>
            <div class="responsive-header">
                <div class="logo-area"> 
                    <div class="user-head">
                        <div class="admin">
                            <div class="admin-avatar"> <img src="images/user-icon.png" alt=""> <i class="online"></i> </div>
                        </div>
                    </div>  
                </div>
            </div>
            <!-- responsive header -->
            <div class="panel-body">
                <div class="content-area mt-5">
                   
                    <div class="row pt-5">
                        <div class="inner-bg">
                            <div class="col-md-12 col-sm-12 field"> 
                                <span class="upload-image">Ajouter une nouvelle image</span>
                                <label class="fileContainer"> <span>Ajouter</span>
                                <input type="file" accept="image/*" @change="uploadImage($event)">
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-lg-12 col-sm-12">
                            <div class="widget">
                                <div class="widget-title">
                                <h4>Galerie photos</h4>
                                </div>
                                <div class="widget-peding">
                                <ul class="insta-widget">
                                    <p class="text-center" v-if="images.length == 0">Votre galerie est vide ...</p>
                                    <li v-for="(item, index) in images" :key="index">
                                        <a href="#">
                                            <img :src="item.imageUrl" alt="image">
                                        </a>
                                       <button class="btn-danger btn-sm mb-4" @click="item.is_alert_visible = true">
                                            <i class="fa fa-trash"></i>
                                       </button>
                                       <div class="alert alert-warning" style="position: absolute; top: 20; left: 0; width: 600px;" role="alert" v-if="item.is_alert_visible">
                                             Voulez-vous supprimer cet élément?. 
                                            <button class="btn-success btn-sm ml-2" @click="deleteImage(item.id)">Oui supprimer</button>
                                            <button class="btn-danger btn-sm ml-5" @click="item.is_alert_visible = false">Non</button>
                                        </div>
                                    </li>
                                    
                                </ul>
                            </div>
                            </div>
                            <!-- instagram widget --> 
                        </div>
                        
                    </div>
                </div>
                
                <!-- bottombar -->
            </div>
    </div>
</template>

<script>
import firebase from '../firebase/init'
import Loader from './shared/Loader.vue'

export default {
    name: "Gallery",
    components: {Loader},

    data(){
        return {
            images: [],
            salonId: null,
            loaderState: false,
            is_alert_visible: false,
            imagesToDelete: [],
            galleryRef: firebase.firestore().collection("gallery"), 
            Storage: firebase.storage().ref(),
        }
    },
    methods:{

        deleteImage(id){
            this.galleryRef.doc(id).delete().then(() =>{
                this.gettingGalleryImages();
            })
        },

        getImageId(event){

            console.log(event.target.value);
        },

        addInCollection(obj){

            this.loaderState = true;

            this.galleryRef.add(obj)
            .then(() =>{
                this.gettingGalleryImages();
                this.loaderState = false;
        })
        .catch((error) => {
            alert(error.message);
            this.loaderState = false;
            })
      },

    
      uploadImage(event){

        this.loaderState = true;

        let file = event.target.files[0];
        let fileName = "gal-" + file.lastModified;
        this.Storage.child("gallery/" + fileName).put(file).then(() =>{

            let url = "gallery/" + fileName;
            let obj = {salonId: this.salonId, imageUrl: url};
            this.images.push(obj);
            this.addInCollection(obj)
        })
        .catch((error) => {
            alert(error.message);
            this.loaderState = false
        });
 
      },

      gettingGalleryImages(){

          this.loaderState = true;

          this.images = [];
          this.salonId = localStorage.getItem("salon_id");
         

          this.galleryRef.where("salonId", "==", this.salonId).get().then((snapshot) =>{
            if(!snapshot.empty){
                snapshot.forEach((doc) =>{
                    let obj = doc.data();
                    obj.id = doc.id;

                    //Get image full path
                    this.Storage.child(obj.imageUrl).getDownloadURL().then((url) =>{
                        obj.imageUrl =  url;
                    });

                    obj.is_alert_visible = false;
                    this.images.push(obj);
                    this.loaderState = false;
                    
                })
            }
            else this.loaderState = false
        })

      }

    },
    created(){
        
       this.gettingGalleryImages();     
    }
}
</script>

<style scoped>
    .checkbox-design{
        background: #fb8c00 ;
        padding: 5px;
        border-radius: 3px;
    }
</style>