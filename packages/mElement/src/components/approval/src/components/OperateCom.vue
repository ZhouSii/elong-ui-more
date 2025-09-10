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
      <template v-if="!isAgree">
        <ElFormItem label="回退至" porp="nextNodeId">
          <ElSelect v-model="form.nextNodeId" placeholder="请选择">
            <ElOption
              v-for="item in revertList"
              :key="item.id"
              :label="item.texts"
              :value="item.id"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="" prop="backIsSkip">
          <ElRadioGroup v-model="form.backIsSkip">
            <ElRadio
              v-for="item in backOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElRadioGroup>
        </ElFormItem>
      </template>
      <ElFormItem label="附件" porp="files">
        <NmUpload
          v-model="form.files"
          :uploadConfig="uploadConfig"
          accept=".jpg,.jpeg,.png"
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

import NmUpload from '../../../upload';

import {
  OPERATE_TYPE,
  OPERATE_AGREE_TITLE,
  OPERATE_REFUSE_TITLE,
  OPERATE_AGREE_TIPS,
  OPERATE_REFUSE_TIPS
} from '../../../../constants';

import {
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElRadioGroup,
  ElRadio,
  ElTag,
  type FormInstance
} from 'element-plus';

defineOptions({
  name: 'OperateCom'
});

const props = withDefaults(
  defineProps<{
    // 定义需要的props
    type: OPERATE_TYPE;
    revertList: any[];
  }>(),
  {
    // 设置默认值
    type: OPERATE_TYPE.AGREE,
    revertList: () => []
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

// 使用审批上下文获取所有审批方法
const approvalContext = useApprovalContext();

const { bool: confirmLoading, toggle: toggleConfirmLoading } = useBoolean();

// form实例
const formRef = ref<FormInstance>();

const isAgree = computed(() => props.type === OPERATE_TYPE.AGREE);

const dialogTitle = computed(() =>
  isAgree.value ? OPERATE_AGREE_TITLE : OPERATE_REFUSE_TITLE
);

const uploadConfig = computed(() => approvalContext.uploadConfig);
console.log('🚀 ~ uploadConfig:', uploadConfig);

// 初始表单数据
const initialFormData = {
  nextNodeId: '',
  backIsSkip: 'N',
  remarks: '',
  files: []
};

// 回退form
const form = ref({ ...initialFormData });

// 是否跳过全部节点
const backOptions = [
  { label: '全部节点重新走审批', value: 'N' },
  { label: '跳过已审批节点', value: 'Y' }
];

// 建议内容
const tips = computed(() =>
  isAgree.value ? OPERATE_AGREE_TIPS : OPERATE_REFUSE_TIPS
);

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
  console.log('props.type ', props.type);
  console.log('props.type >>>>> popForm.value', form.value);

  if (!formRef.value) return;

  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      toggleConfirmLoading();
      console.log('🚀 ~ submitForm ~ confirmLoading:', confirmLoading.value);

      if (isAgree.value) {
        // 同意逻辑
        handleApprovalAgree();
      } else {
        // 回退逻辑
        console.log('🚀 ~ submitForm ~ 回退逻辑:');
        handleApprovalRefuse();
      }
    } else {
      console.log('error submit!', fields);
    }
  });
};

// 处理审批同意
const handleApprovalAgree = async () => {
  if (!approvalContext.approvalAgree) {
    console.warn('未提供审批同意方法');
    return;
  }

  try {
    await approvalContext.approvalAgree({
      id: approvalContext.taskItemId!,
      remarks: form.value.remarks,
      files: form.value.files
    });

    console.log('审批同意成功:');

    emit('update:modelValue', false);

    // 这里可以emit事件通知父组件操作成功
    approvalContext.onBack && approvalContext.onBack(props.type);
  } catch (error) {
    console.error('审批同意失败:', error);
  } finally {
    toggleConfirmLoading();
  }

  console.log('审批同意成功:');
  // 这里可以emit事件通知父组件操作成功
};

// 处理审批回退
const handleApprovalRefuse = async () => {
  console.log('🚀 ~ 测试是否进入了回退的逻辑:', approvalContext.approvalRefuse);

  if (!approvalContext.approvalRefuse) {
    console.warn('未提供审批回退方法');
    return;
  }

  try {
    await approvalContext.approvalRefuse({
      id: approvalContext.taskItemId,
      nextNodeId: form.value.nextNodeId,
      backIsSkip: form.value.backIsSkip as 'Y' | 'N',
      remarks: form.value.remarks,
      files: form.value.files
    });

    emit('update:modelValue', false);

    // console.log('审批回退成功:', result);
    console.log('审批回退成功:>>>触发回退操作');
    // 这里可以emit事件通知父组件操作成功
    approvalContext.onBack && approvalContext.onBack(props.type);
  } catch (error) {
  } finally {
    toggleConfirmLoading();
  }
};
</script>

<style scoped lang="scss"></style>
