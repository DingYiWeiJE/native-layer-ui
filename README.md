# Native Layer UI

> A unified Layer System for React Native - manage modals, drawers, sidebars, toasts, and message boxes with ease

[![npm version](https://img.shields.io/npm/v/native-layer-ui.svg)](https://www.npmjs.com/package/native-layer-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎯 **Imperative API** - Command-style API for cross-module layer management
- 🎨 **Flexible Components** - Support for Modal, Drawer, Sidebar, Toast, and MessageBox
- 🎭 **Custom Content** - Render any JSX component inside layers
- 👆 **Gesture Control** - Built-in swipe-to-close and drag interactions
- 🎬 **Smooth Animations** - Spring and timing animations with full customization
- 📚 **Stack Management** - Automatic z-index handling and layer stacking
- 🎚️ **Priority System** - Control layer ordering with priority levels
- 🔒 **Exclusive Mode** - Ensure only one instance of a layer type exists
- 🎮 **Instance Control** - Full control over individual layer instances
- 🚀 **TypeScript** - Full TypeScript support with type definitions

## 📦 Installation

```bash
yarn add native-layer-ui
# or
npm install native-layer-ui
```

## 🚀 Quick Start

### 1. Setup Provider

Wrap your app with `LayerProvider` and add `LayerHost`:

```tsx
import { LayerProvider, LayerHost } from 'native-layer-ui';

export default function App() {
  return (
    <LayerProvider>
      <YourApp />
      <LayerHost />
    </LayerProvider>
  );
}
```

### 2. Use Imperative API

```tsx
import { Layer } from 'native-layer-ui';
import { View, Text, Button } from 'react-native';

function MyComponent() {
  const handleShowModal = () => {
    const controller = Layer.showModal(
      <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 12 }}>
        <Text>This is a modal!</Text>
        <Button title="Close" onPress={() => controller.close()} />
      </View>,
      {
        backdrop: true,
        backdropOpacity: 0.5,
        animationType: 'spring',
      }
    );
  };

  return <Button title="Show Modal" onPress={handleShowModal} />;
}
```

## 📖 API Reference

### Layer API

#### `Layer.showModal(content, options)`

Show a modal overlay.

```tsx
const controller = Layer.showModal(
  <MyModalContent />,
  {
    backdrop: true,
    backdropOpacity: 0.5,
    animationType: 'spring',
    duration: 300,
    onOpen: () => console.log('Modal opened'),
    onClose: () => console.log('Modal closed'),
    priority: 0,
    exclusive: false,
  }
);
```

#### `Layer.showDrawer(content, options)`

Show a bottom drawer (sheet).

```tsx
const controller = Layer.showDrawer(
  <MyDrawerContent />,
  {
    swipeToClose: true,
    dragHandle: true,
    snapPoints: [300, 600],
    backdrop: true,
    backdropOpacity: 0.5,
    animationType: 'spring',
    exclusive: true,
  }
);
```

#### `Layer.showSidebar(content, options)`

Show a left/right sidebar.

```tsx
const controller = Layer.showSidebar(
  <MySidebarContent />,
  {
    width: 280,
    position: 'left', // or 'right'
    swipeToClose: true,
    backdrop: true,
    backdropOpacity: 0.5,
    animationType: 'spring',
    exclusive: true,
  }
);
```

#### `Layer.showToast(content, options)`

Show a toast notification.

```tsx
const controller = Layer.showToast(
  <View style={styles.toast}>
    <Text>Success!</Text>
  </View>,
  {
    autoClose: 3000,
    position: 'top', // 'top' | 'center' | 'bottom'
    animationType: 'spring',
  }
);
```

#### `Layer.showMessageBox(content, options)`

Show a message box dialog.

```tsx
const controller = Layer.showMessageBox(
  <MyMessageContent />,
  {
    autoClose: 5000,
    position: 'center',
    backdrop: true,
    backdropOpacity: 0.5,
  }
);
```

#### `Layer.close(id)`

Close a specific layer by ID.

```tsx
Layer.close(controller.id);
```

#### `Layer.update(id, content, options)`

Update layer content and options.

```tsx
Layer.update(controller.id, <NewContent />, { backdropOpacity: 0.8 });
```

#### `Layer.destroy(id)`

Destroy a layer (alias for close).

```tsx
Layer.destroy(controller.id);
```

#### `Layer.closeAll()`

Close all active layers.

```tsx
Layer.closeAll();
```

### Layer Controller

Each `show*` method returns a controller with instance methods:

```tsx
const controller = Layer.showModal(<Content />);

// Close this layer
controller.close();

// Update this layer
controller.update(<NewContent />, { backdropOpacity: 0.8 });

// Destroy this layer
controller.destroy();

// Get layer ID
console.log(controller.id);
```

## 🎨 Examples

### Modal with Custom Content

```tsx
import { Layer } from 'native-layer-ui';
import { View, Text, Button, StyleSheet } from 'react-native';

function showCustomModal() {
  const controller = Layer.showModal(
    <View style={styles.modalContent}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.message}>This is a custom modal</Text>
      <Button title="Got it" onPress={() => controller.close()} />
    </View>,
    {
      backdrop: true,
      backdropOpacity: 0.6,
      animationType: 'spring',
    }
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    marginBottom: 24,
  },
});
```

### Drawer with Snap Points

```tsx
import { Layer } from 'native-layer-ui';
import { View, Text, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

function showBottomSheet() {
  Layer.showDrawer(
    <View style={{ padding: 20 }}>
      <Text>Swipe to adjust height or close</Text>
    </View>,
    {
      swipeToClose: true,
      dragHandle: true,
      snapPoints: [height * 0.3, height * 0.6, height * 0.9],
      exclusive: true,
    }
  );
}
```

### Toast Notification

```tsx
import { Layer } from 'native-layer-ui';
import { View, Text, StyleSheet } from 'react-native';

function showSuccessToast() {
  Layer.showToast(
    <View style={styles.toast}>
      <Text style={styles.toastText}>✓ Saved successfully!</Text>
    </View>,
    {
      autoClose: 2000,
      position: 'top',
      animationType: 'spring',
    }
  );
}

const styles = StyleSheet.create({
  toast: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  toastText: {
    color: 'white',
    fontSize: 16,
  },
});
```

## 🎛️ Configuration Options

### BaseLayerOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `backdrop` | `boolean` | `true` | Show backdrop overlay |
| `backdropOpacity` | `number` | `0.5` | Backdrop opacity (0-1) |
| `animationType` | `'spring' \| 'timing'` | `'spring'` | Animation type |
| `duration` | `number` | `300` | Animation duration (ms) |
| `onOpen` | `() => void` | - | Callback when layer opens |
| `onClose` | `() => void` | - | Callback when layer closes |
| `lazy` | `boolean` | `false` | Lazy render content |
| `priority` | `number` | `0` | Layer priority (higher = on top) |
| `exclusive` | `boolean` | `false` | Only allow one instance |

### Additional Options by Type

**Drawer**
- `swipeToClose`: Enable swipe-to-close gesture
- `dragHandle`: Show drag handle indicator
- `snapPoints`: Array of snap point heights

**Sidebar**
- `width`: Sidebar width in pixels
- `position`: `'left'` or `'right'`
- `swipeToClose`: Enable swipe-to-close gesture

**Toast / MessageBox**
- `autoClose`: Auto-close delay in milliseconds
- `position`: `'top'` | `'center'` | `'bottom'`

## 🏗️ Architecture

```
<App>
 └── <LayerProvider>
      ├── <YourApp />
      └── <LayerHost>
           ├── Modal layers
           ├── Drawer layers
           ├── Sidebar layers
           ├── Toast layers
           └── MessageBox layers
```

## 📝 Best Practices

### 1. Stack Management

Use `exclusive: true` for layers that should only have one instance:

```tsx
Layer.showDrawer(<Content />, { exclusive: true });
```

### 2. Priority Control

Control layer ordering with priority:

```tsx
Layer.showModal(<ImportantModal />, { priority: 10 });
Layer.showToast(<Notice />, { priority: 5 });
```

### 3. Cleanup

Close layers when navigating away:

```tsx
useEffect(() => {
  return () => {
    Layer.closeAll();
  };
}, []);
```

### 4. Event Listeners

Use callbacks for lifecycle events:

```tsx
Layer.showModal(<Content />, {
  onOpen: () => console.log('Opened'),
  onClose: () => console.log('Closed'),
});
```

## 🔧 Advanced Usage

### Using Event Emitter

```tsx
import { layerEventEmitter } from 'native-layer-ui';

// Listen to layer events
const unsubscribe = layerEventEmitter.on('open', (event) => {
  console.log('Layer opened:', event);
});

// Cleanup
unsubscribe();
```

### Custom Hook

```tsx
import { useLayerContext } from 'native-layer-ui';

function MyComponent() {
  const { layers, closeAll } = useLayerContext();

  return (
    <View>
      <Text>Active layers: {layers.length}</Text>
      <Button title="Close All" onPress={closeAll} />
    </View>
  );
}
```

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📮 Support

If you have any questions or issues, please open an issue on GitHub.
