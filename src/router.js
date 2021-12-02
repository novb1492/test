import Vue from 'vue';
import VueRouter from 'vue-router';
import firstdoor from './firstdoor.vue';


Vue.use(VueRouter);
const router =new VueRouter({
    mode:'history',
    routes: [
      {path:'/',component: firstdoor},  
    ]
});
export default router;