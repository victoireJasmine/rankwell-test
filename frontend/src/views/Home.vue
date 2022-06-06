<template>
  <div>
    <h2>Liste des produits ({{products.length}})</h2>
    <vs-divider/>
    <vs-row>
      <vs-col v-for="(item, index) in products" :key="index" vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
        <Product :product="item" />
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import Product from '@/components/Product.vue';

export default {
  name:'HomePage',
  components: {
    Product
  },
   data() {
      return {
        products: []
      }
  },
  methods: {
    getAllProducts(){
      this.$store.state
        .requestApi('get', '/products')
        .then(response => {
          if (response.error) {
            console.log(response.error);
          } else {
            this.products = response;
          }
        })
        .catch(error => {
            console.log(error);
        })
    },
  },
  beforeMount() {
    this.getAllProducts()
  },
  mounted() {
    
  },
}

</script>
<style scoped lang="scss">
  .listOfProducts {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0;
  }
</style>