import CryptoJS from 'crypto-js'
import JSEncrypt from 'jsencrypt'

// const rsaPublicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCtCn6P1d/Z42v7/R1Pdva4NJPpiZGPd7xSQU33vNu6Z5D4Si2owcuV/yFsKvOeB/oFoQ2R0OXok68ARK9E00AauCI0iTqPnIRvNN53bdGT/TAq9mUuBgBeLtEgsqyKAS1qiigTSH7/pEYyeHbV7dN6HOUttx4UyPsfeSkjMc6LHwIDAQAB'

// const rsaPrivateKey = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAK0Kfo/V39nja/v9HU929rg0k+mJkY93vFJBTfe827pnkPhKLajBy5X/IWwq854H+gWhDZHQ5eiTrwBEr0TTQBq4IjSJOo+chG803ndt0ZP9MCr2ZS4GAF4u0SCyrIoBLWqKKBNIfv+kRjJ4dtXt03oc5S23HhTI+x95KSMxzosfAgMBAAECgYAaQMhY3DL9JMLiVVGYF81wvxFd0jBSWvEobZ39oxqXGlVlRiPNQbG4jR+uAIo7hKxLJFchs1beRWG8oa8RuxczdqGe5wVhxPNGpMQ5UKl61moqKBO/Og7WhNJBak2E6sipIbp3iK3KKwYPLN8CMDWnWBYWcRIrctUMPRkRVZtfiQJBANzuZ9Lp7Z9+uS2JTrEvxRf4gOJM08PbYASvo/xFVrfNB1lXOg4nXRifc8cQc0ctU6ImwJ/DaIKgMyNDXS35cxsCQQDIgg5ZkV2SGEjwRFgqUYrtOYDgoT2BF/nSeAqqbr0Mul/ilO3Y6IQQ77tZAbAx0Ha2it4W88aJVd//xEqlF4RNAkB9k5k5/jNNvBb/dhNfjVqHFH4VozufENuT7k3Uf4kZ8hUiR/08vE0jSMbjOEt+ApqOCV7lsIl/7hUDDzAwiKBPAkBMjQLnhU1BIs5uFNnIRluRGFww5r5xk/LIPRZtXVwGCP3kptFr99G8GZrgb3mSezFnnfsOrkGFW2jq4ElTYHgdAkEAhpMRG5vgOrEimH9e/9Lf9GVgy/Lr4AjzeaJErKUZJU8uDU74YsFdZDmKyL6osoO4J6sKofafl5/OrHgzkO3w2g=='

const rsaPublicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDmK3+dSUiPAUZL4QpSZts8yWhVuwjVT5KZ33WyWm7QCnxQw+5MzwvQBThTk3rFvlCIx4s4wv8oLyTpUgbEHSsaRlYYiNU5D7n7KiPWcRugCYgrwMiWgA6w33AoT6YucXXeyK38wXX3OZ/k7AE5YVlIK3M6EUXuSoVXNK23QoNHpQIDAQAB'

const rsaPrivateKey = 'MIICXQIBAAKBgQDmK3+dSUiPAUZL4QpSZts8yWhVuwjVT5KZ33WyWm7QCnxQw+5MzwvQBThTk3rFvlCIx4s4wv8oLyTpUgbEHSsaRlYYiNU5D7n7KiPWcRugCYgrwMiWgA6w33AoT6YucXXeyK38wXX3OZ/k7AE5YVlIK3M6EUXuSoVXNK23QoNHpQIDAQABAoGBAKlI6tX61TPggxxByn6qiaqek28iXa/Nk4w6bu0bWA8I9z/LqxOw4AZCIJhPiuevProq0PmRaWrbqbE1FCbfMRf/9UfuwdzCkBilkOWyvJAAE7m0Fnz9Zekvh2Hb8214IBVEy8U9NDn/V/U1dQHHhpcTvvXyPMU0YAIXwPpQ1nQBAkEA9bN3rxxecLdinYSkck28x2zd2sUPFZhOeCFWdqRLSh+QnGcNFcfHp1wKlfusp3iht2um2vW2Wx5m0VR3/P8GpQJBAO/RXzBxVQH49eCsHaPNdthExkPJEcEn66aF1zBaIluoueNMEmUKV8SalIDptSwrmN75Oz5UTOWz8oebaZHwbQECQQCTqd9lK1yKy3wGBQC7/YJWLFSNNV9icB3AzvBi70ycaKoFhV102JNiPsvR5eaW48X1MUqfT4rf6j6K0gQm1bJNAkBK/zAEhzytXD0QYOL4CdYjtgZGxoeN3z0bm3l7PoTGI1LWmUCbZouiCTFtyyiEQrIQ8OItENHnd8ndzKVMJWMBAkAHKZyLj7rbCTVQDUts1vto2+L45AqWDFOR+2imEt4R99wIcgqkiUXQ+4YxyuYuBngZYrqfCMSBuT+NBy2kMcUH'

const encryptor = new JSEncrypt()

export function createAesKey() {
  const expect = 16
  let str = Math.random().toString(36).substr(2)
  while (str.length < expect) {
    str += Math.random().toString(36).substr(2)
  }
  str = str.substr(0, 16)
  return str
}

// // Encrypt
// var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();

// // Decrypt
// var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
// var originalText = bytes.toString(CryptoJS.enc.Utf8);

// // Encrypt
// var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();

// // Decrypt
// var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
// var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

/**
 * AES 加密
 * @param text 待加密字段
 * @param aesKey aes密钥
 * @returns {string} 返回加密字段
 */
export function aesEncrypt(text, aesKey) {
  const key = CryptoJS.enc.Utf8.parse(aesKey)
  let srcs = ''
  switch (typeof (text)) {
    case 'string':
      srcs = CryptoJS.enc.Utf8.parse(text)
      break
    case 'object':
      srcs = CryptoJS.enc.Utf8.parse(JSON.stringify(text))
      break
    default:
      srcs = CryptoJS.enc.Utf8.parse(text.toString())
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
 * @param text 待解密数据
 * @param aesKey aes密钥
 * @returns {string} 返回解密字符串
 */
export function aesDecrypt(text, aesKey) {
  const key = CryptoJS.enc.Utf8.parse(aesKey)
  const decrypt = CryptoJS.AES.decrypt(text, key, {
    // iv: key, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptedData = CryptoJS.enc.Utf8.stringify(decrypt).toString()
  let decryptedObj = null
  try {
    decryptedObj = JSON.parse(decryptedData)
  } catch (err) {
    decryptedObj = decryptedData
  }
  return decryptedObj
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
  console.group()
  console.log('original: ', str, str.length)
  console.log(typeof plainText, plainText)
  typeof plainText === 'string' && console.log()
  console.log(plainText)
  console.groupEnd()
  if (isObject === true) {
    return JSON.parse(plainText)
  } else {
    return plainText
  }
}
