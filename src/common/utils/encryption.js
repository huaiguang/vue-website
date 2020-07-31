import CryptoJS from 'crypto-js'
import JSEncrypt from 'jsencrypt'

const rsaPublicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCtCn6P1d/Z42v7/R1Pdva4NJPpiZGPd7xSQU33vNu6Z5D4Si2owcuV/yFsKvOeB/oFoQ2R0OXok68ARK9E00AauCI0iTqPnIRvNN53bdGT/TAq9mUuBgBeLtEgsqyKAS1qiigTSH7/pEYyeHbV7dN6HOUttx4UyPsfeSkjMc6LHwIDAQAB'

const rsaPrivateKey = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAK0Kfo/V39nja/v9HU929rg0k+mJkY93vFJBTfe827pnkPhKLajBy5X/IWwq854H+gWhDZHQ5eiTrwBEr0TTQBq4IjSJOo+chG803ndt0ZP9MCr2ZS4GAF4u0SCyrIoBLWqKKBNIfv+kRjJ4dtXt03oc5S23HhTI+x95KSMxzosfAgMBAAECgYAaQMhY3DL9JMLiVVGYF81wvxFd0jBSWvEobZ39oxqXGlVlRiPNQbG4jR+uAIo7hKxLJFchs1beRWG8oa8RuxczdqGe5wVhxPNGpMQ5UKl61moqKBO/Og7WhNJBak2E6sipIbp3iK3KKwYPLN8CMDWnWBYWcRIrctUMPRkRVZtfiQJBANzuZ9Lp7Z9+uS2JTrEvxRf4gOJM08PbYASvo/xFVrfNB1lXOg4nXRifc8cQc0ctU6ImwJ/DaIKgMyNDXS35cxsCQQDIgg5ZkV2SGEjwRFgqUYrtOYDgoT2BF/nSeAqqbr0Mul/ilO3Y6IQQ77tZAbAx0Ha2it4W88aJVd//xEqlF4RNAkB9k5k5/jNNvBb/dhNfjVqHFH4VozufENuT7k3Uf4kZ8hUiR/08vE0jSMbjOEt+ApqOCV7lsIl/7hUDDzAwiKBPAkBMjQLnhU1BIs5uFNnIRluRGFww5r5xk/LIPRZtXVwGCP3kptFr99G8GZrgb3mSezFnnfsOrkGFW2jq4ElTYHgdAkEAhpMRG5vgOrEimH9e/9Lf9GVgy/Lr4AjzeaJErKUZJU8uDU74YsFdZDmKyL6osoO4J6sKofafl5/OrHgzkO3w2g=='

const encryptor = new JSEncrypt()

/**
 * AES 加密
 * @param word 待加密字段
 * @param keyStr 加密 key
 * @returns {string} 返回加密字段
 */
export function aesEncrypt(word, keyStr) {
  keyStr = keyStr
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
  if (!data) {
    return ''
  }
  encryptor.setPublicKey(rsaPublicKey)
  let rsaPassWord = ''
  if (typeof data === 'string') {
    rsaPassWord = encryptor.encrypt(data)
  } else {
    rsaPassWord = encryptor.encrypt(JSON.stringify(data))
  }
  return rsaPassWord
}

/**
 * RSA解密
 * @param {string} str 需要解密的字段
 * @param {*} isObject 可选字段，表示解密出的内容的类型
 */
export function rsaDecrypt(str, isObject = true) {
  if (!str) {
    return ''
  }
  encryptor.setPrivateKey(rsaPrivateKey) // 私钥
  const plainText = encryptor.decrypt(str)
  console.log(typeof plainText, plainText, str)
  if (isObject === true) {
    return JSON.parse(plainText)
  } else {
    return plainText
  }
}
