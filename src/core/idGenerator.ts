let currentId = 0;

/**
 * Generate unique ID for layers
 */
export function generateId(): string {
  return `layer_${Date.now()}_${++currentId}`;
}

/**
 * Reset ID counter (for testing purposes)
 */
export function resetIdGenerator(): void {
  currentId = 0;
}
