<template>
    <div class="main-content">
        <div class="panel-body">
            <div class="content-area sortable-widt">
                <div class="sub-bar">
                    <div class="sub-title">
                        <h4>Dashboard:</h4>
                        <!-- <span>Welcome To web Admin Panel!</span> -->
                    </div>
                    <ul class="bread-crumb">
                        <li><a href="#" title="">Home</a></li>
                        <li>Dashbord</li>
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
                <div class="pt-5 pr-3 float-right">
                    <label>Filtrer les clients : </label>
                    <select>
                        <option>Aujourd'hui</option>
                        <option>Hier</option>
                        <option>Semaine dernière</option>
                        <option>Il ya 01 mois</option>
                    </select>
                    </div>
                <div class="widget">
                    <div class="widget-title no-margin">
                        <h4>Liste des clients</h4>
                    </div>
                    <div class="main-table">
                        <table class="table table-hover table-responsive">
                            <thead>
                                <tr>
                                    <th><em>Sr#</em></th>
                                    <th><em>Information du client</em></th>
                                    <th><em>Total payé</em></th>
                                    <th><em>Nombre de rdv</em></th>
                                    <th><em>Date</em></th>
                                    <!-- <th><em>action</em></th> -->
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in customersWithoutDouble" :key="index">
                                    <td><i class="fa fa-user"></i></td>
                                    <td>{{item.customer_name}}</td>
                                    <td>{{item.totalPayed}} FCFA</td>
                                    <td>{{item.nbRdv}}</td>
                                    <td><i>{{item.stamp | formatDate}}</i></td>
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

export default {
  name: 'Allcustomers',
  data(){
    return{
       customersWithoutDouble: [],
       customersWithDouble: [],
       appointment: firebase.firestore().collection("appointment"),
       customer_name: "",
       Obj : {}
    }
   
  },
  methods:{
      
    // Calcule le total des rdv d'un client et le montant payé
   calculTotals(){

        this.customersWithoutDouble.forEach(customer1 =>{
            let customers_arr = this.customersWithDouble.filter(item => item.customer_name === customer1.customer_name);
            let totalPayed = customers_arr.map(obj => obj.total).reduce((acc, currentValue) => acc +currentValue);
            customer1.nbRdv = customers_arr.length;
            customer1.totalPayed =totalPayed;
        })
        
   }

  },
  created(){


     this.appointment.where("salon", "==", "XMLjEcqdOURe2Vwadm7V").orderBy("stamp", "desc").onSnapshot((snapshot) =>{
      if(!snapshot.empty){
        this.customersWithoutDouble = [];
        this.customersWithDouble = [];

        snapshot.forEach((doc) =>{
            let obj = doc.data();
            obj.id = doc.id;
            this.customersWithDouble.push(obj);

            // Suppression des doublons sur les noms des clients
            if (this.customer_name != doc.data().customer_name){
                this.Obj = obj;
                this.customersWithoutDouble.push(this.Obj);
                this.customer_name = doc.data().customer_name;
            }

        })
        this.calculTotals();
      }

      else console.log("not data now")
    });


  }
}
</script>

<style>

</style>