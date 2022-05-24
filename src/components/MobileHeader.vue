<template>
   <div class="responsive-header pt-5">
       
       <p class="pt-5 pl-3">
          <i class="fa fa-user"></i> Bienvenue {{username}}
       </p>
            
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