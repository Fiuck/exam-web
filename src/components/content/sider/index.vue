<template>
  <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
    <div class="logo" />
    <sider-bar></sider-bar>
  </a-layout-sider>
</template>

<script>
import SiderBar from "components/content/sider/siderbar"
export default {
  name: "Sider",
  components: {
    SiderBar,
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // collapsed: this.collapsed,
    }
  },
}
</script>

<style scoped></style>
