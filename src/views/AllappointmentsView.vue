<template>
    <div class="main-content">
                <Loader v-if="loaderState"/>

                <MobileHeader/> 
                <div class="panel-body">
                    <div class="content-area sortable-widt mt-5">
                        <div class="sub-bar">
                            <div class="sub-title">
                                <h4>MES RENDEZ-VOUS</h4>
                            </div>
                            <ul class="bread-crumb">
                                <li><router-link to="/home" title="">Accueil</router-link></li>
                                <li>Tous les rdv</li>
                            </ul>
                        </div>
                        <div class="widget">
                            <div class="widget-peding">
                                <div class="notifi"> 
                                    <i class="fa fa-calendar"></i>
                                    <div class="notifi-info">
                                        <p>Visualisation de tous les rendez-vous (rdv) du système</p>
                                        <span>Nombre total : {{appointments.length}} </span> <br>
                                        Chiffre d'affaire (FCFA) :<span class="yellow-class"> {{totalAmount}} </span>
                                    </div>
                                </div>
                            </div>
                            </div>
                        <!-- top info widgets -->
                        <div class="row row-element-1">
                            <div class="col-6">
                                <div class="pt-5">
                                    <input type="text" class="form-control" placeholder="Rechercher un client" v-model="searchItem" @input="searchCustomers">
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="pt-5 pr-3 float-right">
                                    <label>Filtrer les rdv : </label>
                                    <select style="background:#e9e9e9; padding-left: 10px;" @change="callOnChange($event)">
                                        <option value="all">Tous les rdv</option>
                                        <option value="today">Aujourd'hui</option>
                                        <option value="yesterday">Hier</option>
                                        <option value="two_weeks">2 semaines</option>
                                        <option value="30_days">30 jours</option>
                                        <option value="one_year">Une année</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <!-- top info widgets -->
                        <!-- for mobiles -->
                        <div class="row row-element-2">
                            <div class="col-12">
                                <div class="pt-5">
                                    <input type="text" class="form-control" placeholder="Rechercher un client" v-model="searchItem" @input="searchCustomers">
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="pr-3 float-right">
                                    <label>Filtrer les rdv : </label>
                                    <select style="background:#e9e9e9; padding-left: 10px;" @change="callOnChange($event)">
                                        <option value="all">Tous les rdv</option>
                                        <option value="today">Aujourd'hui</option>
                                        <option value="yesterday">Hier</option>
                                        <option value="two_weeks">2 semaines</option>
                                        <option value="under_month">Moins d'un mois</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="widget">
                            <div class="widget-title no-margin">
                                <h4>Liste des rendez-vous</h4>
                            </div>
                            <table class="prj-tbl striped table-responsive">
                                <thead  class="color">
                                    <tr>
                                        <!-- <th style="width: 8%;"><em>#</em></th> -->
                                        <th style="width: 20%;"><em>Information du client</em></th>
                                        <th style="width: 25%;"><em>Services</em></th>
                                        <th><em>Montant</em></th>
                                        <th><em>Date</em></th>
                                        <th style="width: 8%;"><em>action</em></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in appointments" :key="index">
                                        <!-- <td><i class="fa fa-calendar"></i></td> -->
                                        <td>{{item.customer_name}}</td>
                                        <td>
                                            {{item.work_name}}
                                        </td>
                                        <td>
                                            {{item.total}}
                                        </td>
                                        <td><i>{{item.stamp | formatDate}}</i></td>
                                        <td>
                                           <Modal :details="item"/> 
                                        </td>
                                    </tr>
                                    <tr class="p-5" v-if="this.appointments.length == 0">
                                        <td><i class="fa fa-user"></i></td>
                                        <td></td>
                                        <td> Aucun client trouvé ...</td>
                                        <td></td>   
                                    </tr>
                                </tbody>
                            </table>
                            
                        </div>
                        <!-- our project widget -->
                        
                        
                    </div>
                </div> 
    </div>
</template>

