const getters = {
  siderbar: state => state.app.siderbar,
  token: state => state.login.token,
  avatar: state => state.login.avatar,
  username: state => state.login.username,
  roles: state => state.login.roles,
  permissions: state => state.login.permissions,
}
export default getters
