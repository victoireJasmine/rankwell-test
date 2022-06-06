import { createWebHistory, createRouter } from "vue-router"
import Home from '@/views/Home.vue'
import NotFound from '@/views/404.vue'
import Panier from '@/views/Panier.vue'
import Purchases from '@/views/Purchases.vue'

const routes = [
    {
        path:'/',
        name:'Home',
        component: Home,
        meta: {
            description:'Page d\'acceuil'
        }

    },
    {
        path:'/panier',
        name:'Panier',
        component: Panier,
        meta: {
            description:'Mon panier'
        }

    },
    {
        path:'/purchases',
        name:'Purchases',
        component: Purchases,
        meta: {
            description:'Mes achats'
        }

    },
    {
        path:'/:catchAll(.*)',
        name:'NotFound',
        component: NotFound,
        meta: {
            description:'Page error'
        }

    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: function(to, from, savedPosition){
        return savedPosition || {x: 0, y: 0}
      }
  });
  
  export default router;
  