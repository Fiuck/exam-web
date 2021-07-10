import Cookies from "js-cookie"

const TOKEN = "Authentication"

export default {
  get: () => {
    return Cookies.get(TOKEN)
  },
  set: (token) => {
    return Cookies.set(TOKEN, token)
  },
  remove: () => {
    return Cookies.remove(TOKEN)
  },
}
