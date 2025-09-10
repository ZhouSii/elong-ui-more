/*
 * 表格列相关类型
 */
import { VNode } from 'vue';
import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';

export type TypeProps = 'index' | 'selection' | 'expand'; // col类型

// 定义默认行数据类型
export interface DefaultRow {
  [key: string]: any;
}

// 自定义单元格（tsx语法）
type RenderScope<T extends DefaultRow = DefaultRow> = {
  row: T;
  $index: number;
  column: TableColumnCtx<T>;
  [key: string]: any;
};

// 自定义表头内容（tsx语法）
type HeaderRenderScope<T extends DefaultRow = DefaultRow> = {
  $index: number;
  column: TableColumnCtx<T>;
  [key: string]: any;
};

export interface ColumnProps<T extends DefaultRow = DefaultRow>
  extends Partial<
    Omit<TableColumnCtx<T>, 'type' | 'children' | 'renderCell' | 'renderHeader'>
  > {
  type?: TypeProps; // 列类型
  isHidden?: boolean; // 是否隐藏
  headerRender?: (scope: HeaderRenderScope<T>) => VNode; // 自定义表头内容渲染（tsx语法）
  render?: (scope: RenderScope<T>) => VNode | string; // 自定义单元格内容渲染（tsx语法）
  slot?: string; // 插槽名称
}
