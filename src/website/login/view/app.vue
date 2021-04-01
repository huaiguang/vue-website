<template>
  <website-layout>
    <div class="container-module">
      <div class="form-wrapper">
        <h1 class="form-login__title">登陆</h1>
        <el-form ref="loginForm" class="form-login" :model="loginForm">
          <el-form-item label="" prop="username">
            <el-input v-model="loginForm.username" placeholder="登陆邮箱"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="登陆密码"
            ></el-input>
          </el-form-item>
          <el-form-item class="text-center">
            <el-button type="primary" plain @click="login">登陆</el-button>
            <el-button type="primary" plain @click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </website-layout>
</template>

<script>
import Vue from 'vue'
import Loading from '@/common/plugins/Loading'
import WebsiteLayout from '@/common/components/BaseLayout/WebsiteLayout'
import api from '@/common/service/api'

// 引入插件
Vue.use(Loading)

export default {
  components: {
    WebsiteLayout
  },
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  created() {
    this.addLoading()
    this.createVersionInfo()
  },
  methods: {
    createVersionInfo() {
      const versionInfoList = [
        {
          title: 'environment',
          content: process.env.NODE_ENV,
          backgroundColor: '#42c02e'
        },
        {
          title: 'version',
          content: '1.0.0',
          backgroundColor: '#1475b2'
        },
        {
          title: 'Build Date ',
          content: BuildDate,
          backgroundColor: '#1475b2'
        }
      ]
      function output(e) {
        const t = e.title,
          c = e.content,
          n = e.backgroundColor,
          a = [
            '%c '.concat(t, ' %c ').concat(c, ' '),
            'padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: '.concat(
              '#606060',
              ';'
            ),
            'padding: 1px; border-radius: 0 3px 3px 0; color: #fff; background: '.concat(n, ';')
          ]

        // return function() {
        //   let e
        //   window.console && typeof window.console.log === 'function' && (e = console).log.apply(e, arguments)
        // }
        //   .apply(void 0, a)
        // console.log.apply(null, a)
        console.log(...a)
      }

      versionInfoList.forEach(output)
    },
    addLoading() {
      this.$loading.show()
      this.$nextTick(() => {
        this.$loading.hide()
      })
    },
    getUserInfo() {
      this.$httpGet(api.userList, this.loginForm).then(data => {
        this.$message({
          type: 'success',
          message: data.message
        })
      })
    },
    register() {
      this.$httpPost(api.register, this.loginForm).then(data => {
        this.$message({
          type: 'success',
          message: data.message
        })
      })
    },
    login() {
      this.$httpPost(api.login, this.loginForm).then(data => {
        this.$message({
          type: 'success',
          message: data.message
        })
        setTimeout(() => {
          window.location.href = '/console/home.html'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container-module {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.form-wrapper {
  width: 500px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.9);
  text-align: center;
  > .form-login__title {
    margin: 50px auto;
  }
}

.form-login {
  margin: 0 auto;
  width: 400px;
}
</style>
