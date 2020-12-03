<template>
  <console-layout :activeIndex="'2-1'">
    <div class="wrapper">
      <div class="submenu">
        <router-link class="submenu-item" to="/index">图片上传</router-link>
        <router-link class="submenu-item" to="/reset">表单重置</router-link>
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
  },
  methods: {

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
