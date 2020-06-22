<template>
  <console-layout :activeIndex="'2-1'">
    <div class="wrapper">
      <h1>表单注意点</h1>
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

</style>
