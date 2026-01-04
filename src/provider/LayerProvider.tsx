import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { LayerContextValue, LayerItem, LayerType, BaseLayerOptions } from '../types';
import { StackManager } from '../core/stackManager';
import { generateId } from '../core/idGenerator';
import { layerEventEmitter } from '../core/eventEmitter';
import { setLayerContext } from '../controllers/LayerController';
import { LayerHost } from './LayerHost';

const LayerContext = createContext<LayerContextValue | null>(null);

export interface LayerProviderProps {
  children: React.ReactNode;
  baseZIndex?: number;
  maxLayers?: number;
}

/**
 * Layer provider that manages all layers in the app
 */
export function LayerProvider({ children, baseZIndex = 1000, maxLayers = 50 }: LayerProviderProps) {
  const [layers, setLayers] = useState<LayerItem[]>([]);
  const stackManagerRef = useRef<StackManager>(
    new StackManager({ baseZIndex, maxLayers })
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      layerEventEmitter.clear();
      stackManagerRef.current.clear();
    };
  }, []);

  const addLayer = useCallback(
    (type: LayerType, content: React.ReactNode, options: BaseLayerOptions): string => {
      const id = generateId();
      const layer: LayerItem = {
        id,
        type,
        content,
        options,
        zIndex: 0, // Will be set by StackManager
        timestamp: Date.now(),
      };

      stackManagerRef.current.add(layer);
      setLayers(stackManagerRef.current.getAll());

      // Emit open event
      layerEventEmitter.emit({
        id,
        type: 'open',
        layerType: type,
        timestamp: Date.now(),
      });

      // Call onOpen callback
      options.onOpen?.();

      return id;
    },
    []
  );

  const removeLayer = useCallback((id: string) => {
    const layer = stackManagerRef.current.get(id);
    if (!layer) return;

    stackManagerRef.current.remove(id);
    setLayers(stackManagerRef.current.getAll());

    // Emit close event
    layerEventEmitter.emit({
      id,
      type: 'close',
      layerType: layer.type,
      timestamp: Date.now(),
    });

    // Call onClose callback
    layer.options.onClose?.();
  }, []);

  const updateLayer = useCallback(
    (id: string, content: React.ReactNode, options?: Partial<BaseLayerOptions>) => {
      const layer = stackManagerRef.current.get(id);
      if (!layer) return;

      const updates: Partial<LayerItem> = {
        content,
        ...(options && {
          options: {
            ...layer.options,
            ...options,
          },
        }),
      };

      stackManagerRef.current.update(id, updates);
      setLayers(stackManagerRef.current.getAll());

      // Emit update event
      layerEventEmitter.emit({
        id,
        type: 'update',
        layerType: layer.type,
        timestamp: Date.now(),
      });
    },
    []
  );

  const closeAll = useCallback(() => {
    const allLayers = stackManagerRef.current.getAll();

    // Emit close events for all layers
    allLayers.forEach((layer) => {
      layerEventEmitter.emit({
        id: layer.id,
        type: 'close',
        layerType: layer.type,
        timestamp: Date.now(),
      });

      // Call onClose callback
      layer.options.onClose?.();
    });

    stackManagerRef.current.clear();
    setLayers([]);
  }, []);

  const value: LayerContextValue = {
    layers,
    addLayer,
    removeLayer,
    updateLayer,
    closeAll,
  };

  // Set context for imperative API
  useEffect(() => {
    setLayerContext(value);
  }, [value]);

  return (
    <LayerContext.Provider value={value}>
      {children}
      <LayerHost />
    </LayerContext.Provider>
  );
}

/**
 * Hook to access layer context
 */
export function useLayerContext(): LayerContextValue {
  const context = useContext(LayerContext);
  if (!context) {
    throw new Error('useLayerContext must be used within LayerProvider');
  }
  return context;
}
