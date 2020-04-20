<template>
  <div class="container">
    <el-button @click="gotoPageByName('combine')">Combine</el-button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {

    }
  },
  methods: {
    gotoPageByName(routeName) {
      this.$router.push({ name: routeName })
    }
  }
}
</script>
