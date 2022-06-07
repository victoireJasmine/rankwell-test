<template lang="html">
  <div class="examplex">
    <vs-dropdown vs-custom-content vs-trigger-click >
      <a class="a-icon" href.prevent>
        Se connecter
        <vs-icon icon="expand_more"></vs-icon>
      </a>

      <vs-dropdown-menu class="loginx">
        <h3>Coonexion</h3>
        <p>Les valeurs dans le formulaire sont les identifiants par défaut</p>

        <vs-input
          type="email" label-placeholder="Email" v-model.trim="email"/>

        <vs-input
          type="password"
          label-placeholder="Password" v-model.trim="password"/>

        <vs-button width="100%" color="primary" class="mt-10" type="gradient" @click="login">Connexion</vs-button>

      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name:'LoginPage',
  data() {
      return {
        email: 'vie@test.com',
        password: '1234',
        colorAlert:'primary',
        titleAlert:'Alert',
        valueInput:'',
      }
  },
  methods: {
    ...mapActions([
      'setUser',
      'setToken',
      'setAuth'
    ]),
    login() {
      if(this.email != "" &&  this.password != ""){
          const payload = {
            email: this.email,
            password: this.password
        }
        this.$store.state
        .requestApi('post', '/auth/login', payload)
        .then(response => {
          if (response.error) {
            console.log(response.error);
            this.openAlert("danger","Connexion",response.error)
          } else {
            this.email = '';
            this.password = '1234';
            this.setToken(response.token);
            this.getUserConnected();
          }
        })
        .catch(error => {
            console.log(error);
        })
      }
    },
    getUserConnected() {
      this.$store.state
      .requestApi('get', '/auth/connected')
      .then(response => {
        if (response.error) {
          console.log(response.error);
        } else {
          this.setUser(response);
          this.setAuth(true);
          //reload
          window.location.reload()
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
    }

  }
}

</script>
<style scoped lang="scss">
 .examplex {
  display: flex;
  align-items: center;
  justify-content: center;
  .a-icon {
    outline: none;
    text-decoration: none !important;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      font-size: 18px;
    }
  }
}

.vs-dropdown-menu{
  .con-input{
    margin-bottom: 20px;
  }
}
.loginx {
  h3 {
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 5px;
  }
  p {
    max-width: 200px;
    font-size: 11px;
    padding: 5px;
  }
}

  
</style>