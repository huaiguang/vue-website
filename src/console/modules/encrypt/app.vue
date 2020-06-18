<template>
  <console-layout :activeIndex="'4-1'">
    <div class="wrapper">
      <h1>前端加解密</h1>
      <el-row>
        <el-col :span="4">
          <router-link to="/rsa-encrypt">rsa加解密</router-link>
        </el-col>
        <el-col :span="4">
          <router-link to="/aes-encrypt">aes加解密</router-link>
        </el-col>
      </el-row>
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
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
