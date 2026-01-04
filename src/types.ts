import { ReactNode } from 'react';

// Animation types
export type AnimationType = 'spring' | 'timing';
export type PositionType = 'top' | 'center' | 'bottom';

// Base layer options
export interface BaseLayerOptions {
  backdrop?: boolean;
  backdropOpacity?: number;
  animationType?: AnimationType;
  duration?: number;
  onOpen?: () => void;
  onClose?: () => void;
  lazy?: boolean;
  priority?: number;
  exclusive?: boolean;
}

// Modal options
export interface ModalOptions extends BaseLayerOptions {}

// Drawer options (bottom sheet)
export interface DrawerOptions extends BaseLayerOptions {
  swipeToClose?: boolean;
  dragHandle?: boolean;
  snapPoints?: number[];
}

// Sidebar options (left/right panel)
export interface SidebarOptions extends BaseLayerOptions {
  width?: number;
  swipeToClose?: boolean;
  position?: 'left' | 'right';
}

// Toast options
export interface ToastOptions extends Omit<BaseLayerOptions, 'backdrop' | 'backdropOpacity'> {
  autoClose?: number;
  position?: PositionType;
}

// MessageBox options
export interface MessageBoxOptions extends BaseLayerOptions {
  autoClose?: number;
  position?: PositionType;
}

// Layer types
export type LayerType = 'modal' | 'drawer' | 'sidebar' | 'toast' | 'messagebox';

// Layer item in the stack
export interface LayerItem {
  id: string;
  type: LayerType;
  content: ReactNode;
  options: BaseLayerOptions;
  zIndex: number;
  timestamp: number;
}

// Layer controller interface
export interface LayerController {
  id: string;
  close: () => void;
  update: (content: ReactNode, options?: Partial<BaseLayerOptions>) => void;
  destroy: () => void;
}

// Event types
export type LayerEventType = 'open' | 'close' | 'update' | 'destroy';

export interface LayerEvent {
  id: string;
  type: LayerEventType;
  layerType: LayerType;
  timestamp: number;
}

// Stack manager configuration
export interface StackConfig {
  baseZIndex?: number;
  maxLayers?: number;
}

// Context value
export interface LayerContextValue {
  layers: LayerItem[];
  addLayer: (type: LayerType, content: ReactNode, options: BaseLayerOptions) => string;
  removeLayer: (id: string) => void;
  updateLayer: (id: string, content: ReactNode, options?: Partial<BaseLayerOptions>) => void;
  closeAll: () => void;
}
