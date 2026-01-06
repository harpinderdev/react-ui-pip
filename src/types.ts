export type Position = {
  x: number;
  y: number;
};

export type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface PipProps {
  /**
   * Whether the PiP mode is active
   */
  active: boolean;

  /**
   * The content to render inside the PiP window
   */
  children: React.ReactNode;

  /**
   * Initial position when PiP first opens (uncontrolled mode)
   * If not provided, defaults to { x: 60, y: 143 }
   */
  initialPosition?: Position;

  /**
   * Controlled position - when provided, component becomes controlled
   * You must update this via onPositionChange
   */
  position?: Position;

  /**
   * Callback fired when position changes (during drag)
   */
  onPositionChange?: (position: Position) => void;

  /**
   * Constrain dragging within window bounds
   * @default 'window'
   */
  bounds?: 'window' | 'none';

  /**
   * Custom width for the PiP container
   * @default 280
   */
  width?: number;

  /**
   * Custom height for the PiP container (optional, auto by default)
   */
  height?: number | 'auto';

  /**
   * Enable snap-to-corners behavior
   * When enabled, PiP will snap to nearest corner on drag end
   * @default false
   */
  snapToCorners?: boolean;

  /**
   * Snap threshold in pixels - how close to edge before snapping
   * @default 50
   */
  snapThreshold?: number;

  /**
   * Persist position to localStorage
   * Provide a unique key to enable persistence
   */
  persistKey?: string;

  /**
   * Custom CSS class for the PiP container
   */
  className?: string;

  /**
   * Custom inline styles for the PiP container
   */
  style?: React.CSSProperties;

  /**
   * Optional drag handle selector
   * If provided, only this element will be draggable
   * Example: ".pip-header"
   */
  dragHandleSelector?: string;

  /**
   * Z-index for the PiP container
   * @default 9999
   */
  zIndex?: number;

  /**
   * Callback fired when PiP is snapped to a corner
   */
  onSnapToCorner?: (corner: Corner) => void;

  /**
   * ID for the main container (where content renders when PiP is inactive)
   * @default 'pip-main-container'
   */
  mainContainerId?: string;

  /**
   * ID for the PiP portal container
   * @default 'pip-portal-container'
   */
  pipContainerId?: string;
}
