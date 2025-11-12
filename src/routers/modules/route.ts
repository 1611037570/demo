import HomeView from '@views/home/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
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
    path: '/noteWall',
    name: 'noteWall',
    component: () => import('@views/noteWall/index.vue'),
  },
  // 捕获所有不存在的路由并重定向到主页
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]
export default routes
