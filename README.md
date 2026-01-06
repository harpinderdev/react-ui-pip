# react-ui-pip

> Production-ready React Picture-in-Picture component for **UI elements** (not video). Draggable, SSR-safe, portal-based, and built for Next.js.

[![npm version](https://badge.fury.io/js/react-ui-pip.svg)](https://www.npmjs.com/package/react-ui-pip)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Portal-based architecture** - Single component instance, no re-mounts
- **Fully SSR-safe** - Works seamlessly with Next.js (App Router & Pages Router)
- **Zero dependencies** - No external libraries required
- **TypeScript-first** - Complete type safety out of the box
- **Window-bounded dragging** - Prevents PiP from escaping viewport
- **Controlled & Uncontrolled modes** - Flexible state management
- **Snap to corners** - Optional magnetic corner snapping
- **Position persistence** - Save position to localStorage
- **Custom drag handles** - Restrict dragging to specific elements
- **Lightweight** - ~3KB gzipped

## What is UI PiP?

This is **UI Picture-in-Picture**, NOT video PiP. It allows you to float any React component (chat, audio player, mini cart, etc.) in a draggable overlay while the user navigates your app.

## Installation

```bash
npm install react-ui-pip
# or
yarn add react-ui-pip
# or
pnpm add react-ui-pip
```

## Quick Start

### 1. Add PipContainer to your root layout

```tsx
// app/layout.tsx (Next.js App Router)
import { PipContainer } from 'react-ui-pip';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <PipContainer />
        {children}
      </body>
    </html>
  );
}
```

```tsx
// pages/_app.tsx (Next.js Pages Router)
import { PipContainer } from 'react-ui-pip';

export default function App({ Component, pageProps }) {
  return (
    <>
      <PipContainer />
      <Component {...pageProps} />
    </>
  );
}
```

### 2. Use the Pip component

```tsx
'use client'; // Next.js App Router only

import { useState } from 'react';
import { Pip } from 'react-ui-pip';

export default function MyComponent() {
  const [isPip, setIsPip] = useState(false);

  return (
    <Pip active={isPip}>
      <div style={{ padding: 20, background: '#1e1e1e', borderRadius: 12 }}>
        <h4>Audio Player</h4>
        <p>Now playing: Song Title</p>
        <button onClick={() => setIsPip(!isPip)}>
          {isPip ? 'Exit PiP' : 'Enter PiP'}
        </button>
      </div>
    </Pip>
  );
}
```

## API Reference

### `<Pip>`

Main component for rendering PiP content.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | `boolean` | **required** | Whether PiP mode is active |
| `children` | `ReactNode` | **required** | Content to render inside PiP |
| `initialPosition` | `{ x: number; y: number }` | `{ x: 60, y: 143 }` | Initial position when PiP opens (uncontrolled) |
| `position` | `{ x: number; y: number }` | `undefined` | Controlled position (makes component controlled) |
| `onPositionChange` | `(pos: Position) => void` | `undefined` | Callback when position changes |
| `bounds` | `'window' \| 'none'` | `'window'` | Constrain dragging within viewport |
| `width` | `number` | `280` | Width of PiP container in pixels |
| `height` | `number \| 'auto'` | `'auto'` | Height of PiP container |
| `snapToCorners` | `boolean` | `false` | Enable magnetic corner snapping |
| `snapThreshold` | `number` | `50` | Distance from edge to trigger snap (px) |
| `persistKey` | `string` | `undefined` | localStorage key for position persistence |
| `className` | `string` | `''` | Custom CSS class |
| `style` | `CSSProperties` | `{}` | Custom inline styles |
| `dragHandleSelector` | `string` | `undefined` | CSS selector for drag handle (e.g., `.header`) |
| `zIndex` | `number` | `9999` | Z-index for PiP overlay |
| `onSnapToCorner` | `(corner: Corner) => void` | `undefined` | Callback when snapped to corner |
| `mainContainerId` | `string` | `'pip-main-container'` | ID of main container |
| `pipContainerId` | `string` | `'pip-portal-container'` | ID of PiP portal container |

### `<PipContainer>`

Required root container component. Render once in your app layout.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mainContainerId` | `string` | `'pip-main-container'` | ID for main container |
| `pipContainerId` | `string` | `'pip-portal-container'` | ID for PiP portal |
| `mainContainerStyle` | `CSSProperties` | `{}` | Styles for main container |
| `pipContainerStyle` | `CSSProperties` | `{}` | Styles for PiP portal |
| `children` | `ReactNode` | `undefined` | Optional children |

## Examples

### Basic Usage (Uncontrolled)

```tsx
import { Pip } from 'react-ui-pip';

function AudioPlayer() {
  const [isPip, setIsPip] = useState(false);

  return (
    <Pip active={isPip}>
      <div>
        <h4>Now Playing</h4>
        <button onClick={() => setIsPip(!isPip)}>Toggle PiP</button>
      </div>
    </Pip>
  );
}
```

### Controlled Mode

```tsx
import { Pip, Position } from 'react-ui-pip';

function ControlledPip() {
  const [isPip, setIsPip] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 100, y: 100 });

  return (
    <Pip
      active={isPip}
      position={position}
      onPositionChange={setPosition}
    >
      <div>Position: {position.x}, {position.y}</div>
    </Pip>
  );
}
```

### Snap to Corners

```tsx
<Pip
  active={isPip}
  snapToCorners
  snapThreshold={80}
  onSnapToCorner={(corner) => console.log('Snapped to:', corner)}
