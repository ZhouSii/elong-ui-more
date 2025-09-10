import { ExtractPropTypes, type PropType } from 'vue';
import { OPERATE_TYPE } from '../../../constants';
// 审批流数据项类型
export interface ApprovalFlowItem {
  id?: string | number;
  status?: string;
  title?: string;
  description?: string;
  time?: string;
  operator?: string;
  [key: string]: any;
}

// 审批流API响应类型
export interface ApprovalFlowResponse {
  data: ApprovalFlowItem[];
  [key: string]: any;
}

// API 函数类型定义
export type FetchApprovalFlowFunction = () => Promise<ApprovalFlowResponse>;
export type FetchRefuseSelectFunction = () => Promise<{ data: any[] }>;
export type FetchPersonnelFunction = () => Promise<{ data: any[] }>;

// 审批操作参数类型
export interface ApprovalAgreeParams {
  id: string | number;
  remarks: string;
  files?: any[];
}

export interface ApprovalRefuseParams {
  nextNodeId: string;
  backIsSkip: 'Y' | 'N';
  remarks: string;
  files?: any[];
}

// 上传配置类型
export interface UploadConfig {
  action: string;
  headers?: any;
  [key: string]: any;
}

// NmApproval 组件的 props 类型定义
export const nmApprovalProps = {
  // 任务项ID
  taskItemId: {
    type: [String, Number] as PropType<string | number>,
    required: false,
    default: null
  },
  instanceId: {
    type: [String, Number] as PropType<string | number>,
    required: false,
    default: null
  },
  // 获取审批流的方法
  fetchApprovalFlow: {
    type: Function as PropType<FetchApprovalFlowFunction>,
    required: false,
    default: null
  },
  // 获取回退节点的方法
  fetchRefuseSelect: {
    type: Function as PropType<FetchRefuseSelectFunction>,
    required: false,
    default: null
  },
  // 获取人员选择的方法
  fetchPersonnel: {
    type: Function as PropType<FetchPersonnelFunction>,
    required: false,
    default: null
  },
  // 审批同意接口
  approvalAgree: {
    type: Function as PropType<(params: ApprovalAgreeParams) => Promise<any>>,
    required: false,
    default: null
  },
  // 审批回退接口
  approvalRefuse: {
    type: Function as PropType<(params: ApprovalRefuseParams) => Promise<any>>,
    required: false,
    default: null
  },
  // 撤回接口
  approvalRevoke: {
    type: Function as PropType<(params: any) => Promise<any>>,
    required: false,
    default: null
  },
  // 加签接口
  approvalAddSign: {
    type: Function as PropType<(params: any) => Promise<any>>,
    required: false,
    default: null
  },
  // 上传配置
  uploadConfig: {
    type: Object as PropType<UploadConfig>,
    required: false,
    default: null
  },
  // 重新编辑操作
  onReEdit: {
    type: Function as PropType<() => void>,
    required: false,
    default: null
  },
  // 返回操作
  onBack: {
    type: Function as PropType<(type: OPERATE_TYPE) => void>,
    required: false,
    default: null
  },
  // 是否是重新编辑
  isReEdit: {
    type: Boolean,
    required: false,
    default: false
  },
  // 是否是待我审批
  isPending: {
    type: Boolean,
    required: false,
    default: false
  },
  // 是否展示撤回和作废
  isRevoke: {
    type: Boolean,
    required: false,
    default: false
  }
} as const;

// 导出 Props 类型
export type NmApprovalProps = ExtractPropTypes<typeof nmApprovalProps>;

// 组件事件类型
export interface NmApprovalEmits {
  onBack: () => void;
}
