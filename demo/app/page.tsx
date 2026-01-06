'use client';

import { useState } from 'react';
import { Pip } from 'react-ui-pip';

export default function HomePage() {
  const [isPip, setIsPip] = useState(false);
  const [progress, setProgress] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 200);
    }
  };

  return (
    <div className="demo-card">
      <h1>React UI PiP Demo</h1>
      <p>
        Welcome to the interactive demo of react-ui-pip! This library allows you to create
        picture-in-picture UI components (not just video) that float above your application
        and persist across page navigation.
      </p>

      <div className="info-box">
        <p>
          Click the "Enter PiP" button below to see the audio player float in picture-in-picture mode.
          You can drag it around, and it will stay on screen even if you navigate to other demo pages!
        </p>
      </div>

      <div className="demo-section">
        <h2>Audio Player Example</h2>
        <p>
          This example demonstrates a music player that can enter PiP mode. Try clicking the button
          and dragging the player around your screen.
        </p>
      </div>

      <Pip
        active={isPip}
        initialPosition={{ x: 60, y: 143 }}
        snapToCorners
        persistKey="demo-audio-player"
        width={320}
      >
        <div className="pip-content">
          <h3 className="pip-header">Now Playing</h3>
          <p className="pip-text">Amazing Song - Great Artist</p>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="button-group">
            <button
              className="pip-button"
              onClick={togglePlayPause}
              style={{ width: 'auto', flex: 1 }}
            >
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
            <button
              className="pip-button"
              onClick={() => setIsPip(!isPip)}
              style={{ width: 'auto', flex: 1, background: '#dc2626' }}
            >
              {isPip ? 'Exit PiP' : 'Enter PiP'}
            </button>
          </div>

          <div className="stats-grid" style={{ marginTop: 16 }}>
            <div className="stat-card">
              <div className="stat-label">Duration</div>
              <div className="stat-value">3:42</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Quality</div>
              <div className="stat-value">HD</div>
            </div>
          </div>
        </div>
      </Pip>

      <div className="demo-section" style={{ marginTop: 40 }}>
        <h2>Features Showcase</h2>
        <div className="stats-grid">
          <div className="stat-card" style={{ background: '#f3f4f6', color: '#1f2937' }}>
            <div className="stat-label" style={{ opacity: 0.6 }}>Portal-based</div>
            <div className="stat-value" style={{ fontSize: 16 }}>No re-mounts</div>
          </div>
          <div className="stat-card" style={{ background: '#f3f4f6', color: '#1f2937' }}>
            <div className="stat-label" style={{ opacity: 0.6 }}>SSR-Safe</div>
            <div className="stat-value" style={{ fontSize: 16 }}>Next.js Ready</div>
          </div>
          <div className="stat-card" style={{ background: '#f3f4f6', color: '#1f2937' }}>
            <div className="stat-label" style={{ opacity: 0.6 }}>Size</div>
            <div className="stat-value" style={{ fontSize: 16 }}>~3KB gzipped</div>
          </div>
          <div className="stat-card" style={{ background: '#f3f4f6', color: '#1f2937' }}>
            <div className="stat-label" style={{ opacity: 0.6 }}>Dependencies</div>
            <div className="stat-value" style={{ fontSize: 16 }}>Zero</div>
          </div>
        </div>
      </div>

      <div className="demo-section" style={{ marginTop: 40 }}>
        <h2>Try Other Demos</h2>
        <p>
          Explore the navigation menu above to see different PiP features like controlled mode,
          snap to corners, and custom drag handles.
        </p>
      </div>
    </div>
  );
}
