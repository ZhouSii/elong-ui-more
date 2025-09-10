# 使用 useContext 优化审批组件的数据流

## 问题描述

原来的方案需要通过多层props传递和emit回调：
```
正式项目 → NmApproval → OperateCom
          ↓ props传递    ↓ props传递
          ↑ emit回调     ↑ emit回调
```

这种方式的问题：
- 层级深，props传递繁琐
- emit回调链冗长
- 组件间耦合度高
- 维护困难

## 新方案：使用 useContext

### 架构优势
```
正式项目 → NmApproval (setupContext) → OperateCom (useContext)
         ↓ 直接注入审批方法           ↓ 直接调用审批方法
```

### 1. 在正式项目中的使用

```vue
<template>
  <NmApproval
    :fetchApprovalFlow="fetchApprovalFlow"
    :fetchRefuseSelect="fetchRefuseSelect"
    :approvalAgree="approvalAgree"
    :approvalRefuse="approvalRefuse"
    :approvalRevoke="approvalRevoke"
    :approvalAddSign="approvalAddSign"
    @onBack="handleBack"
  >
    这是测试页面 这是测试页面这是测试页面
  </NmApproval>
</template>

<script setup lang="ts">
import { NmApproval } from '@elong-ui/element';

// 获取审批流数据
const fetchApprovalFlow = async () => {
  const response = await fetch('/api/approval/flow');
  return await response.json();
};

// 获取回退节点选项
const fetchRefuseSelect = async () => {
  const response = await fetch('/api/approval/refuse-options');
  return await response.json();
};

// 审批同意
const approvalAgree = async (params: { remarks: string; files?: any[] }) => {
  const response = await fetch('/api/approval/agree', {
    method: 'POST',
    body: JSON.stringify(params)
  });
  return await response.json();
};

// 审批回退
const approvalRefuse = async (params: {
  nextNodeId: string;
  backIsSkip: 'Y' | 'N';
  remarks: string;
  files?: any[];
}) => {
  const response = await fetch('/api/approval/refuse', {
    method: 'POST',
    body: JSON.stringify(params)
  });
  return await response.json();
};

// 撤回
const approvalRevoke = async () => {
  const response = await fetch('/api/approval/revoke', { method: 'POST' });
  return await response.json();
};

// 加签
const approvalAddSign = async (params: any) => {
  const response = await fetch('/api/approval/add-sign', {
    method: 'POST',
    body: JSON.stringify(params)
  });
  return await response.json();
};

const handleBack = () => {
  // 返回逻辑
  console.log('返回');
};
</script>
```

### 2. NmApproval 组件内部处理

```tsx
// NmApproval 的 setup 函数中
setup(props, { slots, emit }) {
  // 设置审批上下文，将所有审批方法注入到上下文中
  setupApprovalContext({
    fetchApprovalFlow: props.fetchApprovalFlow,
    fetchRefuseSelect: props.fetchRefuseSelect,
    approvalAgree: props.approvalAgree,
    approvalRefuse: props.approvalRefuse,
    approvalRevoke: props.approvalRevoke,
    approvalAddSign: props.approvalAddSign
  });

  // 其他组件逻辑...
}
```

### 3. OperateCom 组件中直接使用

```vue
<script setup lang="ts">
import { useApprovalContext } from '../context';

// 直接获取审批上下文，无需props传递
const approvalContext = useApprovalContext();

// 处理审批同意
const handleApprovalAgree = async () => {
  if (!approvalContext.approvalAgree) {
    console.warn('未提供审批同意方法');
    return;
  }

  const result = await approvalContext.approvalAgree({
    remarks: form.value.remarks,
    files: form.value.files
  });

  console.log('审批同意成功:', result);
};

// 处理审批回退
const handleApprovalRefuse = async () => {
  if (!approvalContext.approvalRefuse) {
    console.warn('未提供审批回退方法');
    return;
  }

  const result = await approvalContext.approvalRefuse({
    nextNodeId: form.value.nextNodeId,
    backIsSkip: form.value.backIsSkip as 'Y' | 'N',
    remarks: form.value.remarks,
    files: form.value.files
  });

  console.log('审批回退成功:', result);
};
</script>
```

## 优势对比

| 特性 | 原方案 | 新方案(useContext) |
|------|--------|-------------------|
| **代码简洁性** | ❌ 多层props传递 | ✅ 直接注入使用 |
| **类型安全** | ⚠️ 需手动定义每层props | ✅ 统一类型定义 |
| **维护性** | ❌ 修改需要改多个文件 | ✅ 只需修改context定义 |
| **扩展性** | ❌ 添加新方法需改多层 | ✅ 只需添加到context |
| **组件解耦** | ❌ 强依赖props传递 | ✅ 只依赖context |
| **调试友好** | ❌ 调用链复杂 | ✅ 直接调用，清晰明了 |

## 最佳实践

1. **类型定义集中管理**：所有审批相关的类型都在`context/approval.ts`中定义
2. **错误处理**：在每个操作方法中添加try-catch和适当的用户提示
3. **加载状态**：使用`useBoolean`管理操作的loading状态
4. **成功反馈**：操作成功后可以emit事件或显示消息提示

这种方案完美解决了你提到的多层传递问题，让代码更加优雅和易维护！
