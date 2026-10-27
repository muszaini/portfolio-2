import React from 'react';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { ContactForm } from '../components/ContactForm.jsx';
import { profileData } from '../data/portfolioData.js';

export function ContactSection() {
  return (
    <section id="contact" className="section section--alt" aria-labelledby="contact-heading">
      <div className="container">
        <SectionHeading
          id="contact-heading"
          index="VI"
          eyebrow="Enquiries & Collaboration"
          title="Start a Conversation"
          subtitle="Interested in legal-workflow collaboration, website creation, Canva design (brochures, flyers, posters), or early-stage AI workflow exploration? Submit an enquiry below."
        />

        <div className="contact-layout">
          <aside className="contact-info" aria-label="Direct contact information">
            <div className="contact-card">
              <h3 className="contact-card__title">Direct Contact Details</h3>
              <ul className="contact-details-list">
                <li className="contact-details-item">
                  <span className="contact-details-label">Name</span>
                  <span className="contact-details-value">{profileData.name}</span>
                </li>
                <li className="contact-details-item">
                  <span className="contact-details-label">Background</span>
                  <span className="contact-details-value">
                    {profileData.headline} (LL.M. in Business Law • LL.B. Hons)
                  </span>
                </li>
                <li className="contact-details-item">
                  <span className="contact-details-label">Email</span>
                  <a
                    href={`mailto:${profileData.email}`}
                    className="contact-details-value"
                  >
                    {profileData.email}
                  </a>
                </li>
                <li className="contact-details-item">
                  <span className="contact-details-label">Phone</span>
                  <a
                    href={profileData.phoneHref}
                    className="contact-details-value"
                  >
                    {profileData.phone} ({profileData.phoneFormatted})
                  </a>
                </li>
              </ul>
            </div>

            <div className="contact-card">
              <h3 className="contact-card__title">Who Should Reach Out</h3>
              <p style={{ fontSize: '0.94rem', marginBottom: '0.75rem' }}>
                Law firms and legal professionals seeking collaboration on contract review, regulatory compliance, or structured legal workflows.
              </p>
              <p style={{ fontSize: '0.94rem' }}>
                Small and medium-sized businesses or freelance clients looking for clean website creation, brochures, flyers, posters, Canva design, or early-stage AI workflow exploration.
              </p>
            </div>
          </aside>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