<script>
import firebase from '../firebase/init'
import Loader from './shared/Loader.vue'
import Modal from '../components/Dialog.vue'
import MobileHeader from '../components/MobileHeader.vue'

export default {
    name: "Appointments",
    components: {Loader, Modal, MobileHeader},

    data(){
        return{
            appointments: [],
            appointmentsBis: [],
            loaderState: false,
            appointment: firebase.firestore().collection("appointment"),
            searchItem: null,
            dialog: false,
            salonId: null,
            totalAmount: 0,
        }
    },
    methods:{

        searchCustomers(){
             this.appointments = this.appointmentsBis.filter(data => !this.searchItem || data.customer_name.toLowerCase().includes(this.searchItem.toLowerCase()))
        },

        initFilters(currentDate, item){
            let oldDate = new Date(item.stamp);
            const diffTime = Math.abs(currentDate - oldDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays
        },

        filterUnderOneMonth(currentDate) {
            this.appointments = this.appointmentsBis.filter((item) =>{

                let diffDays = this.initFilters(currentDate, item);

                if (diffDays < 31) return item

            });

            this.calculTurnover();    
        },

        calculTurnover(){
             // Calculation of the turnover (chiffre d'affaire)
             if (this.appointments.length == 0) {
                this.totalAmount = 0;
                return
             }
            this.totalAmount = this.appointments.map(obj => obj.total).reduce((acc, currentValue) => acc + currentValue);
        },

        filterToday(currentDate){

            this.appointments = this.appointmentsBis.filter((item) =>{

                let diffDays = this.initFilters(currentDate, item);

                if (diffDays == 0) return item

            });

            this.calculTurnover();    
        },

        filterYesterday(currentDate) {
            this.appointments = this.appointmentsBis.filter((item) =>{

                let diffDays = this.initFilters(currentDate, item);

                if (diffDays < 2) return item

            });

            this.calculTurnover();    
        },

         filterTwoWeeks(currentDate) {
            this.appointments = this.appointmentsBis.filter((item) =>{

                let diffDays = this.initFilters(currentDate, item);

                if (diffDays == 14) return item

            });

            this.calculTurnover();    
        },

        filter30Days(currentDate) {
            this.appointments = this.appointmentsBis.filter((item) =>{

                let diffDays = this.initFilters(currentDate, item);

                if (diffDays == 30) return item

            });

            this.calculTurnover();    
        },

         filterOneYear(currentDate) {
            this.appointments = this.appointmentsBis.filter((item) =>{

                let diffDays = this.initFilters(currentDate, item);

                if (diffDays >= 365) return item

            });

            this.calculTurnover();    
        },

        viewAllappointments(){
            this.appointments = this.appointmentsBis;
            this.calculTurnover();   
        },

        // Called when the value of the filter changed
        callOnChange(event){
       
            let currentDate = new Date();
            
            if (event.target.value == "under_month") this.filterUnderOneMonth(currentDate);
            else if (event.target.value == "yesterday") this.filterYesterday(currentDate);
            else if (event.target.value == "all") this.viewAllappointments();
            else if (event.target.value == "today") this.filterToday(currentDate);
            else if (event.target.value == "two_weeks") this.filterTwoWeeks(currentDate);
            else if (event.target.value == "30_days") this.filter30Days(currentDate);
            else if (event.target.value == "one_year") this.filterOneYear(currentDate);
        }
    },
    created(){


    this.loaderState = true;

    this.salonId = localStorage.getItem("salon_id");

     this.appointment.where("salon", "==", this.salonId).orderBy("stamp", "desc").get().then((snapshot) =>{
      if(!snapshot.empty){
        this.appointments = [];
        snapshot.forEach((doc) =>{
          let obj = doc.data();
          obj.id = doc.id;
          obj.isVisible = false;
          this.appointments.push(obj);
          this.appointmentsBis.push(obj);
          this.loaderState = false;
        });
      }
      else{
            // console.log("no appointments");
            this.loaderState = false;
        }
    });
  }
}
</script>

<style>

</style>