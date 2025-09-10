# NmApproval 审批组件使用文档


## 使用项目的前置安装

在使用 `elong-ui-element` 组件库之前，请确保你的项目已安装以下必要依赖：

### 🔧 必需依赖

```bash
# Vue 3 核心
npm install vue@^3.0.0

# Element Plus UI 库及图标
npm install element-plus @element-plus/icons-vue
```

### 🛠️ 开发依赖（推荐）

由于组件库使用了 **JSX/TSX** 语法，如果你的项目需要支持 JSX/TSX，请安装：

```bash
# Vite 项目
npm install -D @vitejs/plugin-vue-jsx

# Webpack 项目
npm install -D @babel/plugin-syntax-jsx @vue/babel-plugin-jsx
```

### 🎨 样式依赖（可选）

组件库使用了 **UnoCSS** 进行样式处理，如果你想要完整的样式支持：

```bash
# UnoCSS（推荐）
npm install -D unocss @unocss/preset-uno @unocss/preset-attributify @unocss/preset-icons
```

### ⚙️ 构建工具配置

#### Vite 配置示例

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJSX from '@vitejs/plugin-vue-jsx'; // JSX 支持
import UnoCSS from 'unocss/vite'; // UnoCSS 支持

export default defineConfig({
  plugins: [
    vue(),
    vueJSX(), // 启用 JSX/TSX 支持
    UnoCSS()  // 启用 UnoCSS（可选）
  ]
});
```

#### Webpack 配置示例

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@vue/babel-plugin-jsx']
            }
          }
        ]
      }
    ]
  }
};
```

### ⚠️ 注意事项

1. **Vue 版本**：必须使用 Vue 3.0+，不支持 Vue 2.x
2. **Element Plus 版本**：建议使用 2.0.0 以上版本以获得最佳兼容性
3. **JSX 支持**：组件内部使用了 JSX 语法，建议项目也配置 JSX 支持
4. **样式处理**：如果不使用 UnoCSS，请确保正确引入 Element Plus 的样式文件


## 安装
```typescript

pnpm add elong-ui-element

```


## 引入	

### 主文件入口引入

```ts
import ElongUI from 'elong-ui-element'

import 'elong-ui-element/es/style.css'


app.use(ElongUI)
```



## 组件概述

`NmApproval` 是一个通用的审批流组件，提供完整的审批功能，包括查看审批流程、同意、回退、加签、撤回等操作。

## 安装导入

```typescript
import {
  NmApproval,
  OPERATE_TYPE,
  isReEdit,
  isPending,
  isRevoke
} from 'elong-ui-element';
```

## 基本用法

```vue
<template>
  <div class="h-full">
    <NmApproval
      :taskItemId="taskItemId"
      :instanceId="instanceId"
      :fetchApprovalFlow="fetchApprovalFlow"
      :fetchRefuseSelect="fetchRefuseSelect"
      :approvalAgree="approvalAgree"
      :approvalRefuse="approvalRefuse"
      :approvalAddSign="approvalAddSign"
      :approvalRevoke="approvalRevoke"
      :fetchPersonnel="getPersonnel"
      :uploadConfig="uploadConfig"
      :isPending="isShowPending"
      :isReEdit="isShowReEdit"
      :isRevoke="isShowRevoke"
      :onBack="handleBack"
      :onReEdit="handleReEdit"
    >
      <!-- 你的内容 -->
    </NmApproval>
  </div>
</template>

<script setup>
import {
  NmApproval,
  OPERATE_TYPE,
  isReEdit,
  isPending,
  isRevoke
} from 'elong-ui-element';
// 其他导入...
</script>
```

## Props 属性

### 必需参数

| 参数名       | 类型                           | 说明         | 示例         |
| ------------ | ------------------------------ | ------------ | ------------ |
| `taskItemId` | `string \| number`             | 任务项ID     | `"12345"`    |
| `instanceId` | `string \| number`             | 实例ID       | `"67890"`    |
| `onBack`     | `(type: OPERATE_TYPE) => void` | 返回回调函数 | `handleBack` |

