<template>
    <div class="main-content">
        <Loader v-if="loaderState"/>        
        
        <div class="responsive-header">
            <div class="logo-area">
                
                <div class="user-head">
                <div class="admin">
                    <div class="admin-avatar"> <img src="images/user-icon.png" alt=""> <i class="online"></i> </div>
                </div>
                <div class="drop setting"> <span class="drop-head">stifen Doe <i>30 days trial</i></span>
                    <ul class="drop-meta">
                        <li> <a href="#" title=""><i class="fa fa-eyedropper"></i>Edit Profile</a> </li>
                        <li> <a href="#" title=""><i class="fa fa-envelope-o"></i>My Inbox</a> </li>
                        <li> <a href="#" title=""><i class="fa fa-adjust"></i>task</a> </li>
                        <li> <a href="#" title=""><i class="fa fa-calendar"></i>Calender</a> </li>
                        <li> <a href="#" title=""><i class="fa fa-align-right"></i>Balance Report</a> </li>
                    </ul>
                    <span class="drop-bottom"><a href="#" title=""><i class="fa fa-sign-out"></i>log Out</a></span> </div>
                </div>
                <ul class="seting-area">

                    <li class="text-white">username</li>
                <!-- <li class="langages">
                    <a title="" href="#">Eng</a>
                    <ul class="drop language">
                        <li class="lang-selected"><a href="#"><i class="fa fa-check"></i> Eng</a></li>
                        <li><a href="#">Rus</a></li>
                        <li><a href="#">Jap</a></li>
                        <li><a href="#">Arb</a></li>
                    </ul>
                </li> -->
                <li class="setting-panel"><a title="" href="#"><i class="icon-equalizer"></i></a></li>
            </ul>
            </div>
            
        </div>
        <!-- responsive header -->
        <div class="panel-body">
            <div class="content-area mt-5">
                <div class="sub-bar">
                    <div class="sub-title">
                        <h4>Salon Manager Dashboard:</h4>
                        <span>Bienvenue Laurion Dareich</span>
                    </div>
                    <ul class="bread-crumb">
                        <li><a href="#" title=""><i class="fa fa-home"></i></a></li>
                        <li>Dashbord</li>
                    </ul>
                </div>
                <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="top-widget">
                        <i class="fa fa-dollar"></i>
                        <div class="informative">
                        <span>{{totalAmountRdv}} </span>
                        <em>C.A du jour (FCFA)</em>
                        </div>
                    </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="top-widget">
                        <i class="fa fa-calendar"></i>
                        <div class="informative">
                        <span>{{appointments.length}}</span>
                        <em>Rendez-vous du jour</em>
                        </div>
                    </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="top-widget">
                        <i class="fa fa-trophy"></i>
                        <div class="informative">
                        <span>{{totalCompleteRdv}}</span>
                        <em>Rendez-vous terminés</em>
                        </div>
                    </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="top-widget">
                        <i class="fa fa-clock-o"></i>
                        <div class="informative">
                        <span>{{totalOngoingRdv}}</span>
                        <em>Rendez-vous restants</em>
                        </div>
                    </div>
                    </div>
                </div>

                
        
                    <div class="row ">
                            <div class="widget">
                                <p class="font-weight-bold px-5 py-2">
                                     Mois de {{actual_month}}
                                </p>
                            <v-app>
                                    <v-row>
                                        <v-col>
                                            <v-sheet height="auto">
                                                <v-calendar
                                                ref="calendar"
                                                :now="today"
                                                :value="today"
                                                :short-weekdays=boolvalue
                                                :short-months=boolvalue
                                                :show-month-on-first=boolvalue
                                                :events="events"
                                                color="warning"
                                                :event-height=value2
                                                event-color="warning"
                                                type="month"
                                                ></v-calendar>
                                            </v-sheet>
                                        </v-col>
                                    </v-row>
                                </v-app>
                            </div>
                    </div>
            
            

                <div class="widget mt-5">
                    <div class="widget-title no-margin">
                        <h4>Liste des Rendez-vous du jour</h4> 
                    </div>
                    <div class="widget">
                        <table class="prj-tbl striped bordered table-responsive">
                            <thead>
                                <tr>
                                    <th style="width:2%">NO.</th>
                                    <th>Service</th>
                                    <th>Spécilaiste</th>
                                    <th>Client</th>
                                    <th>Status</th>
                                    <!-- <th>Project Team</th> -->
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in appointments" :key="index">
                                    <td><span class="sr">{{++index}}</span></td>
                                    <td style="width: 40%;">
                                        <div class="project-title">
                                            <h5>{{item.work_name}}</h5>
                                            <!-- <a href="#" title="">delete</a> <a href="#" title="">edit</a>--> </div> 
                                    </td>
                                    <td>
                                        <div class="owner-pic "> 
                                            <img :src="item.employee_url" alt="" width="50" height="100" style="border-radius: 30px"> 
                                        </div>
                                        <div class="owner-info">
                                            <h6>{{item.employee_name}} </h6>
                                            <span>{{item.time_start}} - {{item.time_end}}</span> </div>
                                    </td>
                                    <td><span class="progres">{{item.customer_name}}</span></td>
                                    <td>
                                        <span v-if="item.status =='complete'" class="priority low">Terminé</span>
                                        <span v-if="item.status =='create'" class="priority medium">En attente</span>
                                    </td>
                                    <!-- <td>
                                        <div class="prj-team">
                                            <span title="Jhon Doe"><img src="images/resources/activity-1.jpg" alt=""></span>
                                            <span title="Sarah"><img src="images/resources/activity-2.jpg" alt=""></span>
                                            <span title="Daniel"><img src="images/resources/activity-3.jpg" alt=""></span>
                                            <span title="Wraber"><img src="images/resources/activity-4.jpg" alt=""></span>
                                        </div>
                                    </td> -->
                                </tr>
                                
                            </tbody>
                        </table>
                        <p class="text-center p-3">Aucun rendez vous pour le moment!</p>
                    </div>
                </div>

                <div class="row pt-5">
                    <div class="col-lg-8 col-sm-6">
                        <div class="widget">
                            <div class="widget-title">
                                <h4>Commentaires récents</h4>
                                
                            </div>
                            <div class="widget-peding">
                                <ul class="q-comments recent">
                                    <li v-for="(item, index) in comments.slice(0,3)" :key="index">
                                        <div class="comenter"> <img src="images/resources/q-comment1.jpg" alt=""> </div>
                                        <div class="comment-detail">
                                            <h5>{{item.username}}</h5>
                                            <p>{{item.comment}}</p>
                                        </div>
                                        <ul class="comment-date">
                                            <li><span>{{item.stamp | formatDate}}</span></li>
                                        </ul>
                                        <router-link to="/comments" class="approved float-right" href="#" title="">Voir le commentaire</router-link>
                                    </li>
                                </ul>
                                <p class="text-center p-3">Aucun commentaires récents!</p>
                            </div>
                        </div>
                        <!-- user list -->
                    </div>
                    <!-- recent comment widget -->
                    <!-- <div class="col-lg-4 col-sm-6">
                        <div class="widget">
                            <div class="widget-title">
                                <h4>Rendez-vous mensuels</h4>
                                <ul class="widget-controls">
                            <li title="Refresh" class="refresh-content"><i class="fa fa-refresh"></i></li>
                            <li title="Maximize" class="expand-content"><i class="icon-frame"></i></li>
                            <li title="More Options" class="more-option"><i class="ti-more-alt"></i></li>
                        </ul>
                            </div>
                            <div class="donut-chart">
                                <ul class="total">
                                    <li>Google Plus<span>25A</span></li>
                                    <li>Direct Access<span>1034</span></li>
                                </ul>
                                <canvas id="canvasDoughnut"></canvas>
                                <ul class="total">
                                    <li>Facebook<span>779</span></li>
                                    <li>Twitter<span>489</span></li>
                                </ul>
                            </div>
                        </div>
                  
                    </div> -->

                    
                </div>                            
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import firebase from '../firebase/init'
import Loader from './shared/Loader.vue'

