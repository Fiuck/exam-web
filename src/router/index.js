import Vue from "vue"
import VueRouter from "vue-router"
import layout from "components/content/layout"

Vue.use(VueRouter)

const routes = [
  {
    name: '/',
    path: "/",
    redirect: 'login',
    meta: {
      requireAuth: false
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("views/login"),
    meta: {
      requireAuth: false
    }
  },
  {
    path: "/index",
    name: "Layout",
    component: layout,
    meta: {
      requireAuth: true
    },
    children: [
      // {
      //   name: 'dashboard',
      //   path: '/dashboard',
      //   component: () => import('views/dashboard'),
      //   meta: { title: '控制台' }
      // }
    ],
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
