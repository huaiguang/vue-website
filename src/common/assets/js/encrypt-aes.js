import CryptoJS from 'crypto-js'

// clent 端生成随机数
// const secretkey = 'I have a dream';

function aesEncrypt(data) {
  if (!data) {
    return ''
  }
  let encryptedStr = ''
  if (typeof data === 'object') {
    encryptedStr = JSON.stringify(data)
  } else {
    encryptedStr = data
  }
  return CryptoJS.AES.encrypt(encryptedStr, secretkey).toString()
}

function aesDecrypt(data, isObject = true) {
  if (!data) {
    return ''
  }
  const bytes = CryptoJS.AES.decrypt(data, secretkey)
  const plainText = bytes.toString(CryptoJS.enc.Utf8)
  if (isObject === true) {
    return JSON.parse(plainText)
  } else {
    return plainText
  }
}

export {
  secretkey,
  aesEncrypt,
  aesDecrypt
}
