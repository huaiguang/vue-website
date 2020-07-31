<template>
  <div class="container">
    <h2>rsa加解密</h2>
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="item-title">rsa pubKey</div>
        <el-input class="item-encrypt" v-model="pubKey" placeholder="输入rsa公钥"></el-input>
        <el-input class="item-encrypt" type="textarea" v-model="originalText00" placeholder="请输入原文"></el-input>
        <el-button class="item-encrypt" @click="encryptTextByRsa">rsa加密</el-button>
        <el-input class="item-encrypt" type="textarea" v-model="encryptedText00" readonly></el-input>
      </el-col>
      <el-col :span="12">
        <div class="item-title">rsa pubKey</div>
        <el-input class="item-encrypt" v-model="pubKey" placeholder="输入rsa公钥"></el-input>
        <el-input class="item-encrypt" type="textarea" v-model="encryptedText01" readonly></el-input>
        <el-button class="item-encrypt" @click="decryptTextByRsa">rsa解密</el-button>
        <el-input class="item-encrypt" type="textarea" v-model="originalText01" placeholder="请输入原文"></el-input>
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
      pubKey: '',
      priKey: '',
      originalText00: '',
      encryptedText00: '',
      originalText01: '',
      encryptedText01: ''
    }
  },
  created() {

  },
  methods: {
    encryptTextByRsa() {
      this.encryptedText00 = rsaEncrypt(this.originalText00)
    },
    decryptTextByRsa() {
      this.originalText01 = rsaDecrypt(this.encryptedText01)
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
