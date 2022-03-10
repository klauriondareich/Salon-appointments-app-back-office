<template>
    <div class="main-content">
        <Loader v-if="loaderState"/> 

        <MobileHeader/>        
        
        <!-- responsive header -->
        <div class="panel-body">
            <div class="content-area mt-5">
                <div class="sub-bar">
                     <ul class="bread-crumb">
                        <li><router-link to="/home" title=""><i class="fa fa-home"></i></router-link></li>
                        <li>Dashbord</li>
                    </ul>
                    <div class="sub-title">
                        <h4>Salon Manager</h4> <br> <br>
                         <span>Bienvenue {{username}}</span>
                    </div>
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

                
        
                    <div class="row">

                        <div class="widget">
                             <v-app>
                                <v-row class="fill-height">
                                    <v-col>
                                        <v-sheet height="64">
                                            <v-toolbar
                                            flat
                                            >
                                            <v-toolbar-title v-if="$refs.calendar">
                                                {{ $refs.calendar.title }}
                                            </v-toolbar-title>
                                            <v-btn
                                                fab
                                                text
                                                small
                                                color="grey darken-2"
                                                @click="prev"
                                            >
                                                <span>
                                                    <i class="fa fa-chevron-left"></i>
                                                </span>
                                            </v-btn>
                                            <v-btn
                                                fab
                                                text
                                                small
                                                color="grey darken-2"
                                                @click="next"
                                            >
                                                <span>
                                                    <i class="fa fa-chevron-right"></i>
                                                </span>
                                            </v-btn>
                                            
                                            <v-spacer></v-spacer>
                                            
                                            </v-toolbar>
                                        </v-sheet>
                                    
                                        <div class="text-center">
                                            <v-dialog
                                            v-model="selectedOpen"
                                            width="500"
                                            :close-on-content-click="false"
                                            :activator="selectedElement"
                                            offset-x
                                            >
                                            <v-card>
                                                <v-card-title class="text-h5 grey lighten-2">
                                                Détails
                                                </v-card-title>

                                            <v-card-text>
                                                <span v-html="selectedEvent.name"></span>
                                                </v-card-text>

                                                <v-divider></v-divider>

                                                <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    color="primary"
                                                    text
                                                    @click="selectedOpen = false"
                                                >
                                                    Fermer
                                                </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                            </v-dialog>
                                        </div>
                                
                                        <v-sheet height="auto">
                                            <v-calendar
                                            ref="calendar"
                                            v-model="focus"
                                            color="warning"
                                            :events="events"
                                            type="day"
                                            @click:event="showEvent"
                                            :now="today"
                                            :value="today"
                                            :short-weekdays=boolvalue
                                            :short-months=boolvalue
                                            :show-month-on-first=boolvalue
                                            :event-more=boolvalue
                                            :event-overlap-mode="mode"
                                            first-interval="5"
                                            interval-count="18"
                                            :event-height=value2
                                            event-color="warning"
                                            ></v-calendar>
                                        </v-sheet>
                                    </v-col>
                                </v-row>
                             </v-app>      
                        </div>

                            <!-- <div class="widget">
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
                                                :event-more=boolvalue
                                                :event-overlap-mode="mode"
                                                first-interval="5"
                                                interval-count="18"
                                                :events="events"
                                                color="warning"
                                                :event-height=value2
                                                event-color="warning"
                                                type="day"
                                                ></v-calendar>
                                            </v-sheet>
                                        </v-col>
                                    </v-row>
                                </v-app>
                            </div> -->
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
                        <p class="text-center p-3" v-if="appointments.length == 0">Aucun rendez vous pour le moment!</p>
                    </div>
                </div>

                <div class="row pt-5 pb-5">
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
                                <p class="text-center p-3" v-if="comments.length == 0">Aucun commentaires récents!</p>
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
import MobileHeader from '../components/MobileHeader.vue'

export default {
  name: 'Home',
  components: {Loader, MobileHeader},

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
        username: null,
        totalAmountRdv: 0,
        totalCompleteRdv: 0,
        totalOngoingRdv: 0,
        salonId: null,
        focus: '',
        // type: 'day',
      
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
    //   events: [],
    //   colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    //   names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }
  },
  methods:{
      
    calculationOfTotalRdvAmount(){

         if (this.appointments.length == 0) return 0;
        return this.appointments.map(obj => obj.total).reduce((acc, currentValue) => acc + currentValue)
      },

    filteredCompleteRdv(){
          return this.appointments.filter(obj => obj.status == "complete").length
      },
      
    filteredOngoingRdv(){
          return this.appointments.filter(obj => obj.status == "create").length
      },

              
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange ({ start, end }) {
        const events = []

        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 20)

        for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)

          events.push({
            name: this.names[this.rnd(0, this.names.length - 1)],
            start: first,
            end: second,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            timed: !allDay,
          })
        }

        this.events = events
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
   },
  mounted () {
      this.$refs.calendar.scrollToTime('6:00');

      this.$refs.calendar.checkChange()
    },
 

  created(){

      this.salonId = localStorage.getItem("salon_id");  
      this.username = localStorage.getItem("username");  
      this.loaderState = true;
      
    // date du jour et mois
    let months_numbers = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",];
    let months_words = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    let day = new Date().getDate();
    if (day<10) day = "0" +  day;
    this.today = new Date().getFullYear() + "-" + months_numbers[new Date().getMonth()] + "-" + day;
    this.actual_month = months_words[new Date().getMonth()];

    let date_formatted = this.today.split("-").join(".");
    
    // Script à revoir, le syst doit recupérer les rdv du jour et non tous les rdvwhere("stamp", "==", current_timestamp)
    // this.appointment.where("salon", "==", this.salonId).where("date", "==", date_formatted).orderBy("stamp", "desc")
     this.appointment.where("salon", "==", this.salonId).orderBy("stamp", "desc").onSnapshot((snapshot) =>{
      if(!snapshot.empty){
        this.appointments = [];
        this.events = [];
        this.comments = [];
        snapshot.forEach((doc) =>{
          let obj = doc.data();
          obj.id = doc.id;


         if (obj.date === date_formatted) this.appointments.push(obj);

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