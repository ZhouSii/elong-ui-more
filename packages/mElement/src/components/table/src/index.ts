import type { ExtractPropTypes } from 'vue';
import { ColumnProps } from './interface';

// 属性
export const Props = {
  // 表格数据
  data: {
    type: Array as () => any[],
    default: () => []
  },
  // 列数据
  columns: {
    type: Array as () => ColumnProps[],
    default: () => []
  }
};

export type TablePropsType = ExtractPropTypes<typeof Props>;
