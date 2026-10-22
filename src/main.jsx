import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function App() {
  const appInfo = window.facultyApp.getAppInfo();

  return (
    <main className="welcome">
      <div className="brand-mark">FC</div>
      <p className="eyebrow">FACULTY SELF-APPRAISAL</p>
      <h1>{appInfo.name}</h1>
      <p className="description">
        Your academic journey, organized in one place.
      </p>
      <div className="status">
        <span className="status-dot" />
        Electron desktop environment connected
      </div>
      <p className="version">Version {appInfo.version}</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
