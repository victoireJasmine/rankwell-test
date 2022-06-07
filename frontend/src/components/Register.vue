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

        <vs-input type="email" label-placeholder="Email" v-model.trim="email"/>

        <vs-input type="text" label-placeholder="Nom" v-model.trim="firstname"/>

        <vs-input type="text" label-placeholder="Prénom" v-model.trim="lastname"/>

        <vs-input type="password" label-placeholder="Mot de passe" v-model.trim="password"/>

        <vs-input type="password" label-placeholder="Confirmer mot de passe" v-model.trim="confirm"/>

        <vs-button width="100%" color="primary" class="mt-10" type="gradient" @click="register">incription</vs-button>

      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
export default {
  name:'RegisterPage',
  data() {
      return {
        email: null,
        firstname: null,
        lastname: null,
        password: null,
        confirm: null,
        colorAlert:'primary',
        titleAlert:'Alert',
        valueInput:'',
      }
  },
  methods: {
    register() {
      if(this.email != "" &&  this.firstname != "" && this.lastname != "" &&  this.password != "" &&  this.confirm != ""){
        if(this.password !== this.confirm){
          this.openAlert("danger","Création de compte", "Les mots de passe ne sont pas identiques")
          return;
        }
        
        const payload = {
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
            password: this.password
        }
        this.$store.state
        .requestApi('post', '/auth/signup', payload)
        .then(response => {
          if (response.error) {
            console.log(response.error);
            this.openAlert("danger","Création de compte",response.error)
          } else {
            this.email= null
            this.firstname= null
            this.lastname= null
            this.password= null
            this.confirm= null

            this.openAlert("success","Création de compte","Compte créé avec succès. Veuillez vous connecter")
          }
        })
        .catch(error => {
            console.log(error);
        })
      }
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