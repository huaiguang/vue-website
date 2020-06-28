<template>
  <div class="container">
    <label class="btn-upload" for="upload">点击上传文件</label>
    <input class="hidden" type="file" id="upload">
    <div class="divider"></div>
    <el-image ref="showcase"
      class="uploaded-image"
      fit="contain"
      :src="compressedImagesrc"
      @load="loadImg"
    ></el-image>
  </div>
</template>

<script>
import EXIF from 'exif-js'
import {
  download, compressImage, blobToBase64
} from 'common/utils/compressImage'

export default {
  name: 'index',
  data() {
    return {
      compressedImagesrc: ''
    }
  },
  mounted() {
    document.getElementById('upload').addEventListener('change', e => {
      const fileObj = e.target.files[0]
      this.getEXIFInfo(fileObj, orientation => {
        const target = {
          size: 30,
          width: 1920,
          orientation
        }
        compressImage({ file: fileObj, target }, file => {
          // console.log('done', file)
          blobToBase64(file, dataUrl => {
            this.compressedImagesrc = dataUrl
          })
        })
      })
    })
  },
  methods: {
    getEXIFInfo(fileObj, callback) {
      EXIF.getData(fileObj, function() {
        EXIF.getAllTags(this);
        const make = EXIF.getTag(this, 'Make');
        const model = EXIF.getTag(this, 'Model');
        const orientation = EXIF.getTag(this, 'Orientation')
        console.group()
        console.log('make', make)
        console.log('model', model)
        console.log('orientation', orientation)
        console.groupEnd()
        callback(orientation)
      })
    },
    loadImg(e) {
      const img = document.querySelector('img')
      if (img.complete) {
        EXIF.getData(img, function() {
          EXIF.getAllTags(this);
          const make = EXIF.getTag(this, 'Make');
          const model = EXIF.getTag(this, 'Model');
          const orientation = EXIF.getTag(this, 'Orientation')
          console.group()
          console.log('compressed')
          console.log('make', make)
          console.log('model', model)
          console.log('orientation', orientation)
          console.groupEnd()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-upload {
  display: inline-block;
  border-bottom: 1px solid #666;
  cursor: pointer;
}
.uploaded-image {
  width: 200px;
  height: 200px;
  object-fit: contain;
}
</style>
