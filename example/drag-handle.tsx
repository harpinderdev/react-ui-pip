// Example: Custom Drag Handle
'use client';

import { useState } from 'react';
import { Pip } from 'react-ui-pip';

export default function DragHandleExample() {
  const [isPip, setIsPip] = useState(false);

  return (
    <div style={{ padding: 40 }}>
      <h1>Drag Handle Example</h1>
      <p>Only the header is draggable</p>

      <Pip
        active={isPip}
        dragHandleSelector=".pip-header"
        width={300}
        snapToCorners
      >
        <div
          style={{
            background: '#fff',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          }}
        >
          {/* Draggable header */}
          <div
            className="pip-header"
            style={{
              padding: 12,
              background: '#3b82f6',
              color: '#fff',
              cursor: 'grab',
              userSelect: 'none',
            }}
          >
            <strong>Drag me</strong>
          </div>

          {/* Non-draggable content */}
          <div style={{ padding: 20 }}>
            <p>This area is NOT draggable</p>
            <input
              type="text"
              placeholder="You can type here"
              style={{ width: '100%', padding: 8, marginBottom: 10 }}
            />
            <button
              onClick={() => setIsPip(!isPip)}
              style={{
                width: '100%',
                padding: 10,
                background: '#10b981',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
              }}
            >
              {isPip ? 'Exit PiP' : 'Enter PiP'}
            </button>
          </div>
        </div>
      </Pip>
    </div>
  );
}
