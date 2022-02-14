<template>
    <div class="main-content">
        <div class="responsive-header">
            <div class="logo-area">
                <ul class="notify-area">
                    <li>
                        <div class="nav-icon3"> <span></span> <span></span> <span></span> <span></span> </div>
                    </li>
                    <li class="notifications"><a href="#" title=""><i class="fa fa-bell-o"></i></a><span class="red-bg">02</span>
                        <div class="drop notify"> <span class="drop-head">Notifications</span>
                            <ul class="drop-meta">
                                <li> <i class="notifi-icon blue">N</i>
                                    <div class="notifi-meta">
                                        <h4><a href="#" title="">Nulla Vel Metus Scelerisque Ante Commodo. </a></h4>
                                        <span>02:34PM</span> </div>
                                </li>
                                <li> <i class="notifi-icon red">C</i>
                                    <div class="notifi-meta">
                                        <h4><a href="#" title="">Nulla Vel Metus Scelerisque Ante Commodo. </a></h4>
                                        <span>02:34PM</span> </div>
                                </li>
                                <li> <i class="notifi-icon yellow">A</i>
                                    <div class="notifi-meta">
                                        <h4><a href="#" title="">Nulla Vel Metus Scelerisque Ante Commodo. </a></h4>
                                        <span>02:34PM</span> </div>
                                </li>
                                <li> <i class="notifi-icon blue">N</i>
                                    <div class="notifi-meta">
                                        <h4><a href="#" title="">Nulla Vel Metus Scelerisque Ante Commodo. </a></h4>
                                        <span>02:34PM</span> </div>
                                </li>
                            </ul>
                            <span class="drop-bottom"><a href="#" title="">View More Notifications</a></span> </div>
                    </li>
                    <li class="messages"><a href="#" title=""><i class="fa fa-envelope-o"></i></a><span class="blue-bg">10</span>
                        <div class="drop messages"> <span class="drop-head">3 New Message <i class="fa fa-pencil-square-o"></i></span>
                            <ul class="drop-meta">
                                <li> <i class="notifi-icon"><img src="images/resources/user-mesg.jpg" alt=""></i>
                                    <div class="notifi-meta"> <span>02:34PM</span>
                                        <h4><a href="#" title="">Hi Teddy, Just wanted to let you...</a></h4>
                                    </div>
                                </li>
                                <li> <i class="notifi-icon"><img src="images/resources/user-mesg2.jpg" alt=""></i>
                                    <div class="notifi-meta"> <span>02:34PM</span>
                                        <h4><a href="#" title="">Hi Teddy, Just wanted to let you...</a></h4>
                                    </div>
                                </li>
                                <li> <i class="notifi-icon"><img src="images/resources/user-mesg3.jpg" alt=""></i>
                                    <div class="notifi-meta"> <span>02:34PM</span>
                                        <h4><a href="#" title="">Hi Teddy, Just wanted to let you...</a></h4>
                                    </div>
                                </li>
                                <li> <i class="notifi-icon"><img src="images/resources/user-mesg.jpg" alt=""></i>
                                    <div class="notifi-meta"> <span>02:34PM</span>
                                        <h4><a href="#" title="">Hi Teddy, Just wanted to let you...</a></h4>
                                    </div>
                                </li>
                                <li> <i class="notifi-icon"><img src="images/resources/user-mesg2.jpg" alt=""></i>
                                    <div class="notifi-meta"> <span>02:34PM</span>
                                        <h4><a href="#" title="">Hi Teddy, Just wanted to let you...</a></h4>
                                    </div>
                                </li>
                            </ul>
                            <span class="drop-bottom"><a href="#" title="">View More messages</a></span> </div>
                    </li>
                </ul>
                
                <div class="user-head">
                <div class="admin">
                    <div class="admin-avatar"> <img src="images/resources/admin.png" alt=""> <i class="online"></i> </div>
                </div>
                <div class="drop setting"> <span class="drop-head">stifen Doe <i>30 days trial</i></span>
                    <ul class="drop-meta">
                        <li> <a href="#" title=""><i class="fa fa-eyedropper"></i>Edit Profile</a> </li>
                        <li> <a href="#" title=""><i class="fa fa-envelope-o"></i>My Inbox</a> </li>
                        <li> <a href="#" title=""><i class="fa fa-adjust"></i>task</a> </li>
                        <li> <a href="#" title=""><i class="fa fa-calendar"></i>Calender</a> </li>
                        <li> <a href="#" title=""><i class="fa fa-align-right"></i>Balance Report</a> </li>
                    </ul>
                    <span class="drop-bottom"><a href="#" title=""><i class="fa fa-sign-out"></i>log Out</a></span> </div>
                </div>
                <ul class="seting-area">
                <li class="langages">
                    <a title="" href="#">Eng</a>
                    <ul class="drop language">
                        <li class="lang-selected"><a href="#"><i class="fa fa-check"></i> Eng</a></li>
                        <li><a href="#">Rus</a></li>
                        <li><a href="#">Jap</a></li>
                        <li><a href="#">Arb</a></li>
                    </ul>
                </li>
                <li class="setting-panel"><a title="" href="#"><i class="icon-equalizer"></i></a></li>
            </ul>
            </div>
            <div class="t-search">
                <form method="post">
                    <input type="text" placeholder="Enter Your Keyword">
                    <button type="submit"><i class="fa fa-search"></i></button>
                </form>
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
                                        <img :src="item.imageUrl" alt="">
                                    </a>
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

export default {
    data(){
        return {
            images: [],
            salonId: "XMLjEcqdOURe2Vwadm7V",
            galleryRef: firebase.firestore().collection("gallery"), 
            Storage: firebase.storage().ref(),
        }
    },
    methods:{
         addInCollection(obj){
            this.galleryRef.add(obj).then(() =>{
            alert("avatar uploaded");
        }).catch((error) => alert(error.message))
      },

      uploadImage(event){
        let metadata = {
          ContentLanguage : "fr",
          contentType: "image/jpeg",
        }
        let file = event.target.files[0];
        let fileName = "picture-" + file.lastModified;
        this.Storage.child("gallery/" + fileName).put(file, metadata)
        .then(() =>{
          this.getImageUrl(fileName)
        }).catch((error) =>{
          alert(error.message)
        })
      },

      getImageUrl(url){
            this.Storage.child("gallery/" + url).getDownloadURL().then((url) =>{
            let obj = {salonId: this.salonId, imageUrl: url};
            this.images.push(obj);
            
            this.addInCollection(obj)
        })
      },

    },
    created(){
        this.galleryRef.where("salonId", "==", "XMLjEcqdOURe2Vwadm7V").get().then((snapshot) =>{
            if(!snapshot.empty){
                snapshot.forEach((doc) =>{
                    let obj = doc.data();
                    obj.id = doc.id;
                    this.images.push(obj);
                })
            }
        })
    }
}
</script>

<style>

</style>