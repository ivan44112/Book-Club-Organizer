import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Register from "@/components/Register";
import {ValidationObserver, ValidationProvider, extend} from "vee-validate";
import * as rules from 'vee-validate/dist/rules';
import './assets/icons/style.css'
import Clubs from "@/components/Clubs";
import MyBooks from "@/components/MyBooks";
import Messages from "@/components/Messages";
import Settings from "@/components/Settings";
import DashboardContent from "@/components/DashboardContent";
import {Auth} from "@/services/userServices";
import BookProperty from "@/components/BookProperty";
import ExploreClubs from "./components/ExploreClubs";
import CreateClub from "./components/CreateClub";
import ClubPage from "./components/ClubPage";


Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Login',
        component: Login

    },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            children: [
                {path: 'dashboardcontent', component: DashboardContent},
                {path: 'clubs', component: Clubs},
                {path: 'mybooks', component: MyBooks},
                {path: 'messages', component: Messages},
                {path: 'settings', component: Settings},
                {path: 'book/:id', name: "book", component:BookProperty},
                {path: 'exploreclubs', component: ExploreClubs},
                {path: 'createclub', component: CreateClub},
                {path: 'club/:id', name:"club" ,component: ClubPage}
            ]
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        }
    ]

});

router.beforeEach((to, from, next) => {
    const publicPages = ["/", "/register"];
    const loginNeeded = !publicPages.includes(to.path);
    const user = Auth.getUser();

    if (loginNeeded && !user) {
        next('/');
        return;
    }

    next();

});

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    render: h => h(App),
}).$mount('#app')


