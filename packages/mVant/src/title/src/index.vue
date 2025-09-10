<template>
  <div class="m-title">
    <span :class="[isTips ? 'm-title-label' : '']" :style="'--tc:' + tipsColor">
      {{ label }}
      <slot name="label"></slot>
    </span>
    <slot></slot>
  </div>
</template>

<script setup lang="ts" name="EvTitle">
defineProps({
  label: {
    type: String,
    default: ''
  },
  isTips: {
    type: Boolean,
    default: false
  },
  tipsColor: {
    type: String,
    default: '#00942a'
  }
});
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.m-title {
  font-family:
    PingFangSC-Medium,
    PingFang SC;
  color: #1a1a1a;
  line-height: var(--van-cell-line-height);
  font-size: 16px;
  padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .m-title-label {
    position: relative;

    &::before {
      position: absolute;
      left: -10px;
      top: 50%;
      transform: translateY(-50%);
      content: '';
      display: block;
      width: 6px;
      height: 12px;
      background: var(--tc);
      border-radius: 2px;
    }
  }
}
</style>
