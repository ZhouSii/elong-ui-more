<template>
  <van-field v-bind="$attrs" v-model="model" :placeholder="placeholder">
    <template v-for="(value, name) in slots" #[name]="scopedData">
      <slot :name="name" v-bind="scopedData || {}" />
    </template>
  </van-field>
</template>

<script setup lang="ts" name="EvInput">
import { computed, useSlots } from 'vue';
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入'
  }
});
// slots
const slots = useSlots();

const emit = defineEmits(['update:modelValue']);

const model = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val);
  }
});
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
:deep(.van-field__label) {
  font-size: 14px;
}
:deep(.van-field__value) {
  font-size: 14px;
  color: #bfbfbf;
}

:deep(.van-field__label--top) {
  margin-bottom: 10px;
}

:deep(.van-field__label) {
  position: relative;

  &::before {
    position: absolute;
    left: -10px;
  }
}
</style>
