<template>
  <div class="container">
    <div class="wrapper-item">
      <h2>aes加解密</h2>
      <div class="item-encrypt">
        <div class="item-title">aes 加密</div>
        <div class="item-detail">
          <div class="item-name with-input">aes的密钥:</div>
          <div class="item-desc">
            <el-input v-model="aesKey" placeholder="请输入aes的密钥"></el-input>
          </div>
        </div>
        <div class="item-detail">
          <div class="item-name">待加密的正文:</div>
          <div class="item-desc">
            <el-input
              :rows="5"
              type="textarea"
              v-model="decryptedAesText01"
              placeholder="请输入待加密/解密的正文"
            ></el-input>
          </div>
        </div>
        <div class="item-detail">
          <div class="item-name">加密后的数据:</div>
          <div class="item-desc">{{ encryptedAesText01 }}</div>
        </div>
        <el-button @click="encryptTextByAes">aes加密</el-button>
      </div>

      <div class="item-encrypt">
        <div class="item-title">aes 解密</div>
        <div class="item-detail">
          <div class="item-name with-input">aes的密钥:</div>
          <div class="item-desc">
            <el-input v-model="aesKey" placeholder="请输入aes的密钥"></el-input>
          </div>
        </div>
        <div class="item-detail">
          <div class="item-name">待解密的正文:</div>
          <div class="item-desc">
            <el-input
              :rows="5"
              type="textarea"
              v-model="encryptedAesText02"
              placeholder="请输入待加密/解密的正文"
            ></el-input>
          </div>
        </div>
        <el-button @click="decryptTextByAes">aes解密</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { createAesKey, aesEncrypt, aesDecrypt } from '@/common/utils/encryption'

export default {
  name: 'RsaEncrypt',
  data() {
    return {
      aesKey: '',
      encryptedAesText01: '',
      decryptedAesText01: '',
      encryptedAesText02: '',
      decryptedAesText02: '',
    }
  },
  created() {
    this.aesKey = createAesKey()
  },
  methods: {
    encryptTextByAes() {
      this.encryptedAesText01 = aesEncrypt(this.decryptedAesText01, this.aesKey)
      console.log(this.encryptedAesText01)
    },
    decryptTextByAes() {
      this.decryptedAesText02 = aesDecrypt(this.encryptedAesText02, this.aesKey)
      console.group()
      console.log(typeof this.encryptedAesText02, this.encryptedAesText02)
      console.log(typeof this.decryptedAesText02, this.decryptedAesText02)
      console.groupEnd()
    },
  },
}
</script>
