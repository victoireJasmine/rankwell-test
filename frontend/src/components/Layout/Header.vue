<template>
  <div class="center examplex">
    <vs-navbar center-collapsed v-model="activeItem" class="nabarx">
      <template #title>
          <vs-navbar-title>
            Rankwell Shop
        </vs-navbar-title>
      </template>


      <vs-navbar-item index="0">
        <slot></slot>
      </vs-navbar-item>
      <vs-navbar-item index="0">
        <Login />
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <Register />
      </vs-navbar-item>

       <vs-dropdown :color="colorx">
        <a class="a-icon" href="#">
          <vs-avatar size="large" src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"/>
          <vs-icon class="" icon="expand_more"></vs-icon>
        </a>

        <vs-dropdown-menu>
          <vs-dropdown-item>
            Victoire Jasmine
          </vs-dropdown-item>
          <vs-dropdown-item divider>
            <a href="#">
              Déconnexion
            </a>
          </vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
    </vs-navbar>
  </div>
</template>

<script>
import Login from "../Login.vue"
import Register from "../Register.vue"
export default {
  name: 'HeaderTemplate', 
  components: {
    Login, Register
  },
  data:()=>({
    activeItem: 0,
  })
}
</script>

<style scoped>

</style>