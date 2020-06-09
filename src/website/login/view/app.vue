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
    // this.getUserInfo()
  },
  methods: {
    encrypt() {
      // const start = Date.now()
      // console.log(start)
      // const aesKey = createAesKey()
      // const encryptedAesKey = rsaEncrypt(aesKey)
      // const aesEncryptedData = aesEncrypt(merchantInfo, aesKey)
      // const aesEncryptedData = aesEncrypt(data1, aesKey)
      // console.log('encrypted', data1, aesEncryptedData)
      const aesKey = 'gn9mcfix1fvmrf29';
      const aesEncryptedData = 'KnA5dTxoISo5mUU5ZsE3rFNoaukOFPPCzY8+QVSgxvjfFtEFQtJG7gcohjBoP16I6nlq+MdJgXJXPVpZasyoIJCn7VeVekNl/K3c3fgCzo2eoAKvbj8/nX4AJq+L/TBBKcs/sIkZ/Aca+N+vMuJGgQrLuI/yAzJCTbRFPtxm9sY5vVXOwSFL9n7WSpg+bZeLsz+TqRxA1j4fwj9Ow5cPItV1zt1ZwUysbGz40v8g1+ChHOX5mNyqVHVwDi2r/h1mwrwdSaYhyHxKr+FnSrSJ+A==';
      const decryptedAesData = aesDecrypt(aesEncryptedData, aesKey)
      console.log('decrypted', decryptedAesData)
      // console.log(Date.now() - start)
      // console.group()
      // console.log(aesKey)
      // console.log(encryptedAesKey)
      // console.log(aesEncryptedData)
      // console.log(decryptedAesData)
      // console.groupEnd()
    },
    getUserInfo() {
      createXHR({
        url: 'http://localhost:8084/getUserList',
        method: 'get'
      }).then(data => {
        if (data.code === '000000') {
          alert('获取用户信息成功')
        }
      })
    },
    login() {
      createXHR({
        url: 'http://localhost:8084/login',
        method: 'post',
        data: this.loginForm
      }).then(data => {
        if (data.code === '000000') {
          console.log(data.code)
          return
          location.href = '../console/home.html'
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
    text-align: center;
  }
}
</style>
