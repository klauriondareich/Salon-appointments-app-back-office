<template>
    <div class="panel-layout" id="bg-page">
          <Loader v-if="loaderState"/>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="admin-lock vh100">
                        <div class="admin-form">
                                <div class="logo"><img src="images/b-logo.png" alt=""></div>
                            <h4>Changer le mot de passe</h4>
                            <p class="text-white">Un lien de réinitialisation vous sera envoyé dans votre boîte email.</p>
                            <form method="post" @submit.prevent="resetPassword">
                                <label><i class="fa fa-envelope"></i></label>
                                <input type="text" placeholder="Saisissez votre adresse email" v-model="email" style="background: #fff;">
                                <label for="remember"> <router-link to="/" style="font-size: 15px">Retourner à la page précédente</router-link></label>
                                <button type="submit">Réinitialiser</button>
                            </form>
                        </div>
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
    name: "ResetPassword",
    components: {Loader},

 data(){
     return{
         email: null,
         loaderState: false,
     }
 },
 methods:{
    resetPassword(){

        if (this.email){
          this.loaderState = true;
          let auth = firebase.auth();
        
          
          auth.sendPasswordResetEmail(this.email).then(() => {
            // this.successMessage = "Lien d'activation encoyé";
            this.email = null;
            this.loaderState = false;
          }).catch((error) => {
            this.errorMessage = error.message;
            // console.log("error Message ", this.errorMessage);
            this.loaderState = false;
          })
        }
      }
 }
}
</script>

<style scoped>
 #bg-page{
    background: rgba(0, 0, 0, 0) linear-gradient(to right, rgb(63 146 116) 0%, rgb(32 152 142) 100%) repeat scroll 0 0!important;
    overflow: hidden;
 }
</style>