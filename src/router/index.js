import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from 'components/content/layout'
import storage from 'utils/storage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('views/login')
  },
  {
    path: '/index',
    name: 'index',
    component: layout,
    children: [
      // {
      //   name: 'dashboard',
      //   path: '/dashboard',
      //   component: () => import('views/dashboard'),
      //   meta: { title: '控制台' }
      // }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/**
 * 全局前置导航守卫
 * 如果没有token，则去登录页面
 */
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = storage.get('Authorization')

    if (!token) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
