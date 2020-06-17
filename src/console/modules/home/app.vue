<template>
  <console-layout>
    <div class="wrapper">
      <h1>组件列表</h1>
      <el-row>
        <el-col :span="8">
          <ul class="menu-wrap">
            <li class="menu-item">
              <el-link type="primary" href="./form.html">表单（form）</el-link>
            </li>
            <li class="menu-item">
              <el-link type="primary" href="./table.html">表格（table）</el-link>
            </li>
            <li class="menu-item">
              <el-link type="primary" href="./encrypt.html">加解密</el-link>
            </li>
          </ul>
        </el-col>
        <el-col :span="8">

        </el-col>
        <el-col :span="8">

        </el-col>
      </el-row>
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
