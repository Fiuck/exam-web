<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <sider></sider>
    <a-layout>
      <nav-bar></nav-bar>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        Content
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import Sider from "components/content/sider"
import NavBar from "components/content/navbar"
export default {
  name: "Layout",
  components: {
    Sider,
    NavBar,
  },
  data() {
    return {}
  },
}
</script>
<style>
#components-layout-demo-custom-trigger {
  height: 100vh;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
