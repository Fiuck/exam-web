export default {
  getToken: () => {
    return JSON.parse(window.localStorage.getItem("Authorization")) || ''
  },
  get: (key) => {
    return JSON.parse(window.localStorage.getItem(key)) || ''
  },
  setToken: (value) => {
    return window.localStorage.setItem("Authorization", JSON.stringify(value))
  },
  set: (key, value) => {
    return window.localStorage.setItem(key, JSON.stringify(value))
  },
  removeToken: () => {
    return window.localStorage.removeItem('Authorization')
  },
  remove: (key) => {
    return window.localStorage.removeItem(key)
  },
  clear: () => {
    return window.localStorage.clear()
  }
}