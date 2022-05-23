<template>
    <div class="main-content">
        <div class="panel-body">
            <div class="col-lg-8 col-sm-8 m-auto">
                <div class="widget">
                    <div class="widget-title no-margin">
                        <h4>Historique de paiement</h4>
                    </div>
                    <div>
                        <div class="new-box" v-for="(item, index) in cancel_appointments" :key="index" style="border-bottom:1px solid #8080803b">
                            <div class="news-detail">
                                <i class="fa fa-money"></i>
                                <p>Vous avez reçu un paiement de <span class="font-weight-bold">1000 FCFA</span></p>
                                <p>Le 12/06/2021</p>
                                <span v-if="item.status =='cancelled_by_user'" class="priority low ">Payé</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import firebase from '../firebase/init'
// import Loader from './shared/Loader.vue'
// import MobileHeader from '../components/MobileHeader.vue'

export default {
  name: 'Payments',
//   components: {Loader, MobileHeader},

  data(){
    
    return{
       cancel_appointments: [],
       appointCancelRef: firebase.firestore().collection("appointment"), 
    }
  },

  created(){
      
      this.appointCancelRef.where("status", "==", "cancelled_by_user").orderBy("stamp", "desc").get().then((snapshot) =>{
      
      if(!snapshot.empty){
          
            this.cancel_appointments = [];
          
            snapshot.forEach((doc) =>{
                let obj = doc.data();
                obj.id = doc.id;
                this.appointCancelRef.doc(obj.id).update({"read": true});
                this.cancel_appointments.push(obj);
            });
            
         }
    })

  }
}
</script>