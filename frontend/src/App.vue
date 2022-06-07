<template>
  <div id="app">
    <Header v-if="$route.name !== 'NotFound'">
      <cart-btn :cartIcon="true" @click="goToCheckout">
        <vs-button radius color="success" v-if="hasProduct()">
          {{ getProductsInCart.length }}
        </vs-button>
      </cart-btn>
    </Header>
    <div class="center main"> 
      <transition name="leave"><router-view></router-view></transition>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '@/components/Layout/Header.vue'
import CartBtn from '@/components/Cart.vue'

export default {
  name: 'App',
  components: {
    Header, CartBtn
  },
  methods: {
    hasProduct() {
      return this.getProductsInCart.length > 0;
    },
    goToCheckout(){
      this.$router.push('/checkout')
    }
  },
  computed: {
     ...mapGetters([
      'getProductsInCart'
    ]),
  },
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  body {
    font-family: 'Roboto', sans-serif;
  }

  .mt-10 {
    margin-top: 10px;
  }

   .center {
     width: 85%;
     margin: auto;
  }

  header {
    padding: 20px;
  }

  .main {
    margin-top: 40px;
  }


  .leave-enter-active, .leave-leave-active {
    transition: all 1.2s;
  }
  .leave-enter, .leave-leave-to {
    opacity: 0;
    transform: translateX(-50%);
  }
  .appear-enter-active {
    animation: appear-animation .5s;
  }
  .appear-leave-active {
    animation: appear-animation .5s reverse;
  }
  @keyframes appear-animation {
    0% {
      transform: translateY(-50%);
      opacity: 0;
    }
    100% {
      transform: translateY(0%);
      opacity: 1;
    }
  }
</style>
