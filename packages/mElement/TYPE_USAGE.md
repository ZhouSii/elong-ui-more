# NmApproval 组件类型使用指南

## 在正式项目中获得完整类型提示

### 1. 导入类型定义

```typescript
// 方式一：从组件库导入所有相关类型
import type {
  NmApprovalProps,
  NmApprovalEmits,
  ApprovalFlowItem,
  ApprovalFlowResponse,
  FetchApprovalFlowFunction
} from '@elong-ui/element';

// 方式二：单独导入需要的类型
import type { FetchApprovalFlowFunction } from '@elong-ui/element';
```

### 2. 使用类型定义

#### 定义 fetchApprovalFlow 方法
```typescript
// 定义符合类型要求的方法
const fetchApprovalFlow: FetchApprovalFlowFunction = async () => {
  const response = await fetch('/api/approval-flow');
  const result = await response.json();
  
  return {
    data: result.data, // ApprovalFlowItem[] 类型
    ...result
  };
};
```

#### 在 Vue 模板中使用
```vue
<template>
  <NmApproval 
    :fetchApprovalFlow="fetchApprovalFlow"
    @onBack="handleBack"
  />
</template>

<script setup lang="ts">
import { NmApproval } from '@elong-ui/element';
import type { FetchApprovalFlowFunction } from '@elong-ui/element';

// TypeScript 会提供完整的类型检查和智能提示
const fetchApprovalFlow: FetchApprovalFlowFunction = async () => {
  // 你的实现逻辑
  return {
    data: [] // 会有 ApprovalFlowItem[] 的类型提示
  };
};

const handleBack = () => {
  // 处理返回逻辑
};
</script>
```

### 3. 类型说明

#### ApprovalFlowItem
```typescript
interface ApprovalFlowItem {
  id?: string | number;
  status?: string;
  title?: string;
  description?: string;
  time?: string;
  operator?: string;
  [key: string]: any; // 允许扩展其他字段
}
```

#### FetchApprovalFlowFunction
```typescript
type FetchApprovalFlowFunction = () => Promise<ApprovalFlowResponse>;
```

#### ApprovalFlowResponse
```typescript
interface ApprovalFlowResponse {
  data: ApprovalFlowItem[];
  [key: string]: any; // 允许其他响应字段
}
```

### 4. IDE 智能提示效果

配置完成后，在 IDE 中：
- ✅ 输入 `<NmApproval ` 会自动提示 `fetchApprovalFlow` 属性
- ✅ `fetchApprovalFlow` 会有完整的函数类型约束
- ✅ 返回值类型会有准确的结构提示
- ✅ 事件 `@onBack` 会有自动补全
- ✅ 编译时会有完整的类型检查

### 5. 构建和发布

确保组件库正确构建：
```bash
pnpm build
```

构建后的 `ui/es/` 目录会包含：
- `components/approval/src/types.mjs` - 类型定义文件
- `index.mjs` - 主入口文件，导出所有类型

这样在正式项目中安装和使用组件库时，就能获得完整的 TypeScript 类型支持了。
