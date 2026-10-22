import React from 'react';

// Calculate completion from the five required profile fields.
export default function ProfileCompletion({ profile }) {
  const fields = [
    profile.fullName,
    profile.employeeId,
    profile.department,
    profile.designation,
    profile.email,
  ];

  const completed = fields.filter((value) => value.trim() !== '').length;
  const percentage = Math.round((completed / fields.length) * 100);

  return (
    <section className="completion-card">
      <div className="completion-heading">
        <div>
          <h2>Profile completion</h2>
          <p>{completed} of {fields.length} profile fields completed</p>
        </div>
        <strong>{percentage}%</strong>
      </div>

      <div
        className="completion-track"
        role="progressbar"
        aria-label="Profile completion"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
      >
        <div className="completion-fill" style={{ width: `${percentage}%` }} />
      </div>
    </section>
  );
}
