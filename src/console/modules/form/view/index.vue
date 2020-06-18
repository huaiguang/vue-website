<template>
  <div class="container">
    <router-link to="/index">一般功能</router-link>
    <router-link to="/reset">表单重置</router-link>

    <input type="file" id="upload">
    <img :src="compresssedImagesrc">
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      compresssedImagesrc: ''
    }
  },
  mounted() {
    document.getElementById('upload').addEventListener('change', e => {
      const fileObj = e.target.files[0]
      console.log(e, fileObj)
      compressFile(fileObj, files => {
        console.log('scale', files.size / fileObj.size)
      })
    })

    function download(data, filename) {
      const aLink = document.createElement('a')
      aLink.href = data
      aLink.download = filename
      const event = document.createEvent('MouseEvents')
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      aLink.dispatchEvent(event)
    }

    /**
     * 压缩图片
     * @param file input获取到的文件
     * @param callback 回调函数，压缩完要做的事，例如ajax请求等。
     */
    function compressFile(file, callback) {
      const fileObj = file
      const reader = new FileReader()
      reader.readAsDataURL(fileObj) //转base64
      reader.onload = function(e) {
        const image = new Image() //新建一个img标签（还没嵌入DOM节点)
        image.src = e.target.result
        image.onload = function() {
          const canvas = document.createElement('canvas') // 新建canvas
          const context = canvas.getContext('2d')
          // 源文件大小
          const imageWidth = image.width
          const imageHeight = image.height
          console.log(imageWidth, imageHeight)
          let data = ''
          canvas.width = imageWidth
          canvas.height = imageHeight
          context.drawImage(image, 0, 0, imageWidth, imageHeight)
          // 输出压缩后的 base64
          // 输出后选择的文件类型 image/jpeg
          data = canvas.toDataURL('image/jpeg', 0.75)
          download(data)
          const arr = data.split(',')
          // 转成blob
          const mime = arr[0].match(/:(.*?);/)[1]
          const bstr = atob(arr[1])
          let n = bstr.length
          const u8arr = new Uint8Array(n)
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
          }
          // 转成file
          const files = new window.File([new Blob([u8arr], { type: mime })], 'test.jpeg', { type: 'image/jpeg' })
          // 回调
          callback(files)
        }
      }
    }
  },
  methods: {
    gotoPageByName(routeName) {
      this.$router.push({ name: routeName })
    }
  }
}
</script>
