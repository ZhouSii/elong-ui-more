import { withInstall } from '@elong-ui/utils';
import { ElButton, ElEmpty, ElImage } from 'element-plus';
import { NmDialog } from '../dialog';
import { NmTable } from '../table';
import approval from './src/index';

export const NmApproval = withInstall({
  ...approval,
  __dependencies__: [ElButton, ElEmpty, ElImage, NmDialog, NmTable]
});

export default NmApproval;

export type NmApproval = typeof NmApproval;

// 导出类型定义
export type {
  NmApprovalProps,
  NmApprovalEmits,
  ApprovalFlowItem,
  ApprovalFlowResponse,
  FetchApprovalFlowFunction
} from './src/types';

// 常量已统一到最外层 constants 文件夹，不再从这里导出
// 请直接从 '@elong-ui/element' 导入所需常量
