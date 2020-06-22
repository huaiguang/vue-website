<template>
  <div class="container">
    <router-link to="/index">一般功能</router-link>
    <router-link to="/reset">表单重置</router-link>

    <label class="btn-upload" for="upload">点击上传文件</label>
    <input class="hidden" type="file" id="upload">
    <img :src="compresssedImagesrc">
  </div>
</template>

<script>
import { download, compressImage } from 'common/utils/compressImage'

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
      })
    })
  },
  methods: {
    gotoPageByName(routeName) {
      this.$router.push({ name: routeName })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-upload {
  cursor: pointer;
}
</style>
