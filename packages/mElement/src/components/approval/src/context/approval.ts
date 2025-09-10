import { useContext } from '@elong-ui/hooks';
import type { ApprovalFlowItem } from '../types';
import { OPERATE_TYPE } from '../../../../constants';

// 定义审批上下文的接口类型
export interface ApprovalContextType {
  taskItemId?: string | number;
  // 获取审批流数据的方法
  fetchApprovalFlow?: () => Promise<{ data: ApprovalFlowItem[] }>;
  // 获取回退节点选项的方法
  fetchRefuseSelect?: () => Promise<{ data: any[] }>;
  // 获取人员选择的方法
  fetchPersonnel?: () => Promise<{ data: any[] }>;
  // 审批同意的方法
  approvalAgree?: (params: {
    id: string | number;
    remarks: string;
    files?: any[];
  }) => Promise<any>;
  // 审批回退的方法
  approvalRefuse?: (params: {
    id?: string | number;
    nextNodeId: string;
    backIsSkip: 'Y' | 'N';
    remarks: string;
    files?: any[];
  }) => Promise<any>;
  // 其他可能的审批操作
  approvalRevoke?: (params: any) => Promise<any>;
  // 加签的方法
  approvalAddSign?: (params: any) => Promise<any>;
  // 上传配置
  uploadConfig: {
    action: string;
    headers?: any;
    [key: string]: any;
  };
  // 返回操作的回调
  onBack?: (type: OPERATE_TYPE) => void;
}

// 创建审批上下文
export const {
  setupStore: setupApprovalContext,
  useStore: useApprovalContext
} = useContext('approval', (context: ApprovalContextType) => {
  return {
    ...context
  };
});
