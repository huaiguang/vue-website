<template>
  <console-layout :activeIndex="activeIndex">
    <div class="wrapper">
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
  data() {
    return {
      activeIndex: '3-1'
    }
  },
  mounted() {
    console.log(location.hash)
  },
}
</script>
