import React from 'react';

// Keeps the page title and top-level actions consistent.
export default function Header({ title }) {
  return (
    <header className="topbar">
      <div>
        <p className="breadcrumb">Workspace / {title}</p>
        <h1>{title}</h1>
      </div>

      <div className="topbar-right">
        <span className="local-badge">
          <span className="status-dot" />
          Local workspace
        </span>
        <div className="header-avatar">FA</div>
      </div>
    </header>
  );
}
