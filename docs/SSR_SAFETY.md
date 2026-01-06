# SSR Safety Guide

This document explains how `react-ui-pip` ensures SSR safety and provides best practices for using it with Next.js and other SSR frameworks.

## How SSR Safety is Achieved

### 1. Conditional DOM Access

All DOM access is wrapped in `typeof window` checks:

```typescript
useEffect(() => {
  if (typeof window === 'undefined') return;
  // Safe to access window, document, localStorage, etc.
}, []);
```

### 2. Portal Target Resolution

Portal targets are resolved client-side only in `useEffect`:

```typescript
useEffect(() => {
  if (typeof window === 'undefined') return;

  const id = active ? pipContainerId : mainContainerId;
  setTarget(document.getElementById(id));
}, [active]);
```

This ensures:
- No SSR/client mismatch
- Portals only render on client
- No hydration errors

### 3. State Initialization

Position state is initialized lazily in `useEffect`, not during render:

```typescript
// ❌ BAD - causes hydration mismatch
const [position, setPosition] = useState(
  localStorage.getItem('pip-pos') // SSR has no localStorage!
);

// ✅ GOOD - deferred to client
const [position, setPosition] = useState<Position | null>(null);

useEffect(() => {
  if (typeof window === 'undefined' || !active) return;

  const stored = localStorage.getItem('pip-pos');
  if (stored) setPosition(JSON.parse(stored));
}, [active]);
```

## Next.js App Router

### Required: `'use client'` directive

Components using `<Pip>` must be client components:

```tsx
// ✅ CORRECT
'use client';

import { Pip } from 'react-ui-pip';

export default function MyComponent() {
  return <Pip active={true}>...</Pip>;
}
```

```tsx
// ❌ WRONG - will error
// Missing 'use client'
import { Pip } from 'react-ui-pip';

export default function MyComponent() {
  return <Pip active={true}>...</Pip>;
}
```

### Layout Setup

Add `<PipContainer>` to your root layout:

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

## Next.js Pages Router

No `'use client'` needed, but `<PipContainer>` must be in `_app.tsx`:

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

## Common SSR Pitfalls to Avoid

### ❌ Accessing window during render

```tsx
// BAD - crashes on SSR
const [position, setPosition] = useState({
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
});
```

### ✅ Use useEffect instead

```tsx
// GOOD
const [position, setPosition] = useState<Position | null>(null);

useEffect(() => {
  setPosition({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
}, []);
```

### ❌ Reading localStorage during render

```tsx
// BAD
const savedPos = localStorage.getItem('pip-pos');
```

### ✅ Use useEffect

```tsx
// GOOD
useEffect(() => {
  if (typeof window === 'undefined') return;
  const savedPos = localStorage.getItem('pip-pos');
}, []);
```

## Testing SSR Safety

### Check for hydration errors

1. Run Next.js in dev mode
2. Open browser console
3. Look for warnings like:
   - "Text content did not match"
   - "Hydration failed"
   - "Server HTML should not contain"

### Verify with production build

```bash
npm run build
npm run start
```

Navigate and check for:
- No console errors
- PiP works correctly
- No layout shift

## Remix Support

```tsx
// app/root.tsx
import { PipContainer } from 'react-ui-pip';

export default function App() {
  return (
    <html>
      <head />
      <body>
        <PipContainer />
        <Outlet />
      </body>
    </html>
  );
}
```

## Gatsby Support

```tsx
// gatsby-browser.js
import { PipContainer } from 'react-ui-pip';

export const wrapRootElement = ({ element }) => (
  <>
    <PipContainer />
    {element}
  </>
);
```

## Summary

✅ **Do:**
- Use `typeof window` checks
- Initialize DOM-dependent state in `useEffect`
- Use `'use client'` in Next.js App Router
- Test SSR builds

❌ **Don't:**
- Access `window`, `document`, or `localStorage` during render
- Initialize state with DOM values
- Forget `<PipContainer>` in layout
