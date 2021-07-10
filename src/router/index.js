import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from 'components/content/layout'

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

export default router
