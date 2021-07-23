import axios from "axios"
import storage from "utils/storage"

export function request(config) {
  const instance = axios.create({
    // baseURL: "https://dev.lemcoo.top",
    baseURL: "/api",
    timeout: 20000,
  })

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      // console.log(config)
      // 是否需要设置 token
      const isToken = (config.headers || {}).isToken === false
      if (storage.getToken() && !isToken) {
        config.headers["Authorization"] = 'Bearer ' + storage.getToken()
      }

      return config
    },
    (err) => {
      console.log(err)
      return Promise.reject(err)
    }
  )

  // 响应拦截器
  instance.interceptors.response.use(
    (response) => {
      let d = response.data
      // console.log(response)
      if (d.code < 2000 || d.code >= 3000) {
        return Promise.reject(d)
      }
      return d
    },
    (err) => {
      let { message } = err;
      if (message == "Network Error") {
        message = "后端接口连接异常";
      }
      else if (message.includes("timeout")) {
        message = "系统接口请求超时";
      }
      else if (message.includes("Request failed with status code")) {
        message = "系统接口" + message.substr(message.length - 3) + "异常";
      }
      return Promise.reject({ msg: message })
    }
  )

  return instance(config)
}
