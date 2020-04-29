<template>
  <div class="container">
    <router-link to="#">一般功能</router-link>
    <router-link to="/index/reset">表单重置</router-link>
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
