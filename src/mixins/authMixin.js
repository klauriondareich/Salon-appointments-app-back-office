import firebase from '../firebase/init'


export default {

    data(){
      return {}
      },

      methods:{

        signOut(){
            firebase.auth().signOut().then(() =>{
                this.$router.replace("/");
            })
            .catch((error) =>{
                console.log(error.message)
            })
        },
        
      }
}

