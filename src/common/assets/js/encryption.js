import CryptoJS from 'crypto-js'
import JSEncrypt from 'jsencrypt'

const rsaPublicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCtCn6P1d/Z42v7/R1Pdva4NJPpiZGPd7xSQU33vNu6Z5D4Si2owcuV/yFsKvOeB/oFoQ2R0OXok68ARK9E00AauCI0iTqPnIRvNN53bdGT/TAq9mUuBgBeLtEgsqyKAS1qiigTSH7/pEYyeHbV7dN6HOUttx4UyPsfeSkjMc6LHwIDAQAB'

const encryptor = new JSEncrypt()

// 生成 AESKEY
export const aesKey = createAesKey()

export function createAesKey() {
  const expect = 16
  let str = Math.random().toString(36).substr(2)
  while (str.length < expect) {
    str += Math.random().toString(36).substr(2)
  }
  str = str.substr(0, 16)
  return str
}

/**
 * AES 加密
 * @param word 待加密字段
 * @param keyStr 加密 key
 * @returns {string} 返回加密字段
 */
export function aesEncrypt(word, keyStr) {
  keyStr = keyStr || aesKey
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  let srcs = ''
  switch (typeof (word)) {
    case 'string':
      srcs = CryptoJS.enc.Utf8.parse(word)
      break
    case 'object':
      srcs = CryptoJS.enc.Utf8.parse(JSON.stringify(word))
      break
    default:
      srcs = CryptoJS.enc.Utf8.parse(word.toString())
  }
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    // iv: key, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

/**
 * AES 解密
 * @param word 待解密数据
 * @param keyStr 解密 key
 * @returns {string} 返回解密字符串
 */
export function aesDecrypt(word, keyStr) {
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const decrypt = CryptoJS.AES.decrypt(word, key, {
    // iv: key, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

/**
 * RSA 加密
 * @param data 待加密数据
 * @returns {PromiseLike<ArrayBuffer>} 返回加密字符串
 */
export function rsaEncrypt(data) {
  // 设置公钥
  encryptor.setPublicKey(rsaPublicKey)
  return encryptor.encrypt(data)
}
