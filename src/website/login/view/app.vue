<template>
  <div class="login-box">
    <h1>登 陆</h1>
    <el-form ref="loginForm" :model="loginForm" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" placeholder="请填写用户名"></el-input>
      </el-form-item>
      <el-form-item label="登陆密码" prop="password">
        <el-input v-model="loginForm.password" placeholder="请填写登陆密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="login">登 陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Banner from 'src/common/assets/images/banner.jpeg'
import { createAesKey, aesEncrypt, rsaEncrypt, aesDecrypt } from 'src/common/assets/js/encryption'
import { merchantInfo } from 'src/common/data/merchant-info'

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    encrypt() {
      // const start = Date.now()
      // console.log(start)
      // const aesKey = createAesKey()
      // const encryptedAesKey = rsaEncrypt(aesKey)
      // const aesEncryptedData = aesEncrypt(merchantInfo, aesKey)
      const aesKey = 'bwue2o68acurklvx';
      const aesEncryptedData = 'zge9D+xU0UWDn5Fer0EBgSr+FcBRwIp0QYkk9OIiYl9r5KADecIBmfihLoqjFxi/RbYuYbhAFnzS3lF1TiVcxA==';
      const decryptedAesData = aesDecrypt(aesEncryptedData, aesKey)
      console.log(decryptedAesData)
      // console.log(Date.now() - start)
      // console.group()
      // console.log(aesKey)
      // console.log(encryptedAesKey)
      // console.log(aesEncryptedData)
      // console.log(decryptedAesData)
      // console.groupEnd()
    },
    login() {
      this.encrypt()
      if (this.loginForm.password === '1234#abc') {
        location.href = '../console/home.html'
      }
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
    text-align: center;
  }
}
</style>
