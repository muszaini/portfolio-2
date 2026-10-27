import React from 'react';

export function ExperienceTimeline({ items = [] }) {
  return (
    <div className="timeline" role="list" aria-label="Confirmed professional experience timeline">
      {items.map((entry) => (
        <article key={entry.id} className="timeline-item" role="listitem">
          <span className="timeline-item__marker" aria-hidden="true" />
          <div className="timeline-item__header">
            <div>
              <h3 className="timeline-item__role">{entry.role}</h3>
              <p className="timeline-item__org">{entry.organisation}</p>
            </div>
            <div className="timeline-item__period-group">
              <span className="timeline-item__period">{entry.period}</span>
              {entry.durationNote && (
                <span className="timeline-item__duration">{entry.durationNote}</span>
              )}
            </div>
          </div>

          {entry.context && <p className="timeline-item__context">{entry.context}</p>}

          {entry.achievementBadge && (
            <div className="timeline-item__achievement" aria-label="Documented CV achievement">
              <span aria-hidden="true">★</span>
              <span>{entry.achievementBadge}</span>
            </div>
          )}

          <ul className="timeline-item__list">
            {entry.responsibilities.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export default ExperienceTimeline;
