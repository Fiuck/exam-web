import Vue from "vue"
import VueRouter from "vue-router"
import layout from "components/content/layout"
import storage from "utils/storage"
import { notification } from "ant-design-vue"

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
    name: "login",
    component: () => import("views/login"),
    meta: {
      requireAuth: false
    }
  },
  {
    path: "/index",
    name: "index",
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

/**
 * 全局前置导航守卫
 * 如果没有token，则去登录页面
 */
router.beforeEach((to, from, next) => {
  // console.log('当前页面为:' + to.name + "，当前是否需要认证token：" + to.meta.requireAuth);

  // 判断该路由是否需要认证 token
  if (to.matched.some(record => record.meta.requireAuth)) {
    let token = storage.getToken()
    if (token) {
      next()
    } else {
      notification.error({
        message: "错误",
        description: "登录时效已过期，请重新登录！",
      })
      next({
        path: "/login",
        query: {
          // 将跳转的路由作为参数，登录成功后跳转到该路由
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }


  // if (to.path === "/login") {
  //   if (token) next("/index")
  //   next()
  // } else {
  //   if (!token) {

  //   } else {
  //     next()
  //   }
  // }
})

export default router
