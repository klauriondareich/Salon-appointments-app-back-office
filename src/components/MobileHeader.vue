<template>
   <div class="responsive-header pt-5">
            <div class="logo-area">
                
                <div class="user-head">
                <div class="admin">
                    <div class="admin-avatar" v-if="!isVisible" @click="isVisible = true">
                        <img src="/images/user-icon.png" alt=""> <i class="online"></i> 
                    </div>
                    <div class="admin-avatar" v-if="isVisible" @click="isVisible = false">
                        <img src="/images/user-icon.png" alt=""> <i class="online"></i> 
                    </div>            
                </div>
                <div class="drop setting"  v-if="isVisible">                    
                    <span class="drop-bottom"  @click="signOut()"><a href="#" title=""><i class="fa fa-sign-out"></i>Se déconnecter</a></span> </div>
                </div>
                <ul class="seting-area">

                    <li class="text-white">{{username}}</li>
                <!-- <li class="langages">
                    <a title="" href="#">Eng</a>
                    <ul class="drop language">
                        <li class="lang-selected"><a href="#"><i class="fa fa-check"></i> Eng</a></li>
                        <li><a href="#">Rus</a></li>
                        <li><a href="#">Jap</a></li>
                        <li><a href="#">Arb</a></li>
                    </ul>
                </li> -->
                <li  @click="showSidebar()" v-if="!this.$store.state.sidebarState">
                    <span class="icon-style"><i class="fa fa-bars"></i></span>
                </li>
                <li @click="hideSidebar()" v-if="this.$store.state.sidebarState">
                    <span class="icon-style"><i class="fa fa-close"></i></span>
                </li>
            </ul>
            </div>
            
        </div>
</template>

<script>
import authMixin from '../mixins/authMixin'

export default {

    name: "MobileHeader",
    mixins: [authMixin],

    data(){
        return {
            username: null,
            isVisible: false,
        }
    },

    methods:{

        showSidebar(){
          this.$store.state.sidebarState = true
        },

        hideSidebar(){  
          this.$store.state.sidebarState = false
        },
    },

    created(){
        
        this.username =  localStorage.getItem("username");

    }
}
</script>

<style scoped>
    .icon-style i{
        font-size: 18px;
        color: #fff;
    }
</style>