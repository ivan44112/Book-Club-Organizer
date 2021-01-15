import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Register from "@/components/Register";
import {ValidationObserver, ValidationProvider, extend} from "vee-validate";
import * as rules from 'vee-validate/dist/rules';

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
      component: Dashboard
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
});

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')


