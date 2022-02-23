<template>
  <div class="panel-layout">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="main-page">
                    <Sidebar/>
                    <Topbar/>
                    <router-view/>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

import  Sidebar  from './Sidebar.vue'
import  Topbar from './Topbar.vue'

export default {
    components:{Topbar, Sidebar}
}
</script>

<style>

</style>