// Example: Snap to Corners
'use client';

import { useState } from 'react';
import { Pip, Corner } from 'react-ui-pip';

export default function SnapCornersExample() {
  const [isPip, setIsPip] = useState(false);
  const [lastSnap, setLastSnap] = useState<Corner | null>(null);

  return (
    <div style={{ padding: 40 }}>
      <h1>Snap to Corners Example</h1>
      <p>Drag the PiP near any corner to see it snap</p>
      {lastSnap && <p>Last snapped to: <strong>{lastSnap}</strong></p>}

      <Pip
        active={isPip}
        snapToCorners
        snapThreshold={100}
        onSnapToCorner={(corner) => {
          setLastSnap(corner);
          console.log('Snapped to:', corner);
        }}
        width={280}
      >
        <div
          style={{
            padding: 20,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            borderRadius: 12,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          <h4>Snap PiP</h4>
          <p style={{ fontSize: 14, opacity: 0.9 }}>
            Drag me close to any corner
          </p>
          {lastSnap && (
            <p style={{ fontSize: 12, marginTop: 8 }}>
              Snapped: {lastSnap}
            </p>
          )}
          <button
            onClick={() => setIsPip(!isPip)}
            style={{
              marginTop: 12,
              width: '100%',
              padding: 10,
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.3)',
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
