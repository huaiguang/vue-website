<template>
  <console-layout :active-index="'4-1'">
    <div class="wrapper">
      <h1>前端加解密</h1>
      <router-view></router-view>
    </div>
  </console-layout>
</template>

<script>
import ConsoleLayout from 'common/components/BaseLayout/ConsoleLayout'

export default {
  components: {
    ConsoleLayout
  }
}
</script>

<style lang="scss">
.wrapper-item {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #DCE5EB;
  &:last-of-type {
    margin-bottom: 0;
  }
  & > h2 {
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
  }
}

.item-detail {
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  .item-name {
    margin-right: 10px;
    width: 140px;
    text-align: right;
    color: #6F7F89;
    &.with-input {
      line-height: 40px;
    }
  }
  .item-desc {
    color: #21333F;
  }
}

.item-encrypt {
  padding-top: 10px;
  padding-bottom: 10px;
  width: 80%;
  border-bottom: 1px solid #DCE5EB;
  &:last-of-type {
    border-bottom: none;
  }
  .item-title {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 700;
  }
  .item-detail {
    margin-bottom: 10px;
    width: 100%;
    &:last-child {
      margin-bottom: 0;
    }
    .item-name {
      width: 100px;
    }
    .item-desc {
      width: 700px;
      word-break: break-all;
    }
  }
}
</style>

