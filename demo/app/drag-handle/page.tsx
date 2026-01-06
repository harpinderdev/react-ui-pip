'use client';

import { useState } from 'react';
import { Pip } from 'react-ui-pip';

export default function DragHandlePage() {
  const [isPip, setIsPip] = useState(false);
  const [handleEnabled, setHandleEnabled] = useState(true);

  return (
    <div className="demo-card">
      <h1>Custom Drag Handle</h1>
      <p>
        By default, you can drag the PiP window from anywhere within it. Using a custom
        drag handle, you can restrict dragging to specific elements (like a header bar),
        making other areas interactive.
      </p>

      <div className="info-box">
        <p>
          Try dragging the PiP window. When the drag handle is enabled, you can only drag
          from the header area. When disabled, you can drag from anywhere.
        </p>
      </div>

      <div className="demo-section">
        <h2>Toggle Drag Handle</h2>
        <div className="button-group">
          <button
            className={handleEnabled ? 'button' : 'button button-secondary'}
            onClick={() => setHandleEnabled(true)}
          >
            Drag Handle Enabled
          </button>
          <button
            className={!handleEnabled ? 'button' : 'button button-secondary'}
            onClick={() => setHandleEnabled(false)}
          >
            Drag Handle Disabled
          </button>
        </div>
      </div>

      <div className="demo-section">
        <h2>Implementation</h2>
        <div className="code-block">
          {`<Pip
  active={isPip}
  dragHandleSelector=".drag-handle"
>
  <div>
    <div className="drag-handle">
      Drag here only
    </div>
    <div>
      This area is not draggable
    </div>
  </div>
</Pip>`}
        </div>
        <p>
          Use the <code>dragHandleSelector</code> prop to specify a CSS selector for the
          draggable area. Only elements matching this selector will allow dragging.
        </p>
      </div>

      <div className="demo-section">
        <h2>Use Cases</h2>
        <div className="stats-grid">
          <div className="stat-card" style={{ background: '#f3f4f6', color: '#1f2937' }}>
            <div className="stat-label" style={{ opacity: 0.6 }}>Interactive Content</div>
            <div className="stat-value" style={{ fontSize: 14 }}>
              Forms, buttons, inputs remain clickable
            </div>
          </div>
          <div className="stat-card" style={{ background: '#f3f4f6', color: '#1f2937' }}>
            <div className="stat-label" style={{ opacity: 0.6 }}>Video Players</div>
            <div className="stat-value" style={{ fontSize: 14 }}>
              Drag by titlebar, interact with controls
            </div>
          </div>
          <div className="stat-card" style={{ background: '#f3f4f6', color: '#1f2937' }}>
            <div className="stat-label" style={{ opacity: 0.6 }}>Chat Windows</div>
            <div className="stat-value" style={{ fontSize: 14 }}>
              Drag by header, type in messages
            </div>
          </div>
          <div className="stat-card" style={{ background: '#f3f4f6', color: '#1f2937' }}>
            <div className="stat-label" style={{ opacity: 0.6 }}>Dashboards</div>
            <div className="stat-value" style={{ fontSize: 14 }}>
              Move by titlebar, click on charts
            </div>
          </div>
        </div>
      </div>

      <Pip
        active={isPip}
        dragHandleSelector={handleEnabled ? '.drag-handle' : undefined}
        width={340}
        style={{
          userSelect: 'auto',
        }}
      >
        <div className="pip-content">
          <div
            className="drag-handle"
            style={{
              userSelect: 'none',
            }}
          >
            {handleEnabled ? '⋮⋮ DRAG HERE ONLY ⋮⋮' : '⋮⋮ HEADER ⋮⋮'}
          </div>

          <h3 className="pip-header">Interactive Content</h3>
          <p className="pip-text">
            {handleEnabled
              ? 'Try dragging from the header vs. the content below'
              : 'You can drag from anywhere!'}
          </p>

          <div style={{ marginBottom: 12 }}>
            <input
              type="text"
              placeholder="Type here..."
              style={{
                width: '100%',
                padding: 8,
                borderRadius: 4,
                border: '1px solid rgba(255,255,255,0.3)',
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                fontSize: 14,
              }}
            />
          </div>

          <div className="button-group">
            <button
              className="pip-button"
              style={{ width: 'auto', flex: 1 }}
              onClick={() => alert('Button clicked!')}
            >
              Click Me
            </button>
            <button
              className="pip-button"
              style={{ width: 'auto', flex: 1, background: '#dc2626' }}
              onClick={() => setIsPip(!isPip)}
            >
              {isPip ? 'Exit' : 'Enter'}
            </button>
          </div>

          <p className="pip-text" style={{ fontSize: 11, marginTop: 12, opacity: 0.6 }}>
            {handleEnabled
              ? 'Drag handle is active - drag from header only'
              : 'Drag handle is inactive - drag from anywhere'}
          </p>
        </div>
      </Pip>
    </div>
  );
}
