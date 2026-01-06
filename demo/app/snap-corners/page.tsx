'use client';

import { useState } from 'react';
import { Pip, Corner } from 'react-ui-pip';

export default function SnapCornersPage() {
  const [isPip, setIsPip] = useState(false);
  const [snappedCorner, setSnappedCorner] = useState<Corner | null>(null);
  const [snapThreshold, setSnapThreshold] = useState(80);

  const handleSnapToCorner = (corner: Corner) => {
    setSnappedCorner(corner);
    console.log('Snapped to corner:', corner);
  };

  return (
    <div className="demo-card">
      <h1>Snap to Corners</h1>
      <p>
        The snap to corners feature automatically positions the PiP window to the nearest
        corner when dragged close to the edges. This provides a clean, magnetic snapping
        experience similar to native applications.
      </p>

      <div className="info-box">
        <p>
          {snappedCorner
            ? `Currently snapped to: ${snappedCorner}`
            : 'Drag the PiP window near a corner to see it snap!'}
        </p>
      </div>

      <div className="demo-section">
        <h2>Snap Threshold</h2>
        <p>
          The snap threshold determines how close to the edge the PiP needs to be before
          snapping occurs. Current threshold: <strong>{snapThreshold}px</strong>
        </p>

        <div style={{ marginTop: 16 }}>
          <input
            type="range"
            min="20"
            max="150"
            value={snapThreshold}
            onChange={(e) => setSnapThreshold(Number(e.target.value))}
            style={{ width: '100%', maxWidth: 400 }}
          />
          <div className="button-group" style={{ marginTop: 12 }}>
            <button
              className="button button-secondary"
              onClick={() => setSnapThreshold(50)}
            >
              Low (50px)
            </button>
            <button
              className="button button-secondary"
              onClick={() => setSnapThreshold(80)}
            >
              Medium (80px)
            </button>
            <button
              className="button button-secondary"
              onClick={() => setSnapThreshold(120)}
            >
              High (120px)
            </button>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>How to Use</h2>
        <div className="code-block">
          {`<Pip
  active={isPip}
  snapToCorners={true}
  snapThreshold={80}
  onSnapToCorner={(corner) => console.log('Snapped to:', corner)}
>
  {/* Your content */}
</Pip>`}
        </div>
        <p>
          Set <code>snapToCorners</code> to true and optionally customize the{' '}
          <code>snapThreshold</code>. The <code>onSnapToCorner</code> callback lets you
          react to snap events.
        </p>
      </div>

      <div className="demo-section">
        <h2>Available Corners</h2>
        <div className="stats-grid">
          <div className="stat-card" style={{ background: '#f3f4f6', color: '#1f2937' }}>
            <div className="stat-value" style={{ fontSize: 16 }}>top-left</div>
          </div>
          <div className="stat-card" style={{ background: '#f3f4f6', color: '#1f2937' }}>
            <div className="stat-value" style={{ fontSize: 16 }}>top-right</div>
          </div>
          <div className="stat-card" style={{ background: '#f3f4f6', color: '#1f2937' }}>
            <div className="stat-value" style={{ fontSize: 16 }}>bottom-left</div>
          </div>
          <div className="stat-card" style={{ background: '#f3f4f6', color: '#1f2937' }}>
            <div className="stat-value" style={{ fontSize: 16 }}>bottom-right</div>
          </div>
        </div>
      </div>

      <Pip
        active={isPip}
        snapToCorners
        snapThreshold={snapThreshold}
        onSnapToCorner={handleSnapToCorner}
        width={300}
      >
        <div className="pip-content">
          <h3 className="pip-header">Snap Demo</h3>
          <p className="pip-text">
            Drag me near any corner to see the magnetic snapping in action!
          </p>
          {snappedCorner && (
            <div
              style={{
                background: 'rgba(74, 222, 128, 0.2)',
                padding: 12,
                borderRadius: 6,
                marginBottom: 12,
              }}
            >
              <p className="pip-text" style={{ margin: 0, color: '#4ade80' }}>
                Snapped to: {snappedCorner}
              </p>
            </div>
          )}
          <p className="pip-text" style={{ fontSize: 12, opacity: 0.7 }}>
            Threshold: {snapThreshold}px
          </p>
          <button className="pip-button" onClick={() => setIsPip(!isPip)}>
            {isPip ? 'Exit PiP' : 'Enter PiP'}
          </button>
        </div>
      </Pip>
    </div>
  );
}
