import JSEncrypt from 'jsencrypt'

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCtCn6P1d/Z42v7/R1Pdva4NJPpiZGPd7xSQU33vNu6Z5D4Si2owcuV/yFsKvOeB/oFoQ2R0OXok68ARK9E00AauCI0iTqPnIRvNN53bdGT/TAq9mUuBgBeLtEgsqyKAS1qiigTSH7/pEYyeHbV7dN6HOUttx4UyPsfeSkjMc6LHwIDAQAB'

const privatekey = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAK0Kfo/V39nja/v9HU929rg0k+mJkY93vFJBTfe827pnkPhKLajBy5X/IWwq854H+gWhDZHQ5eiTrwBEr0TTQBq4IjSJOo+chG803ndt0ZP9MCr2ZS4GAF4u0SCyrIoBLWqKKBNIfv+kRjJ4dtXt03oc5S23HhTI+x95KSMxzosfAgMBAAECgYAaQMhY3DL9JMLiVVGYF81wvxFd0jBSWvEobZ39oxqXGlVlRiPNQbG4jR+uAIo7hKxLJFchs1beRWG8oa8RuxczdqGe5wVhxPNGpMQ5UKl61moqKBO/Og7WhNJBak2E6sipIbp3iK3KKwYPLN8CMDWnWBYWcRIrctUMPRkRVZtfiQJBANzuZ9Lp7Z9+uS2JTrEvxRf4gOJM08PbYASvo/xFVrfNB1lXOg4nXRifc8cQc0ctU6ImwJ/DaIKgMyNDXS35cxsCQQDIgg5ZkV2SGEjwRFgqUYrtOYDgoT2BF/nSeAqqbr0Mul/ilO3Y6IQQ77tZAbAx0Ha2it4W88aJVd//xEqlF4RNAkB9k5k5/jNNvBb/dhNfjVqHFH4VozufENuT7k3Uf4kZ8hUiR/08vE0jSMbjOEt+ApqOCV7lsIl/7hUDDzAwiKBPAkBMjQLnhU1BIs5uFNnIRluRGFww5r5xk/LIPRZtXVwGCP3kptFr99G8GZrgb3mSezFnnfsOrkGFW2jq4ElTYHgdAkEAhpMRG5vgOrEimH9e/9Lf9GVgy/Lr4AjzeaJErKUZJU8uDU74YsFdZDmKyL6osoO4J6sKofafl5/OrHgzkO3w2g=='

// function hex2b16(h) {
//   const b64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
//   const b64padchar = '=';
//   let i;
//   let c;
//   let ret = '';
//   for (let i = 0; i + 3 <= h.length; i += 3) {
//     c = parseInt(h.substring(i, i + 3), 16);
//     ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
//   }
//   if (i + 1 === h.length) {
//     c = parseInt(h.substring(i, i + 1), 16);
//     ret += b64map.charAt(c << 2);
//   } else if (i + 2 === h.length) {
//     c = parseInt(h.substring(i, i + 2), 16);
//     ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
//   }
//   while ((ret.length & 3) > 0) ret += b64padchar;
//   return ret;
// }
//超过117(加密)长度的原文内容分割成多个部分

// 在源码 自己 添加
// JSEncrypt.prototype.encryptLong = function(string) {
//   const k = this.getKey()
//   try {
//     const lt = '';
//     let ct = '';
//     //RSA每次加密117bytes，需要辅助方法判断字符串截取位置
//     //1.获取字符串截取点
//     const bytes = [];
//     bytes.push(0);
//     let byteNo = 0;
//     const len = string.length;
//     let c;
//     let temp = 0;
//     for (let i = 0; i < len; i++) {
//       c = string.charCodeAt(i);
//       if (c >= 0x010000 && c <= 0x10FFFF) {
//         byteNo += 4;
//       } else if (c >= 0x000800 && c <= 0x00FFFF) {
//         byteNo += 3;
//       } else if (c >= 0x000080 && c <= 0x0007FF) {
//         byteNo += 2;
//       } else {
//         byteNo += 1;
//       }
//       if ((byteNo % 117) >= 114 || (byteNo % 117) === 0) {
//         if (byteNo - temp >= 114) {
//           bytes.push(i);
//           temp = byteNo;
//         }
//       }
//     }
//     //2.截取字符串并分段加密
//     if (bytes.length > 1) {
//       for (let i = 0; i < bytes.length - 1; i++) {
//         let str;
//         if (i === 0) {
//           str = string.substring(0, bytes[i + 1] + 1);
//         } else {
//           str = string.substring(bytes[i] + 1, bytes[i + 1] + 1);
//         }
//         const t1 = k.encrypt(str);
//         ct += t1;
//       };
//       if (bytes[bytes.length - 1] !== string.length - 1) {
//         const lastStr = string.substring(bytes[bytes.length - 1] + 1);
//         ct += k.encrypt(lastStr);
//       }
//       return hex2b64(ct);
//     }
//     const t = k.encrypt(string);
//     const y = hex2b64(t);
//     return y;
//   } catch (ex) {
//     return false;
//   }
// };

// The error decryption code
// JSEncrypt.prototype.decryptLong = function(string) {
//   const k = this.getKey();
//   const maxLength = ((k.n.bitLength() + 7) >> 3);
//   // var maxLength = 128;
//   try {
//     const hexString = b64tohex(string);
//     let ct = '';
//     if (hexString.length > maxLength) {
//       const lt = hexString.match(/.{1,128}/g);
//       lt.forEach(entry => {
//         const t1 = k.decrypt(entry);
//         ct += t1;
//       })
//     }
//     const y = k.decrypt(b64tohex(hexString));
//     return y;
//   } catch (ex) {
//     return false;
//   }
// }

