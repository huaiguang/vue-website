<template>
  <div class="module-wrapper">
    <el-form ref="form" class="form-demo" label-width="80px" label-suffix=":" :model="sizeForm">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="sizeForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动日期">
        <el-col :span="11">
          <el-form-item prop="startDate">
            <el-date-picker type="date" placeholder="选择开始日期" v-model="sizeForm.startDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="endDate">
            <el-date-picker type="date" placeholder="选择结束时间" v-model="sizeForm.endDate" style="width: 100%;" @change="changeEndDate">
            </el-date-picker>
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
        startDate: null,
        endDate: undefined,
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
    },
    changeEndDate(val) {
      // 清空后值为null, 不为null时值为一个Date对象
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.module-wrapper {
  padding: 1em;
  background-color: #fff;
}

.form-demo {
  width: 560px;
}

.line {
  text-align: center;
}
</style>
