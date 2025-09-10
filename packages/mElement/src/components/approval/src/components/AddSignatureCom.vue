<template>
  <NmDialog
    :title="dialogTitle"
    draggable
    width="70%"
    :close-on-click-modal="false"
    :confirmLoading="confirmLoading"
    @open="handleOpen"
    @confirm="submitForm"
    @cancel="onClose"
  >
    <ElForm ref="formRef" :model="form" :rules="rules" label-width="100px">
      <ElFormItem label="加签方式" prop="backIsSkip">
        <ElRadioGroup v-model="form.apostilleType">
          <ElRadio
            v-for="item in apostilleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElRadioGroup>
        <ElAlert
          :title="
            form.apostilleType === '1'
              ? '加签后,流程先经过被加签人,再由当前审批人处理'
              : '加签后,流程会执行同意并加签'
          "
          :closable="false"
          type="warning"
        />
      </ElFormItem>
      <ElFormItem label="加签审批人" prop="userId">
        <NmPerson
          type="textarea"
          v-model="form.userId"
          :multiple="false"
          placeholder="请选择"
          :fetchPersonnel="approvalContext.fetchPersonnel"
        />
      </ElFormItem>
      <ElFormItem label="审批意见" prop="remarks">
        <ElInput
          type="textarea"
          v-model="form.remarks"
          placeholder="请输入审批意见"
          :rows="4"
        />
      </ElFormItem>

      <ElFormItem>
        <div text-xs>推荐回复：</div>
        <div>
          <ElTag
            v-for="item in tips"
            :key="item"
            type="info"
            mr-10px
            cursor-pointer
            @click="onClickTips(item)"
            >{{ item }}</ElTag
          >
        </div>
      </ElFormItem>
    </ElForm>
  </NmDialog>
</template>

<script setup lang="ts">
import { ref, computed, withDefaults } from 'vue';
// 导入hooks
import { useBoolean } from '@elong-ui/hooks';
// 导入审批上下文
import { useApprovalContext } from '../context';

import { OPERATE_ADDSIGNATURE_TIPS, OPERATE_TYPE } from '../../../../constants';

import NmPerson from '../../../person';

import {
  ElForm,
  ElFormItem,
  ElInput,
  ElAlert,
  ElRadioGroup,
  ElRadio,
  ElTag,
  type FormInstance
} from 'element-plus';

defineOptions({
  name: 'AddSignatureCom'
});

const props = withDefaults(
  defineProps<{
    // 定义需要的props
    revertList: any[];
  }>(),
  {
    revertList: () => []
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const dialogTitle = '加签';

// 使用审批上下文获取所有审批方法
const approvalContext = useApprovalContext();

const { bool: confirmLoading, toggle: toggleConfirmLoading } = useBoolean();

// form实例
const formRef = ref<FormInstance>();
// 建议内容
const tips = OPERATE_ADDSIGNATURE_TIPS;

const uploadConfig = computed(() => approvalContext.uploadConfig);
console.log('🚀 ~ uploadConfig:', uploadConfig);

// 初始表单数据
const initialFormData = {
  apostilleType: '1',
  userId: '',
  remarks: ''
};

// 回退form
const form = ref({ ...initialFormData });

// 是否跳过全部节点
const apostilleOptions = [
  { value: '1', label: '在我之前' },
  { value: '2', label: '在我之后' }
];

// 校验规则
const rules = ref({
  remarks: [
    {
      required: true,
      message: '请填写审批意见',
      trigger: 'change'
    }
  ]
});

const onClickTips = (text: string): void => {
  form.value.remarks += text;
};

// 重置表单数据的通用方法
const resetForm = () => {
  // 方法1：使用初始数据重置
  Object.assign(form.value, initialFormData);

  // 清除表单验证
  formRef.value?.clearValidate();

  // 如果需要完全重置字段（包括清除dirty状态）
  formRef.value?.resetFields();

  console.log('🚀 ~ resetForm ~ 表单已重置:', form.value);
};

// 弹框打开前的处理
const handleOpen = () => {
  console.log('🚀 ~ 弹框打开前的处理:', props);

  // 使用统一的重置方法
  resetForm();
};

// 关闭弹窗重置数据
const onClose = () => {
  console.log('🚀 ~ 关闭弹窗重置数据:');

  // 使用统一的重置方法
  resetForm();

  emit('update:modelValue', false);
};

// 提交表单
const submitForm = async () => {
  console.log('props.type >>>>> popForm.value', form.value);

  if (!formRef.value) return;

  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      if (!approvalContext.approvalAgree) {
        console.warn('未提供加签方法');
        return;
      }

      toggleConfirmLoading();

      try {
        await approvalContext.approvalAddSign!({
          id: approvalContext.taskItemId as string,
          userId: form.value.userId,
          remarks: form.value.remarks,
          apostilleType: form.value.apostilleType
        });

        emit('update:modelValue', false);

        // 这里可以emit事件通知父组件操作成功
        approvalContext.onBack &&
          approvalContext.onBack(OPERATE_TYPE.ADDSIGNATURE);
      } catch (error) {
        console.error('加签失败:', error);
      } finally {
        toggleConfirmLoading();
      }

      console.log('加签成功:');
      // 这里可以emit事件通知父组件操作成功
    } else {
      console.log('error submit!', fields);
    }
  });
};
</script>
