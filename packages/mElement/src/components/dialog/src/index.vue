<template>
  <ElDialog
    v-model="dialogVisible"
    v-bind="$attrs"
    append-to-body
    :ref="changeRef"
  >
    <!-- 传递所有父组件的插槽，除了 footer -->
    <template v-for="(_, name) in $slots" #[name]="slotProps" :key="name">
      <template v-if="name !== 'footer'">
        <slot :name="name" v-bind="slotProps"></slot>
      </template>
    </template>

    <!-- Footer 插槽的特殊处理 -->
    <template #footer>
      <!-- 如果父组件提供了 footer 插槽，则使用父组件的 -->
      <slot v-if="$slots.footer" name="footer"></slot>
      <!-- 否则使用默认的 footer -->
      <div v-else class="footer-container">
        <div>
          <slot name="footer-left"></slot>
        </div>
        <div>
          <ElButton v-if="showCancelButton" @click="onHandleCancel">{{
            cancleText
          }}</ElButton>
          <ElButton
            v-if="showConfirmButton"
            :loading="confirmLoading"
            type="primary"
            @click="onHandleConfirm"
            >{{ confirmText }}</ElButton
          >
        </div>
      </div>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ElDialog, ElButton } from 'element-plus';
import {
  computed,
  ComponentInstance,
  getCurrentInstance,
  type ComponentPublicInstance
} from 'vue';

defineOptions({
  name: 'NmDialog',
  inheritAttrs: false // 用于控制是否启用默认的组件 attribute 透传行为
});

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    showCancelButton?: boolean;
    showConfirmButton?: boolean;
    cancleText?: string;
    confirmText?: string;
    confirmLoading?: boolean;
  }>(),
  {
    modelValue: false,
    showCancelButton: true,
    showConfirmButton: true,
    cancleText: '取 消',
    confirmText: '确 定',
    confirmLoading: false
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();

const dialogVisible = computed({
  get() {
    return props.modelValue;
  },
  set(value: boolean) {
    emit('update:modelValue', value);
  }
});

const onHandleCancel = () => {
  emit('cancel');
  emit('update:modelValue', false);
};

const onHandleConfirm = () => {
  // 在这里可以添加确认逻辑
  emit('confirm');
};

const vm = getCurrentInstance();

const changeRef = (ref: Element | ComponentPublicInstance | null) => {
  // console.log('🚀 ~ changeRef ~ dialogInstance:', ref);
  if (vm && ref) {
    vm.exposed = vm.exposeProxy = ref || {};
  }
  // 如果需要在这里处理其他逻辑，可以添加相应的代码
};

defineExpose({} as ComponentInstance<typeof ElDialog>);
</script>

<style lang="scss" scoped>
.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div:last-child {
    display: flex;
    gap: 10px;
  }
}

:deep(.el-dialog__footer) {
  padding: 20px;
  border-top: 1px solid #ebeef5;
}
</style>
