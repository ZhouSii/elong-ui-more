<template>
  <ev-input
    v-model="dateLabel"
    name="datePicker"
    readonly
    :label="label"
    :required="required"
    :placeholder="placeholder"
    :rules="rules"
    @click="onClickShow"
  >
    <template #button><span class="vanCheck"></span></template>
  </ev-input>
  <van-popup v-model:show="showPicker" round position="bottom">
    <van-date-picker
      v-model="currentDate"
      :min-date="minDate"
      title=""
      @confirm="onConfirm"
      @cancel="showPicker = false"
    />
  </van-popup>
</template>

<script setup lang="ts" name="EvDate">
import useCommon from '../../hooks/global/useCommon';
import { toRefs, ref, computed } from 'vue';
import { EvInput } from '../../input';
import { defaultProps, arrayToString, stringToArray } from '../../utils';

const props = defineProps({
  ...defaultProps,
  placeholder: {
    type: String,
    default: '请选择'
  }
});

const { disabled } = toRefs(props);

const showPicker = ref(false);

const emit = defineEmits(['update:modelValue']);

const currentYear = new Date().getFullYear();

const minDate = computed(() => {
  const date = new Date(props?.attrs.minDate);
  if (isNaN(date.getTime())) {
    console.error('Invalid date');
    return new Date(currentYear - 10, 0, 1);
  }
  return date;
});

const currentDate = computed({
  get: () => {
    if (props.modelValue) {
      return stringToArray(props.modelValue, '-');
    }
    return stringToArray(useCommon.day().format('YYYY-MM-DD'), '-');
  },
  set: (val) => {
    // emit('update:modelValue', val.join(','))
  }
});
const dateLabel = computed(() => props.modelValue);

// 弹窗显示
const onClickShow = (): void => {
  if (!disabled.value) {
    showPicker.value = true;
  }
};

//单选确认
const onConfirm = ({ selectedValues }): void => {
  emit('update:modelValue', arrayToString(selectedValues, '-'));
  showPicker.value = false;
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.vanCheck {
  background: #ffff;
  border: 0 none;
  color: #1989fa;
  background: url('../../assets/arrow.png') no-repeat center;
  background-size: contain;
  display: inline-block;
  width: 16px;
  height: 16px;
}
</style>
