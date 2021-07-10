export default {
  // 模拟用户登录
  login: (config) => {
    let data = JSON.parse(config.body)
    let token = "sadasd5as67das75d6a5da5s67d5a6521"

    if (data.username === "admin" && data.password === "123456") {
      return {
        code: 200,
        message: "登录成功！",
        data: {
          token,
        },
      }
    } else {
      return {
        code: 403,
        message: "用户名或密码不正确！",
        data: {},
      }
    }
  },
}
