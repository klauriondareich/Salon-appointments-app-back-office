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
                <div class=" row pt-5 pr-3 float-right">
                    <input type="text" class="form-control" placeholder="Recherche" v-model="searchItem" @input="searchCustomers">
                </div>
                <div class="widget">
                    <div class="widget-title no-margin">
                        <h4>Liste des clients</h4>
                    </div>
                    <div class="main-table">
                        <table class="table table-hover table-responsive">
                            <thead>
                                <tr>
                                    <th><em>Sr</em></th>
                                    <th><em>Information du client</em></th>
                                    <th><em>Total payé</em></th>
                                    <th><em>Nombre de rdv</em></th>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in  searchCustomers()" :key="index">
                                    <td><i class="fa fa-user"></i></td>
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

export default {
  name: 'Allcustomers',
  data(){
    return{
       customersWithoutDouble: [],
       customersWithDouble: [],
       appointment: firebase.firestore().collection("appointment"),
       customer_name: "",
       Obj : {},
       searchItem: null,
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
        
   },

    searchCustomers(){
      return this.customersWithoutDouble.filter(data => !this.searchItem || data.customer_name.toLowerCase().includes(this.searchItem.toLowerCase()))
    },

   callOnChange(event){
       
       let currentDate = new Date();
       

       let table = this.customersWithoutDouble.filter((item) =>{

            let oldDate = new Date(item.stamp);
            const diffTime = Math.abs(currentDate - oldDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

           if (diffDays < 31) return item

       })
        console.log("table", table);
        console.log("table", event.target.value);
       
    //    if (diffDays > 31){
    //        // plus d'un mois
    //    }

    //    if (diffDays <= 7){
    //        // Il y a une semaine
    //    }

    //     if (diffDays < 2){
    //        // Hier
    //    }
       

    //    this.customersWithoutDouble.filter(item => new Date(item.stamp) > currentDate);
        //  console.log("current", currentDate);
        //  console.log("old", oldDate);
        //  console.log("click", event.target.value);
        //  console.log("diff", diffDays)
       
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