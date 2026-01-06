// Example: Next.js App Router
// File: app/layout.tsx

import { PipContainer } from 'react-ui-pip';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PipContainer />
        {children}
      </body>
    </html>
  );
}

// File: app/page.tsx or any component
'use client';

import { useState } from 'react';
import { Pip } from 'react-ui-pip';

export default function HomePage() {
  const [isPip, setIsPip] = useState(false);

  return (
    <div style={{ padding: 40 }}>
      <h1>My Next.js App</h1>
      <p>Navigate around and the PiP will follow you!</p>

      <Pip
        active={isPip}
        initialPosition={{ x: 60, y: 143 }}
        snapToCorners
        persistKey="my-app-pip"
        width={320}
        style={{
          background: '#1e1e1e',
          color: '#fff',
          padding: 20,
          borderRadius: 12,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        <div>
          <h3 style={{ margin: 0, marginBottom: 12 }}>Audio Player</h3>
          <p style={{ margin: 0, marginBottom: 8, opacity: 0.8 }}>
            Now playing: Amazing Song
          </p>
          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                height: 4,
                background: '#333',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '60%',
                  height: '100%',
                  background: '#4ade80',
                }}
              />
            </div>
          </div>
          <button
            onClick={() => setIsPip(!isPip)}
            style={{
              width: '100%',
              padding: 10,
              background: '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            {isPip ? 'Exit PiP' : 'Enter PiP'}
          </button>
        </div>
      </Pip>
    </div>
  );
}
