<template>
    <v-app>
        <div class="text-center">
            <v-dialog
            v-model="dialog"
            width="500"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                color="white lighten-2"
                
                v-bind="attrs"
                v-on="on"
                >
                Voir plus
                </v-btn>
            </template>

            <v-card>
                
                <v-card-title class="text-h5 grey lighten-2">
                Détails
                </v-card-title>


                <v-card-text>
                    Client : {{details.customer_name}}
                </v-card-text>

                <v-card-text>
                    Service sollicité : {{details.work_name}}
                </v-card-text>

                <v-card-text>
                    Montant payé (FCFA) : {{details.total}}
                </v-card-text>

                <v-card-text>
                    Mode de paiement : {{details.payment}}
                </v-card-text>

                <v-card-text>
                    Discount : {{details.discount}}
                </v-card-text>

                <v-card-text>
                    CouponId : {{details.CouponId}}
                </v-card-text>

                 <v-card-text>
                    Notation :   <span v-if="!details.rate">0</span>{{details.rate}} <i class="fa fa-star text-warning"></i>
                </v-card-text>

                 <v-card-text>
                    <span>Status du rdv : </span> 
                    <span v-if="details.status =='complete'" class="priority low">Terminé</span>
                    <span v-if="details.status =='create'" class="priority medium">En attente</span>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="dialog = false"
                >
                    Fermer
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </div>
    </v-app>
</template>

<script>
export default {
    name: "Dialog",
    props:["details"],

    data(){
        return{
          dialog: false  
        }
    },

    created(){
        console.log("details", this.details)
    }
}
</script>

<style>
.v-application--wrap{
    min-height: 0vh !important;
}
</style>