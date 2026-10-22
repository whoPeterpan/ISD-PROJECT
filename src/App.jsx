import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// The root component owns navigation state for the dashboard.
export default function App() {
  const [activePage, setActivePage] = useState('Dashboard');

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <main className="main-panel">
        <Header title={activePage} />

        <section className="page-content">
          <div className="welcome-card">
            <div>
              <p className="eyebrow">FACULTY SELF-APPRAISAL</p>
              <h2>Your academic journey, organized.</h2>
              <p>
                Manage your teaching, research, and professional activities
                from one simple workspace.
              </p>
            </div>
            <div className="welcome-illustration" aria-hidden="true">
              <span>FC</span>
            </div>
          </div>

          <div className="section-heading">
            <div>
              <h2>Overview</h2>
              <p>Your faculty workspace at a glance.</p>
            </div>
          </div>

          <div className="stats-grid">
            <article className="stat-card">
              <div className="stat-icon blue">▤</div>
              <p>Teaching Records</p>
              <strong>0</strong>
              <span>Records added</span>
            </article>

            <article className="stat-card">
              <div className="stat-icon purple">◇</div>
              <p>Research Records</p>
              <strong>0</strong>
              <span>Publications and projects</span>
            </article>

            <article className="stat-card">
              <div className="stat-icon orange">✦</div>
              <p>Other Activities</p>
              <strong>0</strong>
              <span>Events and seminars</span>
            </article>
          </div>

          <section className="activity-card">
            <div className="activity-heading">
              <div>
                <h2>{activePage === 'Dashboard' ? 'Getting started' : activePage}</h2>
                <p>
                  {activePage === 'Dashboard'
                    ? 'Your workspace is ready for your academic records.'
                    : `The ${activePage.toLowerCase()} section is ready to be developed.`}
                </p>
              </div>
              <span className="coming-soon">INITIAL SETUP</span>
            </div>

            <div className="empty-state">
              <div className="empty-icon">＋</div>
              <h3>Start building your faculty record</h3>
              <p>
                This section will let you add and manage your academic
                information as we develop the app.
              </p>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
