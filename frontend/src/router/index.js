import { createWebHistory, createRouter } from "vue-router"
import Home from '@/views/Home.vue'
import NotFound from '@/views/404.vue'

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
  