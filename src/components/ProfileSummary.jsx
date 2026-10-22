import React from 'react';

// Display a compact summary of the faculty profile.
export default function ProfileSummary({ profile }) {
  const fullName = profile.fullName.trim();

  return (
    <section className="profile-summary">
      <div className="profile-summary-avatar">
        {fullName ? fullName.charAt(0).toUpperCase() : 'F'}
      </div>

      <div className="profile-summary-details">
        <h3>{fullName || 'Faculty member'}</h3>
        <p>
          {profile.designation || 'Designation not added'}
          {profile.department ? ` · ${profile.department}` : ''}
        </p>
        <span>
          {profile.employeeId
            ? `Employee ID: ${profile.employeeId}`
            : 'Employee ID not added'}
        </span>
      </div>

      <span className="coming-soon">PROFILE</span>
    </section>
  );
}
