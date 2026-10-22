import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function App() {
  const [appInfo, setAppInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    window.facultyApp
      .getAppInfo()
      .then(setAppInfo)
      .catch(() => setError('Unable to load application information.'));
  }, []);

  if (error) {
    return <main className="welcome">{error}</main>;
  }

  if (!appInfo) {
    return <main className="welcome">Loading Faculty Career App...</main>;
  }

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
        Secure Electron bridge connected
      </div>
      <p className="version">
        Version {appInfo.version} · {appInfo.platform}
      </p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);