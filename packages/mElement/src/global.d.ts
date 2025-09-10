// 全局类型声明文件
import type { DefineComponent } from 'vue';
import type {
  NmApprovalProps,
  NmApprovalEmits,
  ApprovalFlowItem,
  ApprovalFlowResponse,
  FetchApprovalFlowFunction
} from './components/approval/src/types';

// 声明全局组件类型
declare module 'vue' {
  export interface GlobalComponents {
    NmApproval: DefineComponent<
      NmApprovalProps,
      {},
      {},
      {},
      {},
      any,
      any,
      NmApprovalEmits
    >;
  }
}

// 导出所有类型以供使用
export type {
  NmApprovalProps,
  NmApprovalEmits,
  ApprovalFlowItem,
  ApprovalFlowResponse,
  FetchApprovalFlowFunction
};
