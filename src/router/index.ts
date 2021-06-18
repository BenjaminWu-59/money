import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Account from '@/views/Account.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/components/NotFound.vue';
import Money from '@/views/Money.vue';
import Dialog from '@/practice/Dialog.vue';

Vue.use(VueRouter);



const routes: Array<RouteConfig> = [
    {
        path: '/',
        redirect:'/account',
        meta:{
            title:"主页",
            tx:1
        },
    },
    {

        path: '/account',
        component: Account,
        meta:{
            title:"主页",
            tx:1
        },
    },
    {
        path: '/money',
        component: Money,
        meta:{
            title:"记账",
            tx:2
        },
    },
    {
        path: '/labels',
        component: Labels,

    },
    {
        path: '/dialog',
        component: Dialog,

    },
    {
        path: '/statistics',
        component: Statistics,

    },
    {
        path:'*',
        component:NotFound,

    },


    // {
    //     path: '/',
    //     name: 'Home',
    //     component: Home
    // },
    // {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
];

const router = new VueRouter({
    routes
});

export default router;
