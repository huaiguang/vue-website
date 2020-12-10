<template>
  <console-layout :activeIndex="'2-1'">
    <div class="wrapper">
      <div class="submenu">
        <router-link class="submenu-item" to="/base">基础</router-link>
        <router-link class="submenu-item" to="/valid">校验</router-link>
        <router-link class="submenu-item" to="/upload">上传</router-link>
      </div>
      <router-view></router-view>
    </div>
  </console-layout>
</template>

<script>
import ConsoleLayout from '@/common/components/BaseLayout/ConsoleLayout'

export default {
  components: {
    ConsoleLayout
  }
}
</script>

<style lang="scss" scoped>
.submenu {
  margin-bottom: 1em;
  > .submenu-item {
    display: inline-block;
    margin-right: 1em;
  }
}
</style>
