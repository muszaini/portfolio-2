import React from 'react';

export function EducationCard({ item }) {
  return (
    <article className="education-card">
      <span className="education-card__year">Graduated {item.graduationYear}</span>
      <h3 className="education-card__degree">{item.degree}</h3>
      <p className="education-card__institution">
        {item.institution} • {item.location}
      </p>

      {item.honours && item.honours.length > 0 && (
        <ul className="education-card__honours" aria-label="Academic distinctions and memberships">
          {item.honours.map((honour) => (
            <li key={honour} className="education-card__honour-tag">
              ✦ {honour}
            </li>
          ))}
        </ul>
      )}

      {item.description && <p className="education-card__desc">{item.description}</p>}
    </article>
  );
}

export default EducationCard;
