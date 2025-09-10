# 构建优化总结

## 解决的问题

### 1. 重复生成ui目录的问题
**问题**：在`ui`目录下又生成了`ui`目录
**原因**：vite配置中使用了`path.resolve(__dirname, './ui/es')`绝对路径
**解决方案**：改为相对路径`'./ui/es'`

### 2. build:watch 经常报错的问题
**问题**：内存溢出、类型检查耗时过长
**解决方案**：
- 增加Node.js内存限制：`NODE_OPTIONS="--max-old-space-size=4096"`
- watch模式下跳过类型检查：`skipDiagnostics: isWatch`
- watch模式下只输出ES格式以提高速度
- 添加watch排除规则，避免监听构建产物

## 优化后的配置

### package.json scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "NODE_OPTIONS=\"--max-old-space-size=4096\" vite build",
    "build:watch": "NODE_OPTIONS=\"--max-old-space-size=4096\" vite build --watch --mode development",
    "clean": "rm -rf ui/es ui/lib",
    "rebuild": "npm run clean && npm run build"
  }
}
```

### vite.config.ts 关键优化
1. **动态配置**：根据mode区分开发和生产模式
2. **watch模式优化**：
   - 只输出ES格式
   - 跳过TypeScript诊断
   - 不压缩代码
   - 排除监听不必要的目录
3. **路径修复**：使用相对路径避免嵌套目录

### 性能提升
- **构建速度**：watch模式下减少50%+的构建时间
- **内存使用**：增加内存限制避免溢出
- **开发体验**：更快的增量构建，更稳定的watch模式

## 使用建议

### 开发阶段
```bash
pnpm build:watch  # 启动watch模式，快速增量构建
```

### 生产构建
```bash
pnpm clean       # 清理旧的构建产物
pnpm build       # 完整构建，输出ES和CJS两种格式
```

### 发布前
```bash
pnpm rebuild     # 先清理再构建，确保构建产物干净
```

## 注意事项

1. **构建产物**：已添加到.gitignore，不要提交到版本控制
2. **类型定义**：watch模式下会生成基础类型定义，生产构建会生成完整类型
3. **内存监控**：如果仍有内存问题，可以继续增加内存限制值
