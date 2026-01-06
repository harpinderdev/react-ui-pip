import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { PipProps, Position } from './types';
import {
  getStoredPosition,
  setStoredPosition,
  getNearestCorner,
  getCornerPosition,
  isNearCorner,
  clampPosition,
} from './utils';

const DEFAULT_INITIAL_POSITION: Position = { x: 60, y: 143 };
const DEFAULT_WIDTH = 280;
const DEFAULT_Z_INDEX = 9999;
const DEFAULT_SNAP_THRESHOLD = 50;

export function Pip({
  active,
  children,
  initialPosition = DEFAULT_INITIAL_POSITION,
  position: controlledPosition,
  onPositionChange,
  bounds = 'window',
  width = DEFAULT_WIDTH,
  height = 'auto',
  snapToCorners = false,
  snapThreshold = DEFAULT_SNAP_THRESHOLD,
  persistKey,
  className = '',
  style = {},
  dragHandleSelector,
  zIndex = DEFAULT_Z_INDEX,
  onSnapToCorner,
  mainContainerId = 'pip-main-container',
  pipContainerId = 'pip-portal-container',
}: PipProps) {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [internalPosition, setInternalPosition] = useState<Position | null>(null);

  const pipRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  // Determine if component is controlled
  const isControlled = controlledPosition !== undefined;
  const position = isControlled ? controlledPosition : internalPosition;

  /**
   * Resolve portal target based on active state
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const id = active ? pipContainerId : mainContainerId;
    setTarget(document.getElementById(id));
  }, [active, mainContainerId, pipContainerId]);

  /**
   * Initialize position when PiP opens
   * Priority: controlled > persisted > initial
   */
  useEffect(() => {
    if (!active || position !== null) return;

    let newPosition: Position;

    // 1. Check for persisted position
    if (persistKey) {
      const stored = getStoredPosition(persistKey);
      if (stored) {
        newPosition = stored;
      } else {
        newPosition = initialPosition;
      }
    } else {
      newPosition = initialPosition;
    }

    // Only set if uncontrolled
    if (!isControlled) {
      setInternalPosition(newPosition);
    }
  }, [active, position, initialPosition, persistKey, isControlled]);

  /**
   * Update position (internal or via callback)
   */
  const updatePosition = useCallback(
    (newPosition: Position) => {
      if (isControlled) {
        onPositionChange?.(newPosition);
      } else {
        setInternalPosition(newPosition);
        onPositionChange?.(newPosition);
      }

      // Persist if enabled
      if (persistKey) {
        setStoredPosition(persistKey, newPosition);
      }
    },
    [isControlled, onPositionChange, persistKey]
  );

  /**
   * Handle snap to corner
   */
  const snapToNearestCorner = useCallback(() => {
    if (!snapToCorners || !pipRef.current || !position) return;

    const el = pipRef.current;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (isNearCorner(position, windowWidth, windowHeight, snapThreshold)) {
      const corner = getNearestCorner(position, windowWidth, windowHeight);
      const cornerPos = getCornerPosition(corner, el.offsetWidth, el.offsetHeight);

      updatePosition(cornerPos);
      onSnapToCorner?.(corner);
    }
  }, [snapToCorners, position, snapThreshold, updatePosition, onSnapToCorner]);

  /**
   * Start drag
   */
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!pipRef.current) return;

      // Check if drag handle is specified
      if (dragHandleSelector) {
        const target = e.target as HTMLElement;
        const handle = pipRef.current.querySelector(dragHandleSelector);
        if (!handle || !handle.contains(target)) {
          return;
        }
      }

      isDragging.current = true;

      const rect = pipRef.current.getBoundingClientRect();
      offset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      // Prevent text selection during drag
      e.preventDefault();
    },
    [dragHandleSelector]
  );

  /**
   * Drag with optional window bounds
   */
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current || !pipRef.current) return;

      const el = pipRef.current;

      let x = e.clientX - offset.current.x;
      let y = e.clientY - offset.current.y;

      let newPosition = { x, y };

      // Apply bounds if enabled
      if (bounds === 'window') {
        newPosition = clampPosition(newPosition, el.offsetWidth, el.offsetHeight);
      }

      updatePosition(newPosition);
    },
    [bounds, updatePosition]
  );

  /**
   * Stop drag and optionally snap
   */
  const onMouseUp = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      snapToNearestCorner();
    }
  }, [snapToNearestCorner]);

  /**
   * Global mouse listeners
   */
  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  /**
   * Shared UI (single instance, no re-mount)
   */
  const content = (
    <div
      ref={pipRef}
      onMouseDown={active ? onMouseDown : undefined}
      className={className}
      style={{
        position: active ? 'fixed' : 'relative',
        left: active && position ? position.x : undefined,
        top: active && position ? position.y : undefined,
        width,
        height: height === 'auto' ? 'auto' : height,
        cursor: active ? (isDragging.current ? 'grabbing' : 'grab') : 'default',
        userSelect: 'none',
        pointerEvents: active ? 'auto' : undefined,
        zIndex: active ? zIndex : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );

  return <>{target && createPortal(content, target)}</>;
}
