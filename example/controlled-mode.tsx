// Example: Controlled Mode with Position State
'use client';

import { useState } from 'react';
import { Pip, Position } from 'react-ui-pip';

export default function ControlledExample() {
  const [isPip, setIsPip] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 100, y: 100 });

  // Reset position to center
  const resetPosition = () => {
    setPosition({
      x: window.innerWidth / 2 - 140,
      y: window.innerHeight / 2 - 100,
    });
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Controlled Mode Example</h1>

      <div style={{ marginBottom: 20 }}>
        <p>Current position: {position.x}px, {position.y}px</p>
        <button onClick={resetPosition}>Reset to Center</button>
      </div>

      <Pip
        active={isPip}
        position={position}
        onPositionChange={setPosition}
        width={280}
      >
        <div
          style={{
            padding: 20,
            background: '#7c3aed',
            color: '#fff',
            borderRadius: 12,
          }}
        >
          <h4>Controlled PiP</h4>
          <p style={{ fontSize: 12 }}>
            x: {Math.round(position.x)}, y: {Math.round(position.y)}
          </p>
          <button onClick={() => setIsPip(!isPip)}>
            {isPip ? 'Exit' : 'Enter'} PiP
          </button>
        </div>
      </Pip>
    </div>
  );
}
