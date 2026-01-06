# API Documentation

Complete API reference for `react-ui-pip`.

## Components

### `<Pip>`

Main component for rendering Picture-in-Picture UI.

#### Props

##### `active`
- **Type:** `boolean`
- **Required:** Yes
- **Description:** Whether the PiP mode is currently active

```tsx
<Pip active={isPip}>...</Pip>
```

##### `children`
- **Type:** `ReactNode`
- **Required:** Yes
- **Description:** Content to render inside the PiP window

```tsx
<Pip active={true}>
  <div>Your content here</div>
</Pip>
```

##### `initialPosition`
- **Type:** `{ x: number; y: number }`
- **Default:** `{ x: 60, y: 143 }`
- **Description:** Initial position when PiP first opens (uncontrolled mode only)

```tsx
<Pip active={true} initialPosition={{ x: 100, y: 100 }}>
  ...
</Pip>
```

##### `position`
- **Type:** `{ x: number; y: number }`
- **Default:** `undefined`
- **Description:** Controlled position. When provided, component becomes controlled and you must update this via `onPositionChange`

```tsx
const [pos, setPos] = useState({ x: 100, y: 100 });

<Pip active={true} position={pos} onPositionChange={setPos}>
  ...
</Pip>
```

##### `onPositionChange`
- **Type:** `(position: Position) => void`
- **Default:** `undefined`
- **Description:** Callback fired when position changes during drag

```tsx
<Pip
  active={true}
  onPositionChange={(pos) => console.log('New position:', pos)}
>
  ...
</Pip>
```

##### `bounds`
- **Type:** `'window' | 'none'`
- **Default:** `'window'`
- **Description:** Constrain dragging within window bounds

```tsx
<Pip active={true} bounds="window">...</Pip>
```

##### `width`
- **Type:** `number`
- **Default:** `280`
- **Description:** Width of the PiP container in pixels

```tsx
<Pip active={true} width={400}>...</Pip>
```

##### `height`
- **Type:** `number | 'auto'`
- **Default:** `'auto'`
- **Description:** Height of the PiP container

```tsx
<Pip active={true} height={300}>...</Pip>
<Pip active={true} height="auto">...</Pip>
```

##### `snapToCorners`
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Enable magnetic corner snapping behavior

```tsx
<Pip active={true} snapToCorners>...</Pip>
```

##### `snapThreshold`
- **Type:** `number`
- **Default:** `50`
- **Description:** Distance in pixels from edge to trigger snap

```tsx
<Pip active={true} snapToCorners snapThreshold={100}>
  ...
</Pip>
```

##### `persistKey`
- **Type:** `string`
- **Default:** `undefined`
- **Description:** localStorage key for persisting position across sessions

```tsx
<Pip active={true} persistKey="my-app-pip">...</Pip>
```

##### `className`
- **Type:** `string`
- **Default:** `''`
- **Description:** Custom CSS class for the PiP container

```tsx
<Pip active={true} className="my-pip-class">...</Pip>
```

##### `style`
- **Type:** `React.CSSProperties`
- **Default:** `{}`
- **Description:** Custom inline styles for the PiP container

```tsx
<Pip
  active={true}
  style={{ background: '#000', borderRadius: 12 }}
>
  ...
</Pip>
```

##### `dragHandleSelector`
- **Type:** `string`
- **Default:** `undefined`
- **Description:** CSS selector for custom drag handle. Only this element will be draggable.

```tsx
<Pip active={true} dragHandleSelector=".drag-handle">
  <div className="drag-handle">Drag me</div>
  <div>Not draggable</div>
</Pip>
```

##### `zIndex`
- **Type:** `number`
- **Default:** `9999`
- **Description:** Z-index for the PiP overlay

```tsx
<Pip active={true} zIndex={10000}>...</Pip>
```

##### `onSnapToCorner`
- **Type:** `(corner: Corner) => void`
- **Default:** `undefined`
- **Description:** Callback fired when PiP snaps to a corner

```tsx
<Pip
  active={true}
  snapToCorners
  onSnapToCorner={(corner) => console.log('Snapped to', corner)}
>
  ...
</Pip>
```

##### `mainContainerId`
- **Type:** `string`
- **Default:** `'pip-main-container'`
- **Description:** ID of the container where content renders when PiP is inactive

```tsx
<Pip active={false} mainContainerId="custom-main">...</Pip>
```

##### `pipContainerId`
- **Type:** `string`
- **Default:** `'pip-portal-container'`
- **Description:** ID of the PiP portal container

```tsx
<Pip active={true} pipContainerId="custom-pip">...</Pip>
```

---

### `<PipContainer>`

Required root container component. Provides DOM targets for portals.

#### Props

##### `mainContainerId`
- **Type:** `string`
- **Default:** `'pip-main-container'`
- **Description:** ID for the main container element

##### `pipContainerId`
- **Type:** `string`
- **Default:** `'pip-portal-container'`
- **Description:** ID for the PiP portal container element

##### `mainContainerStyle`
- **Type:** `React.CSSProperties`
- **Default:** `{}`
- **Description:** Custom styles for the main container

##### `pipContainerStyle`
- **Type:** `React.CSSProperties`
- **Default:** `{}`
- **Description:** Custom styles for the PiP portal overlay

##### `children`
- **Type:** `ReactNode`
- **Default:** `undefined`
- **Description:** Optional children to render in the main container

#### Example

```tsx
<PipContainer
  mainContainerId="my-main"
  pipContainerId="my-pip"
  pipContainerStyle={{ zIndex: 10000 }}
/>
```

---

## Types

### `Position`

```typescript
type Position = {
  x: number;
  y: number;
};
```

Represents a 2D position in pixels.

### `Corner`

```typescript
type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
```

Represents a corner of the viewport.

### `PipProps`

Full interface for `<Pip>` component props. See component documentation above.

### `PipContainerProps`

Full interface for `<PipContainer>` component props. See component documentation above.

---

## Utility Functions

These are exported for advanced use cases:

### `clampPosition(position, width, height): Position`

Clamps a position within window bounds.

### `getNearestCorner(position, windowWidth, windowHeight): Corner`

Gets the nearest corner for a given position.

### `getCornerPosition(corner, width, height, margin?): Position`

Gets the position for a specific corner.

### `getStoredPosition(key): Position | null`

Retrieves persisted position from localStorage.

### `setStoredPosition(key, position): void`

Saves position to localStorage.

---

## Example: Full API Usage

```tsx
'use client';

import { useState } from 'react';
import { Pip, Position, Corner } from 'react-ui-pip';

export default function AdvancedExample() {
  const [isPip, setIsPip] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 100, y: 100 });
  const [lastCorner, setLastCorner] = useState<Corner | null>(null);

  return (
    <Pip
      active={isPip}
      position={position}
      onPositionChange={setPosition}
      bounds="window"
      width={320}
      height="auto"
      snapToCorners
      snapThreshold={80}
      persistKey="advanced-pip"
      className="my-pip"
      style={{
        background: '#1e1e1e',
        borderRadius: 12,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
      dragHandleSelector=".handle"
      zIndex={10000}
      onSnapToCorner={setLastCorner}
    >
      <div>
        <div className="handle">Drag here</div>
        <p>Position: {position.x}, {position.y}</p>
        {lastCorner && <p>Last snap: {lastCorner}</p>}
        <button onClick={() => setIsPip(!isPip)}>Toggle</button>
      </div>
    </Pip>
  );
}
```