### 审批接口函数

| 参数名              | 类型                                        | 说明             | 返回值       |
| ------------------- | ------------------------------------------- | ---------------- | ------------ |
| `fetchApprovalFlow` | `() => Promise<{data: ApprovalFlowItem[]}>` | 获取审批流程     | 审批流数据   |
| `fetchRefuseSelect` | `() => Promise<{data: any[]}>`              | 获取回退节点选项 | 回退节点数据 |
| `fetchPersonnel`    | `() => Promise<{data: any[]}>`              | 获取人员列表     | 人员数据     |
| `approvalAgree`     | `(params: AgreeParams) => Promise<any>`     | 审批同意接口     | 操作结果     |
| `approvalRefuse`    | `(params: RefuseParams) => Promise<any>`    | 审批回退接口     | 操作结果     |
| `approvalAddSign`   | `(params: any) => Promise<any>`             | 加签接口         | 操作结果     |
| `approvalRevoke`    | `(params: {id: string}) => Promise<any>`    | 撤回接口         | 操作结果     |

### 配置参数

| 参数名         | 类型           | 默认值  | 说明             |
| -------------- | -------------- | ------- | ---------------- |
| `uploadConfig` | `UploadConfig` | `null`  | 文件上传配置     |
| `isPending`    | `boolean`      | `false` | 是否为待审批状态 |
| `isReEdit`     | `boolean`      | `false` | 是否可重新编辑   |
| `isRevoke`     | `boolean`      | `false` | 是否可撤回       |
| `onReEdit`     | `() => void`   | `null`  | 重新编辑回调     |

## 接口参数类型

### AgreeParams（同意参数）

```typescript
interface AgreeParams {
  id: string | number;
  remarks: string; // 审批意见
  files?: any[]; // 附件列表
}
```

### RefuseParams（回退参数）

```typescript
interface RefuseParams {
  nextNodeId: string; // 回退节点ID
  backIsSkip: 'Y' | 'N'; // 是否跳过
  remarks: string; // 回退原因
  files?: any[]; // 附件列表
}
```

### UploadConfig（上传配置）

```typescript
interface UploadConfig {
  action: string; // 上传地址
  headers?: any; // 请求头
  [key: string]: any;
}
```

## 事件回调

### onBack 回调参数

`onBack` 函数会根据不同的操作传入对应的操作类型：

```typescript
enum OPERATE_TYPE {
  AGREE = 'agree', // 同意
  REFUSE = 'refuse', // 回退
  ADDSIGNATURE = 'addSignature', // 加签
  REVOKE = 'revoke', // 撤回
  BACK = 'back' // 返回
}
```

## 完整示例

