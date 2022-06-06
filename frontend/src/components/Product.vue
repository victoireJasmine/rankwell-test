<template>
  <div class="product-box">
    <div class="tags">
      <vs-dropdown :color="colorx">
        <a class="a-icon warning" href="#">
          <span class="material-icons">
            bookmark
          </span>
        </a>
        <vs-dropdown-menu>
          <vs-dropdown-item v-for="(item, index) in product.products_tags" :key="index">
            {{item.tag.label}}
          </vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
    </div>
    <img :src="product.picture" alt="">
    <h2 class="product-name"> {{ product.label }} </h2>
    <div class="product-price">
      <span> {{ product.price }} €</span>
    </div>

    <vs-row vs-justify="space-between">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="5">
        <btn :cartIcon="true"
            @click="addProductToCart(product)">
            Ajouter
        </btn>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="5">
        <vs-button @click="popupActivo=true" color="primary" type="border">Voir les détails</vs-button>
      </vs-col>
    </vs-row>

    <vs-popup class="holamundo" v-model="popupActivo">
        <p>
           {{ product.desc }}
        </p>
    </vs-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import btn from '@/components/Cart.vue'

export default {
  name:'ProductTemplate',
  props: ['product'],
  components: {
    btn
  },
  data() {
      return {
        popupActivo: false
      }
  },
  computed: {
      
  },
  methods: {
    ...mapActions([
      'addProduct'
    ]),
    addProductToCart(product) {
      this.addProduct(product);
    },
  }
}

</script>
<style scoped lang="scss">
  .product-box {
    width: 90%;
    list-style: none;
    box-sizing: border-box;
    padding: 1em;
    margin: 1em 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 7px;
    position: relative;
  }

  .tags {
    position: absolute;
    right: 5px;
    top: 5px;
  }

  img {
    width: 75%;
  }

  .product-name {
    font-size: 1em;
    font-weight: normal;
    margin: 10px 0;
  }
  .product-name:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  .product-price {
    width: 100%;
    align-self: flex-start;
    display: flex;
    justify-content: flex-end;
    margin-bottom: .5em;
    font-weight: bold;
    font-size: 1.3em;
  }
</style>