<template>
  <el-aside style="width: 200px;">
    <el-menu
      unique-opened
      :default-active="activeIndex"
      @select="handleSelect">
      <!-- .is-active 指当前选中的 menuItem, .is-opened 指当前展开的 submenu
      .is-active.is-opened 指当前展开的 submenu 中有选中的 menuItem -->
      <el-menu-item index="1">
        <i class="el-icon-s-home"></i>
        <a slot="title" href="/console/home.html">首页</a>
      </el-menu-item>
      <el-submenu v-for="item in menu" :index="item.index" :key="item.index">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="child in item.children" :index="child.index" :key="child.index">
            <a class="menu-route" :href="child.url">{{ child.title }}</a>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
import menu from 'common/config/menu'

export default {
  name: 'BaseAside',
  props: {
    activeIndex: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      menu
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

.menu-route {
  display: block;
}
</style>
