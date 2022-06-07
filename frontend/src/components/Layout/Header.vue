<template>
  <div class="center examplex">
    <vs-navbar center-collapsed v-model="activeItem" class="nabarx">
      <template #title>
          <vs-navbar-title>
            <router-link to="/">Rankwell Shop</router-link>
        </vs-navbar-title>
      </template>

      
      <vs-navbar-item index="0" v-if="$store.state.isAuthenticated">
        <router-link to="/purchases"><vs-button color="success" class="mr-3" type="gradient" icon="equalizer">Mes achats</vs-button></router-link>
      </vs-navbar-item>
      <vs-navbar-item index="0" class="mr-2">
        <slot></slot>
      </vs-navbar-item>
      <vs-navbar-item index="0" v-if="!$store.state.isAuthenticated">
        <Login />
      </vs-navbar-item>
      <vs-navbar-item index="1" v-if="!$store.state.isAuthenticated">
        <Register />
      </vs-navbar-item>

       <vs-dropdown :color="colorx" v-if="$store.state.isAuthenticated">
        <a class="a-icon" href="#">
          <vs-avatar size="large" src="https://png.pngtree.com/png-vector/20190225/ourlarge/pngtree-vector-avatar-icon-png-image_702436.jpg"/>
          <vs-icon class="" icon="expand_more"></vs-icon>
        </a>

        <vs-dropdown-menu>
          <vs-dropdown-item>
            {{$store.state.user.firstname}} {{$store.state.user.lastname}}
          </vs-dropdown-item>
          <vs-dropdown-item divider>
            <a href="#" @click.prevent="logout">
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
  }),
   methods: {
    logout () {
      this.$store.commit('SET_USER', null)
      this.$store.commit('SET_TOKEN', null)
      this.$store.commit('SET_AUTH', false)

      if (window.localStorage) {
        window.localStorage.setItem('user', JSON.stringify(null))
        window.localStorage.setItem('token', JSON.stringify(null))
        window.localStorage.setItem('isAuthenticated', JSON.stringify(false))
      }
      window.location.reload(true);
    },
  }
}
</script>

<style scoped>
  .mr-2 {
    margin-right: 10px;
  }
   .mr-3 {
    margin-right: 20px;
  }
</style>