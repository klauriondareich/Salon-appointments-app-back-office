<template>
    <div class="panel-layout">
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
                            
                            <label for="remember"> <router-link to="/reset_password">Mot de passe oublié?</router-link></label>
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

export default {
    data(){
        return {
            email: null,
            password: null
        }
    },
    methods:{
         // Login the user to the system 
        signIn(){
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() =>{
                let user = firebase.auth().currentUser;
                console.log("User", user);
                console.log("User", user.email);
                console.log("User", user.uid);
                this.$router.replace({ name: "Home" });
                // if(isEmailVerified){
                //   this.loaderState = false;
                // }
                // else{
                //   console.log("error x")
                // }
            }).catch((error) =>{
                console.log("error", error.message) ;
            })
        },
    }
}
</script>

<style>

</style>