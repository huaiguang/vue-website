<template>
  <div class="container">
    <label class="btn-upload" for="upload">点击上传文件</label>
    <input class="hidden" type="file" id="upload">
    <div class="divider"></div>
    <el-image
      class="uploaded-image"
      fit="contain"
      :src="compresssedImagesrc"
    ></el-image>
  </div>
</template>

<script>
import { download, compressImage, blobToBase64 } from 'common/utils/compressImage'

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
      const target = {
        size: 30,
        width: 1920
      }
      compressImage({ file: fileObj, target }, file => {
        // console.log('done', file)
        blobToBase64(file, dataUrl => {
          this.compresssedImagesrc = dataUrl
        })
      })
    })
  },
  methods: {

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