>
  <div>I snap to corners!</div>
</Pip>
```

### Persist Position

```tsx
<Pip
  active={isPip}
  persistKey="my-pip-position"
>
  <div>My position is saved to localStorage</div>
</Pip>
```

### Custom Drag Handle

```tsx
<Pip
  active={isPip}
  dragHandleSelector=".drag-handle"
>
  <div>
    <div className="drag-handle" style={{ cursor: 'grab', padding: 10, background: '#333' }}>
      Drag here only
    </div>
    <div>
      This area is not draggable
    </div>
  </div>
</Pip>
```

### Custom Styling

```tsx
<Pip
  active={isPip}
  width={400}
  height={300}
  style={{
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: 16,
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
    padding: 20,
  }}
  className="my-pip"
>
  <div>Styled PiP</div>
</Pip>
```

## SSR Safety

This package is fully SSR-safe and works with:

- **Next.js App Router** (`app/`)
- **Next.js Pages Router** (`pages/`)
- **Remix**
- **Gatsby**
- Any React SSR framework

### How it works:

1. Uses `typeof window` checks before accessing DOM
2. Portal targets are resolved client-side only
3. No hydration mismatches
4. State initialization deferred to `useEffect`

### Important for Next.js App Router:

Always use `'use client'` directive in components that use `<Pip>`:

```tsx
'use client';

import { Pip } from 'react-ui-pip';
```

## TypeScript

Full TypeScript support included:

```tsx
import { Pip, PipProps, Position, Corner } from 'react-ui-pip';

const position: Position = { x: 100, y: 100 };
const corner: Corner = 'top-right';
```

## Browser Support

- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Mobile browsers: ⚠️ (touch events not yet supported)

## Roadmap

- [ ] Touch/mobile support
- [ ] Resize handles
- [ ] Multiple PiP instances
- [ ] Animation presets
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] React Native support

## FAQ

### Why not use the browser's Picture-in-Picture API?

The browser's PiP API is **only for video elements**. This library enables PiP for **any UI component** (chat, forms, dashboards, etc.).

### Does this work with React 18?

Yes, fully compatible with React 18, including Concurrent Mode.

### Can I have multiple PiP instances?

Currently, the library is designed for a single PiP instance. Multi-instance support is planned.

### Does it work on mobile?

Touch events are not yet supported. Desktop-only for now.

## Contributing

Contributions welcome! Please open an issue or PR.

## License

MIT © Harpinder Singh

## Credits

Built with inspiration from real-world UI/UX needs. No dependencies, just React.

---

**[Documentation](https://github.com/harpinderdev/react-ui-pip)** • **[Report Bug](https://github.com/harpinderdev/react-ui-pip/issues)** • **[Request Feature](https://github.com/harpinderdev/react-ui-pip/issues)**
