<template>
  <div class="wrapper">
    <h1>组件列表</h1>
    <el-row>
      <el-col :span="8">
        <ul class="menu-wrap">
          <li class="menu-item">
            <el-link type="primary" href="./form.html">表单（form）</el-link>
          </li>
          <li>
            <el-link type="primary" href="./table.html">表格（table）</el-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="8">

      </el-col>
      <el-col :span="8">

      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button @click="logout">退出登陆</el-button>
      </el-col>
    </el-row>
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

<style lang="scss" scoped>

</style>
