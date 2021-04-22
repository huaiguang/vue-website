/**
 * Created by vernon on 2019/11/30.
 */

import storage from './CacheStorage'

/**
 * 调用方式，页面引入storageMethod，传入local或者session
 * storageMethod('local').set('b','111')
 * set-->setItem
 * get-->getItem
 * delete-->removeItem
 * deleteAllExpires-->清除所有过期的数据条目
 * clear
 * add-->这个方法只能添加key不存在的数据条，可以避免数据被无意之间篡改
 * replace
 * touch-->重新设置每条数据的过期时间
 * */
function storageMethod(val) {
  const storageType = val === 'local' ? 'localStorage' : 'sessionStorage'
  return storage.getInstance({ storageType })
}

/**
 *下载导出文件
 * @param blob  ：返回数据的blob对象或链接
 * @param fileName  ：下载后文件名标记
 * @param fileType  ：文件类 word(docx) excel(xlsx) ppt等
 */
function downloadExportFile(blob, fileName, fileType) {
  const elementA = document.createElement('a')
  let href = blob
  if (typeof blob === 'string') {
    elementA.target = '_blank'
  } else {
    href = window.URL.createObjectURL(blob) //创建下载的链接
  }
  elementA.href = href
  elementA.download = fileName + '.' + fileType //下载后文件名
  document.body.appendChild(elementA)
  elementA.click() // 模拟点击
  document.body.removeChild(elementA) // 下载完成移除元素
  if (typeof blob !== 'string') {
    window.URL.revokeObjectURL(href) // 释放掉blob对象
  }
}

/**
 * 格式化数字
 * @param number
 * @param decimals  保留几位小数
 * @param decPoint   小数点符号
 * @param thousandsSep  千分位符号
 * @returns {string}
 */
function numberFormat(number, decimals, decPoint, thousandsSep) {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  const n = !isFinite(+number) ? 0 : +number
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  const sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep
  const dec = typeof decPoint === 'undefined' ? '.' : decPoint
  let s = ''

  const toFixedFix = function(n, prec) {
    const k = Math.pow(10, prec)
    return '' + calculateTwoNumber(Math.floor(calculateTwoNumber(n, k, '*')), k, '/')
  }
  s = (prec ? toFixedFix(n, prec) : '' + Math.floor(n)).split('.')
  const re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}

/**
 * 函数节流
 * @param fn  执行的函数
 * @param delay  时间
 * @returns {Function}
 */
function throttle(fn, delay) {
  let timer
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * js + - * / 计算
 * @param arg1  第一个计算的参数
 * @param arg2  第二个计算的参数
 * @param type  运算符号 + - * /
 * @returns {number}
 */
function calculateTwoNumber(arg1, arg2, type) {
  if (type === '*') {
    //乘法
    let m = 0
    const s1 = arg1.toString()
    const s2 = arg2.toString()
    try {
      m += s1.split('.')[1].length
    } catch (e) {}
    try {
      m += s2.split('.')[1].length
    } catch (e) {}
    return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m)
  } else if (type === '+' || type === '-') {
    //加减法
    let sq1
    let sq2
    try {
      sq1 = arg1.toString().split('.')[1].length
    } catch (e) {
      sq1 = 0
    }
    try {
      sq2 = arg2.toString().split('.')[1].length
    } catch (e) {
      sq2 = 0
    }
    const x = Math.pow(10, Math.max(sq1, sq2))
    if (type === '+') {
      return (calculateTwoNumber(arg1, x, '*') + calculateTwoNumber(arg2, x, '*')) / x
    } else if (type === '-') {
      return (calculateTwoNumber(arg1, x, '*') - calculateTwoNumber(arg2, x, '*')) / x
    }
  } else if (type === '/') {
    //除法
    let t1 = 0
    let t2 = 0
    try {
      t1 = arg1.toString().split('.')[1].length
    } catch (e) {}
    try {
      t2 = arg2.toString().split('.')[1].length
    } catch (e) {}
    const r1 = Number(arg1.toString().replace('.', ''))
    const r2 = Number(arg2.toString().replace('.', ''))
    return (r1 / r2) * Math.pow(10, t2 - t1)
  }
}

/*
 * 图片转base64
 * @param {object} options
 * @property {string} url 图片本地url
 * @property {string} width 图片期望的宽度
 * @property {string} height 图片期望的高度
 * @property {string} compressRatio 图片的压缩比
 * @param {function} callback 回调函数
 */
