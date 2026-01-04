# 关闭动画说明

## 问题

之前使用 `controller.close()` 关闭弹窗时没有退出动画，而点击背景遮罩关闭时有动画。

## 解决方案

现在 `controller.close()` 和 `Layer.close(id)` 都会触发退出动画！

## 使用方式

### 带动画关闭（推荐）

```tsx
const controller = Layer.showModal(
  <View>
    <Button onPress={() => controller.close()} />
    {/* ✅ 有退出动画 */}
  </View>
);

// 或者
Layer.close(controller.id); // ✅ 有退出动画
```

### 立即关闭（无动画）

如果需要立即关闭，不需要动画：

```tsx
controller.destroy(); // ❌ 无动画，立即删除
```

## API 说明

| 方法 | 动画 | 说明 |
|------|------|------|
| `controller.close()` | ✅ 有 | 推荐使用，带退出动画 |
| `Layer.close(id)` | ✅ 有 | 与 controller.close() 相同 |
| `controller.destroy()` | ❌ 无 | 立即删除，不带动画 |
| `Layer.destroy(id)` | ❌ 无 | 立即删除，不带动画 |

## 实现原理

1. `close()` 调用 `requestClose(id)`，标记 `closing: true`
2. 组件监听 `closing` 标记变化
3. 触发退出动画
4. 动画完成后调用 `removeLayer(id)` 删除
