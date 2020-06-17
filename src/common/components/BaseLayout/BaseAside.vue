<template>
  <el-aside style="width: 200px;">
    <el-menu
      default-active="2"
      @select="handleSelect">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>表单</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">重置</el-menu-item>
          <el-menu-item index="1-2">校验</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'BaseAside',
  data() {
    return {

    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    handleSelect(key, keyPath) {
      console.log('select', key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-aside {
  color: #333;
  background-color: #D3DCE6;
}
</style>
