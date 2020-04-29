<template>
  <div class="wrapper">
    <h1>表单注意点</h1>
    <el-row>
      <el-col :span="4">
        <router-link to="/index">表单介绍</router-link>
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    gotoPageByName(name) {
      this.$router.push({ name })
    }
  }
}
</script>
