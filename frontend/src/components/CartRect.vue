<template>
       <vs-card vs-w="12">
            <vs-row>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="1">
                    <img :src="data.picture" alt="">
                </vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
                    <strong>{{data.label}}</strong>
                </vs-col>
                <vs-col vs-w="4">
                    <div v-if="data.products_tags.length > 0">
                        <strong>Catégrories : </strong>
                        <vs-button size="small" class="mr-2" v-for="(item, index) in data.products_tags" :key="index">{{item.tag.label}}</vs-button> 
                    </div>
                    <div style="margin-top: 20px" v-if="data.desc">
                        <h3>DESCRIPTION</h3>
                        <p>{{data.desc}}</p>
                    </div>
                </vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
                    {{data.price}} €
                </vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="1">
                    <vs-button radius color="danger" type="gradient" icon="delete" @click="remove(currentKey)"></vs-button>
                </vs-col>
            </vs-row>
        </vs-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CardRectTemplate',
  props: ['data', 'currentKey'],
  methods: {
    ...mapActions([
      'removeProduct',
    ]),
    remove(index) {
        this.removeProduct(index);
    }
 }
}
</script>

<style scoped>
  img {
   width: 100%;
  }

  .mr-2{
      margin-right: 5px;
      margin-left: 3px;
  }
</style>