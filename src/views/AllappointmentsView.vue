<template>
    <div class="main-content">
                <Loader v-if="loaderState"/>

                <MobileHeader/> 
                <div class="panel-body">
                    <div class="content-area sortable-widt mt-5">
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
                                <div class="notifi"> <i class="fa fa-calendar"></i>
                                <div class="notifi-info">
                                    <p>Visualisation de tous les rendez-vous (rdv) du système</p>
                                    <span>Nombre total : {{appointments.length}} </span></div>
                                </div>
                            </div>
                            </div>
                        <!-- top info widgets -->
                        <div class="row">
                            <div class="col-6">
                                <div class="pt-5">
                                    <input type="text" class="form-control" placeholder="Rechercher un client" v-model="searchItem" @input="searchCustomers">
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="pt-5 pr-3 float-right">
                                    <label>Filtrer les rdv : </label>
                                    <select style="background:#e9e9e9; padding-left: 10px;" @change="callOnChange($event)">
                                        <!-- <option value="today">Aujourd'hui</option> -->
                                        <option value="all">Tous les rdv</option>
                                        <option value="yesterday">Hier</option>
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
                                        <th style="width: 8%;"><em>#</em></th>
                                        <th style="width: 20%;"><em>Client</em></th>
                                        <th style="width: 25%;"><em>Services</em></th>
                                        <th><em>Montant</em></th>
                                        <th><em>Date</em></th>
                                        <th style="width: 8%;"><em>action</em></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in appointments" :key="index">
                                        <td><i class="fa fa-calendar"></i></td>
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
                                            <!-- <ul>
                                                <div v-if="item.isVisible" style="position:absolute;right: 0;">

                                                <div class="tip-left tooltip">
                                                    <div class="tooltip-inner" style="text-align:left; max-width: 300px;">
                                                        <p v-if="item.isVisible" @click="item.isVisible = false">
                                                            <a href="#" ><i class="fa fa-eye-slash text-danger"></i></a>
                                                        </p> 
                                                        <span>Discount: {{item.discount}} </span> <br>
                                                        <span>CouponId:  {{item.CouponId}}</span> <br>
                                                        <span>Mode de paiement :   {{item.payment}}</span> <br>
                                                        <span>Notation :   {{item.rate}} <i v-if="item.rate" class="fa fa-star text-warning"></i></span> <br>
                                                        <span>Status du rdv : </span> 
                                                        <span v-if="item.status =='complete'" class="priority low">Terminé</span>
                                                        <span v-if="item.status =='create'" class="priority medium">En attente</span>
                                                    </div>
                                                </div>
                                                </div>
                                                <li v-if="!item.isVisible" @click="item.isVisible = true"><a href="#" ><i class="icon-eye"></i></a></li>
                                                <li v-if="item.isVisible" @click="item.isVisible = false"><a href="#" ><i class="fa fa-eye-slash"></i></a></li>
                                            </ul> -->
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
            salonId: null
        }
    },
    methods:{

        searchCustomers(){
             this.appointments = this.appointmentsBis.filter(data => !this.searchItem || data.customer_name.toLowerCase().includes(this.searchItem.toLowerCase()))
        },

        underOneMonth(currentDate) {
            this.appointments = this.appointmentsBis.filter((item) =>{

                    let oldDate = new Date(item.stamp);
                    const diffTime = Math.abs(currentDate - oldDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays < 31) return item

            })
        },

        // Petit lien
        // site web Bioutycall

        filterYesterday(currentDate) {
            this.appointments = this.appointmentsBis.filter((item) =>{

                    let oldDate = new Date(item.stamp);
                    const diffTime = Math.abs(currentDate - oldDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays < 2) return item

            })
        },

        viewAll(){
            this.appointments = this.appointmentsBis;
        },

        callOnChange(event){
       
            let currentDate = new Date();
            
            if (event.target.value == "under_month") this.underOneMonth(currentDate);
            else if (event.target.value == "yesterday") this.filterYesterday(currentDate);
            else if (event.target.value == "all") this.viewAll();
        }
    },
    created(){

    this.$store.state.sidebarState = false;


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
        })
      }

      else console.log("not data now")
    });
  }
}
</script>

<style>

</style>