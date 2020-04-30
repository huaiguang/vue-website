import KEYUTIL from 'jsrsasign'

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCtCn6P1d/Z42v7/R1Pdva4NJPpiZGPd7xSQU33vNu6Z5D4Si2owcuV/yFsKvOeB/oFoQ2R0OXok68ARK9E00AauCI0iTqPnIRvNN53bdGT/TAq9mUuBgBeLtEgsqyKAS1qiigTSH7/pEYyeHbV7dN6HOUttx4UyPsfeSkjMc6LHwIDAQAB'

const privatekey = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAK0Kfo/V39nja/v9HU929rg0k+mJkY93vFJBTfe827pnkPhKLajBy5X/IWwq854H+gWhDZHQ5eiTrwBEr0TTQBq4IjSJOo+chG803ndt0ZP9MCr2ZS4GAF4u0SCyrIoBLWqKKBNIfv+kRjJ4dtXt03oc5S23HhTI+x95KSMxzosfAgMBAAECgYAaQMhY3DL9JMLiVVGYF81wvxFd0jBSWvEobZ39oxqXGlVlRiPNQbG4jR+uAIo7hKxLJFchs1beRWG8oa8RuxczdqGe5wVhxPNGpMQ5UKl61moqKBO/Og7WhNJBak2E6sipIbp3iK3KKwYPLN8CMDWnWBYWcRIrctUMPRkRVZtfiQJBANzuZ9Lp7Z9+uS2JTrEvxRf4gOJM08PbYASvo/xFVrfNB1lXOg4nXRifc8cQc0ctU6ImwJ/DaIKgMyNDXS35cxsCQQDIgg5ZkV2SGEjwRFgqUYrtOYDgoT2BF/nSeAqqbr0Mul/ilO3Y6IQQ77tZAbAx0Ha2it4W88aJVd//xEqlF4RNAkB9k5k5/jNNvBb/dhNfjVqHFH4VozufENuT7k3Uf4kZ8hUiR/08vE0jSMbjOEt+ApqOCV7lsIl/7hUDDzAwiKBPAkBMjQLnhU1BIs5uFNnIRluRGFww5r5xk/LIPRZtXVwGCP3kptFr99G8GZrgb3mSezFnnfsOrkGFW2jq4ElTYHgdAkEAhpMRG5vgOrEimH9e/9Lf9GVgy/Lr4AjzeaJErKUZJU8uDU74YsFdZDmKyL6osoO4J6sKofafl5/OrHgzkO3w2g=='

// 解密Java的密文
// const prv = KEYUTIL.getKey(privatekey);
// // Java加密的密文(Base64Url)
// let encJava = "8S2KlcygY8eUvq_Dzro81IQd6oA5fxW9l9hsy8iOvtByMMJI1wKedO5sR_pJmJFYEZl6wfD4BQ-FzvSYftnO5xO8kJaHNtnrFE7R0mqpLIkf6aN02K4F9zWLad3emFTN8Ze_GqooVaa0oX6XHqpDFBQJF3kUB6cfS9mDJNq_boE";
// // 解密 / Base64Url -> 16进制 / 私钥实例
// var dec4Java = KJUR.crypto.Cipher.decrypt(b64utohex(encJava), prv);
// console.log("jsrsasign decrypt 4 java: "+dec4Java);


// // 验证Java的签名
// // 构建Signature实例
// // 这里 prvkeypem 放公钥pem看起来有点怪, 但是这是可行的, 内部还是使用的上文经常出现的 KEYUTIL.getKey(pk) 来生成公钥实例的
// var sign4Java = new KJUR.crypto.Signature({alg: "SHA1withRSA", prvkeypem: publicKey});
// sign4Java.updateString(src);
// // Java生成签名
// var signByJava = "O6uEQFPPEmRfEiZcLQjMB7yYLpO2ohmCJvn95Izu8LveUWqFtoYJbvWRYwKCCV-Z3iurjpEw5nExvHQghwoYIxpB7p97G29WXWhfiaA0AUNlxDM2cOus-CIAq-Kyqee7vDsewp6ixaHThu0CxoPFGpBTpo5kuOFlPFR6CRS3Q9M";
// var b2 = sign4Java.verify(b64utohex(signByJava));
// console.log("jsrsasign verify 4 java: " + b2);

// function sign(val) {
//   // 验证Java的签名
//   // 构建Signature实例
//   // 这里 prvkeypem 放公钥pem看起来有点怪, 但是这是可行的, 内部还是使用的上文经常出现的 KEYUTIL.getKey(pk) 来生成公钥实例的
//   var sign4Java = new KJUR.crypto.Signature({alg: "SHA1withRSA", prvkeypem: publicKey});
//   sign4Java.updateString(src);
//   // Java生成签名
//   // var signByJava = "O6uEQFPPEmRfEiZcLQjMB7yYLpO2ohmCJvn95Izu8LveUWqFtoYJbvWRYwKCCV-Z3iurjpEw5nExvHQghwoYIxpB7p97G29WXWhfiaA0AUNlxDM2cOus-CIAq-Kyqee7vDsewp6ixaHThu0CxoPFGpBTpo5kuOFlPFR6CRS3Q9M";
//   var b2 = sign4Java.verify(b64utohex(val));
//   console.log("jsrsasign verify 4 java: " + b2);
// }

function sign(str) {
  const key = KEYUTIL.getKey();
  console.log(key);
  // 创建 Signature 对象
  const signature = new KJUR.crypto.Signature({ alg:'SHA1withRSA' });
  // 传入key实例, 初始化signature实例
  signature.init(key);
  // 传入待签明文
  signature.updateString(src);
  // 签名, 得到16进制字符结果
  const a = signature.sign();
  const sign = hextob64(a);

  console.log(sign);
}

export {
  sign
}
