<template>
  <div class="container">
    <h2>aes加解密</h2>
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="item-title">aes pubKey</div>
        <el-input class="item-encrypt" v-model="pubKey" placeholder="输入rsa公钥"></el-input>
        <el-input class="item-encrypt" :rows="5" type="textarea" v-model="encryptedText" placeholder="请输入原文"></el-input>
        <el-button class="item-encrypt" @click="decryptTextByAes">aes解密</el-button>
        <el-input class="item-encrypt" :rows="5" type="textarea" v-model="decryptedText" readonly></el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { aesEncrypt, aesDecrypt } from '@/common/utils/encryption'

export default {
  name: 'RsaEncrypt',
  data() {
    return {
      pubKey: '',
      encryptedText: '',
      decryptedText: ''
    }
  },
  methods: {
    decryptTextByAes() {
      this.decryptedText = aesDecrypt(this.encryptedText, this.pubKey)
      console.log(JSON.parse(this.decryptedText))
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
