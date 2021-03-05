<template>
  <div class="container">
    <label class="btn-upload" for="upload">点击上传图片</label>
    <input class="hidden" type="file" id="upload" />
    <div class="divider"></div>
    <el-row>
      <el-col :span="24" class="container-flexible">
        <el-image
          ref="showcase"
          class="uploaded-image demo-image__error"
          fit="contain"
          :src="compressedImagesrc"
          @load="loadImg"
        >
          <!-- 自定义加载失败内容 -->
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <el-button
          v-if="compressedImagesrc"
          class="btn-download__cimg"
          type="text"
          @click="downloadCompressedImage"
          >下载压缩后的图片</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EXIF from 'exif-js'
import { downloadFile, compressImage, blobToBase64 } from 'common/utils/compressImage'

export default {
  name: 'index',
  data() {
    return {
      fileName: '',
      compressedImagesrc: '',
    }
  },
  mounted() {
    document.getElementById('upload').addEventListener('change', e => {
      const fileObj = e.target.files[0]
      console.log(fileObj)
      this.fileName = fileObj.name
      this.getEXIFInfo(fileObj, orientation => {
        const target = {
          size: 30,
          width: 1920,
          orientation,
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
        EXIF.getAllTags(this)
        const make = EXIF.getTag(this, 'Make')
        const model = EXIF.getTag(this, 'Model')
        const orientation = EXIF.getTag(this, 'Orientation')
        console.group()
        console.log('make', make)
        console.log('model', model)
        console.log('orientation', orientation)
        console.groupEnd()
        callback(orientation)
      })
    },
    loadImg() {
      const img = document.querySelector('img')
      if (img.complete) {
        EXIF.getData(img, function() {
          EXIF.getAllTags(this)
          const make = EXIF.getTag(this, 'Make')
          const model = EXIF.getTag(this, 'Model')
          const orientation = EXIF.getTag(this, 'Orientation')
          console.group()
          console.log('compressed')
          console.log('make', make)
          console.log('model', model)
          console.log('orientation', orientation)
          console.groupEnd()
        })
      }
    },
    downloadCompressedImage() {
      downloadFile(this.compressedImagesrc, this.fileName)
    },
  },
}
</script>

<style lang="scss" scoped>
.btn-upload {
  display: inline-block;
  border-bottom: 1px solid #666;
  cursor: pointer;
}

.container-flexible {
  display: flex;
  align-items: center;
}

.uploaded-image {
  width: 200px;
  height: 200px;
  object-fit: contain;
}

.btn-download__cimg {
  margin-left: 10px;
}
</style>

<style style="scss">
.demo-image__error .image-slot,
.demo-image__placeholder .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  font-size: 30px;
}
</style>
