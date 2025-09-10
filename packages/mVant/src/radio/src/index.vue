<template>
  <ev-input
    name="radio"
    :label="label"
    :required="required"
    :rules="rules"
    :label-align="labelAlign"
  >
    <template #input>
      <van-radio-group
        v-model="checked"
        :direction="attrs.direction || 'horizontal'"
        :disabled="disabled"
      >
        <van-radio
          v-for="item in columns"
          :key="item.value"
          :name="item.value"
          >{{ item.text }}</van-radio
        >
      </van-radio-group>
    </template>
  </ev-input>
</template>

<script setup lang="ts" name="EvRadio">
import { toRefs, computed } from 'vue';
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
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val);
    emit('onChange', {
      type: 'radio',
      label: props.label,
      keyWord: props.keyWord,
      value: val
    });
  }
});

const { columns } = toRefs(props);
</script>
