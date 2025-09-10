# 在组件库中使用Workspace Hooks

## 配置步骤

### 1. 创建hooks包
```bash
# hooks包结构
packages/hooks/
├── package.json
└── src/
    ├── index.ts
    ├── use-boolean.ts
    ├── use-loading.ts
    └── use-context.ts
```

### 2. 配置hooks包的package.json
```json
{
  "name": "@elong-ui/hooks",
  "version": "1.0.0",
  "exports": {
    ".": "./src/index.ts"
  },
  "typesVersions": {
    "*": {
      "*": ["./src/*"]
    }
  }
}
```

### 3. 在组件库中添加workspace依赖
```json
{
  "dependencies": {
    "@elong-ui/hooks": "workspace:*",
    "@vitejs/plugin-vue-jsx": "^3.0.2"
  }
}
```

### 4. 安装依赖
```bash
cd /Users/zhougaofeng/Desktop/Project/common/同程/elong-ui
pnpm install
```

## 使用示例

### 在组件中导入和使用hooks

```tsx
// 导入hooks
import { useBoolean } from '@elong-ui/hooks';

export default defineComponent({
  setup() {
    // 使用useBoolean管理对话框状态
    const streamDialog = useBoolean(false);
    const operateDialog = useBoolean(false);

    // 使用方法
    const handleView = () => {
      streamDialog.setTrue(); // 显示对话框
    };

    const handleClose = () => {
      streamDialog.setFalse(); // 隐藏对话框
    };

    return () => (
      <div>
        <button onClick={handleView}>查看</button>
        
        <Dialog 
          modelValue={streamDialog.bool.value}
          onUpdate:modelValue={streamDialog.setBool}
        />
      </div>
    );
  }
});
```

## useBoolean Hook API

### 返回值
```typescript
{
  bool: Ref<boolean>,        // 响应式布尔值
  setBool: (value: boolean) => void,  // 设置布尔值
  setTrue: () => void,       // 设置为true
  setFalse: () => void,      // 设置为false
  toggle: () => void         // 切换值
}
```

### 使用场景
- ✅ 对话框显示/隐藏控制
- ✅ 加载状态管理
- ✅ 折叠面板展开/收起
- ✅ 任何需要布尔状态切换的场景

## 构建结果

构建成功后，hooks会被打包到：
- `ui/es/packages/hooks/src/use-boolean.mjs` (ES模块)
- `ui/lib/packages/hooks/src/use-boolean.js` (CommonJS)

## 优势

1. **代码复用**：hooks可以在多个组件间共享
2. **类型安全**：完整的TypeScript支持
3. **工作区集成**：无需发布到npm即可使用
4. **构建优化**：只打包实际使用的hooks

## 扩展其他hooks

可以继续添加其他hooks，如：
- `useLoading` - 加载状态管理
- `useContext` - 上下文管理
- `useLocalStorage` - 本地存储
- `useDebounce` - 防抖

所有hooks都会自动被构建系统包含并可以在组件中导入使用。
