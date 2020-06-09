function createXHR(opts) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    // 设置默认参数
    xhr.timeout = 3000
    xhr.responseType = 'json'

    // 创建请求，默认为异步
    xhr.open(opts.method, opts.url)
    // 注册相关事件回调处理函数
    xhr.onload = function(e) {
      if (this.status === 200 || this.status === 304) {
        console.log('load', this.response)
      }
    }
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          //实际操作
          console.log('response', xhr.response)
          resolve(xhr.response)
        }
      }
    }
    xhr.ontimeout = function(e) {
      console.log('timeout', e)
    }
    xhr.onerror = function(e) {
      console.log('error', e)
    }
    xhr.upload.onprogress = function(e) {
      console.log('progress', e)
    }

    // 必需在open之后，send之前
    // xhr.setRequestHeader('X-Protected', '0')
    xhr.setRequestHeader('X-reqTime', Date.now())
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
    // xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    // xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8')

    // get时没有参数，post时请求的参数`
    // console.log(opts.data)
    // formData lv1
    // const formData = new FormData()
    // for (const key in opts.data) {
    //   formData.append(key, opts.data[key])
    // }
    // xhr.send(formData)

    // formData lv2
    let str = ''
    for (const key in opts.data) {
      console.log(key)
      str += `${key}=${opts.data[key]}&`
    }
    str = str.slice(0,-1)
    console.log('str', str)
    xhr.send(str)

    // application/json
    // xhr.send(JSON.stringify(opts.data))
  })
}

export default createXHR
