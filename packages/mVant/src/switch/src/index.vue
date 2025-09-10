<template>
  <ev-input
    name="switch"
    :label="label"
    :required="required"
    :rules="rules"
    :label-align="labelAlign"
  >
    <template #input>
      <van-switch v-model="checked" />
    </template>
  </ev-input>
</template>

<script setup lang="ts" name="EvSwitch">
import { computed } from 'vue';
import { EvInput } from '../../input';
import { defaultProps } from '../../utils';

const props = defineProps({
  ...defaultProps,
  labelAlign: {
    type: String,
    default: 'left'
  }
});
const emit = defineEmits(['update:modelValue', 'onChange']);

const checked = computed({
  get: () => (props.modelValue ? true : false),
  set: (val) => {
    emit('update:modelValue', val);
  }
});
</script>
