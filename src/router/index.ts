import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login.vue'
import Dashboard from "@/views/Dashboard.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: "/dashboard",
      component: Dashboard,
      meta: { requiresAuth: true },
    },
  ],
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
});
export default router
