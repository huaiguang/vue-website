<template>
  <el-container>
    <base-header></base-header>
    <el-main>
      <slot></slot>
    </el-main>
  </el-container>
</template>

<script>
import BaseHeader from './BaseHeader'

export default {
  name: 'WebsiteLayout',
  components: {
    BaseHeader
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
.el-container {
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}
</style>
