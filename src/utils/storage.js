export default {
  get: (key) => {
    return JSON.parse(window.localStorage.getItem(key)) || ''
  },
  set: (key, value) => {
    return window.localStorage.setItem(key, JSON.stringify(value))
  },
  remove: (key) => {
    return window.localStorage.removeItem(key)
  },
  clear: () => {
    return window.localStorage.clear()
  }
}