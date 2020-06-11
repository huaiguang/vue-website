import CryptoJS from 'crypto-js'

function aesEncrypt(data, secretkey) {
  if (!data || !secretkey) {
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

function aesDecrypt({ data, isObject = true, secretkey }) {
  if (!data || !secretkey) {
    return ''
  }
  console.log(data, secretkey)
  const bytes = CryptoJS.AES.decrypt(data, secretkey)
  const plainText = bytes.toString(CryptoJS.enc.Utf8)
  if (isObject === true) {
    return JSON.parse(plainText)
  } else {
    return plainText
  }
}

export {
  aesEncrypt,
  aesDecrypt
}
