<template>
    <div class="main-content">
            <Loader v-if="loaderState"/>

            <MobileHeader/>
        <div class="panel-body">
            <div class="content-area sortable-widt mt-5">
                <div class="sub-bar">
                    <div class="sub-title">
                        <h4>MES CLIENTS</h4>
                        <!-- <span>Welcome To web Admin Panel!</span> -->
                    </div>
                    <ul class="bread-crumb">
                        <li><router-link to="/home" title="">Accueil</router-link></li>
                        <li>Clients</li>
                    </ul>
                </div>
                <div class="widget">
                    <div class="widget-peding">
                        <div class="notifi"> <i class="fa fa-users"></i>
                        <div class="notifi-info">
                            <p>Visualisation de tous les clients du système</p>
                            <span>Nombre total : {{customersWithoutDouble.length}}</span> </div>
                        </div>
                    </div>
                    </div>
                <!-- top info widgets -->
                <div class=" row pt-5 pr-3 float-right">
                    <input type="text" class="form-control" placeholder="Recherche" v-model="searchItem" @input="searchCustomers">
                </div>
                <div class="widget">
                    <div class="widget-title no-margin">
                        <h4>Liste des clients</h4>
                    </div>
                    <div class="main-table">
                        <table class="prj-tbl striped table-responsive">
                            <thead class="color">
                                <tr>
                                    <!-- <th><em>#</em></th> -->
                                    <th><em>Informations du client</em></th>
                                    <th><em>Total payé</em></th>
                                    <th><em>Nombre de rdv</em></th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in  searchCustomers()" :key="index">
                                    <!-- <td class="nb-user"><i class="fa fa-user"></i></td> -->
                                    <td>{{item.customer_name}}</td>
                                    <td>{{item.totalPayed}} FCFA</td>
                                    <td>{{item.nbRdv}}</td>
                                </tr>
                                <tr class="p-5" v-if="searchCustomers().length == 0">

                                    <td><i class="fa fa-user"></i></td>
                                    <td></td>
                                    <td> Aucun client trouvé ...</td>
                                    <td></td>
                                
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- our project widget -->
                
                
            </div>                     
        </div>
    </div>
</template>

<script>
import firebase from '../firebase/init'
import Loader from './shared/Loader.vue'
import MobileHeader from '../components/MobileHeader.vue'


export default {
  name: 'Allcustomers',
  components: {Loader, MobileHeader},

  data(){
    return{
       customersWithoutDouble: [],
       customersWithDouble: [],
       loaderState: false,
       appointment: firebase.firestore().collection("appointment"),
       customer_name: "",
       Obj : {},
       searchItem: null,
       salonId: null,
    }
   
  },
  methods:{

    // Calcule le total des rdv d'un client et le montant payé
   calculTotals(){

        this.customersWithoutDouble.forEach(customer1 =>{
            let customers_arr = this.customersWithDouble.filter(item => item.customer_name === customer1.customer_name);
            let totalPayed = customers_arr.map(obj => obj.total).reduce((acc, currentValue) => acc + currentValue);
            customer1.nbRdv = customers_arr.length;
            customer1.totalPayed =totalPayed;
        })
        
   },

    searchCustomers(){
      return this.customersWithoutDouble.filter(data => !this.searchItem || data.customer_name.toLowerCase().includes(this.searchItem.toLowerCase()))
    },


  },
  created(){

    this.salonId = localStorage.getItem("salon_id");
    this.loaderState = true;

    this.customersWithoutDouble = [];
        this.customersWithDouble = [];
     this.appointment.where("salon", "==", this.salonId).orderBy("stamp", "desc").get().then((snapshot) =>{
      if(!snapshot.empty){

        snapshot.forEach((doc) =>{
            let obj = doc.data();
            obj.id = doc.id;
            this.customersWithDouble.push(obj);

            // Suppression des doublons sur les noms des clients
            
            if (this.customer_name != doc.data().customer_name){
                this.Obj = obj;
                if (!this.customersWithoutDouble.map(item => item.customer_name).includes(this.Obj.customer_name))
                this.customersWithoutDouble.push(this.Obj);
                this.customer_name = doc.data().customer_name
            }
        })
        this.calculTotals();
        this.loaderState = false;

      }
       else{
            // console.log("no customers");
            this.loaderState = false;
        }
    });


  }
}
</script>

<style>

</style>