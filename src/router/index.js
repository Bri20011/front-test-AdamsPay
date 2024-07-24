import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue'; 
import ThankYou from '../pages/ThankYou.vue'; 
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/thank-you',
    name: 'ThankYou',
    component: ThankYou
  }
  // Otras rutas
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;