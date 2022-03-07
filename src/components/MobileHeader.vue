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

                    <li class="text-white">Madonna</li>
                <!-- <li class="langages">
                    <a title="" href="#">Eng</a>
                    <ul class="drop language">
                        <li class="lang-selected"><a href="#"><i class="fa fa-check"></i> Eng</a></li>
                        <li><a href="#">Rus</a></li>
                        <li><a href="#">Jap</a></li>
                        <li><a href="#">Arb</a></li>
                    </ul>
                </li> -->
                <li class="setting-panel"  @click="showSidebar()"><a title="" href="#"><i class="fa fa-bars"></i></a></li>
                <li class="setting-panel" @click="hideSidebar()"><a title="" href="#"><i class="fa fa-close"></i></a></li>
            </ul>
            </div>
            
        </div>
</template>

<script>
export default {

    name: "MobileHeader",

    methods:{
        
        showSidebar(){
  
          this.$store.state.sidebarState = true
        },

        hideSidebar(){
  
          this.$store.state.sidebarState = false
        },
    }
}
</script>

<style>

</style>