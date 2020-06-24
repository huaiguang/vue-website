/**
 * download file
 * @param {string} data toDataURL(mine, ratio) 方法返回一个包含图片展示的 data URI
 * @param {string} filename 下载文件的文件名
 */
function download(data, filename) {
  const aLink = document.createElement('a')
  aLink.href = data
  aLink.download = filename
  const event = document.createEvent('MouseEvents')
  event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  aLink.dispatchEvent(event)
}

/**
 * transform base64 to Blob
 * @param {string} dataUrl base64
 */
function base64ToBlob(dataUrl) {
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  const n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

/**
 * transform blob to base64，File对象是特殊类型的Blob
 * @param {*} blob
 * @param {*} callback
 */
function blobToBase64(blob, callback) {
  const NewFileReader = new FileReader()
  NewFileReader.onload = function(e) {
    callback(e.target.result)
  }
  NewFileReader.readAsDataURL(blob)
}

/**
 * transform blob to file
 * @param {*} blob
 * @param {*} fileName
 */
function blobToFile(blob, fileName) {
  blob.lastModifiedDate = new Date()
  blob.name = fileName
  return blob
}

/**
 * transform base64 to File Object
 * @param {string} dataUrl, base64
 * @param {object} filename
 */
function base64ToFile(dataUrl, filename) {
  // 转成blob
  const arr = dataUrl.split(',')
  // 'image/jpeg'
  const mime = arr[0].match(/:(.*?);/)[1]
  // atob（ascii to binary） 是window对象的函数，用于将ascii码解析成binary数据。
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  // 转成file
  const blob = new Blob([u8arr], { type: mime })
  // const newFile = new window.File([u8arr], filename, { type: mime })
  const newFile = new window.File([blob], filename, { type: mime })
  return newFile
}

/**
 * compress image by size
 * @param {object} image new Image
 * @param {object} options compress parameters
 * @property width 设定的目标宽度
 * @property ratio 设定的目标图片质量
 */
function compressImageBySize(image, options) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  // original size
  const imageWidth = image.width
  const imageHeight = image.height
  // initial scale
  let scale = 1
  const { width, ratio } = options
  if (imageWidth > width) {
    scale = width / imageWidth
  }
  canvas.width = imageWidth * scale
  canvas.height = imageHeight * scale
  //
  context.drawImage(image, 0, 0, canvas.width, canvas.height)
  // output base64
  // ratio 0.92 default
  const data = canvas.toDataURL('image/jpeg', ratio)
  return data
}

/**
 * 压缩图片
 * @param {object} file input获取到的文件 e.target.files[0]
 * @param {object} target 设定的压缩后图片参数
 * @property {number} size 压缩后图片的大小
 * @property {number} width 压缩后图片的宽度
 * @param {function} callback 回调函数，压缩完要做的事，本身为异步(例如ajax请求)
 */
function compressImage({ file, target }, callback) {
  const reader = new FileReader()
  // 转base64
  reader.readAsDataURL(file)
  reader.onload = function(e) {
    // 新建一个img标签（还没嵌入DOM节点)
    const image = new Image()
    image.src = e.target.result
    image.onload = function() {
      const { size, width } = target
      // 默认为 0.92 (0,1)
      const fileSize = file.size / 1024 / 1024
      const ratio = 0.92 - fileSize / size
      console.log('ratio', ratio)

      const data = compressImageBySize(image, {
        width,
        ratio
      })
      // download(data, file.name)
      const newFile = base64ToFile(data, file.name)

      console.group()
      console.log(newFile, newFile.size / 1024 / 1024)
      console.log(file, file.size / 1024 / 1024)
      console.log(newFile.size / file.size)
      console.groupEnd()
      // 回调函数
      callback(newFile)
    }
  }
}

export {
  download,
  base64ToFile,
  compressImage,
  blobToBase64
}
