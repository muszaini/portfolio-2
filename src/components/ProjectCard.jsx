import React from 'react';

/**
 * Reusable Project / Area-of-Interest Card Component (PRD Section 5.7)
 * Supports both Area-of-Interest cards in v1.0 and verified project items
 * (with optional image and liveUrl) as owner-supplied work is added.
 */
export function ProjectCard({ item }) {
  return (
    <article className="project-card">
      <div>
        <div className="project-card__meta">
          {item.category && (
            <span className="project-card__category">{item.category}</span>
          )}
          {item.status && (
            <span className="project-card__status">{item.status}</span>
          )}
        </div>

        <h3 className="project-card__title">{item.title}</h3>
        {item.role && <p className="project-card__role">{item.role}</p>}
        <p className="project-card__desc">{item.description}</p>
      </div>

      <div>
        {item.tools && item.tools.length > 0 && (
          <ul className="project-card__tools" aria-label="Related focus areas and tools">
            {item.tools.map((tool) => (
              <li key={tool} className="project-card__tool">
                {tool}
              </li>
            ))}
          </ul>
        )}

        {item.liveUrl && (
          <div style={{ marginTop: '1rem' }}>
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary btn--sm"
            >
              View Verified Project ↗
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;
