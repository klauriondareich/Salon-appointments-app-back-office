<template>
    <div class="panel-layout" id="bg-page">
        <Loader v-if="loaderState"/>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="admin-lock vh100">
                    <div class="admin-form">
                            <div class="logo"><img src="images/b-logo.png" alt=""></div>
                        <h4>Connexion</h4>
                        <form method="post" @submit.prevent="signIn">
                            <label><i class="fa fa-envelope"></i></label>
                            <input type="text" placeholder="Adresse email" style="background: #fff!important; text-transform: normal;" v-model="email">
                            <label><i class="fa fa-unlock-alt"></i></label>
                            <input type="password" placeholder="Password" style="background: #fff;" v-model="password">
                            
                            <label for="remember"> <router-link to="/reset_password" style="font-size: 15px">Mot de passe oublié?</router-link></label>
                            <button type="submit">Se connecter</button>
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
    name: "Login",
    components: {Loader},

    data(){
        return {
            email: null,
            password: null,
            loaderState: false,
        }
    },
    methods:{
         // Login the user to the system 
        signIn(){

            this.loaderState = true;

            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() =>{
                this.$router.replace({ name: "Home" });

            })
            // .catch((error) =>{
            //     console.log("error", error.message) ;
            // })
        },
    }
}
</script>

<style scoped>

 #bg-page{
    background: rgba(0, 0, 0, 0) linear-gradient(to right, rgb(63 146 116) 0%, rgb(32 152 142) 100%) repeat scroll 0 0!important;
    overflow: hidden;
 }

</style>