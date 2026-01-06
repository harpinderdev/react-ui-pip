import React, { CSSProperties } from 'react';

export interface PipContainerProps {
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

  /**
   * Custom styles for the main container
   */
  mainContainerStyle?: CSSProperties;

  /**
   * Custom styles for the PiP portal container
   */
  pipContainerStyle?: CSSProperties;

  /**
   * Children to render in the main container (optional)
   */
  children?: React.ReactNode;
}

/**
 * PipContainer component
 *
 * Provides the required DOM containers for the Pip component to portal into.
 * You should render this once at the root of your application.
 *
 * @example
 * ```tsx
 * // In _app.tsx or layout.tsx
 * <PipContainer />
 *
 * // Then use <Pip> anywhere in your app
 * <Pip active={isPip}>
 *   <YourContent />
 * </Pip>
 * ```
 */
export function PipContainer({
  mainContainerId = 'pip-main-container',
  pipContainerId = 'pip-portal-container',
  mainContainerStyle = {},
  pipContainerStyle = {},
  children,
}: PipContainerProps) {
  return (
    <>
      {/* Main container */}
      <div id={mainContainerId} style={mainContainerStyle}>
        {children}
      </div>

      {/* PiP portal container (always mounted, overlay) */}
      <div
        id={pipContainerId}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          ...pipContainerStyle,
        }}
      />
    </>
  );
}
