import React from 'react';

export default function SectionHeader({ eyebrow, title, lead }) {
  return (
    <div className="section-header">
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 className="section-title">{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
}
