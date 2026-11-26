import React from 'react';

/**
 * Bespoke, restrained editorial SVG architecture schematics for each featured project.
 * Communicates each system's workflow visually without stock-image clutter or heavy assets.
 */
export function ProjectVisual({ projectId, title }) {
  return (
    <div
      className="w-full bg-[#111111] border border-[#C6A15B]/20 p-4 sm:p-5 overflow-hidden"
      aria-label={`${title} workflow architecture diagram`}
      role="img"
    >
      {projectId === 'lawflow-ai' && (
        <svg viewBox="0 0 640 164" className="w-full h-auto block" fill="none">
          <text x="12" y="18" fill="#C6A15B" fontSize="9" letterSpacing="2" fontFamily="Inter, sans-serif">
            MATTER &amp; DOCUMENT WORKFLOW ARCHITECTURE
          </text>
          {/* Nodes */}
          <rect x="12" y="34" width="132" height="84" stroke="#C6A15B" strokeOpacity="0.45" fill="#171717" />
          <text x="24" y="56" fill="#C6A15B" fontSize="8" letterSpacing="1.6" fontFamily="Inter, sans-serif">01 INTAKE</text>
          <text x="24" y="76" fill="#F4F0E8" fontSize="12" fontFamily="Georgia, serif">Client &amp; Roles</text>
          <line x1="24" y1="88" x2="124" y2="88" stroke="#F4F0E8" strokeOpacity="0.12" />
          <text x="24" y="104" fill="#A7A29A" fontSize="9" fontFamily="Inter, sans-serif">RBAC · Client Profile</text>

          <line x1="144" y1="76" x2="174" y2="76" stroke="#C6A15B" strokeOpacity="0.55" />
          <polygon points="174,72 182,76 174,80" fill="#C6A15B" fillOpacity="0.7" />

          <rect x="184" y="34" width="144" height="84" stroke="#C6A15B" strokeOpacity="0.65" fill="#1A1916" />
          <text x="196" y="56" fill="#C6A15B" fontSize="8" letterSpacing="1.6" fontFamily="Inter, sans-serif">02 MATTER CORE</text>
          <text x="196" y="76" fill="#F4F0E8" fontSize="12" fontFamily="Georgia, serif">Active Matters</text>
          <line x1="196" y1="88" x2="312" y2="88" stroke="#F4F0E8" strokeOpacity="0.12" />
          <text x="196" y="104" fill="#A7A29A" fontSize="9" fontFamily="Inter, sans-serif">Status · Milestones</text>

          <line x1="328" y1="76" x2="358" y2="76" stroke="#C6A15B" strokeOpacity="0.55" />
          <polygon points="358,72 366,76 358,80" fill="#C6A15B" fillOpacity="0.7" />

          <rect x="368" y="34" width="144" height="84" stroke="#C6A15B" strokeOpacity="0.45" fill="#171717" />
          <text x="380" y="56" fill="#C6A15B" fontSize="8" letterSpacing="1.6" fontFamily="Inter, sans-serif">03 DOCUMENTS</text>
          <text x="380" y="76" fill="#F4F0E8" fontSize="12" fontFamily="Georgia, serif">Workflow Files</text>
          <line x1="380" y1="88" x2="496" y2="88" stroke="#F4F0E8" strokeOpacity="0.12" />
          <text x="380" y="104" fill="#A7A29A" fontSize="9" fontFamily="Inter, sans-serif">Checklists · Audit Log</text>

          <line x1="512" y1="76" x2="536" y2="76" stroke="#C6A15B" strokeOpacity="0.55" />
          <rect x="538" y="42" width="90" height="68" stroke="#F4F0E8" strokeOpacity="0.2" fill="#141414" />
          <text x="550" y="66" fill="#C6A15B" fontSize="8" letterSpacing="1.4" fontFamily="Inter, sans-serif">STORE</text>
          <text x="550" y="85" fill="#F4F0E8" fontSize="10" fontFamily="Inter, sans-serif">FastAPI</text>
          <text x="550" y="99" fill="#A7A29A" fontSize="9" fontFamily="Inter, sans-serif">PostgreSQL</text>

          <line x1="12" y1="142" x2="628" y2="142" stroke="#F4F0E8" strokeOpacity="0.08" />
          <text x="12" y="156" fill="#A7A29A" fontSize="8.5" fontFamily="Inter, sans-serif">
            Structured practice visibility across users, clients, matters and legal documentation
          </text>
        </svg>
      )}

      {projectId === 'restaurant-analytics' && (
        <svg viewBox="0 0 640 164" className="w-full h-auto block" fill="none">
          <text x="12" y="18" fill="#C6A15B" fontSize="9" letterSpacing="2" fontFamily="Inter, sans-serif">
            NATURAL-LANGUAGE ANALYTICS PIPELINE
          </text>
          {/* Prompt Box */}
          <rect x="12" y="34" width="210" height="90" stroke="#C6A15B" strokeOpacity="0.5" fill="#171717" />
          <text x="24" y="54" fill="#C6A15B" fontSize="8" letterSpacing="1.5" fontFamily="Inter, sans-serif">OWNER QUESTION</text>
          <text x="24" y="75" fill="#F4F0E8" fontSize="11.5" fontFamily="Georgia, serif">&ldquo;Which menu items drove</text>
          <text x="24" y="92" fill="#F4F0E8" fontSize="11.5" fontFamily="Georgia, serif">weekend revenue growth?&rdquo;</text>
          <text x="24" y="112" fill="#A7A29A" fontSize="8.5" fontFamily="Inter, sans-serif">React + TypeScript Query UI</text>

          <line x1="222" y1="79" x2="254" y2="79" stroke="#C6A15B" strokeOpacity="0.55" />
          <polygon points="254,75 262,79 254,83" fill="#C6A15B" fillOpacity="0.7" />

          {/* LLM + FastAPI */}
          <rect x="264" y="34" width="144" height="90" stroke="#C6A15B" strokeOpacity="0.65" fill="#1A1916" />
          <text x="276" y="54" fill="#C6A15B" fontSize="8" letterSpacing="1.5" fontFamily="Inter, sans-serif">AI + API LAYER</text>
          <text x="276" y="76" fill="#F4F0E8" fontSize="12" fontFamily="Georgia, serif">LLM Reasoning</text>
          <text x="276" y="95" fill="#A7A29A" fontSize="9" fontFamily="Inter, sans-serif">FastAPI · SQLite</text>
          <text x="276" y="111" fill="#A7A29A" fontSize="8.5" fontFamily="Inter, sans-serif">Structured Metric Output</text>

          <line x1="408" y1="79" x2="438" y2="79" stroke="#C6A15B" strokeOpacity="0.55" />
          <polygon points="438,75 446,79 438,83" fill="#C6A15B" fillOpacity="0.7" />

          {/* Analytical Bar Output */}
          <rect x="448" y="34" width="180" height="90" stroke="#F4F0E8" strokeOpacity="0.18" fill="#141414" />
          <text x="462" y="54" fill="#C6A15B" fontSize="8" letterSpacing="1.5" fontFamily="Inter, sans-serif">DECISION INSIGHT</text>
          <rect x="464" y="94" width="20" height="18" fill="#C6A15B" fillOpacity="0.35" />
          <rect x="492" y="80" width="20" height="32" fill="#C6A15B" fillOpacity="0.55" />
          <rect x="520" y="66" width="20" height="46" fill="#C6A15B" fillOpacity="0.85" />
          <rect x="548" y="74" width="20" height="38" fill="#C6A15B" fillOpacity="0.6" />
          <rect x="576" y="86" width="20" height="26" fill="#C6A15B" fillOpacity="0.4" />
          <line x1="460" y1="112" x2="612" y2="112" stroke="#F4F0E8" strokeOpacity="0.2" />

          <line x1="12" y1="142" x2="628" y2="142" stroke="#F4F0E8" strokeOpacity="0.08" />
          <text x="12" y="156" fill="#A7A29A" fontSize="8.5" fontFamily="Inter, sans-serif">
            Translates operational restaurant records into plain-language summaries for non-technical owners
          </text>
        </svg>
      )}

      {projectId === 'skillswap' && (
        <svg viewBox="0 0 640 164" className="w-full h-auto block" fill="none">
          <text x="12" y="18" fill="#C6A15B" fontSize="9" letterSpacing="2" fontFamily="Inter, sans-serif">
            PEER-TO-PEER SKILL MATCHING &amp; EXCHANGE FLOW
          </text>
          <rect x="12" y="36" width="166" height="84" stroke="#C6A15B" strokeOpacity="0.45" fill="#171717" />
          <text x="24" y="56" fill="#C6A15B" fontSize="8" letterSpacing="1.5" fontFamily="Inter, sans-serif">MEMBER A PROFILE</text>
          <text x="24" y="77" fill="#F4F0E8" fontSize="11.5" fontFamily="Georgia, serif">Offers: Legal Writing</text>
          <text x="24" y="96" fill="#A7A29A" fontSize="9.5" fontFamily="Inter, sans-serif">Seeks: UI Prototyping</text>

          <line x1="178" y1="68" x2="232" y2="68" stroke="#C6A15B" strokeOpacity="0.65" />
          <line x1="178" y1="88" x2="232" y2="88" stroke="#F4F0E8" strokeOpacity="0.25" strokeDasharray="3 3" />

          <rect x="234" y="34" width="172" height="88" stroke="#C6A15B" strokeOpacity="0.7" fill="#1A1916" />
          <text x="248" y="55" fill="#C6A15B" fontSize="8" letterSpacing="1.6" fontFamily="Inter, sans-serif">MUTUAL MATCH ENGINE</text>
          <text x="248" y="77" fill="#F4F0E8" fontSize="12" fontFamily="Georgia, serif">Exchange Requests</text>
          <text x="248" y="96" fill="#A7A29A" fontSize="9" fontFamily="Inter, sans-serif">FastAPI · Supabase</text>
          <text x="248" y="111" fill="#C6A15B" fontSize="8.5" fontFamily="Inter, sans-serif">Pending → Accepted</text>

          <line x1="406" y1="68" x2="460" y2="68" stroke="#F4F0E8" strokeOpacity="0.25" strokeDasharray="3 3" />
          <line x1="406" y1="88" x2="460" y2="88" stroke="#C6A15B" strokeOpacity="0.65" />

          <rect x="462" y="36" width="166" height="84" stroke="#C6A15B" strokeOpacity="0.45" fill="#171717" />
          <text x="474" y="56" fill="#C6A15B" fontSize="8" letterSpacing="1.5" fontFamily="Inter, sans-serif">MEMBER B PROFILE</text>
          <text x="474" y="77" fill="#F4F0E8" fontSize="11.5" fontFamily="Georgia, serif">Offers: UI Prototyping</text>
          <text x="474" y="96" fill="#A7A29A" fontSize="9.5" fontFamily="Inter, sans-serif">Seeks: Legal Writing</text>

          <line x1="12" y1="142" x2="628" y2="142" stroke="#F4F0E8" strokeOpacity="0.08" />
          <text x="12" y="156" fill="#A7A29A" fontSize="8.5" fontFamily="Inter, sans-serif">
            Structured profiles, complementary skill discovery and clear exchange coordination
          </text>
        </svg>
      )}

      {projectId === 'hibah-wasiat-platform' && (
        <svg viewBox="0 0 640 164" className="w-full h-auto block" fill="none">
          <text x="12" y="18" fill="#C6A15B" fontSize="9" letterSpacing="2" fontFamily="Inter, sans-serif">
            ESTATE PLANNING INFORMATION &amp; ENQUIRY PORTAL
          </text>
          <rect x="12" y="34" width="184" height="86" stroke="#C6A15B" strokeOpacity="0.45" fill="#171717" />
          <text x="24" y="55" fill="#C6A15B" fontSize="8" letterSpacing="1.5" fontFamily="Inter, sans-serif">KNOWLEDGE GUIDES</text>
          <text x="24" y="76" fill="#F4F0E8" fontSize="12" fontFamily="Georgia, serif">Hibah &amp; Wasiat Clarity</text>
          <text x="24" y="96" fill="#A7A29A" fontSize="9" fontFamily="Inter, sans-serif">Structured client education</text>
          <text x="24" y="110" fill="#A7A29A" fontSize="9" fontFamily="Inter, sans-serif">Mobile-first reading flow</text>

          <line x1="196" y1="77" x2="228" y2="77" stroke="#C6A15B" strokeOpacity="0.55" />
          <polygon points="228,73 236,77 228,81" fill="#C6A15B" fillOpacity="0.7" />

          <rect x="238" y="34" width="184" height="86" stroke="#C6A15B" strokeOpacity="0.65" fill="#1A1916" />
          <text x="250" y="55" fill="#C6A15B" fontSize="8" letterSpacing="1.5" fontFamily="Inter, sans-serif">GUIDED INTAKE</text>
          <text x="250" y="76" fill="#F4F0E8" fontSize="12" fontFamily="Georgia, serif">Advisory Enquiry</text>
          <text x="250" y="96" fill="#A7A29A" fontSize="9" fontFamily="Inter, sans-serif">Validated client details</text>
          <text x="250" y="110" fill="#A7A29A" fontSize="9" fontFamily="Inter, sans-serif">Consultation readiness</text>

          <line x1="422" y1="77" x2="454" y2="77" stroke="#C6A15B" strokeOpacity="0.55" />
          <polygon points="454,73 462,77 454,81" fill="#C6A15B" fillOpacity="0.7" />

          <rect x="464" y="34" width="164" height="86" stroke="#F4F0E8" strokeOpacity="0.2" fill="#141414" />
          <text x="476" y="55" fill="#C6A15B" fontSize="8" letterSpacing="1.5" fontFamily="Inter, sans-serif">ADMIN REVIEW</text>
          <text x="476" y="76" fill="#F4F0E8" fontSize="12" fontFamily="Georgia, serif">Enquiry Queue</text>
          <text x="476" y="96" fill="#A7A29A" fontSize="9" fontFamily="Inter, sans-serif">FastAPI · SQLite</text>
          <text x="476" y="110" fill="#A7A29A" fontSize="9" fontFamily="Inter, sans-serif">Follow-up tracking</text>

          <line x1="12" y1="142" x2="628" y2="142" stroke="#F4F0E8" strokeOpacity="0.08" />
          <text x="12" y="156" fill="#A7A29A" fontSize="8.5" fontFamily="Inter, sans-serif">
            Replaces ad-hoc messaging with dignified digital education and structured client enquiry handling
          </text>
        </svg>
      )}
    </div>
  );
}
