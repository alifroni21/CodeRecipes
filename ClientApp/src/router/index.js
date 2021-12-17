import Vue from 'vue'
import VueRouter from 'vue-router'
import Submission from '../views/Submission.vue'

Vue.use(VueRouter)

const routes = [
    //{
    //    path: "/",
    //    name: "Home",
    //    component: Home,
    //},
    //{
    //    path: "/Counter",
    //    name: "Counter",
    //    component: Counter,
    //},
    //{
    //    path: "/FetchData",
    //    name: "FetchData",
    //    component: FetchData,
    //},
    {
        path: "/Submission",
        name: "FetchData",
        component: Submission,
    }
];

const base = document.getElementsByTagName("base")[0];
const baseURI = base.attributes.href.value;

const router = new VueRouter({
    base: baseURI,
    mode: 'history',
    routes
})

//const router = createRouter({
//    history: createWebHistory(),
//    routes,
//});

export default router;