<template>
  <div class="login-box">
    <h1>登 陆</h1>
    <el-form ref="loginForm" :model="loginForm" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" placeholder="请填写用户名"></el-input>
      </el-form-item>
      <el-form-item label="登陆密码" prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="请填写登陆密码"></el-input>
      </el-form-item>
      <el-form-item class="text-center">
        <el-button type="primary" plain @click="login">登陆</el-button>
        <el-button type="primary" plain @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Banner from '@/common/assets/images/banner.jpeg'
import { createAesKey, aesEncrypt, rsaEncrypt, aesDecrypt } from '@/common/utils/encryption'
import createXHR from '@/common/utils/server-xhr'

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  created() {
    this.getUserInfo()
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
.login-box {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 270px;
  height: 280px;
  > h1 {
    margin-left: 80px;
    text-align: center;
  }
}
</style>