export default {
  name: 'Home',
  components: {Loader},

  data(){
    
    return{
       appointments: [],
       comments: [],
       boolvalue: false,
       loaderState: false,
       actual_month: null,
       appointment: firebase.firestore().collection("appointment"), 
       today: "",
       mode: 'stack',
        value: false,
        value2: 50,
        events: [
          
        ], 
        totalAmountRdv: 0,
        totalCompleteRdv: 0,
        totalOngoingRdv: 0,
        salonId: null,
    }
  },
  methods:{

      calculationOfTotalRdvAmount(){
          return this.appointments.map(obj => obj.total).reduce((acc, currentValue) => acc + currentValue)
      },

      filteredCompleteRdv(){
          return this.appointments.filter(obj => obj.status == "complete").length
      },
      
      filteredOngoingRdv(){
          return this.appointments.filter(obj => obj.status == "create").length
      }
   },
  mounted () {
      this.$refs.calendar.scrollToTime('08:00')
    },
 

  created(){

   
      this.salonId = localStorage.getItem("salon_id");  
      this.loaderState = true;
      
    // date du jour et mois
    let months_numbers = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",];
    let months_words = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    this.today = new Date().getFullYear() + "-" + months_numbers[new Date().getMonth()] + "-" + new Date().getDate();
    this.actual_month = months_words[new Date().getMonth()];

    let current_timestamp = Date.now();
    
    // Script à revoir, le syst doit recupérer les rdv du jour et non tous les rdv
     this.appointment.where("salon", "==", this.salonId).where("stamp", "==", current_timestamp).onSnapshot((snapshot) =>{
      if(!snapshot.empty){
        this.appointments = [];
        this.comments = [];
        snapshot.forEach((doc) =>{
          let obj = doc.data();
          obj.id = doc.id;
          this.appointments.push(obj);

          let time_start =  obj.date.split(".").join("-") + " " + obj.time_start;
          let time_end =  obj.date.split(".").join("-") + " " + obj.time_end;
          this.events.push({name: obj.work_name, start: time_start,
            end: time_end,});
            
            if(obj.rate_text) this.comments.push({username: obj.customer_name, comment: obj.rate_text, stamp:obj.stamp})
        });

        this.totalAmountRdv = this.calculationOfTotalRdvAmount();
        this.totalCompleteRdv = this.filteredCompleteRdv();
        this.totalOngoingRdv = this.filteredOngoingRdv();
        this.loaderState = false;
      }
      else this.loaderState = false;
    });
  }
}
</script>




<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}

.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}


</style>