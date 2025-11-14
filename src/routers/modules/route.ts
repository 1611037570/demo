import Home from '@views/home/index.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/resume',
    name: 'resume',
    component: () => import('@views/resume/index.vue'),
  },
  {
    path: '/image',
    name: 'image',
    component: () => import('@views/image/index.vue'),
  },
  {
    path: '/messageBoard',
    name: 'messageBoard',
    component: () => import('@views/messageBoard/index.vue'),
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@views/my/index.vue'),
  },
  // 捕获所有不存在的路由并重定向到主页
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]
export default routes
