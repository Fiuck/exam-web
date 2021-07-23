import router from './router'
import store from './store'
import storage from 'utils/storage'
import { notification } from "ant-design-vue"

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
      console.log('token');
      if (store.getters.roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        console.log('getter');
        store.dispatch('login/GetInfo').then(res => {
          console.log('info', res);
          // TODO查询路由表
          next({ ...to, replace: true })
        })
      } else {
        next()
      }

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
})
