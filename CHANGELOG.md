# Changelog

## v1.0.0 - 2026-01-04

### ✨ 新特性

- 🎯 命令式 API - 支持 `Layer.showModal()`, `Layer.showDrawer()` 等
- 🎨 5种浮层类型 - Modal, Drawer, Sidebar, Toast, MessageBox
- 📚 自动堆栈管理 - 自动 z-index 和优先级控制
- 👆 手势支持 - 拖拽关闭、滑动交互
- 🎬 动画系统 - Spring/Timing 动画
- 🔒 互斥模式 - 控制同类型浮层唯一性
- 📦 TypeScript 支持 - 完整类型定义

### 🚀 重大改进

**LayerHost 自动集成**
- `LayerHost` 现在自动包含在 `LayerProvider` 中
- 不再需要手动添加 `<LayerHost />`
- 使用更加简单，减少样板代码

之前：
```tsx
<LayerProvider>
  <App />
  <LayerHost />  // 需要手动添加
</LayerProvider>
```

现在：
```tsx
<LayerProvider>
  <App />
  // LayerHost 自动包含
</LayerProvider>
```

### 📝 API 变更

**导出变更**
- ✅ 保留: `LayerProvider`, `Layer`, `useLayerContext`
- ❌ 移除: `LayerHost` 不再需要导出（自动包含）

### 🎉 初始发布

这是 `native-layer-ui` 的首个正式版本，提供完整的浮层管理解决方案。
