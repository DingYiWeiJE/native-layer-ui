# 在 Expo 项目中使用 Native Layer UI

## 重要提示

在使用 `Layer` API 之前，必须确保你的组件树中包含了 `LayerProvider`。

> **好消息**: 从 v1.0 开始，`LayerHost` 已自动集成到 `LayerProvider` 中，使用更简单！

## 正确的使用方式

### ❌ 错误示例

```tsx
import { Layer } from 'native-layer-ui';

export default function TestPage() {
  const handleCapture = () => {
    // ❌ 错误：没有 LayerProvider 包裹
    Layer.showModal(<View />);
  };

  return <Button onPress={handleCapture} />;
}
```

### ✅ 正确示例

#### 方式 1: 在根组件包裹（推荐）

**app/_layout.tsx** 或 **App.tsx**:
```tsx
import { LayerProvider } from 'native-layer-ui';

export default function RootLayout() {
  return (
    <LayerProvider>
      <Stack />
    </LayerProvider>
  );
}
```

**任意页面**:
```tsx
import { Layer } from 'native-layer-ui';

export default function TestPage() {
  const handleCapture = () => {
    // ✅ 正确：根组件已有 LayerProvider
    Layer.showModal(
      <View style={{ width: 300, height: 100, backgroundColor: 'white' }}>
        <Text>弹窗内容</Text>
      </View>
    );
  };

  return <Button title="测试弹窗" onPress={handleCapture} />;
}
```

#### 方式 2: 在当前页面包裹

```tsx
import { LayerProvider, Layer } from 'native-layer-ui';

function PageContent() {
  const handleCapture = () => {
    Layer.showModal(
      <View style={{ width: 300, height: 100, backgroundColor: 'white' }}>
        <Text>弹窗内容</Text>
      </View>
    );
  };

  return <Button title="测试弹窗" onPress={handleCapture} />;
}

export default function TestPage() {
  return (
    <LayerProvider>
      <PageContent />
    </LayerProvider>
  );
}
```

## 完整示例

```tsx
import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { LayerProvider, Layer } from 'native-layer-ui';

function TestPageContent() {
  const showModal = () => {
    Layer.showModal(
      <View style={styles.modalContent}>
        <Text style={styles.title}>提示</Text>
        <Text style={styles.message}>这是一个测试弹窗</Text>
      </View>,
      {
        backdrop: true,
        backdropOpacity: 0.5,
        animationType: 'spring',
      }
    );
  };

  return (
    <View style={styles.container}>
      <Button title="打开弹窗" onPress={showModal} />
    </View>
  );
}

export default function TestPage() {
  return (
    <LayerProvider>
      <TestPageContent />
    </LayerProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#666',
  },
});
```

## 常见问题

### 1. 错误: "Layer context not initialized"

**原因**: 在没有 `LayerProvider` 包裹的组件中调用 `Layer` API。

**解决**: 确保在根组件或当前页面使用 `<LayerProvider>` 包裹。

### 2. 弹窗不显示

**原因**: 可能是样式问题，确保弹窗内容有背景色和尺寸。

**解决**:
```tsx
// ✅ 正确：有明确的背景色和尺寸
<View style={{
  width: 300,
  backgroundColor: 'white',  // 必须有背景色
  borderRadius: 16,
  padding: 24
}}>
  <Text>内容</Text>
</View>

// ❌ 错误：没有背景色，弹窗可能看不见
<View style={{ width: 300 }}>
  <Text>内容</Text>
</View>
```

### 3. Expo 项目中的特殊配置

如果遇到模块找不到的错误，确保：

1. 已正确安装依赖:
```bash
yarn add native-layer-ui
```

2. 如果是本地开发，使用 link:
```bash
yarn add link:../native-layer-ui
```

3. 清除缓存重启:
```bash
yarn start --clear
```

## API 快速参考

```tsx
// 显示弹窗
const controller = Layer.showModal(content, options);

// 关闭弹窗
controller.close();

// 更新弹窗
controller.update(newContent);

// 关闭所有弹窗
Layer.closeAll();
```

## 配置选项

```tsx
{
  backdrop: true,           // 显示遮罩
  backdropOpacity: 0.5,     // 遮罩透明度
  animationType: 'spring',  // 动画类型
  duration: 300,            // 动画时长
  exclusive: false,         // 互斥模式
  priority: 0,              // 优先级
  onOpen: () => {},        // 打开回调
  onClose: () => {},       // 关闭回调
}
```

## 架构说明

使用新版本后，架构更加简洁：

```
<App>
 └── <LayerProvider>
      ├── <YourPages />
      └── <LayerHost /> (自动包含，无需手动添加)
```

这样的设计让使用更加简单，减少了样板代码！
