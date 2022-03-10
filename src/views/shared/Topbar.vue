<template>
    <div class="topbar">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-2">
                    <div class="logo">
                        <router-link to="/home" title="">
                            <img src="/images/b-logo.png" width="40" height="40" alt="">
                            BioutyCall
                        </router-link>
                    </div>
                </div>
                <div class="col-lg-9 hide-menu-element">
                   
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
                <div class="col-lg-1 hide-menu-element">
                    <div class="user-head">
                        <div class="admin">
                            <div class="admin-avatar" v-if="!isVisible" @click="isVisible = true">
                                <img src="/images/user-icon.png" alt=""> <i class="online"></i> 
                            </div>
                            <div class="admin-avatar" v-if="isVisible" @click="isVisible = false">
                                <img src="/images/user-icon.png" alt=""> <i class="online"></i> 
                            </div>
                        </div>
                        <div class="setting pb-3" style="width:200px"  v-if="isVisible"> 
                            <!-- <router-link to="/user_profile" class="p-3">
                                        <i class="fa fa-edit"></i>Mon profil
                            </router-link>  -->
                            
                            <span class="drop-bottom"><a href="#" title="" @click="signOut()"><i class="fa fa-sign-out"></i>Se déconnecter</a></span> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import authMixin from '../../mixins/authMixin'

export default {
    name: 'Topbar',
    mixins: [authMixin],
    
    data(){
        return {
            username: null,
            isVisible: false,
        }
    },
    methods:{
        
    },

    created(){
        
        this.username =  localStorage.getItem("username");

    }
}
</script>

<style scoped>
    .drop-bottom:hover{
        background: #20988e;
    }
</style>