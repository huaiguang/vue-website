<template>
  <website-layout>
    <div class="container-module">
      <div class="form-wrapper">
        <h1 class="form-login__title">登 陆</h1>
        <el-form class="form-login" ref="loginForm" :model="loginForm">
          <el-form-item label="" prop="username">
            <el-input v-model="loginForm.username" placeholder="登陆邮箱"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="登陆密码"></el-input>
          </el-form-item>
          <el-form-item class="text-center">
            <el-button type="primary" plain @click="login">登陆</el-button>
            <el-button type="primary" plain @click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </website-layout>
</template>

<script>
import WebsiteLayout from '@/common/components/BaseLayout/WebsiteLayout'
import createXHR from '@/common/service/server-xhr'
import Banner from '@/common/assets/images/banner.jpeg'

import Vue from 'vue'
import Loading from '@/common/components/Loading/Loading'

Vue.use(Loading)

export default {
  components: {
    WebsiteLayout
  },
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  beforeCreate() {
    // Loading.show()
    // setTimeout(() => {
    //   Loading.hide()
    // }, 30000)
  },
  created() {
    this.$loading.show()
    setTimeout(() => {
      this.$loading.hide()
    }, 30000)
    // this.getUserInfo()
    const addressList = [
      '甘肃省临泽县新华镇大寨村六社39号',
      '湖北省武汉市洪山区洛佳路1037号',
      '上海市金山区枫泾镇环东一路65弄2号3598室',
      '上海市枫泾镇环东一路65弄2号3598室',
      '内蒙古自治区呼和浩特市赛罕市开鲁县北清河乡',
      '山东省滨州市邹平县长山镇大省村'
    ]
    const splitedAddress = addressList.map(item => {
      const address = this.splitAddress(item)
      console.log(address)
      return address
    })
  },
  methods: {
    getUserInfo() {
      createXHR({
        url: 'http://localhost:8084/userList?username=chen&password=123a',
        method: 'get'
      }).then(data => {
        if (data.code === '000000') {
          console.log('获取用户信息成功')
        }
      })
    },
    register() {
      createXHR({
        url: 'http://localhost:8084/register',
        method: 'post',
        data: this.loginForm
      }).then(data => {
        if (data.code === '000000') {
          console.log('注册成功')
        }
      })
    },
    login() {
      createXHR({
        url: 'http://localhost:8084/login',
        method: 'post',
        data: this.loginForm,
        dataType: 'qs'
      }).then(data => {
        if (data.code === '000000') {
          console.log('登陆成功')
          window.location.href = '/console/home.html'
        }
      })
    },
    splitAddress(str) {
      let tempArray = []
      if (!str) return tempArray

      // 按照节点分割字符串
      function split(str, points) {
        const tempArray = []
        // 从前到后依次对节点进行切割，
        // 必须按照顺序，按照节点次数切割，防止详细地址中存在节点
        const length = points.length
        for (let i = 0; i < length; i++) {
          const index = str.indexOf(points[i])
          if (index > -1) {
            const realIndex = index + 1
            const addressPart = str.substring(0, realIndex)
            str = str.substring(realIndex)
            tempArray.push(addressPart)
          } else {
            tempArray.push(str)
            str = ''
            break
          }
        }
        if (str.length > 0) {
          tempArray.push(str)
        }
        return tempArray
      }

      // 4个直辖市
      const specialCites = ['北京市', '上海市', '重庆市', '天津市']
      // 5个自治区
      const specialDistrict = ['内蒙古自治区', '西藏自治区', '广西壮族自治区', '宁夏回族自治区', '新疆维吾尔自治区']
      // 判断是否为直辖市
      const isSpecialCity = specialCites.some(item => str.startsWith(item))
      // 判断是否为自治区
      const isSpecialDistrict = specialDistrict.some(item => str.startsWith(item))

      if (isSpecialCity) {
        const points = ['市', '区']
        tempArray = split(str, points)
        tempArray.unshift(tempArray[0])
      } else if (isSpecialDistrict) {
        const index = str.indexOf('区')
        const firstItem = str.substring(0, index + 1)
        str = str.substring(index + 1)
        tempArray.push(firstItem, str)
      } else {
        // 23个省
        const points = ['省', '市', '区']
        tempArray = split(str, points)
      }
      return tempArray
    }
  }
}
</script>

<style lang='scss' scoped>
.container-module {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.form-wrapper {
  width: 500px;
  height: 400px;
  background-color: rgba(255, 255, 255, .9);
  text-align: center;
  > .form-login__title {
    margin: 50px auto;
  }
}

.form-login {
  margin: 0 auto;
  width: 400px;
}
</style>
