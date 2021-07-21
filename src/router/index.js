import Vue from "vue"
import VueRouter from "vue-router"
import layout from "components/content/layout"
import storage from "utils/storage"
import { notification } from "ant-design-vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: 'login'
  },
  {
    path: "/login",
    name: "login",
    component: () => import("views/login"),
  },
  {
    path: "/index",
    name: "index",
    component: layout,
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

/**
 * 全局前置导航守卫
 * 如果没有token，则去登录页面
 */
router.beforeEach((to, from, next) => {
  let token = storage.get("Authorization")
  if (to.path === "/login") {
    if (token) next("/index")
    next()
  } else {
    if (!token) {
      notification.error({
        message: "错误",
        description: "登录时效已过期，请重新登录！",
      })
      next("/login")
    } else {
      next()
    }
  }
})

export default router
