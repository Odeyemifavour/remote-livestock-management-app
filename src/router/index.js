import { createRouter, createWebHistory } from 'vue-router'
import SignupPage from '@/views/SignupPage.vue'
import LoginPage from '@/views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/signup', 
      component: SignupPage
    },
    { path: '/login', 
      component: LoginPage
     },
    { 
      path: '/', 
      redirect: '/login'
     },
  ],
})

export default router

