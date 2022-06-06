<template>
  <h1>Home Page</h1>
  {{$filters.count('salut')}}
</template>

<script>
export default {
  name:'HomePage' 
}

</script>
<style lang="scss"> 
  $red: #3ee3ff;
  body{
    background-color: $red;
  }

   

</style>