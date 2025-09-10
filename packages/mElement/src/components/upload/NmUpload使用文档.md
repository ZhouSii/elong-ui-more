# NmUpload 上传组件使用文档

## 概述

NmUpload 是基于 Element Plus 的 ElUpload 组件封装的文件上传组件，提供了丰富的功能特性，包括文件类型限制、大小控制、预览功能、进度显示等。

## 特性

- 🎯 **多文件类型支持** - 支持图片、文档、压缩包等多种文件类型
- 📏 **文件大小限制** - 可配置文件大小限制
- 🔢 **数量控制** - 可限制上传文件数量
- 👀 **文件预览** - 支持图片预览和文件图标显示
- 📊 **上传进度** - 实时显示上传进度
- 🎨 **美观界面** - 卡片式布局，界面简洁美观
- 🛠 **灵活配置** - 支持自定义上传配置

## 安装使用

```typescript
import { NmUpload } from '@elong-ui/element';

// 或者单独导入
import NmUpload from '@elong-ui/element/es/upload';
```

## 基础用法

### 简单上传

```vue
<template>
  <NmUpload 
    v-model="fileList"
    :upload-config="uploadConfig"
  />
</template>

<script setup>
import { ref } from 'vue';

const fileList = ref([]);

const uploadConfig = {
  action: 'https://your-upload-api.com/upload',
  headers: {
    'Authorization': 'Bearer your-token'
  }
};
</script>
```

### 限制文件类型和大小

```vue
<template>
  <NmUpload 
    v-model="fileList"
    :upload-config="uploadConfig"
    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
    :size="10"
    :limited="5"
  />
</template>

<script setup>
import { ref } from 'vue';

const fileList = ref([]);

const uploadConfig = {
  action: 'https://your-upload-api.com/upload',
  headers: () => ({
    'Authorization': 'Bearer your-token'
  })
};
</script>
```

### 预设文件列表

```vue
<template>
  <NmUpload 
    v-model="fileList"
    :upload-config="uploadConfig"
  />
</template>

<script setup>
import { ref } from 'vue';

const fileList = ref([
  {
    name: '示例图片.jpg',
    url: 'https://example.com/image.jpg',
    uid: '1001'
  },
  {
    name: '示例文档.pdf',
    url: 'https://example.com/document.pdf',
    uid: '1002'
  }
]);
</script>
```

## Props 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `Array \| String \| Object` | `[]` | 双向绑定的文件列表 |
| uploadConfig | `Object` | `{ action: '', headers: () => {} }` | 上传配置对象 |
| limited | `Number` | `0` | 限制上传文件数量，0表示不限制 |
| multiple | `Boolean` | `true` | 是否支持多选文件 |
| size | `Number` | `30` | 文件大小限制（MB） |
| accept | `String` | `''` | 接受的文件类型，例如：'.jpg,.png,.pdf' |

### uploadConfig 配置说明

```typescript
interface UploadConfig {
  action: string;           // 上传接口地址
  headers?: Object | Function; // 请求头，可以是对象或返回对象的函数
  [key: string]: any;       // 其他上传参数
}
```

## Events 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 文件列表更新时触发 | `files: Array` |
| upload-success | 文件上传成功时触发 | `{ response, file, fileList }` |
| upload-error | 文件上传失败时触发 | `{ error, file, fileList }` |
| file-remove | 文件删除时触发 | `{ file, fileList }` |

## 支持的文件类型

### 图片文件
- **支持格式**: jpg, jpeg, png, gif, bmp, webp
- **特性**: 支持缩略图预览和大图查看

### 文档文件
- **支持格式**: pdf, doc, docx, xls, xlsx, ppt, pptx, txt
- **特性**: 显示对应的文件类型图标

### 压缩文件
- **支持格式**: zip, rar, 7z, tar, gz
- **特性**: 显示压缩包图标

### 多媒体文件
- **视频**: mp4, avi, mov, wmv, flv, webm
- **音频**: mp3, wav, aac, flac, ogg

## 使用示例

### 仅上传图片

```vue
<template>
  <NmUpload 
    v-model="imageList"
    :upload-config="uploadConfig"
    accept=".jpg,.jpeg,.png,.gif"
    :size="5"
    :limited="10"
    @upload-success="handleUploadSuccess"
  />
</template>

<script setup>
import { ref } from 'vue';

const imageList = ref([]);

const uploadConfig = {
  action: '/api/upload/image',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
};

const handleUploadSuccess = ({ response, file, fileList }) => {
  console.log('上传成功:', response);
};
</script>
```

### 文档上传

```vue
<template>
  <NmUpload 
    v-model="documentList"
    :upload-config="uploadConfig"
    accept=".pdf,.doc,.docx,.xls,.xlsx"
    :size="20"
    :limited="5"
    :multiple="false"
  />
</template>

<script setup>
import { ref } from 'vue';

const documentList = ref([]);

const uploadConfig = {
  action: '/api/upload/document',
  headers: () => ({
    'Authorization': `Bearer ${getToken()}`
  })
};

function getToken() {
  // 获取token逻辑
  return localStorage.getItem('token');
}
</script>
```

### 混合文件类型上传

```vue
<template>
  <NmUpload 
    v-model="mixedFileList"
    :upload-config="uploadConfig"
    accept=".jpg,.png,.pdf,.doc,.docx,.zip"
    :size="50"
    @upload-error="handleUploadError"
  />
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const mixedFileList = ref([]);

const uploadConfig = {
  action: '/api/upload/mixed',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
};

const handleUploadError = ({ error, file }) => {
  ElMessage.error(`文件 ${file.name} 上传失败: ${error.message}`);
};
</script>
```

## 服务端响应格式

组件期望服务端返回以下格式的响应：

```json
{
  "data": {
    "url": "https://example.com/uploaded-file.jpg",
    "id": "file-id-123",
    "fileId": "unique-file-identifier"
  },
  "code": 200,
  "message": "上传成功"
}
```

## 样式自定义

组件提供了 CSS 变量和类名，可以进行样式自定义：

```scss
.nm-upload {
  // 自定义上传区域大小
  .el-upload--picture-card,
  .el-upload-list__item {
    width: 120px !important;
    height: 120px !important;
  }
  
  // 自定义文件名样式
  .thumbnail .filename {
    font-size: 14px;
    color: #606266;
  }
  
  // 自定义文件图标样式
  .file-icon {
    font-size: 36px;
    color: #409eff;
  }
}
```

## 注意事项

1. **文件大小限制**: 默认限制30MB，建议根据实际需求调整
2. **文件类型检查**: 组件会在客户端进行初步的文件类型检查，服务端也应该进行相应验证
3. **响应格式**: 确保服务端返回的响应格式符合组件预期
4. **错误处理**: 建议监听 `upload-error` 事件进行错误处理
5. **Token更新**: 如果使用函数形式的headers，确保token能够实时获取

## 常见问题

### Q: 如何限制只能上传图片？
A: 设置 `accept=".jpg,.jpeg,.png,.gif,.bmp,.webp"`

### Q: 如何处理上传失败？
A: 监听 `upload-error` 事件并进行相应处理

### Q: 如何自定义上传请求头？
A: 在 `uploadConfig.headers` 中配置，支持对象或函数形式

### Q: 如何获取上传后的文件URL？
A: 通过 `v-model` 绑定的数组中可以获取到文件信息，包含URL

### Q: 如何删除已上传的文件？
A: 点击文件卡片上的删除按钮，或通过代码修改 `v-model` 绑定的数组

## 版本信息

- 基于 Element Plus Upload 组件
- 支持 Vue 3.x
- TypeScript 支持
