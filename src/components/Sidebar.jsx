import React from 'react';

// Reusable navigation menu for the main app.
export default function Sidebar({ activePage, onNavigate }) {
  const pages = [
    { name: 'Dashboard', icon: '▦' },
    { name: 'My Profile', icon: '○' },
    { name: 'Teaching', icon: '▤' },
    { name: 'Research', icon: '◇' },
    { name: 'Activities', icon: '✦' },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">FC</div>
        <div>
          <strong>Faculty Career</strong>
          <span>ACADEMIC PORTAL</span>
        </div>
      </div>

      <p className="nav-label">WORKSPACE</p>

      <nav className="navigation">
        {pages.map((page) => (
          <button
            key={page.name}
            className={`nav-item ${activePage === page.name ? 'active' : ''}`}
            onClick={() => onNavigate(page.name)}
          >
            <span className="nav-icon">{page.icon}</span>
            {page.name}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="avatar">FA</div>
        <div>
          <strong>Faculty Account</strong>
          <span>Academic Staff</span>
        </div>
      </div>
    </aside>
  );
}
