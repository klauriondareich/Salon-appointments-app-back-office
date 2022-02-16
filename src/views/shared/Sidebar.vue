<template>
  <header>
    <div class="side-menus">
        <div class="side-header">
            <div class="logo"><router-link title="" to="/home"><img alt="" src="images/b-logo.png"></router-link></div>
            <nav class="slide-menu">
                <ul class="parent-menu">                                           
                    <li><router-link to="/home" title=""><i class="fa fa-home"></i><span>Accueil</span></router-link></li>
                    <li><router-link to="/salon" title=""><i class="fa fa-building"></i><span>Mon salon</span></router-link></li>
                    <li><router-link to="/appointments" title=""><i class="fa fa-calendar"></i><span>Tous les rendez-vous</span></router-link></li>
                    <li><router-link to="/allcustomers" title=""><i class="fa fa-users"></i><span>Tous les clients</span></router-link></li>
                    <li><router-link to="/statistics" title=""><i class="fa fa-bar-chart"></i><span>Statistiques</span></router-link></li>
                    <li><router-link to="/payments" title=""><i class="fa fa-credit-card"></i><span>Paiements</span></router-link></li>
                    <li><router-link to="/comments" title=""><i class="fa fa-comment"></i><span>Notes et commentaires</span></router-link></li>
                    <li><router-link to="/gallery" title=""><i class="fa fa-photo"></i><span>Galerie</span></router-link></li>
                </ul>
            </nav>
        </div>
    </div>
  </header>
</template>

<script>
export default {

}
</script>

<style>

</style>