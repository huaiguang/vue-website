<template>
  <div class="container">
    <h2>rsa加解密</h2>
    <el-row :gutter="10">
      <el-col :span="24">
        <div>生成随机数</div>
        <el-input class="item-encrypt" type="textarea" v-model="randomDigit" placeholder="唯一的随机数"></el-input>
        <el-button @click="createUniqueRandomNumber">随机数</el-button>
      </el-col>
      <el-col :span="12">
        <div class="item-title">rsa 加密</div>
        <el-input class="item-encrypt" type="textarea" v-model="originalText" placeholder="请输入原文"></el-input>
        <el-button class="item-encrypt" @click="encryptTextByRsa">rsa加密</el-button>
      </el-col>
      <el-col :span="12">
        <div class="item-title">rsa 解密</div>
        <el-input class="item-encrypt" type="textarea" :rows="3" v-model="encryptedText"></el-input>
        <el-button class="item-encrypt" @click="decryptTextByRsa">rsa解密</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { rsaEncrypt, rsaDecrypt } from '@/common/utils/encryption'

export default {
  name: 'RsaEncrypt',
  data() {
    return {
      randomDigit: '',
      // 加密
      originalText: '',
      encryptedText: ''
    }
  },
  methods: {
    createUniqueRandomNumber() {
      this.randomDigit = Number(Math.random().toString().substr(2)).toString(36)
    },
    encryptTextByRsa() {
      console.log(rsaEncrypt(this.originalText))
    },
    decryptTextByRsa() {
      console.log(rsaDecrypt(this.encryptedText, false))
    }
  }
}
</script>

<style lang="scss">
.item-title,
.item-encrypt {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
