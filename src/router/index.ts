import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Account from '@/views/Account.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/components/NotFound.vue';
import Money from '@/views/Money.vue';
import Test from '@/practice/Test.vue'
import Detail from '@/views/Detail.vue';
import EditLabel from '@/views/EditLabel.vue';

Vue.use(VueRouter);



const routes: Array<RouteConfig> = [
    {
        path: '/',
        redirect:'/account',
    },
    {

        path: '/account',
        component: Account,
    },
    {
        path: '/money',
        component: Money,
    },
    {
        path: '/labels',
        component: Labels,
    },
    {
        path: '/labels/edit/:id',
        component: EditLabel,
    },
    {
        path: '/detail',
        component: Detail,
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