function getBase64(options, callback) {
  //通过构造函数来创建的img实例，在赋予src值后就会立刻下载图片，相比createElement()创建<img>省去了append()，也就避免了文档冗余和污染
  const Img = new Image()
  let dataURL = ''
  Img.src = options.url
  Img.onload = function() {
    //要先确保图片完整获取到，这是个异步事件
    const canvas = document.createElement('canvas') //创建canvas元素
    let scale = 1
    if (Img.width > options.width || Img.height > options.height) {
      //1000只是示例，可以根据具体的要求去设定
      if (Img.width > Img.height) {
        scale = options.width / Img.width
      } else {
        scale = options.height / Img.height
      }
    }
    canvas.width = Img.width * scale
    canvas.height = Img.height * scale //计算等比缩小后图片宽高
    canvas.getContext('2d').drawImage(Img, 0, 0, canvas.width, canvas.height) //将图片绘制到canvas中
    dataURL = canvas.toDataURL('image/png', options.compressRatio) //转换图片为dataURL
    callback ? callback(dataURL) : null //调用回调函数
  }
}

/**
 * 压缩图片
 * @param {object} file
 * @param {function} callback
 */
function compressImage(file, callback) {
  const isLimitedSize = file.size / 1024 / 1024 < 3
  if (isLimitedSize) {
    return callback(file)
  }
  const reader = new FileReader()
  const options = {
    width: 1920
  }
  const fileSize = file.size / 1024 / 1024
  // let ratio = 0.92
  const ratio = 1.07 - fileSize / 20
  // 转base64
  reader.readAsDataURL(file)
  reader.onload = function(e) {
    const image = new Image()
    image.src = e.target.result
    image.onload = function() {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      // 源文件大小
      const originWidth = image.width
      const originHeight = image.height
      let scale = 1
      if (originWidth > options.width) {
        scale = options.width / originWidth
      }
      canvas.width = originWidth * scale
      canvas.height = originHeight * scale
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      const data = canvas.toDataURL('image/jpeg', ratio)
      // 转成blob
      const arr = data.split(',')
      const mime = arr[0].match(/:(.*?)/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      // 转成file
      const newFile = new window.File([new Blob([u8arr], { type: mime })], file.name, {
        type: 'image/jpeg'
      })
      // todo

      console.group()
      console.log(newFile, newFile.size / 1024 / 1024)
      console.log(file, file.size / 1024 / 1024)
      console.log(newFile.size / file.size)
      console.groupEnd()
      return callback(newFile)
    }
  }
}

/**
 * 将base64转换为文件
 * @param dataUrl  传入的base64文件
 * @param fileName  文件名称
 * @returns {File}
 */
function dataURLtoFile(dataUrl, fileName) {
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?)/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], fileName, {
    type: mime
  })
}

/**
 * 深拷贝
 * @param {*} obj 拷贝对象(object or array)
 * @param {*} cache 缓存数组
 */
function deepCopy(obj, cache = []) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  // 如果传入的对象与缓存的相等, 则递归结束, 这样防止循环
  /**
   * 类似下面这种
   * var a = {b:1}
   * a.c = a
   * 资料: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
   */
  const hit = cache.filter(c => c.original === obj)[0]
  if (hit) {
    return hit.copy
  }
  const copy = Array.isArray(obj) ? [] : {}
  // 将copy首先放入cache, 因为我们需要在递归deepCopy的时候引用它
  cache.push({
    original: obj,
    copy
  })
  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })
  return copy
}

/**
 * import modules in webpack configuration
 * @param {*} context
 */
function importAll(context) {
  const map = {}

  context.keys().forEach(key => {
    const route = key.substring(2)
    map[route.replace(/\.vue$/, '')] = context(key).default
  })

  return map
}

const uniqueIds = []
/**
 * create the unique number
 */
function createUniqueId() {
  const random = function() {
    return Number(
      Math.random()
        .toString()
        .substr(2)
    ).toString(36) // 转换成十六进制
  }
  function createId() {
    const num = random()
    let _bool = false
    uniqueIds.forEach(v => {
      if (v === num) {
        _bool = true
      }
    })
    if (_bool) {
      createId()
    } else {
      uniqueIds.push(num)
      return num
    }
  }
  return createId()
}

export {
  downloadExportFile,
  storageMethod,
  numberFormat,
  throttle,
  calculateTwoNumber,
  getBase64,
  dataURLtoFile,
  deepCopy,
  importAll,
  createUniqueId,
  compressImage
}
