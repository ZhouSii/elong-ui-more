// 审批操作类型枚举
export enum OPERATE_TYPE {
  AGREE = 'agree',
  REFUSE = 'refuse',
  ADDSIGNATURE = 'addSignature',
  // 撤回
  REVOKE = 'revoke',
  // 返回
  BACK = 'back'
}

// 审批操作标题
export const OPERATE_AGREE_TITLE = '确认同意';
export const OPERATE_REFUSE_TITLE = '确认回退';
export const OPERATE_ADDSIGNATURE_TITLE = '确认加签';

// 操作标题映射
export const OPERATE_TITLE = {
  [OPERATE_TYPE.AGREE]: '确认同意',
  [OPERATE_TYPE.REFUSE]: '确认回退',
  [OPERATE_TYPE.ADDSIGNATURE]: '确认加签'
} as const;

// 审批列表状态
export const ApprovalTabTypeEnum = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  SUBMITTED: 'SUBMITTED'
} as const;

// 审批状态枚举
export const ApprovalStatusEnum = {
  PENDING: 'ing',
  RE_EDIT: 're-edit'
} as const;

// 审批同意建议回复
export const OPERATE_AGREE_TIPS = [
  '已审核',
  '同意',
  '确认',
  '好的',
  '可以',
  '通过',
  '情况属实',
  'OK'
] as const;

// 审批回退建议回复
export const OPERATE_REFUSE_TIPS = [
  '不同意',
  '拒绝',
  '流程不对',
  '时间不对',
  '重复提交',
  '未解决',
  '请补充材料',
  '请核实'
] as const;

// 加签建议回复
export const OPERATE_ADDSIGNATURE_TIPS = [
  '请审批',
  '确认',
  '加签审批',
  '情况特殊'
] as const;

// 类型导出
export type OperateType = (typeof OPERATE_TYPE)[keyof typeof OPERATE_TYPE];
export type OperateTitle = typeof OPERATE_TITLE;
export type OperateAgreeTips = typeof OPERATE_AGREE_TIPS;
export type OperateRefuseTips = typeof OPERATE_REFUSE_TIPS;
export type OperateAddSignatureTips = typeof OPERATE_ADDSIGNATURE_TIPS;
export type ApprovalTabType =
  (typeof ApprovalTabTypeEnum)[keyof typeof ApprovalTabTypeEnum];
export type ApprovalStatus =
  (typeof ApprovalStatusEnum)[keyof typeof ApprovalStatusEnum];
