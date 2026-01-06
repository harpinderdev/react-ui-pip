import { Position, Corner } from './types';

/**
 * Get position from localStorage
 */
export function getStoredPosition(key: string): Position | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Failed to parse stored position:', e);
  }

  return null;
}

/**
 * Save position to localStorage
 */
export function setStoredPosition(key: string, position: Position): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(key, JSON.stringify(position));
  } catch (e) {
    console.warn('Failed to store position:', e);
  }
}

/**
 * Calculate nearest corner
 */
export function getNearestCorner(
  position: Position,
  windowWidth: number,
  windowHeight: number
): Corner {
  const { x, y } = position;
  const isLeft = x < windowWidth / 2;
  const isTop = y < windowHeight / 2;

  if (isTop && isLeft) return 'top-left';
  if (isTop && !isLeft) return 'top-right';
  if (!isTop && isLeft) return 'bottom-left';
  return 'bottom-right';
}

/**
 * Get position for a specific corner
 */
export function getCornerPosition(
  corner: Corner,
  elementWidth: number,
  elementHeight: number,
  margin: number = 20
): Position {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  switch (corner) {
    case 'top-left':
      return { x: margin, y: margin };
    case 'top-right':
      return { x: windowWidth - elementWidth - margin, y: margin };
    case 'bottom-left':
      return { x: margin, y: windowHeight - elementHeight - margin };
    case 'bottom-right':
      return { x: windowWidth - elementWidth - margin, y: windowHeight - elementHeight - margin };
  }
}

/**
 * Check if position is near a corner
 */
export function isNearCorner(
  position: Position,
  windowWidth: number,
  windowHeight: number,
  threshold: number
): boolean {
  const { x, y } = position;

  const nearLeft = x < threshold;
  const nearRight = x > windowWidth - threshold;
  const nearTop = y < threshold;
  const nearBottom = y > windowHeight - threshold;

  return (nearLeft || nearRight) && (nearTop || nearBottom);
}

/**
 * Clamp position within window bounds
 */
export function clampPosition(
  position: Position,
  elementWidth: number,
  elementHeight: number
): Position {
  const maxX = window.innerWidth - elementWidth;
  const maxY = window.innerHeight - elementHeight;

  return {
    x: Math.max(0, Math.min(position.x, maxX)),
    y: Math.max(0, Math.min(position.y, maxY)),
  };
}
