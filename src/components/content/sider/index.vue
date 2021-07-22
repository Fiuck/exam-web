<template>
  <a-layout-sider v-model="isCollapsed" :trigger="null" collapsible>
    <div class="logo" />
    <sider-bar></sider-bar>
  </a-layout-sider>
</template>

<script>
import SiderBar from "components/content/sider/siderbar"
import { mapGetters } from "vuex"
export default {
  name: "Sider",
  components: {
    SiderBar,
  },
  computed: {
    ...mapGetters(["siderbar"]),
    isCollapsed() {
      return !this.siderbar.opened
    },
  },
  data() {
    return {
      collapsed: this.collapsed,
    }
  },
}
</script>

<style scoped></style>
