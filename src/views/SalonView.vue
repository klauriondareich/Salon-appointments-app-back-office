<template>
    <div class="main-content">  
       <Loader v-if="loaderState"/>

        <MobileHeader/>        
                     
        <div class="panel-body">
                        
          <div class="content-area mt-5">
              <div class="sub-bar">
                <div class="sub-title">
                  <h4>MON SALON</h4>
                  <!-- <span>Welcome To web Admin Panel!</span> -->
                </div>
                <ul class="bread-crumb">
                  <li><router-link to="/home" title="">Accueil</router-link></li>
                  <li>Salon</li>
                </ul>
              </div>

              <div class="row">
                <div class="gap no-bottom">
                  <div class="page5o5">
                    <div class="avatar5o5"> 
                      <img :src="salonObj.image" alt="salon image"> 
                    </div>
                    <div class="info5o5">
                      <span>{{salonObj.name}}</span>
                      <p ><i class="fa fa-info-circle"></i> : {{salonObj.desc || "pas de description"}}</p>
                      <p ><i class="fa fa-map-marker"></i> {{salonObj.address || "pas d'adresse" }}</p>
                      <p ><i class="fa fa-phone"></i> {{salonObj.phone || 'pas de phone' }}</p>
                      <p ><i class="fa fa-wordpress"></i>: {{salonObj.website || 'pas de site web'}}</p>

                      <router-link to="/specialist" title="" class="btn-st grn-clr mt-2">Créer un nouveau service</router-link>

                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12 pt-5">
                    <div class="info-section">
                      <div class="panel-widget">
                        <div class="b-meta"> 
                          <i class="fa fa-calendar"></i>
                          <div class="info-meta">
                            <h4>{{appointments.length}}</h4>
                            <p>FCFA</p>
                            <span>Total RDV</span> 
                          </div>
                          <span class="ten blue"></span> 
                        </div>
                      </div>
                      <div class="panel-widget">
                          <div class="b-meta">
                            <i class="fa fa-dollar"></i>
                            <div class="info-meta">
                              <h4>{{turnover}}</h4>
                              <p>FCFA</p>
                              <span>Chiffre d'affaire (FCFA)</span> </div>
                            <span class="ten purpal"></span>
                          </div>
                      </div>
                      <div class="panel-widget">
                          <div class="b-meta">
                            <i class="fa fa-paint-brush"></i>
                            <div class="info-meta">
                              <h4>{{salonObj.works.length}}</h4>
                              <p>FCFA</p>
                              <span>Services</span> </div>
                            <span class="ten green"></span> 
                          </div>
                      </div>
                    </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                    <div class="widget">
                    <div class="widget-title">
                        <h4>Services du salon</h4>
                        <!-- <ul class="widget-controls">
                        <router-link to="/service" title="" class="btn-st rd-30 btn-md ">Ajouter des services</router-link>
                        </ul> -->
                    </div>
                    <div class="widget-peding">
                        <div class="toggle toggle-style3" v-for="(item, index) in categories" :key="index">
                          <div class="toggle-item brd-5">
                              <h3 class="active font-weight-bold"><i class="fa fa-paint-brush"></i>{{item.name}}</h3>
                              <div class="content">
                                <div class="widget-peding">
                                  <div class="rcnt-activt">
                                    <ul v-for="(element, index2) in item.works" :key="index2">
                                      <li class="clr1 ">{{element.name}} ({{element.duration}} min)   
                                        <span class="pl-3 pr-3">
                                          <router-link :to="'edit/' + element.id">
                                            <i class="fa fa-edit"></i>
                                          </router-link>
                                        </span>
                                        <span v-if="element.visible"  class="priority low">On</span>
                                        <span v-if="!element.visible" class="priority high">Off</span>
                                        <span class="font-weight-bold pr-3">{{element.price}} FCFA</span> 
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                          </div>
                        </div>
                    </div>
                    <p class="text-center p-3" v-if="categories.length == 0">Aucun service pour le moment!</p>

                    <!-- user list --> 
                    </div>
                </div>
              </div>
        
          
            <div class="row mb-5">
              <div class="col-lg-8 col-sm-8  mb-5">
                  <div class="widget">
                      <div class="widget-title">
                          <h4>Mes spécialistes</h4>
                          <ul class="widget-controls">
                            <router-link to="/specialist" title="" class="btn-st grn-clr">Ajouter un nouveau</router-link>
                          </ul>
                      </div>
                      <div class="widget-peding" v-for="(item, index) in employees" :key="index">
                          <ul class="q-comments">
                              <li>
                                  <div class="comenter"> <img :src="item.image" alt="specialist profile" class="img-thumbnail img-spec"> </div>
                                  <div class="comment-detail">
                                      <h5>{{item.name}}</h5>
                                      <p>{{item.desc}}</p>
                                  </div>
                                  <ul class="comment-date">
                                      <li class="mango" v-for="(el, index) in item.worksName" :key="index"><span>{{el}}</span></li> <br>
                                  </ul>
                                  <div class="approv-reject"> 
                                    <router-link class="btn-st wht-clr" :to="'editspec/' + item.id">
                                        Modifier
                                    </router-link>
                                  </div>
                              </li>
                          </ul>
                      </div>
                      <p class="text-center p-3" v-if="employees.length == 0">Aucun spécialiste pour le moment!</p>

                  </div>
                    
                </div>
                
            </div>
          <!-- bottombar --> 
          </div>
        </div>
    </div>
