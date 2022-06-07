<template>
  <div>
      <h1>Statistique de tous les achats</h1>
      <vs-divider/>
      <BarChart :chartData="chartData"/>

      <vs-divider/>
      <div class="table">
        <div class="header">Liste des produits achetés ({{total}})</div>
        
          <table cellspacing="0">
              <tr>
                <th></th>
                <th>Nom du produit</th>
                <th>Prix à l'unité</th>
                <th>Quantité</th>
                <th>Total</th>
                <th width="120">Opérations</th>
              </tr>

              <tr v-for="(item, index) in purchases" :key="index">
                <td><img :src="item[0].product.picture" alt="" /></td>
                <td>{{item[0].product.label}}</td>
                <td>{{item[0].product.price}} €</td>
                <td>{{item.length}}</td>
                <td>{{item[0].product.price * item.length}} €</td>
                <td>
                  <vs-button style="margin-right: 15px" color="warning" class="mr-3" type="gradient" icon="edit"></vs-button>
                  <vs-button color="danger" class="mr-3" type="gradient" icon="delete"></vs-button>
                </td>
              </tr>
          </table>
      </div>
  </div>
</template>

<script>
import BarChart from "@/components/BarChart.vue"

export default {
  name:'PurchasePage',
  components: {
    BarChart
  },
  data() {
      return {
        colorAlert:'primary',
        titleAlert:'Alert',
        valueInput:'',
        purchases: [],
        chartData: {},
        total: 0,
      }
  },
  methods: {
    getPurchaseUser() {
      this.$store.state
      .requestApi('get', `/users/${this.$store.state.user.id}/purchases`)
      .then(response => {
        if (response.error) {
          console.log(response.error);
        } else {
          var grouped = this.groupByKey(response, "product_id")
          this.total = response.length;
          this.purchases = grouped;

          const products = [];
          const totals = [];

          console.log(grouped);
          for (const key in grouped) {
            if (Object.hasOwnProperty.call(grouped, key)) {
              const element = grouped[key];
              let product = element[0].product.label
              let total = element[0].product.price * element.length
              products.push(product)
              totals.push(total)
            }
          }

          this.chartData = {
            labels: products,
            datasets: [
              {
                label: "Le coût total par produit en euro (€)",
                backgroundColor: "#0fe4de",
                data: totals
              }
            ]
          }
        }
      })
      .catch(error => {
          console.log(error);
      })
      
    },
    openAlert(color,retour, message){
      this.colorAlert = color || this.getColorRandom()
      this.$vs.dialog({
        color:this.colorAlert,
        title: retour,
        text: message,
        accept:this.acceptAlert
      })
    },
    groupByKey(array, key) {
      return array
        .reduce((hash, obj) => {
          if(obj[key] === undefined) return hash; 
          return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
        }, {})
    }

  },
  beforeMount() {
    this.getPurchaseUser()
  },
  mounted() {
    
  },
}

</script>
<style scoped lang="scss">
  $baseColor: rgb(0,40,61);
  $borderRadius: 10px;
  $imageBig: 100px;
  $imageSmall: 60px;
  $padding: 10px;

  .header {
   background-color: darken($baseColor, 5%);
   color: white;
   font-size: 1.5em;
   padding: 1rem;
   text-align: center;
   text-transform: uppercase;
}

img {
   height: $imageBig;
   width: $imageBig;
   object-fit: contain;
   object-position: 50%;
}

table th {
  background: $baseColor !important;
  color: white !important;
}

.table {
   border: 1px solid darken($baseColor, 5%);
   border-radius: $borderRadius;
   box-shadow: 3px 3px 0 rgba(0,0,0,0.1);
   max-width: calc(100% - 2em);
   margin: 1em auto;
   overflow: hidden;
   width: 100%;
   margin-top: 80px;
}

table {
   width: 100%;
   
   td, th { 
      color: darken($baseColor, 10%);
      padding: $padding; 
   }
   
   td {
      vertical-align: middle;
      
      &:last-child {
         font-size: 0.95em;
         line-height: 1.4;
         text-align: left;
      }
   }
   
   th { 
      background-color: lighten($baseColor, 50%);
      font-weight: 300;
   }
   
   tr {     
      &:nth-child(2n) { background-color: white; }
      &:nth-child(2n+1) { background-color: lighten($baseColor, 55%) }
   }
}

@media screen and (max-width: 700px) {   
   table, tr, td { display: block; }
   
   td {
      &:first-child {
         position: absolute;
         top: 50%;
         transform: translateY(-50%);
         width: $imageBig;
      }

      &:not(:first-child) {
         clear: both;
         margin-left: $imageBig;
         padding: 4px 20px 4px 90px;
         position: relative;
         text-align: left;

         &:before {
            color: lighten($baseColor, 30%);
            content: '';
            display: block;
            left: 0;
            position: absolute;
         }
      }

      &:nth-child(2):before { content: 'Name:'; }
      &:nth-child(3):before { content: 'Email:'; }
      &:nth-child(4):before { content: 'Phone:'; }
      &:nth-child(5):before { content: 'Comments:'; }
   }
   
   tr {
      padding: $padding 0;
      position: relative;
      &:first-child { display: none; }
   }
}

@media screen and (max-width: 500px) {
   .header {
      background-color: transparent;
      color: lighten($baseColor, 60%);
      font-size: 2em;
      font-weight: 700;
      padding: 0;
      text-shadow: 2px 2px 0 rgba(0,0,0,0.1);
   }
   
   img {
      border: 3px solid;
      border-color: lighten($baseColor, 50%);
      height: $imageBig;
      margin: 0.5rem 0;
      width: $imageBig;
   }
   
   td {
      &:first-child { 
         background-color: lighten($baseColor, 45%); 
         border-bottom: 1px solid lighten($baseColor, 30%);
         border-radius: $borderRadius $borderRadius 0 0;
         position: relative;   
         top: 0;
         transform: translateY(0);
         width: 100%;
      }
      
      &:not(:first-child) {
         margin: 0;
         padding: 5px 1em;
         width: 100%;
         
         &:before {
            font-size: .8em;
            padding-top: 0.3em;
            position: relative;
         }
      }
      
      &:last-child  { padding-bottom: 1rem !important; }
   }
   
   tr {
      background-color: white !important;
      border: 1px solid lighten($baseColor, 20%);
      border-radius: $borderRadius;
      box-shadow: 2px 2px 0 rgba(0,0,0,0.1);
      margin: 0.5rem 0;
      padding: 0;
   }
   
   .table { 
      border: none; 
      box-shadow: none;
      overflow: visible;
   }
}
</style>