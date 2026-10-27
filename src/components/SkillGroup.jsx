import React from 'react';

export function SkillGroup({ group }) {
  return (
    <article className="skill-group">
      <header className="skill-group__header">
        {group.badge && <span className="skill-group__badge">{group.badge}</span>}
        <h3 className="skill-group__title">{group.category}</h3>
        {group.subtitle && <p className="skill-group__subtitle">{group.subtitle}</p>}
      </header>

      <ul className="skill-list">
        {group.skills.map((skill) => (
          <li key={skill.name} className="skill-item">
            <div className="skill-item__top">
              <span className="skill-item__name">{skill.name}</span>
              {skill.status && (
                <span className="skill-item__status">{skill.status}</span>
              )}
            </div>
            {skill.detail && <p className="skill-item__detail">{skill.detail}</p>}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default SkillGroup;
