import Vue from 'vue'
import VueRouter from 'vue-router'
import DetailRecipe from '../views/DetailRecipe.vue';
import RecipeCategory from '../views/RecipeCategory.vue';
import RecipeStep from '../views/RecipeStep.vue';
import Thanks from '../views/Thanks.vue';
import Login from '../views/Login.vue';
import Rating from '../views/Rating.vue';
import History from '../views/History.vue';

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "LISTRecipes",
        component: RecipeCategory,
    },
    {
        path: "/detail/:recipeId",
        name: "RecipeDetail",
        component: DetailRecipe,
        props: true
    },
    {
        path: "/detail/:recipeId/step",
        name: "RecipeStep",
        component: RecipeStep,
        props: true
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/:id/rating",
        name: "Rating",
        component: Rating,
        props: true
    },
    {
        path: "/thankyou",
        name: "Thank",
        component: Thanks
    },
    {
        path: "/riwayat",
        name: "History",
        component: History
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