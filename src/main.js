import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";

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
    }
  ]
});

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')



