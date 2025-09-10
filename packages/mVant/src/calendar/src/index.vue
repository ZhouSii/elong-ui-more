<template>
  <ev-input
    v-model="dateLabel"
    name="calendar"
    readonly
    :label="label"
    :required="required"
    :placeholder="placeholder"
    :disabled="disabled"
    :rules="rules"
    @click="onClickShow"
  >
    <template #button><span v-if="!disabled" class="vanCheck"></span></template>
  </ev-input>
  <van-calendar
    v-model:show="showPicker"
    :default-date="defaultDate"
    :min-date="attrs.minDate || minDate"
    :max-date="attrs.maxDate"
    :teleport="attrs.teleport"
    @confirm="onConfirm"
  />
</template>

<script setup lang="ts" name="EvCalendar">
import useCommon from '../../hooks/global/useCommon';
import { toRefs, ref, computed } from 'vue';
import { EvInput } from '../../input';
import { defaultProps } from '../../utils';
const props = defineProps({
  ...defaultProps,
  placeholder: {
    type: String,
    default: '请选择'
  }
});

const { disabled } = toRefs(props);

const emit = defineEmits(['update:modelValue', 'onChange']);

const showPicker = ref(false);
// 可选择的时间
const minDate = computed(() => {
  const date = new Date(props?.attrs.minDate);
  if (isNaN(date.getTime())) {
    console.error('Invalid date');
    return new Date(
      useCommon.day().add(-6, 'month').format('YYYY/MM/DD HH:mm:ss')
    );
  }
  return date;
});
// 默认选中的日期
const defaultDate = ref<Date | Date[] | null>(new Date());
// 当前时间显示
const dateLabel = computed(() => {
  if (props.modelValue) {
    defaultDate.value = new Date(props.modelValue);
  }
  return props.modelValue;
});
// 格式化时间显示
const formatDate = (date) =>
  `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
//单选确认
const onConfirm = (date): void => {
  emit('update:modelValue', formatDate(date));
  emit('onChange', formatDate(date));
  showPicker.value = false;
};

// 弹窗显示
const onClickShow = (): void => {
  if (!disabled.value) {
    showPicker.value = true;
  }
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
