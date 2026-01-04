import { LayerEvent, LayerEventType } from '../types';

type EventListener = (event: LayerEvent) => void;

/**
 * Event emitter for layer lifecycle events
 */
class EventEmitter {
  private listeners: Map<string, EventListener[]> = new Map();

  /**
   * Subscribe to layer events
   */
  on(eventType: LayerEventType, listener: EventListener): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }

    this.listeners.get(eventType)!.push(listener);

    // Return unsubscribe function
    return () => this.off(eventType, listener);
  }

  /**
   * Unsubscribe from layer events
   */
  off(eventType: LayerEventType, listener: EventListener): void {
    const listeners = this.listeners.get(eventType);
    if (!listeners) return;

    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }

  /**
   * Emit layer event
   */
  emit(event: LayerEvent): void {
    const listeners = this.listeners.get(event.type);
    if (!listeners) return;

    listeners.forEach((listener) => {
      try {
        listener(event);
      } catch (error) {
        console.error('Error in layer event listener:', error);
      }
    });
  }

  /**
   * Clear all listeners
   */
  clear(): void {
    this.listeners.clear();
  }

  /**
   * Get listener count for an event type
   */
  listenerCount(eventType: LayerEventType): number {
    return this.listeners.get(eventType)?.length || 0;
  }
}

export const layerEventEmitter = new EventEmitter();
