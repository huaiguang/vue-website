<template>
  <el-aside style="width: 200px;">
    <el-menu unique-opened :default-active="realIndex" @select="handleSelect">
      <!-- .is-active 指当前选中的 menuItem, .is-opened 指当前展开的 submenu
      .is-active.is-opened 指当前展开的 submenu 中有选中的 menuItem -->

      <el-menu-item index="1">
        <i class="el-icon-s-home"></i>
        <a slot="title" href="./home.html">首页</a>
      </el-menu-item>
      <el-submenu v-for="item in activeMenu" :index="item.index" :key="item.index">
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
      menu,
      realIndex: this.activeIndex
    }
  },
  computed: {
    activeMenu() {
      // 没有子项的菜单单独展示
      return this.menu.filter(item => item.children && item.children.length > 0)
    }
  },
  mounted() {
    this.adjustMenuIndexByRoute()
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log('select', key, keyPath)
    },
    adjustMenuIndexByRoute() {
      const currentRoute = location.hash
      try {
        // 找到对应的index则直接抛出错误，不必继续执行剩余的代码
        menu.forEach(item => {
          if (item.url && item.url.includes(currentRoute)) {
            this.realIndex = item.index
            throw new Error('已找到对应的' + this.realIndex)
          } else if (item.children && item.children.length > 0) {
            item.children.forEach(subItem => {
              if (subItem.url && subItem.url.includes(currentRoute)) {
                this.realIndex = subItem.index
                throw new Error('已找到对应的' + this.realIndex)
              }
            })
          } else {
            // default
          }
        })
        // 如果执行到这里，则表示循环中未找到对应的index，抛出错误
        throw new Error('未找到对应的 realIndex')
      } catch (err) {
        console.log(err.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-aside {
  color: #333;
  background-color: #d3dce6;
}

.menu-route {
  display: block;
}
</style>
