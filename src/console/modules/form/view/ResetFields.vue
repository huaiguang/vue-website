<template>
  <div class="demo-form">
    <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="sizeForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="sizeForm.date1"
              style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker placeholder="选择时间" v-model="sizeForm.date2" style="width: 100%;">
            </el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="sizeForm.type">
          <el-checkbox-button label="美食/餐厅线上活动" name="type"></el-checkbox-button>
          <el-checkbox-button label="地推活动" name="type"></el-checkbox-button>
          <el-checkbox-button label="线下主题活动" name="type"></el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="sizeForm.resource" size="medium">
          <el-radio border label="线上品牌商赞助"></el-radio>
          <el-radio border label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="initForm">初始化表单</el-button>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="cancelCreate">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ResetFields',
  data() {
    return {
      sizeForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    initForm() {
      // this.sizeForm.type.push('地推活动')
      this.sizeForm.type = ['地推活动']
    },
    onSubmit() {
      console.log('submit!', this.sizeForm)
      this.sizeForm.delivery = true
      this.sizeForm.desc = 'happy'
    },
    cancelCreate() {
      this.$refs.form.resetFields()
      // 在表单中，没有在 el-form-item 上用 prop 声明的属性不会被重置
      console.log(this.sizeForm)
    }
  }
}
</script>
