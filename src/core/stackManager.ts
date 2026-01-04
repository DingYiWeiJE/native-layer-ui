import { LayerItem, LayerType, StackConfig } from '../types';

/**
 * Stack manager for layer ordering and priority
 */
export class StackManager {
  private layers: LayerItem[] = [];
  private baseZIndex: number;
  private maxLayers: number;

  constructor(config: StackConfig = {}) {
    this.baseZIndex = config.baseZIndex || 1000;
    this.maxLayers = config.maxLayers || 50;
  }

  /**
   * Add a layer to the stack
   */
  add(layer: LayerItem): void {
    // Check if exclusive layer of this type already exists
    if (layer.options.exclusive) {
      this.removeByType(layer.type);
    }

    // Check max layers limit
    if (this.layers.length >= this.maxLayers) {
      console.warn(`Max layers limit (${this.maxLayers}) reached. Removing oldest layer.`);
      this.removeOldest();
    }

    // Calculate zIndex based on priority
    const zIndex = this.calculateZIndex(layer);
    layer.zIndex = zIndex;

    this.layers.push(layer);
    this.sortByZIndex();
  }

  /**
   * Remove a layer by ID
   */
  remove(id: string): LayerItem | undefined {
    const index = this.layers.findIndex((layer) => layer.id === id);
    if (index === -1) return undefined;

    const [removed] = this.layers.splice(index, 1);
    return removed;
  }

  /**
   * Remove all layers of a specific type (for exclusive layers)
   */
  removeByType(type: LayerType): void {
    this.layers = this.layers.filter((layer) => layer.type !== type);
  }

  /**
   * Remove the oldest layer
   */
  removeOldest(): LayerItem | undefined {
    if (this.layers.length === 0) return undefined;

    // Find the layer with the smallest timestamp
    let oldestIndex = 0;
    let oldestTimestamp = this.layers[0].timestamp;

    for (let i = 1; i < this.layers.length; i++) {
      if (this.layers[i].timestamp < oldestTimestamp) {
        oldestTimestamp = this.layers[i].timestamp;
        oldestIndex = i;
      }
    }

    const [removed] = this.layers.splice(oldestIndex, 1);
    return removed;
  }

  /**
   * Update a layer
   */
  update(id: string, updates: Partial<LayerItem>): LayerItem | undefined {
    const layer = this.layers.find((l) => l.id === id);
    if (!layer) return undefined;

    Object.assign(layer, updates);

    // Re-calculate zIndex if priority changed
    if (updates.options?.priority !== undefined) {
      layer.zIndex = this.calculateZIndex(layer);
      this.sortByZIndex();
    }

    return layer;
  }

  /**
   * Get a layer by ID
   */
  get(id: string): LayerItem | undefined {
    return this.layers.find((layer) => layer.id === id);
  }

  /**
   * Get all layers
   */
  getAll(): LayerItem[] {
    return [...this.layers];
  }

  /**
   * Clear all layers
   */
  clear(): void {
    this.layers = [];
  }

  /**
   * Get layer count
   */
  count(): number {
    return this.layers.length;
  }

  /**
   * Calculate zIndex for a layer based on priority and position
   */
  private calculateZIndex(layer: LayerItem): number {
    const priority = layer.options.priority || 0;
    const index = this.layers.length;
    return this.baseZIndex + priority * 100 + index;
  }

  /**
   * Sort layers by zIndex
   */
  private sortByZIndex(): void {
    this.layers.sort((a, b) => a.zIndex - b.zIndex);
  }
}
