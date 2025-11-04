import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/projects' },
  { path: '/projects', name: 'projects', component: () => import('@/views/ProjectsView.vue') },
  { path: '/projects/:id', name: 'gantt-editor', component: () => import('@/views/GanttEditorView.vue'), props: true },
  { path: '/:pathMatch(.*)*', redirect: '/projects' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Garde très simple pour notre faux auth
router.beforeEach((to) => {
  const auth = useAuthStore()
  // On ne bloque rien pour l’instant, mais on garde le hook prêt
  // if (!auth.isAuthenticated && to.name !== 'projects') return { name: 'projects' }
  return true
})

export default router
