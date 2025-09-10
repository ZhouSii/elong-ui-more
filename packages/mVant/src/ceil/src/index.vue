<template>
  <div
    class="m-ceil"
    :style="{ 'flex-direction': isColumn ? 'column' : 'row' }"
  >
    <span
      class="label"
      :style="{ 'white-space': isColumn ? 'normal' : 'nowrap' }"
    >
      {{ label }}
      <slot name="label"></slot>
    </span>
    <span class="content" :style="columnStyles">
      <van-text-ellipsis
        v-if="content"
        :content="content"
        :rows="row"
        expand-text="展开"
        collapse-text="收起"
      />
      <slot></slot>
    </span>
    <van-icon v-if="isLink" name="arrow" class="m-cell__right-icon" />
  </div>
</template>

<script setup lang="ts" name="EvCeil">
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  row: {
    type: Number,
    default: 2
  },
  isLink: {
    type: Boolean,
    default: false
  },
  isColumn: {
    type: Boolean,
    default: false
  }
});

const columnStyles: any = computed(() => {
  if (props.isColumn) {
    return {
      'text-align': 'left',
      'margin-top': props.label ? '10px' : '0'
    };
  }

  return {
    'text-align': 'right',
    'margin-top': '0px'
  };
});
</script>

<style lang="scss" scoped>
.m-ceil {
  display: flex;
  padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
  background: #fff;
  position: relative;
  .label {
    color: var(--van-field-label-color);
    line-height: var(--van-cell-line-height);
    white-space: nowrap;
    font-weight: 400;
    margin-right: var(--van-field-label-margin-right);
  }
  .content {
    flex: 1;
    color: #323233;
    line-height: var(--van-cell-line-height);
    font-weight: 400;
    text-align: right;
    padding-right: 8px;
    word-break: break-all;
  }

  .m-cell__right-icon {
    margin-left: var(--van-padding-base);
    color: var(--van-cell-right-icon-color);
    height: var(--van-cell-line-height);
    font-size: var(--van-cell-icon-size);
    line-height: var(--van-cell-line-height);
  }
}
</style>

<style>
.m-ceil:not(:last-child)::after {
  position: absolute;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: var(--van-padding-md);
  bottom: 0;
  left: var(--van-padding-md);
  border-bottom: 1px solid var(--van-cell-border-color);
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
</style>
