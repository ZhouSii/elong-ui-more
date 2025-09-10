<!-- 表格组件 -->
<template>
  <el-table
    class="ee-table"
    v-bind="$attrs"
    :data="props.data"
    border
    cell-class-name="ee-table-cell"
    header-cell-class-name="ee-table-heaer-cell"
    empty-text="暂无数据"
    ref="tableRef"
  >
    <!-- 默认插槽 -->
    <slot></slot>

    <!-- 列渲染 -->
    <template
      v-for="(col, index) in props.columns"
      :key="col.columnKey || col.prop || index"
    >
      <!-- 跳过隐藏列 -->
      <template v-if="!col.isHidden">
        <el-table-column v-bind="getColumnProps(col)">
          <!-- 特殊类型列(selection/index/expand)的插槽 -->
          <template v-if="col.type === 'expand'" #default="scope">
            <component :is="col.render" v-bind="scope" v-if="col.render" />
            <slot v-else :name="col.type" v-bind="scope" />
          </template>

          <!-- 自定义插槽列 -->
          <template v-else-if="col.slot" #default="scope">
            <slot :name="col.slot" v-bind="scope" />
          </template>

          <!-- 自定义渲染函数列 -->
          <template v-else-if="col.render" #default="scope">
            <component :is="col.render" v-bind="scope" />
          </template>
        </el-table-column>
      </template>
    </template>

    <!-- 表格尾部插槽 -->
    <template #append>
      <slot name="append"></slot>
    </template>

    <!-- 无数据插槽 -->
    <template #empty>
      <slot name="empty"></slot>
    </template>
  </el-table>
</template>
<script setup lang="ts" name="NmTable">
import { ref, watchEffect } from 'vue';
import type { TablePropsType } from './index';
import { Props } from './index';
import type { ColumnProps } from './interface';
// Element
import { ElTable, ElTableColumn } from 'element-plus';

defineOptions({
  name: 'NmTable'
});

// 属性
const props: TablePropsType = defineProps(Props);
// 事件
const emit = defineEmits(['init']);
// 表格组件实例
const tableRef = ref<InstanceType<typeof ElTable>>();

// 获取列属性，设置默认值
const getColumnProps = (col: ColumnProps) => {
  return {
    align: 'center', // 默认居中
    showOverflowTooltip: false, // 默认不显示tooltip
    reserveSelection: col.type === 'selection', // selection类型才保留选择
    ...col // 用户配置的属性会覆盖默认值
  };
};

watchEffect(() => {
  emit('init', tableRef.value); // 初始化完成
});
</script>
<style lang="scss" scoped>
.ee-table {
  // 单选框样式调整
  .el-radio:last-child {
    margin-right: -8px;
  }
  // 表格-cell样式
  :deep(.ee-table-cell),
  :deep(.ee-table-heaer-cell) {
    padding: 12px 0;
  }
  // 表格-头部cell样式
  :deep(.ee-table-heaer-cell) {
    background-color: #f3f4f7;
    color: #333;
  }
  // 修复fix表头颜色变薄问题
  :deep(th.el-table-fixed-column--right) {
    background-color: #f3f4f7;
  }
}
</style>
