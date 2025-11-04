// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'app-home', component: () => import('@/views/AppHomeView.vue'), meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue'), meta: { guestOnly: true } },

  // Route unique: liste ou éditeur selon la présence de :id
  { path: '/editor/:id?', name: 'editor', component: () => import('@/views/GanttListView.vue') },

  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.guestOnly === true && auth.isAuthenticated) {
    return { name: 'app-home' }
  }
  return true
})

export default router
