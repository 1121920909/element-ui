import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import VueRouter from 'vue-router';
import home from './components/home/home.vue'
import Introduction from  './components/introduction/Introduction.vue'
import Management from './components/management/Management'
import Device from './components/device/Device'
import Teach from './components/teach/Teach'
import Index from './components/index'
import Teacher from './components/teacher'
import Course from './components/teacher/course/course'
const routes = [
  {
    path: '/index', component: Index,
    children: [
      { path: '/', name:'home', component: home},
      { path: 'intro', name: 'intro', component: Introduction},
      { path: 'manage', name: 'manage', component: Management},
      { path: 'device', name: 'device', component: Device},
      { path: 'teach', name: 'teach', component: Teach}
    ]
  },
  {
    path: '/teacher',component: Teacher,
    children: [
      {path: 'course', name: 'course', component: Course}
    ]
  }

];

const router = new VueRouter({
  mode: 'history',
  routes:routes
});

Vue.use(VueRouter);
Vue.config.productionTip = false;

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app');
