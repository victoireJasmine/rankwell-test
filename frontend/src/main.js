import Vue, { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css'
import Vuesax from 'vuesax'
// import { sync } from 'vuex-router-sync'
import {count,validMail,validPassword} from '@/filters'


// sync(router,store)

if (window.localStorage) {
    var localUserString = window.localStorage.getItem("user") || "null"
    var localPanierString = window.localStorage.getItem("panier") || "null"
    var localToken = window.localStorage.getItem("token") || null
    var localUser = JSON.parse(localUserString);
    var localPanier = JSON.parse(localPanierString);

    if (localToken !== null) {
        store.commit("SET_TOKEN", localToken)
    }

    if(localUser && store.state.user !== localUser){
        store.commit("SET_USER", localUser)
    }

    if(localPanier && store.state.panier !== localPanier){
        store.commit("SET_PANIER", localPanier)
    }
    
}
Vue.use(Vuesax)
const app = createApp(App)

app.config.globalProperties.$filters = {
    count,
    validMail,
    validPassword
}
app.use(router)
app.use(store)

app.mount('#app')
