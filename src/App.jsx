import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProfileForm from './components/ProfileForm';
import ProfileSummary from './components/ProfileSummary';
import TeachingForm from './components/TeachingForm';
import ResearchForm from './components/ResearchForm';
import ActivitiesForm from './components/ActivitiesForm';

const pageDetails = {
  Dashboard: {
    title: 'Your academic journey, organized.',
    description: 'Manage your teaching, research, and professional activities from one workspace.',
  },
  'My Profile': {
    title: 'Your faculty profile',
    description: 'Keep your professional and academic information organized.',
  },
  Teaching: {
    title: 'Your teaching portfolio',
    description: 'Organize your courses, lectures, and teaching contributions.',
  },
  Research: {
    title: 'Your research portfolio',
    description: 'Keep track of publications, projects, and scholarly work.',
  },
  Activities: {
    title: 'Your academic activities',
    description: 'Record seminars, conferences, events, and professional development.',
  },
};

const shortcuts = [
  { title: 'My Profile', description: 'Professional details', icon: '○' },
  { title: 'Teaching', description: 'Courses and lectures', icon: '▤' },
  { title: 'Research', description: 'Publications and projects', icon: '◇' },
  { title: 'Activities', description: 'Seminars and events', icon: '✦' },
];

export default function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [profile, setProfile] = useState({
    fullName: '',
    employeeId: '',
    department: '',
    designation: '',
    email: '',
  });
  const page = pageDetails[activePage] || pageDetails.Dashboard;

  function navigateTo(pageName) {
    setActivePage(pageName);
  }

  function renderActivePage() {
    switch (activePage) {
      case 'My Profile':
        return (
          <>
            <ProfileSummary profile={profile} />
            <ProfileForm
              profile={profile}
              onProfileChange={setProfile}
            />
          </>
        );
      case 'Teaching':
        return <TeachingForm />;
      case 'Research':
        return <ResearchForm />;
      case 'Activities':
        return <ActivitiesForm />;
      default:
        return (
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
                <h2>Quick access</h2>
                <p>Choose a section to manage your academic information.</p>
              </div>
            </div>

            <div className="shortcut-grid">
              {shortcuts.map((shortcut, index) => (
                <button
                  type="button"
                  className="shortcut-card"
                  key={shortcut.title}
                  onClick={() => navigateTo(shortcut.title)}
                >
                  <span className={`stat-icon ${['blue', 'purple', 'orange', 'blue'][index]}`}>
                    {shortcut.icon}
                  </span>
                  <span className="shortcut-copy">
                    <strong>{shortcut.title}</strong>
                    <span>{shortcut.description}</span>
                  </span>
                  <span className="shortcut-arrow" aria-hidden="true">→</span>
                </button>
              ))}
            </div>

            <section className="activity-card">
              <div className="activity-heading">
                <div>
                  <h2>Welcome to your workspace</h2>
                  <p>Your faculty appraisal sections are ready to explore.</p>
                </div>
                <span className="coming-soon">OVERVIEW</span>
              </div>
              <div className="empty-state">
                <div className="empty-icon">＋</div>
                <h3>Build your academic record</h3>
                <p>
                  Open a section above to begin entering information.
                  Record storage and appraisal summaries will be connected in later steps.
                </p>
              </div>
            </section>
          </>
        );
    }
  }

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={navigateTo} />
      <main className="main-panel">
        <Header title={activePage} />
        <section className="page-content">
          {renderActivePage()}
        </section>
      </main>
    </div>
  );
}
