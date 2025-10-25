import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@views/home/index.vue'),
    },
    {
      path: '/resume',
      name: 'resume',
      component: () => import('@views/resume/index.vue'),
    },
    // 捕获所有不存在的路由并重定向到主页
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
