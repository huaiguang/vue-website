<template>
  <console-layout :activeIndex="'4-1'">
    <div class="wrapper">
      <h1>前端加解密</h1>
      <router-view></router-view>
    </div>
  </console-layout>
</template>

<script>
import ConsoleLayout from 'common/components/BaseLayout/ConsoleLayout'

export default {
  components: {
    ConsoleLayout
  },
}
</script>
