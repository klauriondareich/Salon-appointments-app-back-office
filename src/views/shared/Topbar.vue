<template>
    <div class="topbar">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-2">
                    <div class="logo"><router-link to="/home" title=""><img src="images/b-logo.png" alt=""></router-link></div>
                </div>
                <div class="col-lg-9">
                   
                    <ul class="seting-area">
                        <li class="text-white">{{username}}</li>
                        <!-- <li class="langages">
                            <a href="#" title="">Eng</a>
                            <ul class="drop language">
                                <li class="lang-selected"><a href="#"><i class="fa fa-check"></i> Eng</a></li>
                                <li><a href="#">Français</a></li>
                            
                            </ul>
                        </li> -->
                    </ul>
                </div>
                <div class="col-lg-1">
                    <div class="user-head">
                        <div class="admin">
                            <div class="admin-avatar" v-if="!isVisible" @click="isVisible = true">
                                <img src="images/user-icon.png" alt=""> <i class="online"></i> 
                            </div>
                            <div class="admin-avatar" v-if="isVisible" @click="isVisible = false">
                                <img src="images/user-icon.png" alt=""> <i class="online"></i> 
                            </div>
                        </div>
                        <div class="drop setting"  v-if="isVisible"> 
                            <ul class="drop-meta">
                                <li class="py-3"><router-link to="#" title=""><i class="fa fa-edit"></i>Mon profil</router-link> </li>
                                <!-- <li> <router-link to="#" title=""><i class="fa fa-envelope-o"></i>My Inbox</router-link> </li>
                                <li> <router-link to="#" title=""><i class="fa fa-adjust"></i>task</router-link> </li>
                                <li> <router-link to="#" title=""><i class="fa fa-calendar"></i>Calender</router-link> </li>
                                <li> <router-link to="#" title=""><i class="fa fa-align-right"></i>Balance Report</router-link> </li> -->
                            </ul>
                            <span class="drop-bottom"><a href="#" title="" @click="signOut()"><i class="fa fa-sign-out"></i>Se déconnecter</a></span> </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from '../../firebase/init'

export default {
    name: 'Topbar',
    data(){
        return {
            username: null,
            isVisible: false,
        }
    },
    methods:{
        signOut(){
            firebase.auth().signOut().then(() =>{
                this.$router.replace("/");
            })
            .catch((error) =>{
                console.log(error.message)
            })
        },
    },

    created(){
        
        this.username =  localStorage.getItem("username");

    }
}
</script>

<style>

</style>