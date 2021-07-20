import axios from "axios"
import storage from "utils/storage"

export function request(config) {
  const instance = axios.create({
    // baseURL: "https://dev.lemcoo.top",
    // baseURL: "localhost:9991",
    timeout: 5000,
  })

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      // console.log(config)
      config.headers["Authorization"] = storage.get("Authorization")
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
      if (d.code !== 200) {
        return Promise.reject(d)
      }
      return d
    },
    (err) => {
      console.log(err)
      return Promise.reject(err)
    }
  )

  return instance(config)
}
