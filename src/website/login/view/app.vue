<template>
  <div class="login-box">
    <h1 class="title">登 陆</h1>
    <div class="form-item">
      <label class="" for="username">用户名：</label>
      <input name="username" v-model="username" type="text">
    </div>
    <div class="form-item">
      <label for="password">密码：</label>
      <input name="password" v-model="password" type="text">
    </div>
    <div class="form-item submit">
      <input type="button" value="提交" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: 'siQin',
      password: ''
    }
  }
}

</script>

<style lang="scss">
.login-box {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 270px;
  height: 280px;
  font-size: 0;
  text-align: center;
  background-color: #fff;
  .title {
    margin-left: 60px;
    font-size: 16px;
    color: #333;
  }
  .form-item {
    margin-bottom: 15px;
    &.submit {
      margin-left: 60px;
    }
    label {
      display: inline-block;
      width: 60px;
      font-size: 14px;
      line-height: 30px;
      text-align: right;
      vertical-align: top;
    }
    input[type="text"] {
      display: inline-block;
      padding: 4px 6px;
      width: 210px;
      font-size: 14px;
      line-height: 20px;
      border: 1px solid #ccc;
      border-radius: 2px;
      vertical-align: top;
      box-sizing: border-box;
    }
    input[type="button"] {
      padding: 4px 10px;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 2px;
      cursor: pointer;
    }
  }
}

</style>