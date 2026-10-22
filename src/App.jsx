import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProfileForm from './components/ProfileForm';
import TeachingForm from './components/TeachingForm';

const pageDetails = {
  Dashboard: {
    title: 'Your academic journey, organized.',
    description: 'Manage your teaching, research, and professional activities from one workspace.',
    sections: ['Teaching Records', 'Research Records', 'Other Activities'],
  },
  'My Profile': {
    title: 'Your faculty profile',
    description: 'Keep your professional and academic information organized.',
    sections: ['Personal Information', 'Department Details', 'Qualifications'],
  },
  Teaching: {
    title: 'Your teaching portfolio',
    description: 'Organize your courses, lectures, and teaching contributions.',
    sections: ['Courses', 'Lectures', 'Teaching Materials'],
  },
  Research: {
    title: 'Your research portfolio',
    description: 'Keep track of publications, projects, and scholarly work.',
    sections: ['Publications', 'Research Projects', 'Academic Collaborations'],
  },
  Activities: {
    title: 'Your academic activities',
    description: 'Record seminars, conferences, events, and professional development.',
    sections: ['Seminars', 'Conferences', 'Professional Development'],
  },
};

export default function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const page = pageDetails[activePage] || pageDetails.Dashboard;

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <main className="main-panel">
        <Header title={activePage} />

        <section className="page-content">
          {activePage === 'My Profile' ? (
            <ProfileForm />
          ) : activePage === 'Teaching' ? (
            <TeachingForm />
          ) : (
            <>
              <div className="welcome-card">
                <div>
                  <p className="eyebrow">FACULTY SELF-APPRAISAL</p>
                  <h2>{page.title}</h2>
                  <p>{page.description}</p>
                </div>
                <div className="welcome-illustration" aria-hidden="true">
                  <span>FC</span>
                </div>
              </div>

              <div className="section-heading">
                <div>
                  <h2>{activePage === 'Dashboard' ? 'Overview' : activePage}</h2>
                  <p>
                    {activePage === 'Dashboard'
                      ? 'Your faculty workspace at a glance.'
                      : `Explore your ${activePage.toLowerCase()} information.`}
                  </p>
                </div>
              </div>

              <div className="stats-grid">
                {page.sections.map((section, index) => (
                  <article className="stat-card" key={section}>
                    <div className={`stat-icon ${['blue', 'purple', 'orange'][index % 3]}`}>
                      {['▤', '◇', '✦'][index % 3]}
                    </div>
                    <p>{section}</p>
                    <strong>0</strong>
                    <span>No records added yet</span>
                  </article>
                ))}
              </div>

              <section className="activity-card">
                <div className="activity-heading">
                  <div>
                    <h2>Getting started</h2>
                    <p>Build your academic record one section at a time.</p>
                  </div>
                  <span className="coming-soon">IN DEVELOPMENT</span>
                </div>

                <div className="empty-state">
                  <div className="empty-icon">＋</div>
                  <h3>
                    {activePage === 'Dashboard'
                      ? 'Welcome to your faculty workspace'
                      : `Start organizing your ${activePage.toLowerCase()}`}
                  </h3>
                  <p>
                    Record entry and data storage will be added in upcoming steps.
                    These overview cards are placeholders, not saved records.
                  </p>
                </div>
              </section>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
