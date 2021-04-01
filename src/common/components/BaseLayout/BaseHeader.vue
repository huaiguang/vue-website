<template>
  <el-header>
    <div class="header-right">
      <el-button @click="logout">退出登陆</el-button>
    </div>
  </el-header>
</template>

<script>
export default {
  name: 'BaseHeader',
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    logout() {
      location.href = '../website/login.html'
    }
  }
}
</script>

<style lang="scss" scoped>
.header-right {
  float: right;
}
</style>
