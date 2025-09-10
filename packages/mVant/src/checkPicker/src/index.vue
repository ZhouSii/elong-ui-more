<template>
  <ev-input
    v-model="checkedLabel"
    name="checkPicker"
    readonly
    :label="label"
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
    :style="{ height: '60%', display: 'flex', 'flex-direction': 'column' }"
    :teleport="attrs.teleport"
  >
    <div class="van-picker__toolbar">
      <button
        class="van-picker__cancel van-haptics-feedback"
        @click="showPicker = false"
      >
        取消
      </button>
      <div class="van-picker__title van-ellipsis">{{ label }}</div>
      <button
        class="van-picker__confirm van-haptics-feedback"
        @click="onConfirm"
      >
        确认
      </button>
    </div>

    <div style="flex: 1; overflow: auto">
      <van-checkbox-group ref="checkboxGroup" v-model="checked">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in columns"
            :key="item.value"
            clickable
            :title="item.text"
            @click="toggle(index)"
          >
            <template #right-icon>
              <van-checkbox
                :ref="(el) => (checkboxRefs[index] = el)"
                :name="item.value"
                @click.stop
              />
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>
  </van-popup>
</template>

<script setup lang="ts" name="EvCheckPicker">
import { onBeforeUpdate, toRefs, ref, computed } from 'vue';
import { EvInput } from '../../input';
import {
  defaultProps,
  arrayToString,
  stringToArray,
  selectDictLabels
} from '../../utils';

const props = defineProps({
  ...defaultProps,
  placeholder: {
    type: String,
    default: '请选择'
  }
});

const { columns, disabled } = toRefs(props);

const checkboxRefs = ref([] as any);

const showPicker = ref(false);

const emit = defineEmits(['update:modelValue']);

const checked: any = computed({
  get: () => stringToArray(props.modelValue),
  set: (val) => {
    emit('update:modelValue', arrayToString(val));
  }
});

const checkedLabel = computed(() => {
  return selectDictLabels(columns?.value, checked.value);
});

// 弹窗显示
const onClickShow = (): void => {
  if (!disabled.value) {
    showPicker.value = true;
  }
};

const onConfirm = (): void => {
  emit('update:modelValue', checked.value.join(','));
  showPicker.value = false;
};

const toggle = (index: number): void => {
  checkboxRefs.value[index].toggle();
};

onBeforeUpdate(() => {
  checkboxRefs.value = [];
});
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
