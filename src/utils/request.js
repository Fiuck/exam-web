import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: '',
    timeout: 5000
  })

  // 请求拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {

  })

  // 响应拦截器
  instance.interceptors.response.use(response => {
    return response.data
  }, error => {

  })

  return instance(config)
}