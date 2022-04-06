<template>
    <div class="main-content">
        <div class="panel-body">
            <div class="col-lg-12 col-sm-12">
                <div class="widget">
                    <div class="widget-title no-margin">
                        <h4>Toutes les notificaitoions</h4>
                    </div>
                    <div class="news-feed-list">
                        <div class="new-box" v-for="(item, index) in cancel_appointments" :key="index">
                            <div class="news-detail">
                                <p>Votre client <span class="font-weight-bold">{{item.customer_name}}</span> a annulé son rdv</p>
                                <p>Pour la prestation de <span class="font-weight-bold">{{item.work_name.split("\n").join(" / ")}}</span></p>
                                <p>D'un montant <span class="font-weight-bold">{{item.total}} FCFA</span></p>
                                <p>Date de rdv : <span class="font-weight-bold">{{item.stamp | formatDate}}</span></p>
                                <span v-if="item.status =='cancelled_by_user'" class="priority high ">Annulé</span>
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
  name: 'Notif',
//   components: {Loader, MobileHeader},

  data(){
    
    return{
       cancel_appointments: [],
       appointCancelRef: firebase.firestore().collection("appointment"), 

    }
  },

  created(){
      console.log("initi")
      this.appointCancelRef.where("status", "==", "cancelled_by_user").orderBy("stamp", "desc").onSnapshot((snapshot) =>{
      if(!snapshot.empty){
            this.cancel_appointments = [];

            snapshot.forEach((doc) =>{
                let obj = doc.data();
                obj.id = doc.id;

                console.log("obj", obj)
                this.cancel_appointments.push(obj)
            })
         }
         else console.log("madesso")
    })

  }
}
</script>