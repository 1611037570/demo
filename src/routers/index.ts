import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@views/index/index.vue'),
    },
    {
      path: '/resume',
      name: 'resume',
      component: () => import('@views/resume/index.vue'),
    },
  ],
})

export default router
