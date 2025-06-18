import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: true },
      component: Home,
    },
    {
      path: '/camera',
      name: 'Camera',
      meta: { requiresAuth: true },
      component: () => import('@/pages/CameraPage.vue'),
    },
    {
      path: '/config',
      name: 'UserConfig',
      meta: { requiresAuth: true },
      component: () => import('@/pages/UserConfigPage.vue'),
    },
    {
      path: '/edit',
      name: 'ReceiptEdit',
      meta: { requiresAuth: true },
      component: () => import('@/pages/ReceiptEditPage.vue'),
    },
    {
      path: '/result',
      name: 'Result',
      meta: { requiresAuth: true },
      component: () => import('@/pages/ResultPage.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      meta: { requiresAuth: false },
      component: () => import('@/pages/LoginPage.vue'),
    },
    {
      path: '/oauth/callback',
      name: 'KakaoCallback',
      meta: { requiresAuth: false },
      component: () => import('@/pages/KakaoCallbackPage.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('accessToken')

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})
export default router
