<template>
  <div class="module-wrapper">
    <el-form ref="activeForm" class="form-demo" label-width="80px" label-suffix=":" :model="sizeForm">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="sizeForm.name" placeholder="请填写活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-col :span="11">
          <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
            <el-option v-for="item in regionList" :key="item.value" :label="item.name" :value="item.value">
              <span class="float-left">{{ item.name }}</span>
              <span class="float-right desc-added">{{ item.nameEn }}</span>
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="活动日期">
        <el-col :span="11">
          <el-form-item prop="startDate">
            <!-- format	显示在输入框中的格式, 默认值为 yyyy-MM-dd -->
            <!-- value-format 可选，绑定值的格式。不指定则绑定值为 Date 对象 -->
            <el-date-picker
              type="date"
              placeholder="选择开始日期"
              v-model="sizeForm.startDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="text-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="endDate">
            <el-date-picker type="date" placeholder="选择结束时间" v-model="sizeForm.endDate" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="活动性质" prop="type">
        <!-- 多选框中添加设置 -->
        <el-checkbox-group v-model="sizeForm.type">
          <!-- <div class="active-item">
            <div class="active-name">活动性质一:</div>
            <el-checkbox label="00" name="type">线上主题活动</el-checkbox>
          </div>
          <div class="active-item">
            <div class="active-name">活动性质二:</div>
            <el-checkbox label="01" name="type">地推活动</el-checkbox>
          </div>
          <div class="active-item">
            <div class="active-name">活动性质三:</div>
            <el-checkbox label="02" name="type">美食餐厅</el-checkbox>
            <el-checkbox label="03" name="type">咖啡厅</el-checkbox>
          </div> -->
          <div class="active-item" v-for="group in activityTypes" :key="group.id">
            <div class="active-name">{{ group.name }}:</div>
            <el-checkbox v-for="item in group.options" :key="item.value" name="type" :label="item.value">{{ item.name }}</el-checkbox>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="sizeForm.resource" size="medium">
          <el-radio label="00">线上品牌商赞助</el-radio>
          <el-radio label="01">线下场地免费</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="formReset('activeForm')">重置</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import regionList from '@/common/assets/js/app/RegionList'
import { activityTypes } from '@/common/assets/js/app/EnumList'

export default {
  name: 'ResetFields',
  data() {
    return {
      regionList,
      activityTypes,
      sizeForm: {
        name: '',
        region: '',
        startDate: null,
        endDate: undefined,
        type: [],
        resource: '',
      },
    }
  },
  methods: {
    formReset(formName) {
      // 不在页面中的属性不会被重置
      // 回复到初始值，⚠️ 初始值
      // 在表单中，没有在 el-form-item 上用 prop 声明的属性不会被重置
      this.$refs[formName].resetFields()
    },
    onSubmit() {
      console.log('submit!', this.sizeForm)
    },
  },
}
</script>

<style lang="scss" scoped>
.form-demo {
  width: 560px;
}

.active-item {
  display: flex;
  font-size: 14px;
  line-height: 40px;
  & + .active-item {
    margin-top: 10px;
  }
  & > .active-name {
    margin-right: 20px;
    // color: #6F7F89;
    color: #cdcdcd;
  }
}
</style>
