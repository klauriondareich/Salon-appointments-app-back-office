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
                            <span>Nombre total : {{customers.length}}</span> </div>
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
                                <tr v-for="(item, index) in customers" :key="index">
                                    <td><i class="fa fa-user"></i></td>
                                    <td>{{item.customer_name}}</td>
                                    <td>{{item.totalPayed}}</td>
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
       customers: [],
       appointment: firebase.firestore().collection("appointment"),
       customer_name: "",
       Obj : {}
    }
   
  },
  methods:{

   getNumberOfRdv(index){
        this.customers.forEach(item =>{
            if (item.customer_name === "dada97"){
                item.nbRdv = index;
            }
        })
   }
   
  },
  created(){
     let index = 0;
     let totalPayed = 0;

     this.appointment.where("salon", "==", "XMLjEcqdOURe2Vwadm7V").orderBy("stamp", "desc").onSnapshot((snapshot) =>{
      if(!snapshot.empty){
        this.customers = [];

        snapshot.forEach((doc) =>{
          let obj = doc.data();
          obj.id = doc.id;

            if (this.customer_name != doc.data().customer_name){
                this.Obj = obj;
                this.customers.push(this.Obj);
                this.customer_name = doc.data().customer_name;
            }

            if (this.customer_name == "KLD"){
                index++;
               
            }
       

            this.Obj.totalPayed = totalPayed + obj.total;
            // console.log("total ", obj)

        })
        console.log("nb : ", index);

       // Call here
      }

      else console.log("not data now")
    });
  }
}
</script>

<style>

</style>