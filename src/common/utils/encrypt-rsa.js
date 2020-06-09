import JSEncrypt from 'jsencrypt'
import CryptoJS from 'crypto-js'

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCtCn6P1d/Z42v7/R1Pdva4NJPpiZGPd7xSQU33vNu6Z5D4Si2owcuV/yFsKvOeB/oFoQ2R0OXok68ARK9E00AauCI0iTqPnIRvNN53bdGT/TAq9mUuBgBeLtEgsqyKAS1qiigTSH7/pEYyeHbV7dN6HOUttx4UyPsfeSkjMc6LHwIDAQAB'

const privatekey = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAK0Kfo/V39nja/v9HU929rg0k+mJkY93vFJBTfe827pnkPhKLajBy5X/IWwq854H+gWhDZHQ5eiTrwBEr0TTQBq4IjSJOo+chG803ndt0ZP9MCr2ZS4GAF4u0SCyrIoBLWqKKBNIfv+kRjJ4dtXt03oc5S23HhTI+x95KSMxzosfAgMBAAECgYAaQMhY3DL9JMLiVVGYF81wvxFd0jBSWvEobZ39oxqXGlVlRiPNQbG4jR+uAIo7hKxLJFchs1beRWG8oa8RuxczdqGe5wVhxPNGpMQ5UKl61moqKBO/Og7WhNJBak2E6sipIbp3iK3KKwYPLN8CMDWnWBYWcRIrctUMPRkRVZtfiQJBANzuZ9Lp7Z9+uS2JTrEvxRf4gOJM08PbYASvo/xFVrfNB1lXOg4nXRifc8cQc0ctU6ImwJ/DaIKgMyNDXS35cxsCQQDIgg5ZkV2SGEjwRFgqUYrtOYDgoT2BF/nSeAqqbr0Mul/ilO3Y6IQQ77tZAbAx0Ha2it4W88aJVd//xEqlF4RNAkB9k5k5/jNNvBb/dhNfjVqHFH4VozufENuT7k3Uf4kZ8hUiR/08vE0jSMbjOEt+ApqOCV7lsIl/7hUDDzAwiKBPAkBMjQLnhU1BIs5uFNnIRluRGFww5r5xk/LIPRZtXVwGCP3kptFr99G8GZrgb3mSezFnnfsOrkGFW2jq4ElTYHgdAkEAhpMRG5vgOrEimH9e/9Lf9GVgy/Lr4AjzeaJErKUZJU8uDU74YsFdZDmKyL6osoO4J6sKofafl5/OrHgzkO3w2g=='

const encryptor = new JSEncrypt() // JSEncrypt对象
encryptor.setPublicKey(publicKey) // 公钥
encryptor.setPrivateKey(privatekey) // 私钥

// 使用 公钥 加密
// 加密最大长度为117位
function rsaEncrypt(data) {
  if (!data) {
    return ''
  }
  let rsaPassWord = ''
  if (typeof data === 'string') {
    rsaPassWord = encryptor.encrypt(data)
  } else {
    rsaPassWord = encryptor.encrypt(JSON.stringify(data))
  }
  return rsaPassWord
}

// 使用 私钥 解密
// 加密最大长度是128位
function rsaDecrypt(str, isObject = true) {
  if (!str) {
    return ''
  }
  const plainText = encryptor.decrypt(str)
  console.log(typeof plainText, plainText, str)
  if (isObject === true) {
    return JSON.parse(plainText)
  } else {
    return plainText
  }
}

// 用私钥签名
function rsaSign(val) {
  const sign = new JSEncrypt()
  sign.setPrivateKey(privatekey)
  const signature = sign.sign(val, CryptoJS.SHA256, 'sha256')

  const verify = new JSEncrypt()
  verify.setPublicKey(publicKey)
  const verified = verify.verify(val, signature, CryptoJS.SHA256)
  console.log(typeof verified, verified)
}

export {
  rsaEncrypt,
  rsaDecrypt,
  rsaSign
}
