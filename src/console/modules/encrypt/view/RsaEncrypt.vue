<template>
  <div class="container">
    <div class="wrapper-item">
      <h2>生成唯一的随机数</h2>
      <div class="item-detail">
        <div class="item-name">10进制随机数:</div>
        <div class="item-desc">{{ decRandomDigit }}</div>
      </div>
      <div class="item-detail">
        <div class="item-name">10进制的随机数位数:</div>
        <div class="item-desc">{{ decRandomDigit.length }}</div>
      </div>
      <div class="item-detail">
        <div class="item-name">36进制随机数:</div>
        <div class="item-desc">{{ s36RandomDigit }}</div>
      </div>
      <div class="item-detail">
        <div class="item-name">36进制随机数位数:</div>
        <div class="item-desc">{{ s36RandomDigit.length }}</div>
      </div>
      <el-button @click="createUniqueRandomNumber">生成随机数</el-button>
    </div>

    <div class="wrapper-item">
      <h2>rsa加解密</h2>
      <div class="item-encrypt">
        <div class="item-title">rsa 加密</div>
        <div class="item-detail">
          <div class="item-name with-input">待加密的数据:</div>
          <div class="item-desc">
            <el-input v-model="decryptedRsaText01" placeholder="请输入原文"></el-input>
          </div>
        </div>
        <div class="item-detail">
          <div class="item-name">加密后的数据:</div>
          <div class="item-desc">{{ encryptedRsaText01 }}</div>
        </div>
        <el-button class="btn-encrypt" @click="encryptTextByRsa">rsa加密</el-button>
      </div>
      <div class="item-encrypt">
        <div class="item-title">rsa 解密</div>
        <div class="item-detail">
          <div class="item-name">加密后的数据:</div>
          <div class="item-desc">
            <el-input type="textarea" :rows="3" v-model="encryptedRsaText02"></el-input>
          </div>
        </div>
        <div class="item-detail">
          <div class="item-name">解密后的数据:</div>
          <div class="item-desc">{{ decryptedRsaText02 }}</div>
        </div>
        <el-button class="btn-encrypt" @click="decryptTextByRsa">rsa解密</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { rsaEncrypt, rsaDecrypt } from '@/common/utils/encryption'

export default {
  name: 'RsaEncrypt',
  data() {
    return {
      // 随机数
      // 10进制的随机数
      decRandomDigit: '',
      // 36进制的随机数
      s36RandomDigit: '',

      // rsa加密
      // 加密的正文
      encryptedRsaText01: '',
      decryptedRsaText01: '',
      // 解密的正文
      encryptedRsaText02: '',
      decryptedRsaText02: ''
    }
  },
  methods: {
    createUniqueRandomNumber() {
      const decRandomDigit = Math.random()
        .toString()
        .substr(2)
      const s36RandomDigit = Number(decRandomDigit).toString(36)
      console.group()
      console.log(decRandomDigit, decRandomDigit.length)
      console.log(s36RandomDigit, s36RandomDigit.length)
      console.groupEnd()
      this.decRandomDigit = decRandomDigit
      this.s36RandomDigit = s36RandomDigit
    },
    encryptTextByRsa() {
      this.encryptedRsaText01 = rsaEncrypt(this.decryptedRsaText01)
      console.log(this.encryptedRsaText01)
    },
    decryptTextByRsa() {
      this.decryptedRsaText02 = rsaDecrypt(this.encryptedRsaText02, false)
      console.log(this.decryptedRsaText02)
    }
  }
}
</script>
