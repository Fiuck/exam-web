<template>
  <a-layout-header style="background: #fff; padding: 0">
    <a-icon
      class="trigger"
      :type="isCollapsed ? 'menu-unfold' : 'menu-fold'"
      @click="toggleSiderBar"
    />
    <a-dropdown class="avatar-container">
      <span class="avatar-wrapper">
        <a-avatar :size="40" shape="square" :src="avatar" />
        <span class="user-label">{{ username }}</span>
      </span>
      <a-menu slot="overlay">
        <a-menu-item key="0">
          <a-icon type="user" />
          个人中心
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="1" @click.native="logout">
          <a-icon type="logout" />
          登出
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </a-layout-header>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["siderbar", "username", "avatar"]),
    isCollapsed() {
      return this.siderbar.opened
    },
  },
  methods: {
    toggleSiderBar() {
      this.$store.dispatch("app/toggleSiderBar")
    },
    // 注销
    logout() {
      let _this = this
      this.$confirm({
        title: "确定注销并退出系统吗？",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          _this.$store.dispatch("login/LogOut").then(() => {
            location.href = "/login"
          })
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.avatar-container {
  float: right;
  height: 100%;
  margin-right: 25px;
  padding: 0 15px;

  &:hover {
    background-color: #f0f0f0;
    transition: all 0.2s ease-out;
  }
}
.avatar-wrapper {
  position: relative;
}
.user-label {
  margin-left: 15px;
  font-size: 16px;
}
</style>
