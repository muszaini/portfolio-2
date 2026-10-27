import React from 'react';

export function SectionHeading({ index, eyebrow, title, subtitle, id }) {
  return (
    <header className="section-heading">
      <div className="section-heading__meta">
        {index && (
          <span className="section-heading__index" aria-hidden="true">
            {index}
          </span>
        )}
        {eyebrow && <span className="section-heading__eyebrow">{eyebrow}</span>}
      </div>
      <h2 id={id} className="section-heading__title">
        {title}
      </h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
      <div className="section-heading__rule" aria-hidden="true" />
    </header>
  );
}

export default SectionHeading;
