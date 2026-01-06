# Quick Start Guide

Get up and running with `react-ui-pip` in 5 minutes.

## Installation

```bash
npm install react-ui-pip
# or
yarn add react-ui-pip
# or
pnpm add react-ui-pip
```

## Setup (Do Once)

Add `<PipContainer />` to your root layout:

### Next.js App Router

```tsx
// app/layout.tsx
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

### Next.js Pages Router

```tsx
// pages/_app.tsx
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

## Basic Usage

```tsx
'use client'; // Next.js App Router only

import { useState } from 'react';
import { Pip } from 'react-ui-pip';

export default function MyComponent() {
  const [isPip, setIsPip] = useState(false);

  return (
    <Pip active={isPip}>
      <div style={{ padding: 20, background: '#000', color: '#fff' }}>
        <h4>My PiP Content</h4>
        <button onClick={() => setIsPip(!isPip)}>
          {isPip ? 'Exit PiP' : 'Enter PiP'}
        </button>
      </div>
    </Pip>
  );
}
```

That's it! You now have a working PiP component.

## Common Recipes

### 1. Audio Player PiP

```tsx
<Pip
  active={isPip}
  initialPosition={{ x: 60, y: 60 }}
  width={320}
>
  <div style={{ padding: 20, background: '#1e1e1e', borderRadius: 12 }}>
    <h4>Now Playing</h4>
    <p>Song Title - Artist</p>
    <button onClick={() => setIsPip(!isPip)}>
      {isPip ? 'Close' : 'Open'} PiP
    </button>
  </div>
</Pip>
```

### 2. Snap to Corners

```tsx
<Pip
  active={isPip}
  snapToCorners
  snapThreshold={80}
>
  <YourContent />
</Pip>
```

### 3. Save Position

```tsx
<Pip
  active={isPip}
  persistKey="my-app-pip"  // Saves to localStorage
>
  <YourContent />
</Pip>
```

### 4. Controlled Position

```tsx
const [position, setPosition] = useState({ x: 100, y: 100 });

<Pip
  active={isPip}
  position={position}
  onPositionChange={setPosition}
>
  <div>Position: {position.x}, {position.y}</div>
</Pip>
```

### 5. Custom Drag Handle

```tsx
<Pip
  active={isPip}
  dragHandleSelector=".drag-handle"
>
  <div>
    <div className="drag-handle" style={{ cursor: 'grab', padding: 10 }}>
      ⋮⋮ Drag here
    </div>
    <div style={{ padding: 20 }}>
      <input type="text" placeholder="Not draggable" />
    </div>
  </div>
</Pip>
```

## Props Cheat Sheet

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | `boolean` | **required** | Enable PiP mode |
| `children` | `ReactNode` | **required** | Content to display |
| `initialPosition` | `{ x, y }` | `{ x: 60, y: 143 }` | Starting position |
| `width` | `number` | `280` | Width in pixels |
| `snapToCorners` | `boolean` | `false` | Magnetic corners |
| `persistKey` | `string` | - | localStorage key |
| `dragHandleSelector` | `string` | - | CSS selector for handle |

[See full API →](docs/API.md)

## Common Issues

### "Cannot read properties of null"

Make sure `<PipContainer />` is added to your root layout.

### Hydration error in Next.js

Add `'use client'` at the top of your component file.

### TypeScript errors

```tsx
import { Pip, Position } from 'react-ui-pip';

const [pos, setPos] = useState<Position>({ x: 0, y: 0 });
```

## Next Steps

- Read the [full README](README.md)
- Check out [examples](example/)
- Explore the [API docs](docs/API.md)
- Learn about [SSR safety](docs/SSR_SAFETY.md)

## Need Help?

Open an issue on [GitHub](https://github.com/harpinderdev/react-ui-pip/issues)
