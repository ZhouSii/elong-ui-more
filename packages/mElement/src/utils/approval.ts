import { ApprovalStatusEnum, ApprovalTabTypeEnum } from '../constants';

// 是否重新编辑
export const isReEdit = (status: string, tabType: string) => {
  return (
    status === ApprovalStatusEnum.RE_EDIT &&
    tabType === ApprovalTabTypeEnum.SUBMITTED
  );
};

// 是否是待我审批
export const isPending = (tabType: string) => {
  return tabType === ApprovalTabTypeEnum.PENDING;
};

// 是否展示撤回和作废
export const isRevoke = (status: string, tabType: string) => {
  return (
    status === ApprovalStatusEnum.PENDING &&
    tabType === ApprovalTabTypeEnum.SUBMITTED
  );
};
