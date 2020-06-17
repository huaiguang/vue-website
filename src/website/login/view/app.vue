<template>
  <website-layout>
    <div class="container-module">
      <div class="form-wrapper">
        <h1 class="form-login__title">登 陆</h1>
        <el-form class="form-login" ref="loginForm" :model="loginForm">
          <el-form-item label="" prop="username">
            <el-input v-model="loginForm.username" placeholder="登陆邮箱"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="登陆密码"></el-input>
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
import WebsiteLayout from '@/common/components/BaseLayout/WebsiteLayout'
import Banner from '@/common/assets/images/banner.jpeg'
import { createAesKey, aesEncrypt, rsaEncrypt, aesDecrypt } from '@/common/utils/encryption'
import createXHR from '@/common/utils/server-xhr'

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
    // this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      createXHR({
        url: 'http://localhost:8084/userList?username=chen&password=123a',
        method: 'get'
      }).then(data => {
        if (data.code === '000000') {
          console.log('获取用户信息成功')
        }
      })
    },
    register() {
      createXHR({
        url: 'http://localhost:8084/register',
        method: 'post',
        data: this.loginForm
      }).then(data => {
        if (data.code === '000000') {
          console.log('注册成功')
        }
      })
    },
    login() {
      createXHR({
        url: 'http://localhost:8084/login',
        method: 'post',
        data: this.loginForm,
        dataType: 'qs'
      }).then(data => {
        if (data.code === '000000') {
          console.log('登陆成功')
          window.location.href = '/console/home.html'
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
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
  background-color: rgba(255, 255, 255, .9);
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
