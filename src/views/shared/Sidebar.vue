<template>
  <header :class="classValue">
    <div class="side-menus">
        <div class="side-header">
            <div class="logo">
              <a href ="/">
                <img alt="" style="visibility: hidden" src="images/b-logo.png">
              </a>
            </div>
            <div class="float-right px-5 btn-close" @click="classValue = 'hide-sidebar'">
                <span class="icon-style"><i class="fa fa-close"></i></span>
            </div>
            <nav class="slide-menu">
                <ul class="parent-menu">                                           
                    <li><router-link to="/home"><i class="fa fa-home"></i><span>Accueil</span></router-link></li>
                    <li><router-link to="/salon"><i class="fa fa-building"></i><span>Mon salon</span></router-link></li>
                    <li><router-link to="/appointments"><i class="fa fa-calendar"></i><span>Tous les rendez-vous</span></router-link></li>
                    <li><router-link to="/allcustomers"><i class="fa fa-users"></i><span>Tous les clients</span></router-link></li>
                    <!-- <li><router-link to="/statistics"><i class="fa fa-bar-chart"></i><span>Statistiques</span></router-link></li> -->
                    <li><router-link to="/payments"><i class="fa fa-credit-card"></i><span>Paiements</span></router-link></li>
                    <li><router-link to="/comments"><i class="fa fa-comment"></i><span>Notes et commentaires</span></router-link></li>
                    <li><router-link to="/gallery"><i class="fa fa-photo"></i><span>Galerie</span></router-link></li>
                    <li><router-link to="/user_profile"><i class="fa fa-user"></i><span>Mon profil</span></router-link></li>
                </ul>
            </nav>
        </div>
    </div>
  </header>
</template>

<script>
export default {
  data(){
    return{
      classValue : 'show-sidebar',
    }
  },

  methods:{
     
  }
}
</script>

<style>
    a.router-link-active,
    a.router-link-exact-active {
      background-color: #f3f3f3;
    }
    .hide-sidebar{
      display: none;
    }
    .show-sidebar{
      display: block;
    }
</style>