// 分段加密
// 十六进制转字节
function hexToBytes(hex) {
  const bytes = []
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return bytes;
}

// 字节转十六进制
function bytesToHex(bytes) {
  const hex = []
  for (let i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16));
    hex.push((bytes[i] & 0xF).toString(16));
  }
  return hex.join('');
}

// 方法一
JSEncrypt.prototype.encryptLong = function(d) {
  const k = this.key;
  const maxLength = (((k.n.bitLength() + 7) >> 3) - 11);
  try {
    let lt = '';
    let ct = '';

    if (d.length > maxLength) {
      lt = d.match(/.{1,117}/g);
      lt.forEach(entry => {
        const t1 = k.encrypt(entry);
        ct += t1;
      });
      return hexToBytes(ct);
    }
    const t = k.encrypt(d);
    const y = hexToBytes(t);
    return y;
  } catch (ex) {
    return false;
  }
}

JSEncrypt.prototype.decryptLong = function(string) {
  const k = this.getKey();
  const maxLength = ((k.n.bitLength() + 7) >> 3);
  try {
    const str = bytesToHex(string);
    let ct = '';
    if (str.length > maxLength) {
      const lt = str.match(/.{1,256}/g);
      lt.forEach(entry => {
        const t1 = k.decrypt(entry);
        ct += t1;
      })
      return ct;
    }
    const y = k.decrypt(bytesToHex(string));
    return y;
  } catch (ex) {
    return false;
  }
}

// 方法二(推荐)
//方法2
JSEncrypt.prototype.encryptLong2 = function(string) {
  const k = this.getKey();
  try {
    let ct = '';
    //RSA每次加密117bytes，需要辅助方法判断字符串截取位置
    //1.获取字符串截取点
    const bytes = [];
    bytes.push(0);
    let byteNo = 0;
    const len = string.length;
    let c;
    let temp = 0;
    for (let i = 0; i < len; i++) {
      c = string.charCodeAt(i);
      if (c >= 0x010000 && c <= 0x10FFFF) {
        byteNo += 4;
      } else if (c >= 0x000800 && c <= 0x00FFFF) {
        byteNo += 3;
      } else if (c >= 0x000080 && c <= 0x0007FF) {
        byteNo += 2;
      } else {
        byteNo += 1;
      }
      if ((byteNo % 117) >= 114 || (byteNo % 117) === 0) {
        if (byteNo - temp >= 114) {
          bytes.push(i);
          temp = byteNo;
        }
      }
    }
    //2.截取字符串并分段加密
    if (bytes.length > 1) {
      for (let i = 0; i < bytes.length - 1; i++) {
        let str = '';
        if (i === 0) {
          str = string.substring(0, bytes[i + 1] + 1);
        } else {
          str = string.substring(bytes[i] + 1, bytes[i + 1] + 1);
        }
        ct += k.encrypt(str);
      }
      if (bytes[bytes.length - 1] !== string.length - 1) {
        const lastStr = string.substring(bytes[bytes.length - 1] + 1);
        ct += k.encrypt(lastStr);
      }
      return hexToBytes(ct);
    }
    const t = k.encrypt(string);
    const y = hexToBytes(t);
    return y;
  } catch (ex) {
    return false;
  }
}

JSEncrypt.prototype.decryptLong2 = function(string) {
  const k = this.getKey();
  // var maxLength = ((k.n.bitLength()+7)>>3);
  const MAX_DECRYPT_BLOCK = 128;
  try {
    let bufTmp = '';
    let hexTmp = '';
    let ct = '';
    let t1 = '';
    const str = bytesToHex(string);
    const buf = hexToBytes(str);
    const inputLen = buf.length;
    //开始长度
    let offSet = 0;
    //结束长度
    let endOffSet = MAX_DECRYPT_BLOCK;

    //分段加密
    while (inputLen - offSet > 0) {
      if (inputLen - offSet > MAX_DECRYPT_BLOCK) {
        bufTmp = buf.slice(offSet, endOffSet);
        hexTmp = bytesToHex(bufTmp);
        t1 = k.decrypt(hexTmp);
        ct += t1;
      } else {
        bufTmp = buf.slice(offSet, inputLen);
        hexTmp = bytesToHex(bufTmp);
        t1 = k.decrypt(hexTmp);
        ct += t1;
      }
      offSet += MAX_DECRYPT_BLOCK;
      endOffSet += MAX_DECRYPT_BLOCK;
    }
    return ct;
  } catch (err) {
    console.log('decryptLong2', err)
    return false;
  }
}

const encryptor = new JSEncrypt() // JSEncrypt对象
encryptor.setPublicKey(publicKey) // 公钥
encryptor.setPrivateKey(privatekey) // 私钥

// 使用 公钥 加密
// 加密最大长度为117位
function fnencrypt(message) {
  let rsaPassWord;
  if (message.length > 117) {
    rsaPassWord = encryptor.encryptLong2(message)
  } else {
    rsaPassWord = encryptor.encrypt(message) // 密码进行加密
  }
  console.log('fnencrypt', rsaPassWord)
  return rsaPassWord
}

// 使用 私钥 解密
// 加密最大长度是128位
function fndecrypt(message) {
  let rsaPassWord
  if (message.length > 117) {
    rsaPassWord = encryptor.decryptLong2(message)
  } else {
    rsaPassWord = encryptor.decrypt(message)
  }
  console.log('fndecrypt', rsaPassWord)
  return rsaPassWord
}

export {
  fnencrypt,
  fndecrypt
}