```vue
<template>
  <div class="h-full">
    <NmApproval
      :taskItemId="taskItemId"
      :instanceId="instanceId"
      :fetchApprovalFlow="fetchApprovalFlow"
      :fetchRefuseSelect="fetchRefuseSelect"
      :approvalAgree="approvalAgree"
      :approvalRefuse="approvalRefuse"
      :approvalAddSign="approvalAddSign"
      :approvalRevoke="approvalRevoke"
      :fetchPersonnel="getPersonnel"
      :uploadConfig="uploadConfig"
      :isPending="isShowPending"
      :isReEdit="isShowReEdit"
      :isRevoke="isShowRevoke"
      :onBack="handleBack"
      :onReEdit="handleReEdit"
    >
      <!-- 审批业务内容 -->
      <!-- 你的内容 -->
    </NmApproval>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import {
  NmApproval,
  OPERATE_TYPE,
  isReEdit,
  isPending,
  isRevoke
} from 'elong-ui-element';

// 导入业务API
import {
  getApprovalStream,
  getApprovalBackNode,
  approvalRefuse,
  approvalAgree,
  approvalAddSign,
  approvalRevoke
} from '@/service/api/approval';
import { getPersonnel } from '@/service/api/base';

const route = useRoute();
const router = useRouter();

// 基础数据
const taskItemId = route.query?.taskItemId;
const instanceId = route.query?.instanceId;
const formData = ref({
  billSumId: ''
  // 其他表单数据...
});
const tableData = ref([]);

// 状态计算
const isShowPending = computed(() => isPending(route?.query.tabType as string));
const isShowRevoke = computed(() =>
  isRevoke(route?.query.status as string, route?.query.tabType as string)
);
const isShowReEdit = computed(() =>
  isReEdit(route?.query.status as string, route?.query.tabType as string)
);

// 上传配置
const uploadConfig = {
  action:
    (import.meta.env.VITE_BASE_API || '/') + '/sys/admin/file/upload.json',
  headers: {
    token: localStorage.getItem('token')
  }
};

// API 接口函数
const fetchApprovalFlow = () =>
  getApprovalStream({
    bizNodeId: '96',
    formId: route.query?.id as string
  });

const fetchRefuseSelect = () =>
  getApprovalBackNode({
    taskItemId: taskItemId as string
  });

const getPersonnel = () => getPersonnel();

// 审批操作回调
const handleBack = (type: OPERATE_TYPE) => {
  console.log('审批操作完成，操作类型:', type);

  switch (type) {
    case OPERATE_TYPE.REFUSE:
      ElMessage.success('回退成功');
      break;
    case OPERATE_TYPE.AGREE:
      ElMessage.success('审批通过');
      break;
    case OPERATE_TYPE.ADDSIGNATURE:
      ElMessage.success('加签成功');
      break;
    case OPERATE_TYPE.REVOKE:
      ElMessage.success('撤销成功');
      break;
    default:
      ElMessage.success('操作完成');
  }

  // 返回列表页
  router.push({ name: 'approval-list' });
};

const handleReEdit = () => {
  console.log('重新编辑');
  ElMessage.success('进入编辑模式');
  // 跳转到编辑页面或切换编辑模式
};
</script>
```

## 状态判断辅助函数

组件库提供了三个辅助函数来判断当前审批状态：

```typescript
import { isReEdit, isPending, isRevoke } from 'elong-ui-element';

// 是否可重新编辑
const canReEdit = isReEdit(status, tabType);

// 是否为待审批状态
const canApprove = isPending(tabType);

// 是否可撤回
const canRevoke = isRevoke(status, tabType);
```

## 注意事项

1. **必需参数**：`taskItemId`、`instanceId`、`onBack` 是必需的参数
2. **接口函数**：所有以 `approval` 开头的函数都应该传入对应的 API 接口
3. **状态管理**：使用提供的辅助函数来判断按钮显示状态
4. **错误处理**：在接口函数中需要适当的错误处理
5. **文件上传**：如果需要附件功能，必须配置 `uploadConfig`
6. **插槽内容**：组件内部通过默认插槽展示业务内容

## 常见问题

### Q: 如何隐藏某些操作按钮？

A: 通过设置对应的状态属性为 `false`：

```typescript
:isPending="false"  // 隐藏审批相关按钮
:isReEdit="false"   // 隐藏重新编辑按钮
:isRevoke="false"   // 隐藏撤回按钮
```

### Q: 如何自定义上传配置？

A: 传入完整的上传配置对象：

```typescript
const uploadConfig = {
  action: '/api/upload',
  headers: {
    Authorization: 'Bearer ' + token
  },
  data: {
    type: 'approval'
  }
};
```

### Q: 审批完成后如何处理？

A: 在 `onBack` 回调中根据操作类型进行相应处理：

```typescript
const handleBack = (type: OPERATE_TYPE) => {
  // 根据操作类型处理业务逻辑
  // 通常需要刷新列表或跳转页面
};
```

## 更新日志

- v1.0.0: 初始版本，支持基本审批功能
- v1.0.1: 新增文件上传功能
- v1.0.2: 优化状态判断逻辑
- v1.0.3: 修复常量导入问题，优化组件架构
- v1.0.4: 第一版发布

