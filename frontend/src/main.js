import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
//import Vuesax from 'vuesax'
//import 'vuesax/dist/vuesax.css'
import Vuesax from 'vuesax3'
import 'vuesax3/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css'
import {count,validMail,validPassword} from '@/filters'


if (window.localStorage) {
    var localUserString = window.localStorage.getItem("user") || "null"
    var localPanierString = window.localStorage.getItem("cartProducts") || "[]"
    var localToken = window.localStorage.getItem("token") || null
    var localIsAuthenticated = JSON.parse(window.localStorage.getItem("isAuthenticated")) || false
    var localUser = JSON.parse(localUserString);
    var localPanier = JSON.parse(localPanierString);

    if (localIsAuthenticated) {
        store.commit("SET_AUTH", localIsAuthenticated)
    }

    if (localToken !== null) {
        store.commit("SET_TOKEN", localToken)
    }

    if(localUser){
        store.commit("SET_USER", localUser)
    }

    if(localPanier){
        store.commit("SET_PRODUCT", localPanier)
    }
    
}

const app = createApp(App)
app.config.globalProperties.$filters = {
    count,
    validMail,
    validPassword
}
app.use(Vuesax, {
    // options here
})
app.use(router)
//app.use(VeeValidate)
app.use(store)

app.mount('#app')
