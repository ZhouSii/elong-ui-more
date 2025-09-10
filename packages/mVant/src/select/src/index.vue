<template>
  <div>
    <ev-input
      v-model="selectedLabel"
      name="select"
      readonly
      :label="label"
      :placeholder="placeholder"
      :required="required"
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
      :style="{ height: '60%', display: 'flex', 'flex-direction': 'column' }"
    >
      <div v-if="slotSearch" class="van-picker__toolbar">
        <button
          class="van-picker__cancel van-haptics-feedback"
          @click="showPicker = false"
        >
          取消
        </button>
        <div class="van-picker__title van-ellipsis">{{ label }}</div>
        <button
          class="van-picker__confirm van-haptics-feedback"
          @click="onConfirmSlot"
        >
          确认
        </button>
      </div>
      <slot name="search"></slot>
      <div style="flex: 1; overflow: auto">
        <van-picker
          ref="picker"
          v-model="selected"
          :title="label"
          :columns="columns"
          :show-toolbar="!slotSearch"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts" name="EvSelect">
import { useSlots, toRefs, ref, computed } from 'vue';
import { EvInput } from '../../input';
import { defaultProps, stringToArray, selectDictLabels } from '../../utils';

const props = defineProps({
  ...defaultProps,
  placeholder: {
    type: String,
    default: '请选择'
  }
});

//插槽信息
const slotSearch = !!useSlots().search;

const { columns, disabled } = toRefs(props);

const showPicker = ref(false);

const emit = defineEmits(['update:modelValue', 'onChange']);
// 模版值
const slotSelected = ref('');
// 缓存当前值
const cacheSelected = ref<null | string>(null);
// 当前选择的值
const selected = computed({
  get: () => {
    cacheSelected.value = props.modelValue ? props.modelValue + '' : null;
    slotSelected.value = props.modelValue ? props.modelValue + '' : '';
    return stringToArray(props.modelValue + '');
  },
  set: (val) => {
    slotSelected.value = val[0];
  }
});

// 中文回显
const selectedLabel = computed(() => {
  return selectDictLabels(columns?.value, selected.value);
});

// 弹窗显示
const onClickShow = (): void => {
  if (!disabled.value) {
    showPicker.value = true;
  }
};

const onConfirmSlot = () => {
  if (cacheSelected.value !== slotSelected.value) {
    cacheSelected.value = slotSelected.value;
    emit('onChange', cacheSelected.value);
  }
  showPicker.value = false;
};

//单选确认
const onConfirm = ({ selectedOptions }): void => {
  const selected = selectedOptions[0].value || '';

  if (cacheSelected.value !== selected) {
    cacheSelected.value = selected as string;
    emit('update:modelValue', selected);
    emit('onChange', selected);
  }

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

:deep(.van-field__button) {
  align-self: baseline;
}
</style>
