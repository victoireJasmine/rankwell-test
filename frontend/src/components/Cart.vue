<template>
    <vs-button color="success">
        <slot></slot>
        <img v-if="cartIcon" :src="img" alt="Cart Icon">
    </vs-button>
</template>

<script>

export default {
  name: 'CardTemplate',
  props: ['cartIcon'],
  data:()=>({
    img: require('../assets/images/cart.svg')
  })
}
</script>

<style scoped>
  img {
    max-width: 20px;
    margin-left: .5em;
  }
</style>