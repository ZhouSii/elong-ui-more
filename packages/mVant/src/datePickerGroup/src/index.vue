<template>
  <ev-input
    v-model="dateLabel"
    name="datePickerGroup"
    readonly
    :label="label"
    :required="required"
    :placeholder="placeholder"
    :rules="rules"
    type="textarea"
    :rows="1"
    :autosize="true"
    @click="onClickShow"
  >
    <template #button><span class="vanCheck"></span></template>
  </ev-input>
  <van-popup
    v-model:show="showPicker"
    round
    position="bottom"
    :teleport="attrs.teleport"
  >
    <van-picker-group
      :title="label"
      :tabs="['开始日期', '结束日期']"
      next-step-text="下一步"
      @confirm="onConfirm"
      @cancel="onCancel"
    >
      <van-date-picker v-model="startDate" />
      <van-date-picker v-model="endDate" />
    </van-picker-group>
  </van-popup>
</template>

<script setup lang="ts" name="EvDatePickerGroup">
import useCommon from '../../hooks/global/useCommon';
import { toRefs, ref, computed } from 'vue';
import { EvInput } from '../../input';
import { defaultProps } from '../../utils';
import useVant from '../../hooks/global/useVant';

const props = defineProps({
  ...defaultProps,
  placeholder: {
    type: String,
    default: '请选择'
  }
});
const { disabled } = toRefs(props);

const showPicker = ref(false);

// 时间转换
const formatterDate = (time?: string) => {
  const defaultTime = time || new Date();

  return [
    useCommon.day(defaultTime).format('YYYY'),
    useCommon.day(defaultTime).format('MM'),
    useCommon.day(defaultTime).format('DD')
  ];
};
// 开始时间
const startDate = ref(formatterDate());
// 结束时间
const endDate = ref(formatterDate());

const emit = defineEmits(['update:modelValue', 'getDate']);

const dateLabel = computed(() => {
  if (props.modelValue) {
    const defaultDate = props.modelValue.split('至');
    startDate.value = formatterDate(defaultDate[0]);
    endDate.value = formatterDate(defaultDate[1]);
  }
  return props.modelValue;
});

const onCancel = () => {
  showPicker.value = false;
};

// 弹窗显示
const onClickShow = (): void => {
  if (!disabled.value) {
    showPicker.value = true;
  }
};

//单选确认
const onConfirm = (): void => {
  const startX = useCommon.day(startDate.value.join('/')).valueOf();
  const endX = useCommon.day(endDate.value.join('/')).valueOf();
  if (startX <= endX) {
    emit(
      'update:modelValue',
      `${startDate.value.join('-')}至${endDate.value.join('-')}`
    );
    emit('getDate', [startDate.value.join('-'), endDate.value.join('-')]);
    showPicker.value = false;
  } else {
    useVant.vantToastMixin('结束日期应大于开始日期');
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
