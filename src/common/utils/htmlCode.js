// 获取Html转义字符
function htmlEncode(html) {
  const span = document.createElement('span')
  const text = document.createTextNode(html)
  span.appendChild(text)
  return span.innerHTML
}

// 获取Html
function htmlDecode(html) {
  const a = document.createElement('a')
  a.innerHTML = html
  return a.textContent
}

// RSA 非对称嘉敏
// AES 对称加密

export { htmlEncode, htmlDecode }
