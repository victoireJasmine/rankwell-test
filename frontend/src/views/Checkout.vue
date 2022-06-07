<template>
  <div>
    <h1>Mon panier</h1>
    <vs-divider/>
    <div v-if="getProductsInCart.length > 0">
        <vs-card vs-w="12">
            <vs-row>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="1"></vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
                    Titre
                </vs-col>
                <vs-col vs-w="4">
                    Description
                </vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
                    Prix
                </vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="1">
                  Action
                </vs-col>
            </vs-row>
        </vs-card>
        <transition-group name="fade">
          <CartRect v-for="(item, index) in getProductsInCart" :key="index" :data="item" :currentKey="index" />
        </transition-group>

        <vs-col style="margin-top: 50px" vs-type="flex" vs-justify="end" vs-align="end" vs-w="12">
          <h3>TOTAL : {{totalPrice()}} €</h3>
        </vs-col>
        <vs-col style="margin-top: 50px" vs-type="flex" vs-justify="end" vs-align="end" vs-w="12">
          <vs-button color="success" type="gradient" icon="done" @click="confirm">CONFIRMER L'ACHAT</vs-button>
        </vs-col>

    </div>
    
    <vs-alert active="true" v-else>
      Vous n'avez pas d'article dans votre panier
    </vs-alert>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CartRect from '@/components/CartRect.vue';

export default {
  name:'CheckoutPage',
  components: {
    CartRect
  },
    data() {
    return {
      colorAlert:'primary',
      titleAlert:'Alert',
      valueInput:'',
    }
  },
  computed: {
      ...mapGetters([
      'getProductsInCart'
    ]),
  },
  methods: {
    totalPrice() {
      return this.getProductsInCart.reduce((current, next) =>
        current + next.price, 0);
    },
    confirm(){
      if(this.$store.state.isAuthenticated){
        if(confirm("Confirmez-vous cet achat ?")) {
          const data = [];
          this.getProductsInCart.forEach(element => {
            data.push(element.id)
          });

          const payload = {
            products: data
          }

          this.$store.state
          .requestApi('post', '/purchases', payload)
          .then(response => {
            if (response.error) {
              console.log(response.error);
              this.openAlert("danger","Confirmer achat",response.error)
            } else {
              if(window.localStorage) window.localStorage.setItem("cartProducts", JSON.stringify([]))
              this.$store.commit("SET_PRODUCT", [])

              this.openAlert("success","Achat","Achat validé avec succès")
              this.$router.push('/purchases')
            }
          })
          .catch(error => {
              console.log(error);
          })
        }

      } else {
        this.openAlert("danger","Authentification","Veuillez vous connecter avant de valider le panier. Ou bien créer un compte si vous n'en avez pas")
      }
    },
     openAlert(color, retour, message){
      this.colorAlert = color || this.getColorRandom()
      this.$vs.dialog({
        color:this.colorAlert,
        title: retour,
        text: message,
      })
    }
  },
   mounted() {

  },
}

</script>
<style scoped lang="scss">
  
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-to {
    transform: translateX(-40px);
    opacity: 0;
  }
</style>