<template>
   <div class="responsive-header">
            <div class="logo-area">
                
                <div class="user-head">
                <div class="admin">
                    <div class="admin-avatar"> <img src="images/user-icon.png" alt=""> <i class="online"></i> </div>
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
export default {

    name: "MobileHeader",

    data(){
        return {
            username: null
        }
    },

    methods:{

        showSidebar(){
  
          this.$store.state.sidebarState = true
        },

        hideSidebar(){
            console.log("done")
  
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