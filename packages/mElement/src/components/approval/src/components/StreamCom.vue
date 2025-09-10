<template>
  <NmDialog title="审批流" draggable width="70%" :showConfirmButton="false">
    <div h-60vh overflow-auto>
      <NmTable
        ref="tableRef"
        height="100%"
        :loading="props.loading"
        :columns="columns"
        :data="tableData"
      >
        <template #files="{ row }">
          <template v-if="row.files && row.files.length">
            <el-image
              v-for="item in row.files"
              :key="item.id"
              :src="item.compressUrl"
              fit="contain"
              style="height: 60px"
              :preview-src-list="[item.url]"
              :preview-teleported="true"
            >
            </el-image>
          </template>
          <span v-else>-</span>
        </template>
      </NmTable>
    </div>
  </NmDialog>
</template>

<script setup lang="ts">
import { ref, computed, withDefaults } from 'vue';
import NmTable from '../../../table';

defineOptions({
  name: 'StreamCom'
});

// 定义节点类型接口
interface ApprovalNode {
  texts?: string;
  processUserNames?: string;
  strState?: string;
  remarks?: string;
  taskEndTime?: string;
  taskCreateTime?: string;
  files?: any[];
  nodes?: ApprovalNode[];
  span?: number;
  [key: string]: any; // 允许其他属性
}

const props = withDefaults(
  defineProps<{
    list: ApprovalNode[];
    loading?: boolean;
  }>(),
  {
    list: () => [], // 使用函数返回空数组
    loading: false
  }
);

const columns = ref([
  { type: 'index', label: '序号', width: '80px' },
  { prop: 'texts', label: '审批节点', minWidth: '180px' },
  { prop: 'processUserNames', label: '审批人', minWidth: '180px' },
  { prop: 'approvalResult', label: '审批结果', minWidth: '180px' },
  { prop: 'remarks', label: '审批意见', minWidth: '180px' },
  { slot: 'files', label: '附件', minWidth: '180px' },
  { prop: 'taskEndTime', label: '审批时间', minWidth: '180px' },
  { prop: 'taskCreateTime', label: '节点到达时间', minWidth: '180px' }
]);

// 为节点应用默认值的工具函数
const normalizeNode = (node: ApprovalNode, span = 1): ApprovalNode => ({
  ...node,
  texts: node.texts || '-', // 审批节点
  processUserNames: node.processUserNames || '-',
  approvalResult:
    node.strState !== '待审批'
      ? `${node.strState || ''}${node.lastDoTypesStr ? '-' : ''}${node.lastDoTypesStr || ''}`
      : '-',
  strState: node.strState || '待审批',
  remarks: node.remarks || '-',
  taskEndTime: node.taskEndTime || '-',
  taskCreateTime: node.taskCreateTime || '-',
  files: node.files || [],
  span // 合并单元格的跨度
});

// 使用传入的 list 数据
const tableData = computed(() => {
  const result = props.list.flatMap((item: ApprovalNode) => {
    // 如果有子节点，处理所有子节点
    if (item.nodes?.length) {
      return item.nodes.map((node: ApprovalNode) =>
        normalizeNode(node, item.nodes!.length)
      );
    }
    // 没有子节点，直接处理当前节点
    return [normalizeNode(item)];
  });
  console.log('🚀 ~ result:', result);
  return result;
});
</script>

<style scoped lang="scss"></style>
