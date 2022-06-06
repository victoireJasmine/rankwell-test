<template lang="html">
  <div class="examplex">
    <vs-dropdown vs-custom-content vs-trigger-click >
      <a class="a-icon" href.prevent>
        S'inscrire
        <vs-icon icon="expand_more"></vs-icon>
      </a>

      <vs-dropdown-menu class="loginx">
        <h3>Inscription</h3>
        <p>Les valeurs dans le formulaire sont les identifiants par défaut</p>

        <vs-input type="email" label-placeholder="Email" v-model="value1"/>

        <vs-input type="text" label-placeholder="Nom" v-model="value1"/>

        <vs-input type="text" label-placeholder="Prénom" v-model="value1"/>

        <vs-input type="password" label-placeholder="Mot de passe" v-model="value2"/>

        <vs-input type="password" label-placeholder="Confirmer mot de passe" v-model="value2"/>

        <vs-button width="100%" color="primary" class="mt-10" type="gradient">incription</vs-button>

      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
export default {
  name:'RegisterPage',
  data() {
      return {
        email: 'vie@test.com',
        password: '1234'
      }
  },
  computed: {
      validateForm() {
          return this.email != '' && this.password != '';
      },
  },
  methods: {
      login() {
          const payload = {
              checkbox_remember_me: this.checkbox_remember_me,
              userDetails: {
                  email: this.email,
                  password: this.password
              },
              notify: this.$vs.notify
          }
          this.$store.dispatch('auth/loginAttempt', payload);
      },

      notifyAlreadyLogedIn() {
          this.$vs.notify({
              title: 'Login Attempt',
              text: 'You are already logged in!',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'warning'
          });
      },
      registerUser() {
          if(this.$store.state.isAuthenticated) {
              this.notifyAlreadyLogedIn();
              return false;
          }
          this.$router.push('/register');
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