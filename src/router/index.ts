import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/Login.vue'
import Dashboard from "@/views/Dashboard.vue";
const routes = [
  { path: '/login', component: LoginView },
  { path: '/', component: Dashboard, meta: { requiresAuth: true } },
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
router.beforeEach((to, from, next) => {

  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/login'); // Redirigir si no hay token
  } else {
    next(); // Continuar si tiene acceso
  }
});

export default router
