// Main exports
export { LayerProvider, useLayerContext } from './provider/LayerProvider';
export { LayerHost } from './provider/LayerHost';
export { Layer } from './controllers/LayerController';

// Component exports
export { ModalLayer } from './components/ModalLayer';
export { DrawerLayer } from './components/DrawerLayer';
export { SidebarLayer } from './components/SidebarLayer';
export { ToastLayer } from './components/ToastLayer';
export { MessageBoxLayer } from './components/MessageBoxLayer';

// Type exports
export type {
  BaseLayerOptions,
  ModalOptions,
  DrawerOptions,
  SidebarOptions,
  ToastOptions,
  MessageBoxOptions,
  LayerType,
  LayerItem,
  LayerController,
  LayerEvent,
  LayerEventType,
  LayerContextValue,
  AnimationType,
  PositionType,
} from './types';

// Core utilities exports
export { layerEventEmitter } from './core/eventEmitter';
export { generateId, resetIdGenerator } from './core/idGenerator';
export { StackManager } from './core/stackManager';
