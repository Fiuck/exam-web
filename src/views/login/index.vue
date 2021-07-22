<template>
  <div class="main">
    <ul class="bg-bubbles">
      <li v-for="i in 15" :key="i"></li>
    </ul>
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
      } else if (value.length <= 3) {
        callback("密码长度必须大于3位！")
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
    ...mapMutations(["TO_LOGIN"]),
    submitForm(formName) {
      this.btnLoading = true
      let _this = this
      setTimeout(() => {
        _this.$refs[formName].validate((valid) => {
          if (!valid) {
            _this.btnLoading = false
            return false
          }
          // 登录接口
          // TODO 这里改成vuex 的actions 2021年7月22日14:08:46
          login(_this.baseForm)
            .then((res) => {
              // 登录成功
              _this.btnLoading = false
              _this.userToken = res.data
              // 将token保存到vuex中
              _this.TO_LOGIN({ Authorization: _this.userToken })
              // 跳转
              _this.$router.replace({
                // 如果存在 query 就进入 query 存储的页面，如果没有就进入首页
                path: _this.$route.query.redirect || "/index",
              })
              // 成功友好提示
              setTimeout(() => {
                _this.$notification.success({
                  message: "欢迎",
                  description: "欢迎回来",
                })
              }, 1000)
            })
            .catch((e) => {
              // 登录失败
              _this.btnLoading = false
              _this.$message.warning(e.msg)
              _this.baseForm.password = ""
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
  z-index: 10;
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
.bg-bubbles {
  position: absolute;
  // 使气泡背景充满整个屏幕；
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // 如果元素内容超出给定的宽度和高度，overflow 属性可以确定是否显示滚动条等行为；
  overflow: hidden;
  li {
    position: absolute;
    // bottom 的设置是为了营造出气泡从页面底部冒出的效果；
    bottom: -160px;
    // 默认的气泡大小；
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.15);
    list-style: none;
    // 使用自定义动画使气泡渐现、上升和翻滚；
    animation: square 15s infinite;
    transition-timing-function: linear;
    // 分别设置每个气泡不同的位置、大小、透明度和速度，以显得有层次感；
    // border-radius: 50%;
    &:hover {
      animation-play-state: paused;
      // transition: 0.1s all linear;
    }
    &:nth-child(1) {
      left: 10%;
      width: 120px;
      height: 120px;
      animation-delay: 6s;
      animation-duration: 7s;
    }
    &:nth-child(2) {
      left: 20%;
      width: 90px;
      height: 90px;
      animation-delay: 2s;
      animation-duration: 7s;
    }
    &:nth-child(3) {
      left: 17%;
      width: 160px;
      height: 160px;
      animation-delay: 4s;
    }
    &:nth-child(4) {
      left: 44%;
      width: 60px;
      height: 60px;
      animation-duration: 8s;
      background-color: rgba(255, 255, 255, 0.3);
    }
    &:nth-child(5) {
      left: 70%;
    }
    &:nth-child(6) {
      left: 80%;
      width: 120px;
      height: 120px;
      animation-delay: 3s;
      background-color: rgba(255, 255, 255, 0.2);
    }
    &:nth-child(7) {
      left: 90%;
      width: 160px;
      height: 160px;
      animation-delay: 2s;
    }
    &:nth-child(8) {
      left: 55%;
      width: 60px;
      height: 60px;
      animation-delay: 4s;
      animation-duration: 15s;
    }
    &:nth-child(9) {
      left: 25%;
      width: 80px;
      height: 80px;
      animation-delay: 2s;
      animation-duration: 12s;
      background-color: rgba(255, 255, 255, 0.3);
    }
    &:nth-child(10) {
      left: 65%;
      width: 160px;
      height: 160px;
      animation-delay: 5s;
    }
    &:nth-child(11) {
      left: 55%;
      width: 160px;
      height: 160px;
      animation-delay: 3s;
    }
    &:nth-child(12) {
      left: 5%;
      width: 160px;
      height: 160px;
      animation-delay: 3s;
    }
    &:nth-child(13) {
      left: 24%;
      width: 90px;
      height: 90px;
      animation-delay: 2s;
    }
    &:nth-child(14) {
      left: 10%;
      width: 90px;
      height: 90px;
      animation-delay: 1s;
    }
    &:nth-child(15) {
      left: 3%;
      width: 90px;
      height: 90px;
      animation-delay: 1s;
    }
  }
  // 自定义 square 动画；
  @keyframes square {
    0% {
      opacity: 0.5;
      transform: translateY(0px) rotate(45deg);
    }
    25% {
      opacity: 0.75;
      transform: translateY(-400px) rotate(90deg);
    }
    50% {
      opacity: 1;
      transform: translateY(-600px) rotate(135deg);
    }
    100% {
      opacity: 0;
      transform: translateY(-1000px) rotate(180deg);
    }
  }
}
</style>
