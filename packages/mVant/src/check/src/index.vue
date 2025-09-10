<template>
  <ev-input name="check" :label="label" :required="required" :rules="rules">
    <template #input>
      <van-checkbox-group
        v-model="checked"
        :direction="attrs.direction || 'horizontal'"
      >
        <van-checkbox
          v-for="item in columns"
          :key="item.value"
          :name="item.value"
          :shape="shape"
          >{{ item.text }}</van-checkbox
        >
      </van-checkbox-group>
    </template>
  </ev-input>
</template>

<script setup lang="ts" name="EvCheck">
import { computed, toRefs } from 'vue';
import { EvInput } from '../../input';
import { defaultProps, arrayToString, stringToArray } from '../../utils';

const props = defineProps({
  ...defaultProps
});

const emit = defineEmits(['update:modelValue']);

const checked = computed({
  get: () => stringToArray(props.modelValue),
  set: (val) => {
    emit('update:modelValue', arrayToString(val));
  }
});

const { columns } = toRefs(props);
</script>
