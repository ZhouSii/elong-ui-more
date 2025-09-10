<template>
  <div>
    <div>二次封装dialog组件 自定义的内容</div>
    <component
      :is="h(ElDialog, { ...$attrs, ref: changeRef }, $slots)"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { ElDialog } from 'element-plus';
import {
  ComponentInstance,
  getCurrentInstance,
  h,
  type ComponentPublicInstance
} from 'vue';

defineOptions({
  name: 'NmDialog',
  inheritAttrs: false // 用于控制是否启用默认的组件 attribute 透传行为
});

// const props = defineProps<Partial<DialogProps>>();

const vm = getCurrentInstance();

const changeRef = (ref: Element | ComponentPublicInstance | null) => {
  console.log('🚀 ~ changeRef ~ dialogInstance:', ref);
  if (vm && ref) {
    vm.exposed = vm.exposeProxy = ref || {};
  }
  // 如果需要在这里处理其他逻辑，可以添加相应的代码
};

defineExpose({} as ComponentInstance<typeof ElDialog>);
</script>

<style lang="scss" scoped></style>
