import { ReactNode } from 'react';
import {
  BaseLayerOptions,
  ModalOptions,
  DrawerOptions,
  SidebarOptions,
  ToastOptions,
  MessageBoxOptions,
  LayerController,
} from '../types';

let contextRef: any = null;

/**
 * Set the context reference from LayerProvider
 */
export function setLayerContext(context: any): void {
  contextRef = context;
}

/**
 * Get the context reference
 */
function getContext(): any {
  if (!contextRef) {
    throw new Error(
      'Layer context not initialized. Make sure LayerProvider is mounted before using Layer API.'
    );
  }
  return contextRef;
}

/**
 * Create a layer controller
 */
function createController(id: string): LayerController {
  return {
    id,
    close: () => {
      const context = getContext();
      context.removeLayer(id);
    },
    update: (content: ReactNode, options?: Partial<BaseLayerOptions>) => {
      const context = getContext();
      context.updateLayer(id, content, options);
    },
    destroy: () => {
      const context = getContext();
      context.removeLayer(id);
    },
  };
}

/**
 * Layer - Imperative API namespace
 */
export const Layer = {
  /**
   * Show a modal
   */
  showModal(content: ReactNode, options: ModalOptions = {}): LayerController {
    const context = getContext();
    const id = context.addLayer('modal', content, options);
    return createController(id);
  },

  /**
   * Show a drawer (bottom sheet)
   */
  showDrawer(content: ReactNode, options: DrawerOptions = {}): LayerController {
    const context = getContext();
    const id = context.addLayer('drawer', content, options);
    return createController(id);
  },

  /**
   * Show a sidebar
   */
  showSidebar(content: ReactNode, options: SidebarOptions = {}): LayerController {
    const context = getContext();
    const id = context.addLayer('sidebar', content, options);
    return createController(id);
  },

  /**
   * Show a toast
   */
  showToast(content: ReactNode, options: ToastOptions = {}): LayerController {
    const context = getContext();
    const id = context.addLayer('toast', content, options);
    return createController(id);
  },

  /**
   * Show a message box
   */
  showMessageBox(content: ReactNode, options: MessageBoxOptions = {}): LayerController {
    const context = getContext();
    const id = context.addLayer('messagebox', content, options);
    return createController(id);
  },

  /**
   * Close a layer by ID
   */
  close(id: string): void {
    const context = getContext();
    context.removeLayer(id);
  },

  /**
   * Update a layer by ID
   */
  update(id: string, content: ReactNode, options?: Partial<BaseLayerOptions>): void {
    const context = getContext();
    context.updateLayer(id, content, options);
  },

  /**
   * Destroy a layer by ID (alias for close)
   */
  destroy(id: string): void {
    const context = getContext();
    context.removeLayer(id);
  },

  /**
   * Close all layers
   */
  closeAll(): void {
    const context = getContext();
    context.closeAll();
  },
};
