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
  console.log(image.width, image.height)
  const imageWidth = image.width
  const imageHeight = image.height
  // initial scale
  let scale = 1
  const { orientation, width, ratio } = options
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
  reader.onload = function(e) {
    // 新建一个img标签（还没嵌入DOM节点)
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = function() {
      console.log('origin', image.width, image.height)
      const { size, width, orientation } = target
      // 默认为 0.92 (0,1)
      const fileSize = file.size / 1024 / 1024
      const ratio = 0.92 - fileSize / size
      console.log('ratio', ratio)

      const data = compressImageBySize(image, {
        orientation,
        width,
        ratio
      })
      // download(data, file.name)
      const newFile = base64ToFile(data, file.name)

      console.group()
      console.log('orientation', orientation)
      console.log(newFile, newFile.size / 1024 / 1024)
      console.log(file, file.size / 1024 / 1024)
      console.log(newFile.size / file.size)
      console.groupEnd()
      // 回调函数
      callback(newFile)
    }
    // src 一定要下载onload的后面
    image.src = e.target.result
  }
  reader.readAsDataURL(file)
}

/**
 * 获取图片的翻转角度
 * @param {*} file
 * @param {*} callback
 */
// function getOrientation(file, callback) {
//   const reader = new FileReader();
//   reader.onload = function(e) {
//     const view = new DataView(this.result)
//     console.log(view)
//     if (view.getUint16(0, false) !== 0xFFD8) {
//       return callback(-2)
//     }
//     const length = view.byteLength
//     let offset = 2
//     while (offset < length) {
//       const marker = view.getUint16(offset, false);
//       offset += 2;
//       if (marker === 0xFFE1) {
//         if (view.getUint32(offset += 2, false) !== 0x45786966) return callback(-1);
//         const little = view.getUint16(offset += 6, false) === 0x4949;
//         offset += view.getUint32(offset + 4, little);
//         const tags = view.getUint16(offset, little);
//         offset += 2;
//         for (let i = 0; i < tags; i++) {
//           if (view.getUint16(offset + (i * 12), little) === 0x0112) {
//             return callback(view.getUint16(offset + (i * 12) + 8, little))
//           }
//         }
//       } else if ((marker & 0xFF00) !== 0xFF00) {
//         break
//       } else {
//         offset += view.getUint16(offset, false)
//       }
//     }
//     return callback(-1)
//   }
//   reader.readAsArrayBuffer(file)
// }

/**
 * 重置图片的 orientation 属性
 * @param {*} srcBase64 源图片的base64
 * @param {*} srcOrientation 源图片的翻转角度
 * @param {*} callback
 */
// function resetOrientation(srcBase64, srcOrientation, callback) {
//   const img = new Image()

//   img.onload = function() {
//     let width = img.width
//     let height = img.height
//     const canvas = document.createElement('canvas')
//     const ctx = canvas.getContext('2d')

//     // 可以设置最大宽高度
//     const MAX_WIDTH = 1024
//     const MAX_HEIGHT = 768
//     if (width / MAX_WIDTH > height / MAX_HEIGHT) {
//       if (width > MAX_WIDTH) {
//         height *= MAX_WIDTH / width
//         width = MAX_WIDTH
//       }
//     } else {
//       if (height > MAX_HEIGHT) {
//         width *= MAX_HEIGHT / height
//         height = MAX_HEIGHT
//       }
//     }
//     // set proper canvas dimensions before transform & export
//     if ([5, 6, 7, 8].indexOf(srcOrientation) > -1) {
//       canvas.width = height
//       canvas.height = width
//     } else {
//       canvas.width = width
//       canvas.height = height
//     }

//     // transform context before drawing image
//     switch (srcOrientation) {
//       case 2:
//         ctx.transform(-1, 0, 0, 1, width, 0)
//         break
//       case 3:
//         ctx.transform(-1, 0, 0, -1, width, height)
//         break
//       case 4:
//         ctx.transform(1, 0, 0, -1, 0, height)
//         break
//       case 5:
//         ctx.transform(0, 1, 1, 0, 0, 0)
//         break
//       case 6:
//         ctx.transform(0, 1, -1, 0, height, 0)
//         break
//       case 7:
//         ctx.transform(0, -1, -1, 0, height, width)
//         break
//       case 8:
//         ctx.transform(0, -1, 1, 0, 0, width)
//         break
//       default:
//         ctx.transform(1, 0, 0, 1, 0, 0)
//     }

//     // draw image
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

//     // export base64
//     callback(canvas.toDataURL())
//   }
//   img.src = srcBase64
// }

// 这里的获取exif要将图片转ArrayBuffer对象，这里假设获取了图片的baes64
// 步骤一
// base64转ArrayBuffer对象
function base64ToArrayBuffer(base64) {
  base64 = base64.replace(/^data:([^;]+);base64,/gmi, '');
  const binary = atob(base64);
  const len = binary.length;
  const buffer = new ArrayBuffer(len);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < len; i++) {
    view[i] = binary.charCodeAt(i);
  }
  return buffer;
}

// 步骤二，Unicode码转字符串
// ArrayBuffer对象 Unicode码转字符串
function getStringFromCharCode(dataView, start, length) {
  let str = ''
  length += start
  for (let i = start; i < length; i++) {
    str += String.fromCharCode(dataView.getUint8(i))
  }
  return str
}

// 步骤三，获取jpg图片的exif的角度（在ios体现最明显）
// orientation值	旋转角度
// 1	0°
// 3	180°
// 6	顺时针90°
// 8	逆时针90°
function getOrientation(arrayBuffer) {
  const dataView = new DataView(arrayBuffer);
  const length = dataView.byteLength;
  let orientation;
  let exifIDCode;
  let tiffOffset;
  let firstIFDOffset;
  let littleEndian;
  let endianness;
  let app1Start;
  let ifdStart;
  let offset;
  let i;
  // Only handle JPEG image (start by 0xFFD8)
  if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
    offset = 2;
    while (offset < length) {
      if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
        app1Start = offset;
        break;
      }
      offset++;
    }
  }
  console.log('app1Start', app1Start)
  if (app1Start) {
    exifIDCode = app1Start + 4;
    tiffOffset = app1Start + 10;
    if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
      endianness = dataView.getUint16(tiffOffset);
      littleEndian = endianness === 0x4949;

      if (littleEndian || endianness === 0x4D4D /* bigEndian */) {
        if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
          firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);

          if (firstIFDOffset >= 0x00000008) {
            ifdStart = tiffOffset + firstIFDOffset;
          }
        }
      }
    }
  }
  if (ifdStart) {
    length = dataView.getUint16(ifdStart, littleEndian);

    for (i = 0; i < length; i++) {
      offset = ifdStart + i * 12 + 2;
      if (dataView.getUint16(offset, littleEndian) === 0x0112 /* Orientation */) {
        // 8 is the offset of the current tag's value
        offset += 8;

        // Get the original orientation value
        orientation = dataView.getUint16(offset, littleEndian);

        // Override the orientation with its default value for Safari (#120)
        const isUiwebview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
        const isSafariOrUiwebview = /(iPhone|iPod|iPad).*AppleWebKit/i.test(navigator.userAgent);
        if (isSafariOrUiwebview) {
          dataView.setUint16(offset, 1, littleEndian);
        }
        break;
      }
    }
  }
  return orientation;
}

export {
  download,
  base64ToFile,
  compressImage,
  blobToBase64,
  base64ToArrayBuffer,
  getOrientation
  // resetOrientation
}
