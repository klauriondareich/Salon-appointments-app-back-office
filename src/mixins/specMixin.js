import firebase from '../firebase/init'

export default {

    data(){
      return {
        file: null,
        loading: null,
        workRef:  firebase.firestore().collection("work"), 
        employeeRef: firebase.firestore().collection("employee"),
        salonRef: firebase.firestore().collection("salons"), 
        salonId: null,
        Storage: firebase.storage().ref(),
        loaderState: false,
        errorMessage: null,
        allServices: [],
        specialistObj: {
          "desc": "",
          "board": "",
          "board_color": "4294198070",
          "name": "",
          "image": null,
          "works": []
        }
      }
    },

    methods:{

      uploadImage(event){

         this.file = event.target.files[0];
         this.specialistObj.image = URL.createObjectURL(this.file);

      },

      buildImageUrl(){
        let fileName = "spec-" + this.file.lastModified;
        this.specialistObj.image = "img/" + fileName;
        this.Storage.child("img/" + fileName).put(this.file);
      }
    }
}