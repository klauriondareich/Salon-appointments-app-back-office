<template >

    <div class="row px-2">

        <Loader v-if="loaderState"/>

        <div id="beep-bg" v-if="beepBg"  @click="pauseBeep()">
            <!-- <div id="loader"></div> -->
            <div class="loader-section"></div>   
        </div>
        
        <MobileHeader/> 
        <div class="main-content">
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
                                    <p>Visualisation de tous les rendez-vous</p>
                                    <span>Nombre total : {{appointments.length}} </span> <br>
                                    Chiffre d'affaire (FCFA) :<span class="yellow-class"> {{totalAmount}} </span>
                                </div>
                            </div>
                        </div>
                        </div>
                    <!-- top info widgets -->
                    <div class="row row-element-1">
                        <div class="col-6">
                            <div class="pt-5 mb-4">
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
                    <div class="widget" style="margin-top: 10px;">
                        <div class="widget-title no-margin">
                            <h4>Tous les rendez-vous</h4>
                        </div>
                        <div>
                            <table class="prj-tbl striped bordered table-responsive">
                                <thead  class="color">
                                    <tr>
                                        <th><em>Information du client</em></th>
                                        <th><em>Services</em></th>
                                        <th><em>Montant</em></th>
                                        <th><em>Date</em></th>
                                        <th><em></em></th>
                                    </tr>
                                </thead>
                                <tbody> 
                                    <tr v-for="(item, index) in appointments" :key="index">
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
                                        <td> Aucun rendez-vous trouvé ...</td>
                                        <td></td>   
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="widget" style="margin-top: 20px;">
                        <div class="widget-title no-margin">
                            <h4>Rendez-vous instantanés</h4>
                        </div>
                        <div>
                            <table class="prj-tbl striped table-responsive">
                                <thead  class="color">
                                    <tr>
                                        <th><em>Information du client</em></th>
                                        <th><em>Services</em></th>
                                        <th><em>Montant</em></th>
                                        <th><em>Date</em></th>
                                        <th><em></em></th>
                                        <th><em></em></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in instant_appointments" :key="index">
                                        
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
                                        <td>
                                            <button class="btn-st black" v-if="!item.allSalonIds.includes(salonId)" @click="validate_instant_appoint(item.id, item.total)">Valider</button>
                                            <button class="btn-st org-clr" v-if="item.allSalonIds.includes(salonId)">Attente</button>
                                        </td>
                                    </tr>
                                    <tr class="p-5" v-if="this.instant_appointments.length == 0">
                                        <td><i class="fa fa-user"></i></td>
                                        <td></td>
                                        <td> Aucun rendez-vous trouvé ...</td>
                                        <td></td>   
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
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
                    
                    
                    
                </div>
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
            instant_appointments: [],
            loaderState: false,
            appointmentRef: firebase.firestore().collection("appointment"),
            salonRef: firebase.firestore().collection("salons"), 
            servicesRef: firebase.firestore().collection("work"),
            searchItem: null,
            dialog: false,
            salonId: null,
            totalAmount: 0,
            tabs: null,
            salonServices: [],
            stopBeep: false,
            beepFile: new Audio('beep.mp3'),
            beepBg: false,
            allTimesStart: []
        }
    },
    methods:{

        
        validate_instant_appoint(appoint_id, amount){

            localStorage.setItem("firstLoad", "no");
            this.loaderState = true;

            this.appointmentRef.doc(appoint_id).get().then((doc)=>{
                if (doc.exists){
                    let obj = doc.data();
                    obj.id = doc.id;
                    let new_array = obj.allSalonIds;
                    
                    // check if the salon Id does not exist in the array and push
                    if (!new_array.includes(this.salonId)) {

                        new_array.push(this.salonId);
                        this.instant_appointments = [];
                        this.appointmentRef.doc(appoint_id).update({"allSalonIds": new_array, "amount":amount});
                        this.loaderState = false;
                    }
                }
                else{
                    this.loaderState = false;
                }
             })
        },

        gettingInstantsAppointments(){

            this.appointmentRef
            .where("instant_appoint", "==", true) // must be a instant appoint
            .where("status", "==", "create") // instant appoint not finished yet
            .where("salon", "==", "") // instant appoint not validated by a salon yet
            .orderBy("stamp", "desc").onSnapshot((query) =>{

                this.pauseBeep() //Pause beep

                if (localStorage.getItem("firstLoad") == "yes"){
                    this.beepFile.loop = true;
                    this.playBeep();
                    this.beepBg = true; // Show background color                    
                }

                 // Pause beep after 15 seconds
                 setTimeout(this.pauseBeep, 15000);

                this.instant_appointments = [];

                if (!query.empty){
                    query.forEach((doc) =>{

                        let data = doc.data();
                        data.id = doc.id;
                        let parseTimeStart = Date.parse(`2022-08-01T${data.time_start}`);
                        if (!this.instant_appointments.includes(parseTimeStart)) this.instant_appointments.push(data);    
                    });

                }
            })
        },

        // This func checks if the salon has avalaible time to take the appointment
        verifyingAvailability(){
            this.appointmentRef.where("salon", "==", this.salonId).where("status", "==", "create").get().then((querySnapshot) =>{
                if (!querySnapshot.empty){
                    
                    querySnapshot.forEach((doc) =>{
                        let docData = doc.data();
                        let timeStart =  Date.parse(`2022-08-01T${docData.time_start}`);
                        // The condition allows to Avoid having duplicate values in the array
                        if (!this.allTimesStart.includes(timeStart)) this.allTimesStart.push(timeStart)
                    });
                
                    this.gettingInstantsAppointments();
                
                }
                else {
                    this.instant_appointments.push()
                }
            })
        },


        playBeep(){
            this.beepFile.loop = true;
            this.beepFile.play();
        },

        pauseBeep(){
            this.beepFile.pause();
            this.beepBg = false;
        },

        searchCustomers(){
             this.appointments = this.appointmentsBis.filter(data => !this.searchItem || data.customer_name.toLowerCase().includes(this.searchItem.toLowerCase()))
        },

        initFilters(currentDate, item){
            let oldDate = new Date(item.stamp);
            const diffTime = Math.abs(currentDate - oldDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays
        },

        // Filter all appointments less than one month
        filterUnderOneMonth(currentDate) {
            this.appointments = this.appointmentsBis.filter((item) =>{

                let diffDays = this.initFilters(currentDate, item);

                if (diffDays < 31) return item

            });

            this.calculTurnover();    
        },

        // calculate the turnover based on all appointments of the salon
        calculTurnover(){
             // Calculation of the turnover (chiffre d'affaire)
             if (this.appointments.length == 0) {
                this.totalAmount = 0;
                return
             }
            this.totalAmount = this.appointments.map(obj => obj.total).reduce((acc, currentValue) => acc + currentValue);
        },

        // Filter all appointments of today
        filterToday(currentDate){

            this.appointments = this.appointmentsBis.filter((item) =>{

                let diffDays = this.initFilters(currentDate, item);

                if (diffDays == 0) return item

            });

            this.calculTurnover();    
        },

        // Filter all appointments of yesterday
        filterYesterday(currentDate) {
            this.appointments = this.appointmentsBis.filter((item) =>{

                let diffDays = this.initFilters(currentDate, item);

                if (diffDays < 2) return item

            });

            this.calculTurnover();    
        },

        // Filter all appointments that date two weeks
         filterTwoWeeks(currentDate) {
            this.appointments = this.appointmentsBis.filter((item) =>{

                let diffDays = this.initFilters(currentDate, item);

                if (diffDays == 14) return item

            });

            this.calculTurnover();    
        },

        // Filter all appointments that date 30 days
        filter30Days(currentDate) {
            this.appointments = this.appointmentsBis.filter((item) =>{

                let diffDays = this.initFilters(currentDate, item);

                if (diffDays == 30) return item

            });

            this.calculTurnover();    
        },

        // Filter all appointments that date one year
         filterOneYear(currentDate) {
            this.appointments = this.appointmentsBis.filter((item) =>{

                let diffDays = this.initFilters(currentDate, item);

                if (diffDays >= 365) return item

            });

            this.calculTurnover();    
        },

        // reset filters and display all appointments
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

    localStorage.setItem("firstLoad", "yes");

    this.verifyingAvailability();

    // Getting normal appointmements
    this.appointmentRef.where("salon", "==", this.salonId).orderBy("stamp", "desc").get().then((snapshot) =>{

    this.loaderState = false;

        if(!snapshot.empty){
            this.appointments = [];
            snapshot.forEach((doc) =>{
                let obj = doc.data();
                obj.id = doc.id;
                obj.isVisible = false;
                this.appointments.push(obj);
                this.appointmentsBis.push(obj);
                this.viewAllappointments();
                this.loaderState = false;
            });
        }
      
    })

  }
}
</script>

<style>
    .theme--light.v-application{
        background-color: transparent!important;
    }
</style>