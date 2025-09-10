# 策略对比：Hooks依赖处理方式

## 策略1：内联打包（当前配置）

### Vite配置
```typescript
rollupOptions: {
  external: ['vue', 'element-plus'], // hooks不在external中
}
```

### 用户使用
```bash
# 用户只需要安装一个包
npm install @elong-ui/element
```

```typescript
// 直接使用，hooks代码已经打包在组件库中
import { NmApproval } from '@elong-ui/element';
```

### 包结构
```
@elong-ui/element/
├── components/
├── packages/
│   └── hooks/          # hooks代码被打包进来
│       └── src/
│           └── use-boolean.mjs
```

### 优缺点
✅ **优点**：
- 用户依赖简单，只装一个包
- 版本管理容易，不会出现hooks和组件库版本不匹配
- 完全自包含，不依赖hooks包的npm发布

❌ **缺点**：
- 包体积稍大
- 无法单独使用hooks包
- 如果多个包都使用hooks，会重复打包

---

## 策略2：外部依赖（需要发布hooks）

### Vite配置
```typescript
rollupOptions: {
  external: ['vue', 'element-plus', '@elong-ui/hooks'], // hooks作为外部依赖
}
```

### package.json配置
```json
{
  "dependencies": {
    "@elong-ui/hooks": "^1.0.0"  // 改为具体版本
  },
  "peerDependencies": {
    "@elong-ui/hooks": "^1.0.0"  // 或者作为peer依赖
  }
}
```

### 用户使用
```bash
# 用户需要安装两个包
npm install @elong-ui/element @elong-ui/hooks
```

### 优缺点
✅ **优点**：
- 包体积小
- hooks可以单独复用
- 避免重复打包

❌ **缺点**：
- 用户需要管理多个依赖
- 需要单独发布hooks包到npm
- 版本兼容性管理复杂

---

## 推荐方案

### 对于你的情况，推荐 **策略1（当前方式）**：

1. **简单性**：用户只需安装一个包
2. **维护性**：不需要管理hooks包的npm发布
3. **一致性**：hooks和组件库版本始终一致
4. **体积影响小**：hooks通常很小，对包体积影响不大

### 何时考虑策略2：

- hooks包变得很大（>100KB）
- 需要在多个不同的包中复用hooks
- hooks包有独立的发版周期
- 用户明确需要单独使用hooks

## 实际验证

当前构建后的hooks大小：
- `use-boolean.mjs`: ~0.33KB
- 即使添加10个类似hooks，总大小也不会超过5KB

**结论**：继续使用当前的内联打包方式即可！
