<template>
  <div class="menu">
    <h1>组件列表</h1>
    <ul>
      <li>
        <el-link type="primary" href="./form.html">表单（form）</el-link>
      </li>
      <li>
        <el-link type="primary" href="./table.html">表格（table）</el-link>
      </li>
    </ul>
    <el-button @click="logout">退出登陆</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      location.href = '../website/login.html'
    }
  }
}
</script>

<style lang="scss" scope>

</style>
