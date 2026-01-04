# Demo 使用说明

这个目录包含了 Native Layer UI 的完整使用示例。

## 目录结构

```
demo/
├── App.tsx           # 主应用入口
└── ModalDemo.tsx     # 弹窗示例集合
```

## 运行方式

### 方式 1: 复制到你的 React Native 项目

1. 确保已安装 `native-layer-ui`:
```bash
yarn add native-layer-ui
```

2. 复制 `demo/App.tsx` 和 `demo/ModalDemo.tsx` 到你的项目中

3. 将路径 `'../src'` 改为 `'native-layer-ui'`

4. 运行项目:
```bash
yarn ios
# 或
yarn android
```

### 方式 2: 在本仓库中测试

1. 创建一个新的 React Native 项目:
```bash
npx react-native init NativeLayerUIDemo
cd NativeLayerUIDemo
```

2. 链接本地包:
```bash
yarn add link:../native-layer-ui
```

3. 复制 demo 文件并运行

## 示例说明

### 1. BasicModalDemo - 基础弹窗
最简单的弹窗示例，展示基本用法。

### 2. ConfirmDialogDemo - 确认对话框
双按钮确认对话框，常用于删除、退出等操作。

### 3. FormModalDemo - 表单弹窗
带输入框的表单弹窗，展示如何在弹窗中收集用户输入。

### 4. ContentModalDemo - 内容弹窗
带滚动内容的弹窗，适合展示协议、条款等长文本。

### 5. LoadingModalDemo - 加载中弹窗
显示加载状态，自动在3秒后关闭。

### 6. SuccessModalDemo - 成功提示弹窗
操作成功后的提示，自动在2秒后关闭。

### 7. SelectListModalDemo - 选择列表弹窗
列表选择器，点击选项后自动关闭。

## 核心代码示例

```tsx
import { Layer } from 'native-layer-ui';

// 显示弹窗
const controller = Layer.showModal(
  <YourComponent />,
  {
    backdrop: true,
    backdropOpacity: 0.5,
    animationType: 'spring',
  }
);

// 关闭弹窗
controller.close();
```

## 自定义样式

所有示例都包含完整的样式定义，你可以根据需要修改 `styles` 对象来自定义外观。

## 常见配置

```tsx
{
  backdrop: true,              // 显示背景遮罩
  backdropOpacity: 0.5,        // 遮罩透明度
  animationType: 'spring',     // 动画类型: 'spring' | 'timing'
  duration: 300,               // 动画时长(ms)
  exclusive: true,             // 同类型弹窗互斥
  priority: 0,                 // 层级优先级
  onOpen: () => {},           // 打开回调
  onClose: () => {},          // 关闭回调
}
```
