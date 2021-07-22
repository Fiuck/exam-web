<template>
  <a-layout-header style="background: #fff; padding: 0">
    <a-icon
      class="trigger"
      :type="isCollapsed ? 'menu-unfold' : 'menu-fold'"
      @click="toggleSiderBar"
    />
    <a-dropdown class="avatar-container">
      <span class="avatar-wrapper">
        <a-avatar
          :size="40"
          shape="square"
          src="https://img.lemcoo.top/web-img/20210722230926.gif"
        />
        <span class="user-label">{{ username }}</span>
      </span>
      <a-menu slot="overlay">
        <a-menu-item key="0">
          <a-icon type="user" />
          个人中心
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="1">
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
    ...mapGetters(["siderbar", "username"]),
    isCollapsed() {
      return this.siderbar.opened
    },
  },
  methods: {
    toggleSiderBar() {
      this.$store.dispatch("app/toggleSiderBar")
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
