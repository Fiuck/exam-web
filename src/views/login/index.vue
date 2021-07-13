<template>
  <div class="main">
    <div class="login-container">
      <div class="login-wrapper">
        <div class="login-img">
          <img src="~@/assets/img/img-01.png" alt="" />
        </div>
        <a-form-model
          ref="baseForm"
          :model="baseForm"
          :rules="rules"
          v-bind="layout"
        >
          <a-form>
            <h2>考试系统登录</h2>
          </a-form>
          <a-form-model-item label="用户名" prop="username">
            <a-input
              v-model.trim="baseForm.username"
              type="text"
              autocomplete="off"
            >
              <a-icon slot="prefix" type="user" />
              ></a-input
            >
          </a-form-model-item>
          <a-form-model-item label="密码" prop="password">
            <a-input-password
              v-model.trim="baseForm.password"
              type="password"
              autocomplete="off"
            >
              <a-icon slot="prefix" type="lock"
            /></a-input-password>
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 10 }">
            <a-button
              type="primary"
              :loading="btnLoading"
              @click="submitForm('baseForm')"
            >
              登录
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "api/login"
import { mapMutations } from "vuex"
export default {
  data() {
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback("用户名不可为空！")
      }
      callback()
    }
    let validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback("密码不可为空！")
      } else if (value.length < 6) {
        callback("密码长度必须大于6位！")
      }
      callback()
    }
    return {
      baseForm: {
        username: "",
        password: "",
      },
      userToken: "",
      btnLoading: false,
      rules: {
        username: [{ validator: validateUsername, trigger: "change" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
      },
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
      },
    }
  },
  methods: {
    ...mapMutations({ toLogin: "TO_LOGIN" }),
    submitForm(formName) {
      this.btnLoading = true
      let _this = this
      setTimeout(() => {
        _this.$refs[formName].validate((valid) => {
          if (!valid) {
            _this.btnLoading = false
            return false
          }
          login(_this.baseForm)
            .then((res) => {
              _this.btnLoading = false
              _this.userToken = res.data.token
              // 将token保存到vuex中
              _this.toLogin({ Authorization: _this.userToken })
              // 跳转
              _this.$router.replace({ path: "/index" })
              setTimeout(() => {
                _this.$notification.success({
                  message: "欢迎",
                  description: "欢迎回来",
                })
              }, 1000)
            })
            .catch((e) => {
              _this.btnLoading = false
              _this.$message.warning(e.message)
              return false
            })
        })
      }, 1000)
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  margin: 0 auto;
}
.login-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: linear-gradient(-135deg, #c850c0, #4158d0);
}
.login-wrapper {
  width: 960px;
  height: 645px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 177px 130px 33px 95px;
}
.login-img {
  width: 316px;
}
.ant-form {
  width: 290px;
  // margin-top: 80px;
}
h2 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 30px;
}
.close-window {
  position: absolute;
  right: 0px;
  top: 0px;
  background-color: #fff;
  width: 60px;
  height: 30px;
  border-radius: 0 0 0 10px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  user-select: none;
  font-weight: bold;
}
</style>
