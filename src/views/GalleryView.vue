<template>
   <div class="main-content">
        <Loader v-if="loaderState"/>
            <MobileHeader/>        

            <!-- responsive header -->
            <div class="panel-body">
                <div class="content-area mt-5">
                   <div class="sub-bar">
                    <div class="sub-title">
                        <h4>GALERIE</h4>
                        <!-- <span>Welcome To web Admin Panel!</span> -->
                    </div>
                    <ul class="bread-crumb">
                        <li><router-link to="/home" title="">Accueil</router-link></li>
                        <li>Galerie</li>
                    </ul>
                    </div>
                    <div class="row pt-5">
                        <div class="col-md-6">
                            <div class="inner-bg inner-bg-style">
                                <div v-if="images.length >= 100">
                                    <p class="alert alert-warning">
                                        Vous avez atteint le nombre maximal d'images (100 images)
                                    </p>
                                </div>
                                <div class="field" v-if="images.length < 100"> 
                                    <p>Vérifiez la taille de l'image et son format avant d'uploader.</p>
                                    <span class="upload-image">Ajouter une nouvelle image</span>
                                    <label class="fileContainer"> <span>Ajouter</span>
                                    <input type="file" accept="image/*" @change="uploadImage($event)">
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="inner-bg inner-bg-style">
                                <p class="alert alert-warning">
                                    Taille maximale autorisée: 1 Mo et le format : PNG
                                </p>
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
                                            <img :src="item.imageUrl" alt="image" class="img-fluid">
                                        </a>
                                       <button class="btn-danger btn-sm mb-4" @click="item.is_alert_visible = true">
                                            <i class="fa fa-trash"></i>
                                       </button>
                                       <div class="alert alert-warning" style="position: absolute; top: 20; left: 0; width: auto;" role="alert" v-if="item.is_alert_visible">
                                             Voulez-vous supprimer cet élément?. <br>
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
import MobileHeader from '../components/MobileHeader.vue'


export default {
    name: "Gallery",
    components: {Loader, MobileHeader},

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
        let fileSize = (file.size/1024)/1024; // Convert image size in Mo
        let fileType = file.type;

        if (fileSize.toFixed(2) < 1 && fileType == "image/png"){

            let fileName = "gal-" + file.lastModified;
            this.Storage.child("gallery/" + fileName).put(file).then(() =>{

                let url = "gallery/" + fileName;
                let obj = {salonId: this.salonId, imageUrl: url};
                this.images.push(obj);
                this.addInCollection(obj)
            })
            .catch((error) => {
                alert(error.message);
            });
            this.loaderState = false;
            return;
        }
        
        this.loaderState = false;
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
    
        // this.$store.state.sidebarState = false;

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