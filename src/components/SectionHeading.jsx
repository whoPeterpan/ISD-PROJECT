import React from 'react';

// Reuse this heading across forms and dashboard sections.
export default function SectionHeading({ title, description, badge }) {
  return (
    <div className="section-heading reusable-heading">
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>

      {badge && <span className="coming-soon">{badge}</span>}
    </div>
  );
}