</template>

<script>
import firebase from '../firebase/init'
import Loader from './shared/Loader.vue'
import MobileHeader from '../components/MobileHeader.vue'

export default {
 name: 'Salon',
  components: {Loader, MobileHeader},

  data(){
    
    return{
       salonObj: {categoriesId:[], works:[]},
       salonRef: firebase.firestore().collection("salons"), 
       salonId: null,
       loaderState: false,
       appointmentRef: firebase.firestore().collection("appointment"),
       categoryRef: firebase.firestore().collection("category"),
       servicesRef: firebase.firestore().collection("work"),
       specialistsRef: firebase.firestore().collection("employee"),
       Storage: firebase.storage().ref(),
       appointments: [],
       categories: [],
       services: [],
       employees: [],
       turnover: 0,
       categoriesId: [],
    }
  },

  methods:{

      updateCategoryInSalon(categoryId){

        // First checking if the Id doesn't exist in salonObj

        if (!this.salonObj.categoriesId.includes(categoryId)) this.categoriesId.push(categoryId);
        this.salonRef.doc(this.salonId).update({categoriesId: this.categoriesId})
      },

    /* 
      This func get as input a service of type object
      and check if the service belong to the salon.
      The property works contains all the ids of the services linked to the salon
    */

    getSalonOnlyservices(service){

      let base_arr = this.salonObj.works;
      return base_arr.includes(service.id)

    },

    getSpecialists(employee){

      if (employee.length !== 0){

        employee.forEach((id) =>{

          this.specialistsRef.doc(id).get().then((doc) =>{
            if (doc.exists){

              let obj = doc.data();
              obj.id = doc.id;
              this.Storage.child(obj.image).getDownloadURL().then((url) =>{
                  obj.image =  url;
               });

              obj.worksName = [];

              obj.works.forEach((item) =>{
                this.servicesRef.doc(item.id).get().then((doc) =>{
                  if (doc.exists){
                    obj.worksName.push(doc.data().name)
                  }
                })
              })

              this.employees.push(obj);

            }
          })
        })
        this.loaderState = false
      }
    }

  },

  created(){

       this.salonId = localStorage.getItem("salon_id");
       this.loaderState = true;

       this.salonRef.doc(this.salonId).get().then((doc)=>{
           if (doc.exists){
               let obj = doc.data();
               obj.id = doc.id;
               this.Storage.child("img/" + obj.image.split("/")[1]).getDownloadURL().then((url) =>{
                  obj.image =  url;
               }).catch(() => alert("L'image du salon n'a pas pu charger"))
               
                this.salonObj = obj;

               this.getSpecialists(obj.employee);
               
           }
          else{
            console.log("Salon does not exist");
            this.loaderState = false;
          }

       });

      // Getting  all appointments and calculating the turnover
      this.appointmentRef.where("salon", "==", this.salonId).get().then((snapshot) =>{
      if(!snapshot.empty){
        this.appointments = [];
        snapshot.forEach((doc) =>{
          let obj = doc.data();
          obj.id = doc.id;
          this.appointments.push(obj);
        });

        // Calculation of the turnover (chiffre d'affaire)
        this.turnover = this.appointments.map(obj => obj.total).reduce((acc, currentValue) => acc + currentValue);
        this.loaderState = false
      }

    });    

    // Get all categories of services
    this.categoryRef.where("visible", "==", true).get().then((snapshot) =>{
      
      if(!snapshot.empty){
        
         snapshot.forEach((doc) =>{
            let category = doc.data();
            category.id = doc.id;

           

            // get all services related to a category
            this.servicesRef.where("categoryId", "==", doc.id).get().then((snapshot) =>{

               let servicesOfACategory = [];
               
               if(!snapshot.empty){

                 let bool = false;

                 snapshot.forEach((doc) =>{

                    let work = doc.data();
                    work.id = doc.id;

                    // check if the service belong to the salon
                     bool = this.getSalonOnlyservices(work);
                    if (bool) servicesOfACategory.push(work);

                 })

                  category.works = servicesOfACategory;
                  this.loaderState = false
               }

              if (category.works && category.works.length!=0) {
                this.updateCategoryInSalon(category.id);
                this.categories.push(category)
              }
            })
         });


      }
    });

    
  }
}
</script>

<style>

</style>