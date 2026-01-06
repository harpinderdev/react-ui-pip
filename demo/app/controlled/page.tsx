'use client';

import { useState } from 'react';
import { Pip, Position } from 'react-ui-pip';

export default function ControlledModePage() {
  const [isPip, setIsPip] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 100, y: 100 });

  const resetPosition = () => {
    if (typeof window !== 'undefined') {
      setPosition({
        x: window.innerWidth / 2 - 140,
        y: window.innerHeight / 2 - 100,
      });
    }
  };

  const moveToTopLeft = () => {
    setPosition({ x: 20, y: 100 });
  };

  const moveToTopRight = () => {
    if (typeof window !== 'undefined') {
      setPosition({ x: window.innerWidth - 300, y: 100 });
    }
  };

  const moveToBottomRight = () => {
    if (typeof window !== 'undefined') {
      setPosition({
        x: window.innerWidth - 300,
        y: window.innerHeight - 300,
      });
    }
  };

  return (
    <div className="demo-card">
      <h1>Controlled Mode</h1>
      <p>
        In controlled mode, you have full control over the PiP position using React state.
        This is useful when you need to programmatically control the position or sync it
        with other parts of your application.
      </p>

      <div className="info-box">
        <p>
          Current Position: X = {Math.round(position.x)}px, Y = {Math.round(position.y)}px
        </p>
      </div>

      <div className="demo-section">
        <h2>Position Controls</h2>
        <p>Click these buttons to move the PiP window programmatically:</p>

        <div className="button-group" style={{ marginTop: 16 }}>
          <button className="button" onClick={moveToTopLeft}>
            Top Left
          </button>
          <button className="button" onClick={moveToTopRight}>
            Top Right
          </button>
          <button className="button" onClick={moveToBottomRight}>
            Bottom Right
          </button>
          <button className="button button-secondary" onClick={resetPosition}>
            Center
          </button>
        </div>
      </div>

      <div className="demo-section">
        <h2>How It Works</h2>
        <div className="code-block">
          {`const [position, setPosition] = useState({ x: 100, y: 100 });

<Pip
  active={isPip}
  position={position}
  onPositionChange={setPosition}
>
  {/* Your content */}
</Pip>`}
        </div>
        <p>
          By passing both <code>position</code> and <code>onPositionChange</code> props,
          the component becomes controlled. You can read and update the position from your code.
        </p>
      </div>

      <Pip
        active={isPip}
        position={position}
        onPositionChange={setPosition}
        width={280}
      >
        <div className="pip-content">
          <h3 className="pip-header">Controlled PiP</h3>
          <p className="pip-text">
            Position: ({Math.round(position.x)}, {Math.round(position.y)})
          </p>
          <p className="pip-text" style={{ fontSize: 12, opacity: 0.7 }}>
            Drag me around or use the buttons on the main page to move me!
          </p>
          <button className="pip-button" onClick={() => setIsPip(!isPip)}>
            {isPip ? 'Exit PiP' : 'Enter PiP'}
          </button>
        </div>
      </Pip>
    </div>
  );
}
