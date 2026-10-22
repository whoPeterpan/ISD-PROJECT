import React, { useState } from 'react';

// Keep profile fields together so React can manage their values.
const initialProfile = {
  fullName: '',
  employeeId: '',
  department: '',
  designation: '',
  email: '',
};

export default function ProfileForm({ profile, onProfileChange }) {
  const [localProfile, setLocalProfile] = useState(initialProfile);
  const currentProfile = profile ?? localProfile;
  const [saved, setSaved] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    const update = (current) => ({ ...current, [name]: value });
    if (onProfileChange) {
      onProfileChange(update(currentProfile));
    } else {
      setLocalProfile(update);
    }

    setSaved(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // This is temporary in-memory saving; persistent storage comes later.
    setSaved(true);
  }

  return (
    <section className="form-card">
      <div className="form-heading">
        <div>
          <h2>Faculty information</h2>
          <p>Enter your basic professional details.</p>
        </div>
        <span className="coming-soon">PROFILE</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="form-field">
            Full name
            <input
              name="fullName"
              value={currentProfile.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </label>

          <label className="form-field">
            Employee ID
            <input
              name="employeeId"
              value={currentProfile.employeeId}
              onChange={handleChange}
              placeholder="Enter employee ID"
              required
            />
          </label>

          <label className="form-field">
            Department
            <input
              name="department"
              value={currentProfile.department}
              onChange={handleChange}
              placeholder="e.g. Computer Science"
              required
            />
          </label>

          <label className="form-field">
            Designation
            <input
              name="designation"
              value={currentProfile.designation}
              onChange={handleChange}
              placeholder="e.g. Assistant Professor"
              required
            />
          </label>

          <label className="form-field full-width">
            Institutional email
            <input
              name="email"
              type="email"
              value={currentProfile.email}
              onChange={handleChange}
              placeholder="name@university.edu"
              required
            />
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-button">
            Save profile
          </button>
          {saved && (
            <p className="success-message" role="status">
              Profile details captured for this session.
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
