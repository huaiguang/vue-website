<template>
  <console-layout :activeIndex="'2-1'">
    <div class="wrapper">
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
