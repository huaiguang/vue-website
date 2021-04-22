<template>
  <div class="base-layout">
    <base-header></base-header>
    <el-container>
      <base-aside :activeIndex="activeIndex"></base-aside>
      <el-main>
        <slot></slot>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import BaseHeader from './BaseHeader'
import BaseAside from './BaseAside'

export default {
  name: 'ConsoleLayout',
  components: {
    BaseHeader,
    BaseAside
  },
  props: {
    activeIndex: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.base-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
