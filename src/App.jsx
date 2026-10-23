
import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProfileForm from './components/ProfileForm';
import ProfileSummary from './components/ProfileSummary';
import ProfileCompletion from './components/ProfileCompletion';
import TeachingForm from './components/TeachingForm';
import ResearchForm from './components/ResearchForm';
import ActivitiesForm from './components/ActivitiesForm';

const pageDetails = {
  Dashboard: {
    title: 'Your academic journey, organized.',
    description:
      'Manage your teaching, research, and professional activities from one workspace.',
  },
  'My Profile': {
    title: 'Your faculty profile',
    description:
      'Keep your professional and academic information organized.',
  },
  Teaching: {
    title: 'Your teaching portfolio',
    description:
      'Organize your courses, lectures, and teaching contributions.',
  },
  Research: {
    title: 'Your research portfolio',
    description:
      'Keep track of publications, projects, and scholarly work.',
  },
  Activities: {
    title: 'Your academic activities',
    description:
      'Record seminars, conferences, events, and professional development.',
  },
};

const shortcuts = [
  { title: 'My Profile', description: 'Professional details', icon: '○' },
  { title: 'Teaching', description: 'Courses and lectures', icon: '▤' },
  { title: 'Research', description: 'Publications and projects', icon: '◇' },
  { title: 'Activities', description: 'Seminars and events', icon: '✦' },
];

const emptyProfile = {
  fullName: '',
  employeeId: '',
  department: '',
  designation: '',
  email: '',
};

export default function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [profile, setProfile] = useState(emptyProfile);
  const [teachingRecords, setTeachingRecords] = useState([]);
  const [researchRecords, setResearchRecords] = useState([]);
  const [activityRecords, setActivityRecords] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [storageError, setStorageError] = useState('');
  const [saveStatus, setSaveStatus] = useState('loading');

  // Load saved data before enabling automatic saving.
  useEffect(() => {
    let cancelled = false;

    async function loadSavedRecords() {
      try {
        const saved = await window.facultyApp.loadRecords();

        if (cancelled) return;

        if (saved && typeof saved === 'object') {
          setProfile({
            ...emptyProfile,
            ...(saved.profile || {}),
          });
          setTeachingRecords(
            Array.isArray(saved.teaching) ? saved.teaching : []
          );
          setResearchRecords(
            Array.isArray(saved.research) ? saved.research : []
          );
          setActivityRecords(
            Array.isArray(saved.activities) ? saved.activities : []
          );
        }
      } catch (error) {
        console.error('Could not load saved faculty data:', error);

        if (!cancelled) {
          setStorageError('Saved data could not be loaded.');
        }
      } finally {
        if (!cancelled) {
          setIsLoaded(true);
        }
      }
    }

    if (window.facultyApp?.loadRecords) {
      loadSavedRecords();
    } else {
      setStorageError('Local storage is unavailable in this environment.');
      setIsLoaded(true);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  // Save shared state whenever faculty data changes after loading.
  useEffect(() => {
    if (!isLoaded || !window.facultyApp?.saveRecords) return;

    async function saveCurrentRecords() {
      try {
  await window.facultyApp.saveRecords({
    profile,
    teaching: teachingRecords,
    research: researchRecords,
    activities: activityRecords,
  });

  setStorageError('');
  setSaveStatus('saved');
} catch (error) {
  console.error('Could not save faculty data:', error);
  setStorageError('Changes could not be saved locally.');
  setSaveStatus('error');
}
    }
setSaveStatus('saving');
    saveCurrentRecords();
  }, [
    isLoaded,
    profile,
    teachingRecords,
    researchRecords,
    activityRecords,
  ]);

  const page = pageDetails[activePage] || pageDetails.Dashboard;

  function navigateTo(pageName) {
    setActivePage(pageName);
  }

  function renderActivePage() {
    switch (activePage) {
      case 'My Profile':
        return (
          <>
            <ProfileCompletion profile={profile} />
            <ProfileSummary profile={profile} />
            <ProfileForm
              profile={profile}
              onProfileChange={setProfile}
            />
          </>
        );

      case 'Teaching':
        return (
          <TeachingForm
            records={teachingRecords}
            setRecords={setTeachingRecords}
          />
        );

      case 'Research':
        return (
          <ResearchForm
            records={researchRecords}
            setRecords={setResearchRecords}
          />
        );

      case 'Activities':
        return (
          <ActivitiesForm
            records={activityRecords}
            setRecords={setActivityRecords}
          />
        );

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
                  <span
                    className={`stat-icon ${
                      ['blue', 'purple', 'orange', 'blue'][index]
                    }`}
                  >
                    {shortcut.icon}
                  </span>
                  <span className="shortcut-copy">
                    <strong>{shortcut.title}</strong>
                    <span>{shortcut.description}</span>
                  </span>
                  <span className="shortcut-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              ))}
            </div>

            <section className="activity-card">
              <div className="activity-heading">
                <div>
                  <h2>Welcome to your workspace</h2>
                  <p>
                    Your faculty appraisal sections are ready to explore.
                  </p>
                </div>
                <span className="coming-soon">OVERVIEW</span>
              </div>
              <div className="empty-state">
                <div className="empty-icon">＋</div>
                <h3>Build your academic record</h3>
                <p>
                  Open a section above to begin entering information.
                  Your information is saved locally on this device.
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
        <div className="app-header-area">
  <Header title={activePage} />

  <p
    className={`save-status save-status-${saveStatus}`}
    role="status"
    aria-live="polite"
  >
    {saveStatus === 'loading' && 'Loading saved data…'}
    {saveStatus === 'saving' && 'Saving changes…'}
    {saveStatus === 'saved' && '✓ Saved locally'}
    {saveStatus === 'error' && 'Save failed'}
  </p>
</div>
        <section className="page-content">
          {storageError && (
            <p role="alert" className="storage-warning">
              {storageError}
            </p>
          )}
          {!isLoaded ? (
            <p role="status">Loading your saved faculty data...</p>
          ) : (
            renderActivePage()
          )}
        </section>
      </main>
    </div>
  );
}
