// Example: Next.js Pages Router
// File: pages/_app.tsx

import type { AppProps } from 'next/app';
import { PipContainer } from 'react-ui-pip';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PipContainer />
      <Component {...pageProps} />
    </>
  );
}

// File: pages/index.tsx

import { useState } from 'react';
import { Pip } from 'react-ui-pip';

export default function HomePage() {
  const [isPip, setIsPip] = useState(false);

  return (
    <div style={{ padding: 40 }}>
      <h1>Pages Router Example</h1>
      <p>Click the button to toggle PiP mode</p>

      <Pip
        active={isPip}
        persistKey="pages-pip"
        snapToCorners
      >
        <div
          style={{
            padding: 20,
            background: '#0f172a',
            color: '#fff',
            borderRadius: 8,
          }}
        >
          <h4>Mini Dashboard</h4>
          <p>Users online: 42</p>
          <button onClick={() => setIsPip(!isPip)}>
            {isPip ? 'Close' : 'Open'} PiP
          </button>
        </div>
      </Pip>
    </div>
  );
}
