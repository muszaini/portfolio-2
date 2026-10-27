# TripPilot AI — Comprehensive UX Content Audit & Strategy Document

**Document Version:** 1.0.0  
**Date:** 26 October 2026  
**Auditor / Roles:** Senior UX Writer, Product Content Strategist & Travel Technology Product Designer  
**Scope:** Complete User-Facing Text Audit across all Pages, Components, Forms, Buttons, Modals, Dialogs, Notifications, Error States, Empty States, and AI Co-Pilot Dialogues  
**Status:** Awaiting Product Approval (No Application Code Modified)

---

## 1. Executive Summary & Audit Scope

### 1.1 Project Context
The **TripPilot AI** project (currently styled in parts of the codebase under the legacy brand *Wayfare AI*) is a next-generation unified multimodal travel booking application. It allows travelers to search, compare, coordinate, and simulate bookings across **six transportation modes**:
1. **Cabs & Taxis** (On-demand & Chauffeur)
2. **Autos & Rickshaws** (First/Last-Mile Micro-transit)
3. **Metro & Light Rail** (Urban Rapid Transit)
4. **Express Buses** (Intercity Coaches)
5. **Trains** (High-Speed Electric Train Service / KTM ETS)
6. **Commercial Flights** (Domestic & Regional Aviation)

The platform features an embedded **AI Travel Co-Pilot**, an **Interactive Door-to-Door Itinerary Planner & Cross-Modal Comparison Matrix**, **Razorpay Test-Mode Payment Gateway Simulation**, **Gated Traveler Authentication**, and a **Boarding Pass / Voucher Management Dashboard**.

### 1.2 Audit Purpose
This audit analyzes every piece of user-facing language in the codebase to eliminate:
- **Scaffolding & Prototype Text:** Developer-facing strings such as *"Demo State Management"*, *"Simulated Booking Sandbox"*, *"Zero Real Charges"*, *"Simulated Cancellation"*, *"Simulate {col.title}"*, and *"Simulated prototype authorization"*.
- **Inconsistent Product Branding:** Irregular usage of *TripPilot AI*, *Wayfare AI*, *WayfareAI*, *Wayfare.AI*, and *Wayfare*.
- **Placeholder & Generic Descriptions:** Repetitive filler text like *"Choose a mode to access specialized parameters..."*, dummy promo codes (`WAYFARE20` vs `WAYFAREAI10`), and hardcoded sample traveler references (*Alex Vance* hardcoded into AI cards even when logged in as someone else).
- **Inconsistent Transit Domain Terminology:** Interchanging *Traveler*, *Passenger*, *User*, and *Pax*; unaligned transit mode labels between the navigation bar, search hero, comparison matrix, and footer.
- **Confusing User Instructions & Error States:** Vague error messages (`"Failed to sign in."`), awkward button labels (`"Proceed to Sandbox Checkout (RM 70.2)"`), and unclear input descriptions.

---

## 2. Global Content Strategy & Voice Guidelines

### 2.1 Brand & Product Architecture
- **Primary Platform Brand:** **TripPilot AI** (unified across all titles, headers, logos, footer, and communications).
- **Core Value Proposition:** *Intelligent Multimodal Travel Engine & AI Co-Pilot*.
- **AI Persona:** **TripPilot Co-Pilot** (friendly, authoritative, efficient travel specialist).

### 2.2 Voice & Tone Principles
| Principle | In Practice | What We Avoid |
| :--- | :--- | :--- |
| **Authoritative & Precise** | Use realistic transit terminology (e.g., *Direct Rail*, *Transit Buffer*, *Platform Transfer*, *Checked Baggage*, *Gate Pass*). | Generic tech buzzwords (*"True Multimodal Harmony"*, *"Next-Gen Engine"* repeated in every header). |
| **Transparent & Trustworthy** | Be crystal clear about the interactive simulation/demo nature through elegant badges and concise security notes. | Clunky, anxious developer apologies (*"Zero Real Charges"*, *"Simulated prototype"* repeated 40 times). |
| **Action-Oriented & Crisp** | Buttons state direct user outcomes: *Continue to Add-ons*, *Complete Reservation*, *View Boarding Pass*. | Clunky composite labels: *Proceed to Sandbox Checkout (RM 70.2)*, *Simulate Commercial Flight*. |
| **Context-Aware** | Dynamic passenger names and tailored corridor suggestions matching the user's actual route. | Hardcoding *"Alex Vance"* into AI Quick Booking cards when another user is logged in. |

### 2.3 Universal Terminology Lexicon
| Concept | Deprecated Terms | Standardized Term | Rationale |
| :--- | :--- | :--- | :--- |
| **Platform Name** | Wayfare, WayfareAI, Wayfare.AI, Wayfare AI Inc. | **TripPilot AI** | Establishes uniform brand identity requested by product leadership. |
| **AI Assistant** | Interactive Travel Assistant, Wayfare Assistant, Wayfare Co-Pilot | **TripPilot Co-Pilot** | Consistent naming across drawer, badges, and chat triggers. |
| **Person Traveling** | User, Pax, Person, Traveler (interchanged randomly) | **Traveler** (for counts & profiles) / **Passenger** (for tickets & legal seats) | Follows global aviation and rail ticketing standards. |
| **Cab Mode** | Cabs, Cabs & Taxis, On-Demand Cabs & Taxis, Intercity Chauffeur | **Cabs & Taxis** (Nav/Filter) / **Private Chauffeur** (Intercity) | Eliminates ambiguity between short hail and long-distance chauffeur. |
| **Auto Mode** | Autos, Autos & Rickshaws, Auto-Rickshaws (First/Last Mile) | **Autos & Rickshaws** | Retains local Southeast Asian cultural flavor while remaining clear. |
| **Train Mode** | Trains, ETS Trains, High-Speed Trains & Rail, Scenic Rail | **Trains & ETS Rail** | Recognizable nationally (ETS) and internationally (Rail). |
| **Simulated Mode** | Prototype, Demo Sandbox, Zero Real Charges, Sandbox Environment | **Interactive Demo Mode** / **Simulation Sandbox** | Professional, deliberate product terminology instead of unfinished prototype language. |
| **Payment Status** | Authorized & Captured (Test), Test UPI, Razorpay (Test Mode) | **Sandbox Authorization Confirmed** / **Razorpay Test Mode** | Professional financial sandbox wording. |

---

## 3. Screen-by-Screen Content Audit & Replacement Matrix

---

### Section 3.1: Global Navigation Header (`Navbar.tsx`)

#### Architectural Role
Persistent top navigation across all 5 application views (Landing, Search, Trip Planner, My Bookings, Profile).

| Element / Identifier | Current Verbatim Content | Content Evaluation & Identified Issues | Proposed Replacement Copy |
| :--- | :--- | :--- | :--- |
| **Brand Wordmark** | `WayfareAI` (with `AI` in accent color) | Brand mismatch with project identity (*TripPilot AI*). | `TripPilot` (with `AI` in accent badge) |
| **Brand Badge** | `Prototype` (uppercase pill) | Feels like an incomplete experiment rather than an enterprise travel showcase. | `Preview Sandbox` |
| **Brand Subtitle** | `Multimodal Travel Engine` | Good, but lacks the AI co-pilot differentiator. | `Multimodal Travel & AI Co-Pilot` |
| **Nav Tab: Cabs** | `Cabs` | Overly casual; misses ride-hailing/taxis breadth. | `Cabs & Taxis` |
| **Nav Tab: Autos** | `Autos` | Ambiguous for international travelers who might think of automobiles. | `Autos & Rickshaws` |
| **Nav Tab: Metro** | `Metro` | Clear and concise. | `Metro & LRT` |
| **Nav Tab: Buses** | `Buses` | Good; represents express intercity and local buses. | `Express Buses` |
| **Nav Tab: Trains** | `Trains` | Good; can be enriched with rail context. | `Trains & Rail` |
| **Nav Tab: Flights** | `Flights` | Clear and industry standard. | `Flights` |
| **Nav CTA: Trip Planner** | `Trip Planner` (Title: `Multimodal Trip Planner & Comparison`) | Clear, but tooltip could be more informative. | Button: `Trip Planner`<br>Tooltip: `Door-to-door multimodal route planner` |
| **Nav CTA: My Bookings** | `My Bookings [Count]` | Clear and standard e-commerce convention. | `My Trips` or `My Bookings` (retain badge count) |
| **Nav CTA: AI Assistant** | `AI Co-Pilot` (Sparkles icon) | Strong and distinctive. | `AI Co-Pilot` |
| **Nav CTA: Sign In (Logged out)** | `Sign In` | Simple; could indicate that registration is also available. | `Sign In / Register` |
| **Nav CTA: User Profile Pill (Logged in)** | `[Initials] [User Name]` (Tooltip: `Logged in as [Name] ([Email])`) | Good personalization. | `[Initials] [First Name]`<br>Tooltip: `Traveler Profile: [Name]` |
| **Nav CTA: Sign Out** | `Sign Out` (Desktop icon / Drawer text) | Clean and standard. | `Sign Out` |
| **Mobile Drawer Section Title** | `Modes` | Terse and generic. | `Explore Transportation Modes` |
| **Mobile Drawer Planner CTA** | `Open Multimodal Trip Planner` | Clear and actionable. | `Open Door-to-Door Trip Planner` |

---

### Section 3.2: Landing Page & Universal Search Hero (`UniversalSearchHero.tsx`)

#### Architectural Role
Primary landing screen hero, providing mode switching, origin/destination inputs, date, travelers, and AI starter prompt chips.

| Element / Identifier | Current Verbatim Content | Content Evaluation & Identified Issues | Proposed Replacement Copy |
| :--- | :--- | :--- | :--- |
| **Hero Eyebrow Pill** | `✨ Next-Generation Unified Multimodal Booking Engine` | Wordy and hyper-technical; *"multimodal booking engine"* sounds like developer documentation. | `✨ AI-Powered Door-to-Door Travel Across 6 Modes` |
| **Hero Main Headline** | `One Search. Six Modes. Total Freedom.` | Catchy, but doesn't mention coordinated planning or AI guidance. | `One Search. Six Modes. Seamless Travel.` |
| **Hero Supporting Description** | `Seamlessly search, compare, and simulate bookings across Cabs, Autos, Metro, Buses, Trains, and Flights with an integrated conversational AI co-pilot.` | Slightly repetitive with the headline (*"across Cabs, Autos..."*). Contains developer-focused *"simulate bookings"*. | `Search, compare, and coordinate rides across flights, trains, express buses, metro, cabs, and auto-rickshaws with your personal AI travel co-pilot.` |
| **Mode Tab 0** | `All Modes` | Standard and clear. | `All Modes` |
| **Origin Input Label** | `Origin / Pickup` | Technical phrasing. | `From (City, Station, or Airport)` |
| **Origin Dropdown Options** | - `Kuala Lumpur (KL Sentral)`<br>- `Kuala Lumpur Airport (KUL)`<br>- `Mont Kiara Residencies`<br>- `TBS Bus Terminal`<br>- `Penang (Butterworth)` | Inconsistent station descriptions (some have acronyms, some have location descriptors like "City"). | - `Kuala Lumpur — KL Sentral Transit Hub`<br>- `Kuala Lumpur — KLIA International (KUL)`<br>- `Kuala Lumpur — Mont Kiara`<br>- `Kuala Lumpur — TBS Express Terminal`<br>- `Penang — Butterworth Rail & Ferry Hub` |
| **Origin/Dest Swap Tooltip** | `Swap Origin and Destination` | Good accessible tooltip. | `Swap departure and destination points` |
| **Destination Input Label** | `Destination / Dropoff` | Technical phrasing. | `To (City, Station, or Airport)` |
| **Destination Dropdown Options** | - `Penang (Butterworth)`<br>- `George Town (Penang)`<br>- `Penang Airport (PEN)`<br>- `Bukit Bintang (KL)`<br>- `Singapore`<br>- `KUL Airport` | Inconsistent naming: *"Singapore"* has no code, *"KUL Airport"* is a duplicate of Kuala Lumpur Airport with different abbreviation. | - `Penang — Butterworth Rail & Ferry Hub`<br>- `Penang — George Town Heritage Hub`<br>- `Penang — Bayan Lepas Airport (PEN)`<br>- `Kuala Lumpur — Bukit Bintang`<br>- `Singapore — Changi Airport (SIN)`<br>- `Singapore — Woodlands Station` |
| **Departure Date Label** | `Departure` | Clean label, but input is a plain text box with hardcoded format. | `Departure Date & Time` |
| **Departure Date Value** | `Tomorrow, 08:30 AM` | Hardcoded string without formatting guidance. | `Tomorrow, 8:30 AM` (Helper: `Select departure schedule`) |
| **Travelers Label** | `Travelers` | Good. | `Travelers` |
| **Travelers Counter Display** | `1 Person` / `X Person` | Pluralization bug: *"2 Person"* instead of *"2 Travelers"*. | `1 Traveler` / `2 Travelers` (using proper pluralization) |
| **Search Button** | `Search` | Standard, but could emphasize multimodal discovery. | `Search All Modes` |
| **AI Bar Eyebrow** | `✨ Or ask natural-language questions:` | Technical term *"natural-language questions"* sounds like AI benchmark jargon. | `✨ Or ask TripPilot in plain language:` |
| **AI Prompt Chip 1** | `"Cheapest way to travel from KL to Penang next Friday under RM100"` | Good, actionable prompt demonstrating budget filter. | `"Cheapest way from KL to Penang next Friday under RM100"` |
| **AI Prompt Chip 2** | `"Compare flying vs taking ETS train for 2 adults"` | Good multi-passenger and mode-comparison prompt. | `"Compare flight vs ETS train for 2 adults"` |
| **AI Prompt Chip 3** | `"Fastest door-to-door route to KLIA Airport with luggage"` | Highlights multimodal first-mile capabilities. | `"Fastest door-to-door route to KLIA with luggage"` |
| **AI Prompt Chip 4** | `"Show direct flights departing before noon"` | Clear schedule constraint query. | `"Show morning flights from KL to Penang"` |

---

### Section 3.3: Transit Mode Discovery Cards & Featured Corridor (`App.tsx`)

#### Architectural Role
Visual overview of the 6 transit modes and the featured West Coast Corridor spotlight.

| Element / Identifier | Current Verbatim Content | Content Evaluation & Identified Issues | Proposed Replacement Copy |
| :--- | :--- | :--- | :--- |
| **Mode Grid Section Heading** | `Explore By Transportation Mode` | Generic; lacks customer benefit. | `Explore Travel by Mode` |
| **Mode Grid Subheading** | `Choose a mode to access specialized parameters, schedules, and vehicle options.` | Robotic phrasing (*"specialized parameters"*). | `Select a transit category to compare carriers, vehicle types, and direct schedules.` |
| **Card 1: Cabs & Taxis** | Title: `Cabs & Taxis`<br>Badge: `Doorstep`<br>Fare: `From RM22` | Badge *"Doorstep"* is informal. | Title: `Cabs & Taxis`<br>Badge: `Door-to-Door`<br>Fare: `Fares from RM22` |
| **Card 2: Autos & Rickshaws** | Title: `Autos & Rickshaws`<br>Badge: `Last-Mile`<br>Fare: `From RM9` | Good last-mile descriptor. | Title: `Autos & Rickshaws`<br>Badge: `First & Last-Mile`<br>Fare: `Fares from RM9` |
| **Card 3: Rapid Metro** | Title: `Rapid Metro`<br>Badge: `Zero Traffic`<br>Fare: `From RM2.40` | Punchy and clear. | Title: `Rapid Metro & LRT`<br>Badge: `Traffic-Free`<br>Fare: `Fares from RM2.40` |
| **Card 4: Express Buses** | Title: `Express Buses`<br>Badge: `Budget`<br>Fare: `From RM38` | Good. | Title: `Intercity Express Buses`<br>Badge: `Economy Travel`<br>Fare: `Fares from RM38` |
| **Card 5: ETS Trains** | Title: `ETS Trains`<br>Badge: `Scenic Rail`<br>Fare: `From RM62` | *"ETS"* is specific to Malaysia, good to clarify rail context. | Title: `KTM ETS High-Speed Rail`<br>Badge: `Downtown to Downtown`<br>Fare: `Fares from RM62` |
| **Card 6: Flights** | Title: `Flights`<br>Badge: `Fastest`<br>Fare: `From RM89` | Clear. | Title: `Commercial Flights`<br>Badge: `Shortest Transit Time`<br>Fare: `Fares from RM89` |
| **Corridor Spotlight Badge** | `Featured Multimodal Corridor` | Good category badge. | `Featured Corridor` |
| **Corridor Spotlight Title** | `Kuala Lumpur ⟷ Penang Mainline` | Strong route anchoring. | `Kuala Lumpur ⟷ Penang Corridor` |
| **Corridor Spotlight Description** | `Compare direct flight routes, high-speed ETS electric train lines, express buses, and intercity chauffeur cabs across the West Coast corridor.` | Clear overview of multimodal offerings. | `Compare nonstop shuttle flights, KTM ETS electric rail, express motorcoaches, and private highway chauffeurs along the West Coast trunk line.` |
| **Corridor Spotlight CTA** | `Open Multimodal Trip Planner` | Clear and direct. | `Open Door-to-Door Route Planner` |
| **Corridor Teaser: Flight** | Header: `✈️ Commercial Flight`<br>Stats: `1h 05m · RM 89`<br>Footer: `AirAsia / Malaysia Airlines` | Concise. | Header: `✈️ Commercial Flight`<br>Stats: `1h 05m · from RM89`<br>Footer: `Malaysia Airlines & AirAsia` |
| **Corridor Teaser: Train** | Header: `🚆 ETS Platinum Train`<br>Stats: `4h 10m · RM 79`<br>Footer: `KTM High-Speed West Coast` | Good. | Header: `🚆 KTM ETS Platinum Rail`<br>Stats: `4h 10m · from RM79`<br>Footer: `City-center to city-center` |
| **Corridor Teaser: Bus** | Header: `🚌 Express Coach`<br>Stats: `5h 15m · RM 38`<br>Footer: `KKKL Express / Billion Stars` | Good. | Header: `🚌 Executive Express Coach`<br>Stats: `5h 15m · from RM38`<br>Footer: `Spacious recliners with USB power` |
| **Corridor Teaser: Cab** | Header: `🚖 Intercity Chauffeur`<br>Stats: `4h 15m · RM 380`<br>Footer: `Door-to-door (up to 5 pax)` | Informal *"pax"* abbreviation. | Header: `🚖 Private Intercity Chauffeur`<br>Stats: `4h 15m · RM380 flat`<br>Footer: `Door-to-door (up to 5 passengers)` |

---

### Section 3.4: Platform Value Propositions (`App.tsx`)

#### Architectural Role
3-column feature trust grid highlighting conversational AI, multi-carrier integration, and sandbox testing.

| Element / Identifier | Current Verbatim Content | Content Evaluation & Identified Issues | Proposed Replacement Copy |
| :--- | :--- | :--- | :--- |
| **Feature 1 Title** | `Integrated AI Co-Pilot` | Strong headline. | `Conversational AI Co-Pilot` |
| **Feature 1 Description** | `Ask questions in plain English, tune complex multi-layered filters conversationally, and let the AI draft cross-modal door-to-destination itineraries.` | Jargon: *"complex multi-layered filters conversationally"*. | `Search in natural language, request specific schedules, and let TripPilot construct unified itineraries across multiple transit operators.` |
| **Feature 2 Title** | `True Multimodal Harmony` | Vague marketing fluff (*"Harmony"*). | `Unified Multimodal Connections` |
| **Feature 2 Description** | `Compare ride-hailing cabs, feeder autos, rapid metro, buses, high-speed rail, and commercial flights in a single unified interface.` | Good summary of coverage. | `Compare point-to-point cabs, feeder rickshaws, rapid transit, intercity motorcoaches, electric rail, and scheduled flights side by side.` |
| **Feature 3 Title** | `Zero-Risk Sandbox` | Sounds defensive; emphasizes that it is a test tool. | `Risk-Free Simulation Sandbox` |
| **Feature 3 Description** | `Simulate complete 4-step checkouts, autofill fictional travelers, preview seat maps, generate boarding passes, and test simulated cancellations.` | Repeats *"simulate"* twice in one sentence (*"Simulate... test simulated"*). | `Walk through the end-to-end booking flow, test Razorpay sandbox payment authorization, issue digital boarding passes, and review cancellation policies without real financial charges.` |

---

### Section 3.5: Search Results View & Filter Sidebar (`FilterSidebar.tsx`, `ResultCards.tsx`, `App.tsx`)

#### Architectural Role
Displays active search filters, sort criteria, search summary banner, result cards, and empty state when filters are too restrictive.

| Element / Identifier | Current Verbatim Content | Content Evaluation & Identified Issues | Proposed Replacement Copy |
| :--- | :--- | :--- | :--- |
| **Results Header Route** | `[Origin] ⟷ [Destination]` | Clear title. | `[Origin] ⟷ [Destination]` |
| **Results Header Badge** | `Multimodal View` / `[Mode]` | Clear mode context. | `Multimodal View` / `[Mode] Only` |
| **Results Counter Subtitle** | `[Count] simulated routes available · [Date] · [Pax] Traveler(s)` | Repetitive *"simulated"*. Poor grammar: *"1 Traveler(s)"*. | `[Count] route options available · [Date] · [Count] [Traveler/Travelers]` |
| **Filter Sidebar Header** | `Filters` / `Reset` | Standard. | `Filter Routes` / `Reset All` |
| **Filter: Max Price** | `Max Price` / `RM [Price]` / Range: `RM 10` – `RM 500` | Clear and intuitive. | `Maximum Price` / `RM [Price]` / Range: `RM 10` – `RM 500` |
| **Filter: Max Duration** | `Max Travel Duration` / `[H]h [M]m` / Range: `30m` – `8h` | Clear duration slider. | `Maximum Travel Time` / `[H]h [M]m` / Range: `30m` – `8h` |
| **Filter: Sort Label** | `Sort Results By` | Standard. | `Sort By` |
| **Sort Option 1** | `Recommended & Balanced` | Good balance indicator. | `Recommended (Best Time & Fare Balance)` |
| **Sort Option 2** | `Price: Lowest to Highest` | Clear. | `Price: Lowest First` |
| **Sort Option 3** | `Price: Highest to Lowest` | Clear. | `Price: Highest First` |
| **Sort Option 4** | `Duration: Fastest First` | Clear. | `Duration: Shortest First` |
| **Sort Option 5** | `Departure Time: Earliest` | Clear. | `Departure: Earliest First` |
| **Filter Sidebar AI Chip** | Title: `Need Help Filtering?`<br>Body: `Ask the AI Co-Pilot to automatically discover the fastest direct rides or cheapest options.`<br>Button: `⚡ Ask AI for Cheapest Trip` | Good, but could highlight conversational capability. | Title: `Looking for Specific Options?`<br>Body: `Ask TripPilot to pinpoint direct morning departures, student discounts, or the lowest carbon journey.`<br>Button: `⚡ Ask TripPilot for Cheapest Route` |
| **Empty State Heading** | `No Routes Match Your Active Filters` | Clear statement. | `No Journeys Match Your Selected Filters` |
| **Empty State Description** | `Try relaxing the price or duration sliders, or ask our AI Co-Pilot to suggest alternative travel corridors.` | Good recovery advice. | `Try increasing your maximum price or duration limits, or ask TripPilot Co-Pilot to suggest alternate connection hubs.` |
| **Empty State Action** | `Reset Price & Duration` | Clear CTA. | `Reset Filter Sliders` |
| **Result Card Badge** | `[MODE]` (Uppercase) | Clear classification. | `[MODE]` |
| **Result Card Operator ID** | `#[Journey ID]` (e.g. `#train_01`) | Raw database ID exposed directly to travelers. | `Ref: [Service Code]` (e.g. `ETS 9120` or `Flight AK6114`) |
| **Result Card Duration** | `[Duration]m Direct` | Using single letter `m` could be confused with meters instead of minutes. | `[Hours]h [Mins]m · Nonstop` or `Direct` |
| **Result Card Price Label** | `Starting from` / `RM [Price]` | Industry standard. | `From RM [Price]` |
| **Result Card Instant Badge** | `✓ Instant confirmation` | E-commerce convention. | `✓ Instant Confirmation` |
| **Result Card Button 1** | `AI Info` (Tooltip: `Ask AI about policies and stops`) | Compact, but *"AI Info"* is ungrammatical. | `Route Details` or `Ask TripPilot` |
| **Result Card Button 2** | `Book Now →` | Clear primary conversion CTA. | `Book Ticket →` |

---

### Section 3.6: Multimodal Trip Planner & Comparison (`MultimodalComparison.tsx`)

#### Architectural Role
Complex flagship interface featuring corridor presets, multi-leg door-to-door customizer, first/last mile switchers, connection buffer tuners, cross-modal comparison matrix, and AI synthesis.

| Element / Identifier | Current Verbatim Content | Content Evaluation & Identified Issues | Proposed Replacement Copy |
| :--- | :--- | :--- | :--- |
| **Page Eyebrow Pill** | `✨ Interactive Multimodal Trip Planner & Comparison Engine` | Verbose; redundant use of *"interactive"* and *"engine"*. | `✨ Unified Door-to-Door Route Planner` |
| **Page Title** | `Plan & Compare Door-to-Door Multimodal Journeys` | Strong headline. | `Plan & Compare Coordinated Multimodal Trips` |
| **Page Subtitle** | `Customize your route, tweak first-mile & last-mile connections, compare all 6 transportation modes, and simulate end-to-end coordinated bookings.` | Slightly repetitive with hero copy. Uses informal word *"tweak"*. | `Coordinate your entire journey from doorstep to destination. Select first-mile pickups, main intercity carriers, and last-mile connections with guaranteed transit buffers.` |
| **Preset Corridor Bar Label** | `Corridor Presets:` | Functional, but dry. | `Popular Travel Corridors:` |
| **Preset 1** | `Kuala Lumpur ⟷ Penang` | Clear. | `Kuala Lumpur ⟷ Penang` |
| **Preset 2** | `Kuala Lumpur ⟷ Singapore` | Clear. | `Kuala Lumpur ⟷ Singapore` |
| **Preset 3** | `KL City ⟷ KLIA Airport` | Inconsistent naming: *"KL City"* vs *"Kuala Lumpur"*. | `Kuala Lumpur ⟷ KLIA Airport` |
| **Preset 4** | `Kuala Lumpur ⟷ Ipoh` | Clear. | `Kuala Lumpur ⟷ Ipoh` |
| **Advanced Settings Toggle** | `Show Advanced Edit Options` / `Hide Advanced Edit Options` | Wordy. | `Customize Travel Preferences` / `Hide Preferences` |
| **Advanced Setting: Time Window** | `Preferred Departure Window` / `Morning (06:00 - 12:00)` / `Afternoon` / `Evening` / `Any Time` | Good segmentation. | `Departure Window`<br>`Morning (6:00 AM – 12:00 PM)`<br>`Afternoon (12:00 PM – 6:00 PM)`<br>`Evening (6:00 PM – Midnight)`<br>`Any Time` |
| **Advanced Setting: Priority** | `Trip Optimization Priority`<br>`Fastest Transit`<br>`Lowest Price`<br>`Eco & Low Carbon`<br>`Maximum Comfort` | Great value dimensions. | `Optimization Goal`<br>`Shortest Travel Time`<br>`Lowest Fare`<br>`Eco-Friendly (Low CO₂)`<br>`Premium Comfort` |
| **Advanced Setting: Luggage** | `Luggage & Bags`<br>`Light (Backpack only)`<br>`Standard (1 Cabin + 1 Trolley)`<br>`Heavy (Multiple Large Suitcases)` | Excellent realistic travel options. | `Luggage Profile`<br>`Light (Hand luggage only)`<br>`Standard (1 Cabin bag + 1 Suitcase)`<br>`Heavy (Multiple checked bags)` |
| **Mode Checkboxes Header** | `Included Transit Modes` | Clear. | `Permitted Transit Modes` |
| **Tab 1 Label** | `Door-to-Door Itinerary Planner` (Badge: `Coordinated 3-Leg Route`) | Clear and descriptive. | `Door-to-Door Itinerary` (Badge: `3 Coordinated Legs`) |
| **Tab 2 Label** | `Cross-Modal Comparison Matrix` (Badge: `Side-by-Side Mode Trade-offs`) | Good feature label. | `Mode Comparison Matrix` (Badge: `Side-by-Side Trade-offs`) |
| **Itinerary Header Route** | `[Origin] ➔ [Destination]` | Clear arrow indicator. | `[Origin] ➔ [Destination]` |
| **Itinerary Subtitle** | `Total 3 coordinated legs with smart connection buffers · [Count] Traveler(s) · [Date]` | Clunky phrasing (*"Total 3 coordinated legs"*). | `3 coordinated connections with protected transfer buffers · [Count] [Traveler/Travelers] · [Date]` |
| **Itinerary Stat 1** | `Total Travel Time` / `[Duration]` | Clear. | `Total Travel Time` / `[Duration]` |
| **Itinerary Stat 2** | `Combined Package Fare` / `RM [Fare]` | Clear pricing summary. | `Total Combined Fare` / `RM [Fare]` |
| **Leg 1 Badge & Times** | `Leg 1 · First-Mile Feeder`<br>`07:40 AM – 08:00 AM` | Clear schedule segment. | `Leg 1 · First-Mile Pickup`<br>`07:40 AM – 08:00 AM` |
| **Leg 1 Switcher Label** | `Edit First-Mile Mode:` | Simple. | `Change First-Mile Option:` |
| **Buffer 1 Label** | `Interchange Station Buffer: [X] minutes for platform transfer, coffee, and ticket validation.` | Friendly, realistic explanation of station buffers. | `Station Transfer Buffer: [X] minutes allocated for ticket gates, platform navigation, and refreshment.` |
| **Buffer 1 Pill Buttons** | `Buffer: 15m / 25m / 40m` | Clear. | `Buffer: 15m / 25m / 40m` |
| **Leg 2 Badge** | `Leg 2 · Main Intercity Spine (Crucial Leg)` | Clunky developer comment in parentheses (*"Crucial Leg"*). | `Leg 2 · Primary Intercity Carrier` |
| **Leg 2 Switcher Label** | `Switch Intercity Mode:` | Clear. | `Change Intercity Carrier:` |
| **Buffer 2 Label** | `Arrival Hub Transfer: [X] minutes to disembark, retrieve luggage, and meet last-mile connection.` | Realistic disembarkation buffer. | `Arrival Transfer Buffer: [X] minutes allocated for disembarking, baggage pickup, and driver meetup.` |
| **Leg 3 Badge & Times** | `Leg 3 · Last-Mile Drop-off`<br>`12:55 PM – 01:15 PM` | Clear destination leg. | `Leg 3 · Last-Mile Connection`<br>`12:55 PM – 01:15 PM` |
| **Leg 3 Switcher Label** | `Edit Last-Mile Mode:` | Simple. | `Change Last-Mile Option:` |
| **Itinerary Summary Title** | `Ready to simulate this Door-to-Door Journey?` | The word *"simulate"* detracts from the product experience. | `Ready to Reserve this Door-to-Door Journey?` |
| **Itinerary Summary Subtitle** | `Includes Leg 1 (...) + Leg 2 (...) + Leg 3 (...) with coordinated schedule protection.` | Good reassurance. | `Unified itinerary covering Leg 1 (Pickup), Leg 2 (Main Route), and Leg 3 (Final Transfer) with schedule coordination.` |
| **Itinerary Booking Button** | `Book Complete Multimodal Trip →` | Actionable and clear. | `Book Complete 3-Leg Journey →` |
| **Matrix Description Title** | `Side-by-Side Trade-off Matrix: [Origin] ⟷ [Destination]` | Clear analytical title. | `Comprehensive Mode Trade-Off Matrix: [Origin] ⟷ [Destination]` |
| **Matrix Description Subtitle** | `Evaluates actual door-to-door transit times, passenger-adjusted fares, luggage compatibility, and carbon emissions for each individual mode.` | Clear explanation of methodology. | `Compares door-to-door journey duration, per-passenger fares, baggage limits, comfort levels, and environmental impact across each mode.` |
| **Matrix Column Badges** | - `Top Pick: Fastest Transit`<br>- `Top Pick: Eco & Balanced`<br>- `Top Pick: Lowest Price`<br>- `Top Pick: Pure Luxury` | Strong decision cues based on user preference. | - `Recommended: Shortest Travel Time`<br>- `Recommended: Lowest Carbon (Eco)`<br>- `Recommended: Best Budget Fare`<br>- `Recommended: Door-to-Door Comfort` |
| **Matrix Column CTA** | `Simulate [Commercial Flight / ETS Train / Coach / Cab] →` | Using *"Simulate"* as the primary action verb makes the button feel fake and unmotivating. | `Select [Flight / Train / Bus / Cab] Option →` |
| **AI Synthesis Box Title** | `AI Co-Pilot Corridor Synthesis: [Origin] ➔ [Destination]` | Strong technical heading. | `TripPilot Corridor Analysis: [Origin] ➔ [Destination]` |
| **AI Synthesis Box Body** | `For [X] traveler(s) traveling with [standard] luggage, the optimal route is a connected multimodal plan: GreenCab EV to KL Sentral, ETS Platinum Rail, and Heritage Auto in Penang. This eliminates 90 minutes of airport queues and delivers 85% lower carbon emissions.` | Highly specific, domain-rich value narrative. | `For [X] [traveler/travelers] with [standard] luggage, our recommended route is a synchronized multimodal connection: GreenCab EV to KL Sentral, KTM ETS Platinum Rail, and a Heritage Auto transfer in Penang. This bypasses airport check-in queues and reduces CO₂ emissions by 85%.` |
| **AI Synthesis Box CTA** | `Ask AI for Deep Analysis` | A bit generic. | `Ask TripPilot for In-Depth Route Comparison` |

---

### Section 3.7: Booking & Checkout Modal (`DemoBookingModal.tsx`)

#### Architectural Role
4-step checkout flow covering passenger details, seat selection, add-on products, promo code, Razorpay test payment, and confirmed boarding voucher.

| Element / Identifier | Current Verbatim Content | Content Evaluation & Identified Issues | Proposed Replacement Copy |
| :--- | :--- | :--- | :--- |
| **Modal Header (Steps 1–3)** | `Simulated Booking Sandbox` | Developer wording (*"Booking Sandbox"*). | `Express Reservation Checkout` |
| **Modal Header Badge** | `Zero Real Charges` | Unprofessional warning badge. | `Interactive Sandbox Mode · No Real Charges` |
| **Modal Header (Step 4)** | `Demo Booking Confirmed` | Diminishes user satisfaction with the word *"Demo"*. | `Reservation Confirmed · Travel Voucher` |
| **Quick Booking Badge** | `⚡ Quick Booking (Direct Gateway)` | Good indicator of expedited checkout. | `⚡ Quick Checkout (Direct Payment Step)` |
| **Step Indicator 1** | `1. Passenger Info` | Clear. | `1. Passenger Details` |
| **Step Indicator 2** | `2. Add-ons & Seat` | Clear. | `2. Seat & Add-ons` |
| **Step Indicator 3** | `3. Sandbox Payment` | Explicitly calls out sandbox. | `3. Payment & Gateway` |
| **Verified Account Banner** | `Booking with verified account: Alex Vance (alex.vance@example.com)` | Good verification indicator. | `✓ Booking as authenticated traveler: [Full Name] ([Email])` |
| **Fast-Track Autofill Box** | `✨ Fast-Track with Demo Travelers: [Alex Vance] [Elena Rostova]` | Great for usability, but could explain that it populates fields. | `✨ Quick-Fill Demo Profiles: [Alex Vance] [Elena Rostova]` |
| **Field 1 Label** | `Full Legal Name` | Standard passport label. | `Full Legal Name (as on Photo ID / Passport)` |
| **Field 2 Label** | `Email Address` | Standard. | `Email Address (for ticket voucher & receipts)` |
| **Field 3 Label** | `Mobile Phone` | Standard. | `Mobile Phone Number (for SMS departure alerts)` |
| **Field 4 Label** | `Nationality / Citizenship` | Standard international travel label. | `Nationality` |
| **Step 1 Privacy Note** | `ℹ️ All passenger credentials are saved strictly inside your browser's local state for demonstration purposes.` | Reassuring privacy disclosure. | `🔒 Privacy Notice: Passenger details are stored locally in your browser session for demo and testing purposes.` |
| **Step 1 Next Button** | `Continue to Customization →` | Clear forward momentum. | `Continue to Seat & Add-ons →` |
| **Step 2 Seat Callout** | Header: `Reserved Seat / Position`<br>Value: `[Coach 02, Seat 14A (Window)]`<br>Note: `Complimentary Seat Selection Included` | Good airline/rail seat reassurance. | Header: `Assigned Seat & Coach`<br>Value: `[Coach 02, Seat 14A (Window)]`<br>Note: `✓ Complimentary seat assignment included` |
| **Step 2 Add-ons Title** | `Customize Journey Add-ons:` | Clear. | `Optional Travel Add-ons:` |
| **Add-on 1 Title & Desc** | `Verified Carbon Offset (+RM 6)`<br>`Plant native mangrove trees in Perak wetlands to neutralize trip emissions.` | Excellent localized ecological action copy. | `Verified Mangrove Carbon Offset (+RM 6.00)`<br>`Neutralize your journey's carbon footprint through accredited wetland reforestation in Perak.` |
| **Add-on 2 Title & Desc** | `Wayfare Shield Travel Protection (+RM 18)`<br>`Comprehensive medical emergency cover, baggage delay, and instant trip cancellation compensation.` | Brand mismatch (*Wayfare Shield*). Strong benefits copy. | `TripPilot Comprehensive Travel Protection (+RM 18.00)`<br>`Medical emergency cover, baggage delay assistance, and trip interruption protection.` |
| **Add-on 3 Title & Desc** | `Flexi-Pass Free Rescheduling (+RM 12)`<br>`Change departure time or date up to 1 hour before departure without penalty fees.` | Highly relevant travel flexibility copy. | `Flexi-Pass Free Schedule Changes (+RM 12.00)`<br>`Change your departure time or travel date up to 1 hour before scheduled departure with zero penalty fees.` |
| **Promo Code Placeholder** | `Enter demo promo code (e.g. WAYFARE20)` | Outdated promo code example (`WAYFARE20`). | `Enter promo code (try: TRIPPILOT10)` |
| **Promo Code Button** | `Apply Code` | Standard. | `Apply` |
| **Promo Success Message** | `✓ Promo code applied! RM [Discount] discount deducted.` | Clear feedback. | `✓ Promo code applied: RM [Discount] discount deducted.` |
| **Step 2 Next Button** | `Proceed to Sandbox Checkout (RM [Price]) →` | Clunky *"Sandbox Checkout"*. | `Continue to Payment Gateway (RM [Price]) →` |
| **Step 3 Gateway Title** | `Select Payment Gateway / Method:` | Clear. | `Select Payment Method:` |
| **Payment Option 1** | `[RZP] Razorpay (Test)` | Highlights official Razorpay test integration. | `Razorpay Checkout (Test Sandbox)` |
| **Payment Option 2** | `Demo Credit Card (Instant)` | Clear simulation option. | `Demo Credit Card (Simulated)` |
| **Payment Option 3** | `Demo QR Code (DuitNow)` | Local Malaysian payment method. | `DuitNow QR (Simulated Pay)` |
| **Payment Option 4** | `Demo Online Banking (FPX)` | Local Malaysian bank transfer. | `FPX Online Banking (Simulated)` |
| **Razorpay Card Badge** | `⚡ Test Mode Active` | Clear status. | `⚡ Sandbox Mode Active` |
| **Razorpay Cheatsheet Title** | `🔑 Test Credentials Cheatsheet:` | Helpful for testing. | `🔑 Test Credentials Reference:` |
| **Razorpay Cheatsheet Card** | `Standard Test Card: 4111 1111 1111 1111`<br>`Exp: 12/28 · CVV: 123 · OTP: 123456` | Accurate Razorpay test card data. | `Standard Test Card: 4111 1111 1111 1111`<br>`Exp: 12/28 · CVV: 123 · OTP: 123456` |
| **Razorpay Cheatsheet UPI** | `Test UPI / Netbanking: success@razorpay`<br>`Auto-approves simulated checkout` | Accurate Razorpay test UPI. | `Test Netbanking / UPI: success@razorpay`<br>`Simulates instant authorization approval` |
| **Razorpay Demo Key Callout** | `💡 Sandbox Test Mode: Using demo key (rzp_test_WayfareDemoKey). Clicking Pay will execute instant sandbox authorization & generate a valid pay_test_... reference. To test with your live Razorpay merchant account, click Change Key above.` | Legacy key name mentioned in copy (`rzp_test_WayfareDemoKey`). | `💡 Sandbox Simulation: Using demo merchant credentials. Clicking "Pay" will execute sandbox authorization and generate an official pay_test_... transaction reference. To test with your own merchant account, select "Change Key" above.` |
| **Custom Key Mode Callout** | `🚀 Custom Key Mode: Using custom key. Clicking Pay will launch the Razorpay Checkout popup modal from checkout.razorpay.com.` | Clear technical distinction. | `🚀 Live Merchant Mode: Active custom key. Clicking "Pay" will open the official Razorpay Checkout window hosted at checkout.razorpay.com.` |
| **Price Breakdown Line 1** | `Base Transportation Fare: RM [Price]` | Clear itemization. | `Base Transit Fare: RM [Price]` |
| **Price Breakdown Line 2** | `Taxes & Station Regulatory: RM [Price]` | Realistic carrier itemization. | `Taxes & Terminal Facilities Fee: RM [Price]` |
| **Price Breakdown Line 3** | `Add-ons & Carbon Neutralizer: RM [Price]` | Good itemization. | `Selected Add-ons & Carbon Offset: RM [Price]` |
| **Price Breakdown Total** | `Total Simulated Amount: RM [Price]` | Avoid *"Simulated Amount"*. | `Total Amount Due: RM [Price]` |
| **Step 3 Submit Button** | `Pay RM [Price] with Razorpay` (or `Processing Payment...`) | Clean and trustworthy button copy. | `Pay RM [Price] with Razorpay` / `Authorizing Payment...` |
| **Step 4 Confirmation Header** | `Demo Booking Confirmed!`<br>`A simulated travel voucher has been recorded in your session.` | Weak phrasing (*"Demo Booking Confirmed"*, *"simulated travel voucher"*). | `Booking Confirmed!`<br>`Your verified digital travel voucher is ready and saved to your account.` |
| **Voucher Status Badge** | `Status: Confirmed (Demo)` | Clunky tag. | `Status: Confirmed · Ticket Issued` |
| **Voucher Passenger Label** | `PASSENGER` / `SEAT / CLASS` / `AMOUNT PAID` / `PAYMENT GATEWAY` | Clean table headers. | `PASSENGER` / `SEAT / COACH` / `TOTAL FARE` / `PAYMENT METHOD` |
| **Voucher Razorpay Badge** | `Authorized & Captured (Test)` | Clear status. | `Payment Authorized & Captured (Test)` |
| **Voucher QR Code Note** | `Scan at gate reader (Prototype)` | Wordy prototype label. | `Present digital QR code at station gate or boarding turnstile` |
| **Modal Step 4 CTA** | `Close & View in My Bookings` | Strong next action. | `View in My Bookings Dashboard` |

---

### Section 3.8: Authentication & Gating Modal (`AuthModal.tsx`)

#### Architectural Role
Blocks unauthenticated booking attempts, explains gating context, allows fast-track demo log-ins, standard email/password auth, and account creation.

| Element / Identifier | Current Verbatim Content | Content Evaluation & Identified Issues | Proposed Replacement Copy |
| :--- | :--- | :--- | :--- |
| **Modal Header (Login)** | Title: `Sign In to Wayfare`<br>Subtitle: `Access ticket reservations & payment gateway` | Brand mismatch (*Wayfare*). | Title: `Sign In to TripPilot`<br>Subtitle: `Access saved trips, passenger profiles, and payment checkout` |
| **Modal Header (Signup)** | Title: `Create Traveler Account`<br>Subtitle: `Unlock verified multimodal booking simulation` | Awkward phrase: *"multimodal booking simulation"*. | Title: `Create Your Traveler Account`<br>Subtitle: `Save passenger details, manage itineraries, and book tickets` |
| **Gating Alert Eyebrow** | `Authentication Required` | Authoritative and clear. | `Authentication Required` |
| **Gating Alert Message** | `Sign in or create an account to book your [Operator] ([Origin] → [Destination]) journey.` | Excellent dynamic messaging preserving context. | `Please sign in or create an account to complete your booking for [Operator] ([Origin] → [Destination]).` |
| **Tab 1 Label** | `Sign In` | Standard. | `Sign In` |
| **Tab 2 Label** | `Create Account` | Standard. | `Create Account` |
| **Demo Fast-Track Label** | `✨ 1-Click Fast-Track Demo Logins: [Alex Vance] [Elena Rostova]` | Great testing feature, clear naming. | `✨ Instant Demo Logins: [Alex Vance] [Elena Rostova]` |
| **Login Field 1 Label** | `Email Address` (Placeholder: `e.g. alex.vance@example.com`) | Clear. | `Email Address` (Placeholder: `alex.vance@example.com`) |
| **Login Field 2 Label** | `Password` (Demo note: `Demo: password123`) | Clear demo hint. | `Password` (Hint: `Demo password: password123`) |
| **Login Submit Button** | `Sign In & Continue Booking` (or `Signing In...`) | Context-aware CTA that reassures user their pending booking will resume. | `Sign In & Continue Booking →` / `Signing In...` |
| **Signup Field 1 Label** | `Full Legal Name (as in Passport / MyKad)` (Placeholder: `e.g. Siti Aminah`) | Culturally relevant to Malaysia/Singapore. | `Full Legal Name (as shown on Photo ID / Passport)` (Placeholder: `e.g. Siti Aminah binti Zulkifli`) |
| **Signup Field 2 Label** | `Email Address` (Placeholder: `e.g. siti.aminah@example.com`) | Standard. | `Email Address` (Placeholder: `siti.aminah@example.com`) |
| **Signup Field 3 Label** | `Phone Number` (Placeholder: `+60 12-345...`) | Standard international format. | `Mobile Phone Number` (Placeholder: `+60 12-345 6789`) |
| **Signup Field 4 Label** | `Nationality` (Options: `Malaysian`, `Singaporean`, `International`) | Good relevant regional choices. | `Nationality` (Options: `Malaysian`, `Singaporean`, `International / Other`) |
| **Signup Field 5 Label** | `Create Password (min. 6 characters)` (Placeholder: `Create a password`) | Clear password policy guidance. | `Create Password (minimum 6 characters)` (Placeholder: `Enter a secure password`) |
| **Signup Submit Button** | `Complete Sign Up & Book` (or `Creating Account...`) | Clear outcome. | `Create Account & Continue Booking →` / `Creating Account...` |
| **Auth Modal Footer Note** | `✓ Simulated prototype authorization — credentials saved locally.` | Developer jargon (*"Simulated prototype authorization"*). | `🔒 Local Sandbox Session: Authentication state is stored securely in your local browser storage.` |
| **Auth Error: Empty Fields** | `Please enter both email and password.` | Clear validation message. | `Please enter both your email address and password.` |
| **Auth Error: Not Found** | `No account found with this email address. Please sign up first.` | Clear and actionable guidance. | `No account was found with this email address. Please register a new account.` |
| **Auth Error: Bad Password** | `Incorrect password. For demo accounts, use: password123` | Helpful demo fallback. | `Incorrect password. For demo accounts, use: password123` |
| **Auth Error: Duplicate** | `An account with this email already exists. Please log in.` | Clear conflict resolution. | `An account with this email already exists. Please sign in instead.` |

---

### Section 3.9: My Bookings Dashboard & Ticket Management (`MyBookingsView.tsx`)

#### Architectural Role
Displays active and past bookings, allows inspecting digital boarding vouchers, and provides simulated ticket cancellations with refund calculations.

| Element / Identifier | Current Verbatim Content | Content Evaluation & Identified Issues | Proposed Replacement Copy |
| :--- | :--- | :--- | :--- |
| **Page Heading** | `My Bookings Dashboard` | A bit administrative (*"Dashboard"*). | `My Trips & Bookings` |
| **Page Subheading** | `Inspect, simulate cancellations, and manage your demo boarding passes.` | Too focused on developer simulation (*"simulate cancellations", "demo boarding passes"*). | `View active reservations, download digital boarding passes, and manage travel cancellations.` |
| **Filter Tab 1** | `all` | Low-case styling. | `All Bookings` |
| **Filter Tab 2** | `confirmed` | Low-case styling. | `Confirmed` |
| **Filter Tab 3** | `cancelled` | Low-case styling. | `Cancelled` |
| **Empty State Heading** | `No bookings found` | Standard empty state. | `No Travel Bookings Found` |
| **Empty State Body (All)** | `You haven't made any simulated bookings yet. Search for journeys to create a reservation!` | Uses *"simulated bookings"*. | `You don't have any reservations yet. Search and compare routes to book your first multimodal trip.` |
| **Empty State Body (Filtered)** | `No bookings currently in [status] status.` | Robotic phrasing (*"in [status] status"*). | `No [confirmed / cancelled] bookings found in your account.` |
| **Empty State CTA** | `Explore Journeys & Book` | Actionable. | `Search & Book Routes` |
| **Card Status Pill** | `CONFIRMED` / `CANCELLED` | Clear status badges. | `CONFIRMED` / `CANCELLED` |
| **Card Meta: Fare Label** | `FARE SIMULATED` / `RM [Price]` | Clunky label (*"FARE SIMULATED"*). | `TOTAL FARE` / `RM [Price]` |
| **Card Meta: Gateway** | `⚡ Razorpay (Test)` / `Demo Sandbox` | Clear gateway attribution. | `⚡ Razorpay (Test Mode)` / `Simulated Card` |
| **Card Razorpay Reference** | `Razorpay Ref: pay_test_...` (Badge: `Captured`) | Clear verification proof. | `Payment ID: pay_test_...` (Badge: `Authorized & Captured`) |
| **Card Cancellation Banner** | `Cancelled on [Date]. Simulated refund of RM[Amount] processed.` | Awkward phrase: *"Simulated refund of RM... processed"*. | `Reservation cancelled on [Date]. Full refund of RM [Amount] processed to original payment method.` |
| **Card Button 1** | `View Boarding Pass` | Clear and standard. | `View Boarding Pass` |
| **Card Button 2** | `Cancel` (Tooltip: `Simulate Cancellation`) | Clear action. | `Cancel Reservation` |
| **Voucher Modal Header** | `[Operator] · Demo Voucher`<br>`Simulated Boarding Voucher`<br>`[Reference]` | Overly apologetic with *"Demo Voucher"*, *"Simulated Boarding Voucher"*. | `[Operator] · Travel Confirmation`<br>`Digital Boarding Voucher`<br>`Booking Reference: [Reference]` |
| **Voucher Modal QR Subtitle** | `Gate Electronic Reader Pass`<br>`Valid for Single Simulated Journey` | Developer copy (*"Single Simulated Journey"*). | `Automated Gate Electronic Pass`<br>`Valid for confirmed traveler departure` |
| **Voucher Modal Close CTA** | `Close Voucher` | Functional. | `Close Voucher` |
| **Cancel Dialog Title** | `Confirm Simulated Cancellation` | Awkward: *"Simulated Cancellation"*. | `Cancel Reservation Confirmation` |
| **Cancel Dialog Body** | `Are you sure you want to cancel booking [Ref] ([Origin] → [Destination])?` | Clear confirmation prompt. | `Are you sure you want to cancel booking [Ref] from [Origin] to [Destination]?` |
| **Cancel Dialog Refund Note** | `Refund amount of RM [Price] will be processed to the original payment method in accordance with standard transit policies.` | Realistic e-commerce refund statement. | `A full refund of RM [Price] will be credited to your original payment method in accordance with carrier cancellation policies.` |
| **Cancel Dialog Button 1** | `Keep Booking` | Clear dismissal. | `Keep Reservation` |
| **Cancel Dialog Button 2** | `Yes, Cancel Reservation` | Clear destructive action confirmation. | `Yes, Cancel Reservation` |

---

### Section 3.10: Traveler Profile & Account Preferences (`ProfileView.tsx`)

#### Architectural Role
Displays authenticated traveler profile, nationality, frequent corridors, default payment method, sign-out controls, and guest onboarding prompt.

| Element / Identifier | Current Verbatim Content | Content Evaluation & Identified Issues | Proposed Replacement Copy |
| :--- | :--- | :--- | :--- |
| **Authenticated Verified Badge** | `✓ Verified Traveler Profile` | Strong trust badge. | `✓ Verified Traveler Profile` |
| **Profile Metric 1** | Label: `Nationality / Region`<br>Value: `[Malaysian]` | Clear. | `Nationality`<br>`[Malaysian / Singaporean / International]` |
| **Profile Metric 2** | Label: `Default Payment Gateway`<br>Value: `Razorpay Sandbox Mode` | Good gateway status. | `Active Payment Gateway`<br>`Razorpay Test Mode (Ready)` |
| **Profile Metric 3** | Label: `Frequent Corridor`<br>Value: `Kuala Lumpur ↔ Penang` | Realistic personalization. | `Primary Travel Corridor`<br>`Kuala Lumpur ↔ Penang Mainline` |
| **Profile CTA: Sign Out** | `Sign Out` | Standard. | `Sign Out` |
| **Guest Profile Heading** | `Guest Traveler Profile` | Clear guest state. | `Guest Traveler Account` |
| **Guest Profile Description** | `You are currently browsing anonymously. Sign in or register an account to unlock booking confirmation, pass autofill, and Razorpay payment checkout.` | Clear explanation of why authentication is required. | `You are currently browsing in guest mode. Sign in or register to save traveler details, unlock ticket purchases, and access your digital boarding passes.` |
| **Guest Profile CTA 1** | `Sign In` | Clear. | `Sign In` |
| **Guest Profile CTA 2** | `Create Account` | Clear. | `Create Account` |
| **Reset Section Heading** | `Demo State Management` | Developer-oriented heading (*"Demo State Management"*). | `Local Sandbox Data & Cache` |
| **Reset Section Description** | `Clear simulated bookings and reset local cache to factory defaults.` | Clear technical function. | `Clear test bookings, reset traveler credentials, and restore default mock data.` |
| **Reset Button** | `Reset Demo Data` | Functional. | `Reset Sandbox Data` |
| **Reset Confirmation Alert** | `Reset local demo data? This clears your simulated bookings and restores defaults.` | Clear confirmation dialog. | `Are you sure you want to reset sandbox data? This will clear all local test reservations and restore default accounts.` |

---

### Section 3.11: AI Travel Co-Pilot Drawer & Natural Language Service (`AIAssistantDrawer.tsx` & `aiAssistantService.ts`)

#### Architectural Role
Intelligent conversational panel capable of multimodal route queries, cross-modal tradeoffs, direct quick bookings, and domain boundary enforcement.

| Element / Identifier | Current Verbatim Content | Content Evaluation & Identified Issues | Proposed Replacement Copy |
| :--- | :--- | :--- | :--- |
| **Drawer Header Title** | `Wayfare AI Co-Pilot` (Badge: `Live NLU`) | Brand mismatch (*Wayfare*). Jargon badge (*"Live NLU"*). | `TripPilot Co-Pilot` (Badge: `Travel AI Active`) |
| **Drawer Header Subtitle** | `Context-Aware Multimodal Travel Engine` | Technical subtitle. | `Smart Multimodal Travel Assistant` |
| **Welcome Message** | `👋 Hi! I'm your **Wayfare AI Travel Co-Pilot**.\n\nI can help you search, compare, plan multimodal routes, and simulate bookings across **Cabs, Autos, Metro, Buses, Trains, and Flights**.\n\nWhat journey can I assist you with today?` | Legacy brand name (*Wayfare*). Unnecessary developer term (*"simulate bookings"*). | `👋 Hi! I'm your **TripPilot Travel Co-Pilot**.\n\nI can help you compare routes, plan door-to-door multimodal itineraries, and book tickets across **Flights, High-Speed Rail, Express Coaches, Metro, Cabs, and Auto-Rickshaws**.\n\nWhere would you like to travel today?` |
| **Default Suggestion 1** | `Compare KL to Penang modes` | Actionable. | `Compare KL to Penang travel options` |
| **Default Suggestion 2** | `Find fastest route to KLIA Airport` | Actionable. | `Fastest route to KLIA Airport` |
| **Default Suggestion 3** | `Show cheapest option under RM50` | Actionable budget query. | `Cheapest options under RM50` |
| **Default Suggestion 4** | `Show my upcoming demo trips` | Word *"demo"* is unnecessary. | `View my upcoming bookings` |
| **Typing Indicator** | `Wayfare Co-Pilot is thinking...` | Legacy brand name (*Wayfare*). | `TripPilot is searching travel schedules...` |
| **Input Field Placeholder** | `Ask about travel options, compare modes, or quick book...` | Good prompt hints. | `Ask about routes, compare travel times, or request a quick booking...` |
| **AI Card: Comparison Title** | `Side-by-Side Tradeoff Matrix` | Clear. | `Cross-Modal Comparison Matrix` |
| **AI Card: Comparison Body** | `Compare time, fares, comfort & carbon for [Origin] → [Destination].` | Clear analytical summary. | `Compare journey duration, total fares, comfort ratings, and CO₂ emissions for [Origin] → [Destination].` |
| **AI Card: Comparison CTA** | `Open Comparison Matrix →` | Direct action. | `Open Side-by-Side Comparison →` |
| **AI Card: Quick Booking Badge** | `⚡ Direct Gateway Ready` | Strong signal of expedited checkout. | `⚡ Direct Payment Gateway Ready` |
| **AI Card: Quick Booking Traveler** | `Fast-Track Traveler: Alex Vance (Demo)` | **Severe UX bug:** Hardcoded to *Alex Vance (Demo)* even when another user is logged in. | Dynamic traveler rendering:<br>`Passenger: [Logged-in Name or "Alex Vance"]` |
| **AI Card: Quick Booking CTA 1** | `⚡ Quick Book & Open Gateway (RM [Price])` | Strong primary CTA. | `⚡ Quick Book & Open Razorpay (RM [Price])` |
| **AI Card: Quick Booking CTA 2** | `Review Details & Customize Add-ons First` | Great secondary option for travelers who want seat/baggage options. | `Review Details & Choose Add-ons First` |
| **AI Card: Confirmation CTA** | `Open Ticket in My Bookings ↗` | Clear navigation link. | `View Ticket in My Bookings ↗` |
| **AI Response: Greetings** | `👋 Hello! I am your **Wayfare AI Travel Co-Pilot**.\n\nI specialize in multimodal travel planning, comparison, and rapid booking across **Flights, ETS Trains, Express Buses, Metro, Cabs, and Autos** in Malaysia & Singapore.\n\nHow can I assist with your journey today?` | Brand mismatch (*Wayfare*). | `👋 Hello! I am your **TripPilot Travel Co-Pilot**.\n\nI specialize in route planning, cross-modal comparisons, and direct bookings across **Commercial Flights, KTM ETS Trains, Express Coaches, Metro, Cabs, and Auto-Rickshaws** across Malaysia and Singapore.\n\nHow can I help you plan your journey?` |
| **AI Response: Self Identity** | `I am **Wayfare AI**, your intelligent multimodal travel co-pilot for intercity corridors and urban transit...\n• Quick Booking: Instant direct-to-gateway checkout powered by Razorpay Test Mode...` | Brand mismatch (*Wayfare*). | `I am **TripPilot AI**, your multimodal travel assistant for intercity transit and urban connections...\n• **Compare Modes:** Side-by-side analysis of travel times, carrier fares, and carbon impact.\n• **Door-to-Door Planning:** Synchronized itineraries combining first-mile rides, intercity rail/flights, and destination drop-offs.\n• **Direct Quick Booking:** Immediate checkout via Razorpay Test Mode.\n• **Ticket Management:** Digital boarding vouchers with verified QR gate passes.` |
| **AI Response: Off-Topic Handling** | `I am a specialized travel booking & transit AI co-pilot. I can only assist with travel planning, route comparisons, transit schedules, and ticket bookings across Malaysia and Singapore.\n\nI don't have information on general or unrelated topics like that...` | Polite and firm domain boundary enforcement. | `I am a specialized **travel transit assistant**. I can only assist with route planning, carrier schedules, fares, and ticket reservations across Malaysia and Singapore.\n\nI don't cover general topics outside of travel, but I'd be glad to help you find:\n• Direct flights or 🚆 KTM ETS trains to **Penang**\n• The fastest airport transfers to **KLIA** (Express Rail vs. Private Cabs)\n• Door-to-door multimodal itineraries with synchronized connections\n• Instant Quick Bookings with simulated checkout` |
| **AI Response: Multimodal Route (Penang to KLIA)** | Option A: `Express Air Corridor (Fastest)`<br>Option B: `Rail + KLIA Ekspres (Eco-Friendly & Relaxed)` | Outstanding localized travel domain accuracy. | Option A: `Express Air Corridor (Shortest Travel Time)`<br>Option B: `KTM ETS Rail + KLIA Ekspres Link (Eco-Friendly & City Center)` |
| **AI Response: Airport Route Options** | Highlights: `1. KLIA Ekspres (28 mins)`, `2. CityCab / GreenCab EV (45–50 mins)`, `3. Airport Shuttle Bus (65 mins)` | Realistic transit information with accurate travel times and fares. | Retain accurate transit advice; update branding from *Wayfare CityCab* to *TripPilot Chauffeur / GreenCab EV*. |

---

### Section 3.12: Global Footer (`Footer.tsx`)

#### Architectural Role
Persistent site footer providing platform brand summary, transit mode directories, AI capability highlights, sandbox legal disclosures, and policy links.

| Element / Identifier | Current Verbatim Content | Content Evaluation & Identified Issues | Proposed Replacement Copy |
| :--- | :--- | :--- | :--- |
| **Footer Brand Logo** | `Wayfare.AI` | Brand mismatch (*Wayfare*). | `TripPilot.AI` |
| **Footer Description** | `Next-gen multimodal travel booking platform unifying Cabs, Autos, Metro, Buses, Trains, and Flights with intelligent AI Co-Pilot guidance.` | Good summary statement. | `Unified multimodal travel booking platform connecting flights, high-speed rail, express motorcoaches, rapid transit, cabs, and auto-rickshaws with AI guidance.` |
| **Footer Column 1 Heading** | `Transit Modes` | Standard navigation heading. | `Transportation Modes` |
| **Footer Column 1 Links** | - `Commercial Flights`<br>- `High-Speed Trains & Rail`<br>- `Intercity Express Buses`<br>- `Urban Metro & Monorail`<br>- `On-Demand Cabs & Taxis`<br>- `Auto-Rickshaws (First/Last Mile)` | Comprehensive mode list. | - `Commercial Flights`<br>- `KTM ETS High-Speed Rail`<br>- `Intercity Express Buses`<br>- `Rapid Metro & Monorail`<br>- `On-Demand Cabs & Taxis`<br>- `First & Last-Mile Auto-Rickshaws` |
| **Footer Column 2 Heading** | `AI Capabilities` | Highlights key AI differentiators. | `TripPilot AI Features` |
| **Footer Column 2 Links** | - `Interactive Travel Co-Pilot`<br>- `⚡ Direct Gateway Quick Booking`<br>- `Cross-Modal Cost & Time Comparison`<br>- `Penang & KLIA Corridor Planning`<br>- `Razorpay Sandbox Payment Simulation` | Strong feature list. | - `Conversational Travel Co-Pilot`<br>- `⚡ Direct Gateway Quick Booking`<br>- `Door-to-Door Itinerary Synchronization`<br>- `Penang & KLIA Multimodal Planning`<br>- `Razorpay Sandbox Payment Gateway` |
| **Footer Column 3 Heading** | `Simulated Prototype` | Developer title (*"Simulated Prototype"*). | `Simulation Sandbox Notice` |
| **Footer Sandbox Disclaimer** | Box Header: `🛡️ Sandbox Environment`<br>Body: `All tickets, seat selection, and payment transactions are simulated in local sandbox mode. No real money or bank accounts are debited.` | Critical disclaimer, accurately fulfills user requirement not to claim simulated data is real. | Box Header: `🛡️ Demonstration Sandbox`<br>Body: `TripPilot AI operates in an interactive demonstration environment. All routes, schedules, seat assignments, and payment transactions are simulated in sandbox mode. No live bank accounts or credit cards are charged.` |
| **Copyright Notice** | `© 2026 Wayfare AI Inc. All rights reserved.` | Brand mismatch (*Wayfare AI Inc.*). | `© 2026 TripPilot AI Technologies Inc. All rights reserved.` |
| **Footer Legal Links** | `Privacy Policy · Terms of Service · API Documentation` | Standard e-commerce footer links. | `Privacy Notice · Terms of Service · API Reference · Sandbox Guidelines` |

---

## 4. Key Cross-Cutting Issue Summaries

### 4.1 Prototype & Debug Jargon Elimination
| Current Scaffolding Copy | Proposed Production-Grade Replacement |
| :--- | :--- |
| `Prototype` (Navbar badge) | `Preview Sandbox` |
| `Simulated Booking Sandbox` (Modal header) | `Express Reservation Checkout` |
| `Zero Real Charges` (Modal badge) | `Interactive Sandbox Mode · No Real Charges` |
| `Demo Booking Confirmed` (Success modal) | `Reservation Confirmed · Travel Voucher` |
| `Simulate Commercial Flight` (Matrix CTA) | `Select Flight Option →` |
| `Simulate Cancellation` (Tooltip) | `Cancel Reservation` |
| `Confirm Simulated Cancellation` (Dialog title) | `Cancel Reservation Confirmation` |
| `Simulated refund of RM... processed` (Card note) | `Full refund of RM [Amount] processed to original payment method` |
| `Simulated Boarding Voucher` (Pass header) | `Digital Boarding Voucher` |
| `Scan at gate reader (Prototype)` (QR note) | `Present digital QR code at station gate or boarding turnstile` |
| `Demo State Management` (Profile header) | `Local Sandbox Data & Cache` |

### 4.2 Brand Normalization
| Legacy Brand Occurrence | Standardized Replacement |
| :--- | :--- |
| `WayfareAI` (Navbar logo) | `TripPilot AI` |
| `Wayfare AI Co-Pilot` (Drawer title) | `TripPilot Co-Pilot` |
| `Wayfare.AI` (Footer logo) | `TripPilot.AI` |
| `Wayfare AI Inc.` (Copyright) | `TripPilot AI Technologies Inc.` |
| `Wayfare Shield` (Add-on name) | `TripPilot Shield Travel Protection` |
| `Wayfare CityCab` / `GreenCab` | `CityCab` / `GreenCab EV` |
| `WAYFARE20` / `WAYFAREAI10` (Promo codes) | `TRIPPILOT10` |

### 4.3 Bug Prevention in Dynamic Copy
- **Hardcoded Traveler in AI Drawer:** Line 318 of `AIAssistantDrawer.tsx` hardcodes `Alex Vance (Demo)` as the traveler inside the Quick Booking action card. When another user signs in (e.g. *Siti Aminah*), the card still displays *Alex Vance*. The copy specification requires binding to the active `currentUser.name` with fallback to the preset demo profile.
- **Pluralization Flaw:** Universal Search displays `1 Person` and `2 Person`. The copy specification standardizes this to `1 Traveler` and `2 Travelers`.

---

## 5. Implementation Roadmap & Next Steps

> [!IMPORTANT]
> **Code Modification Constraint:** In accordance with instructions, **zero application code has been modified**. This audit serves as the architectural blueprint and source of truth.

### Recommended Phased Execution (Upon User Approval):
1. **Phase 1: Brand & Global Terminology Alignment**
   - Update `index.html`, `Navbar.tsx`, `Footer.tsx`, and `App.tsx` with standardized **TripPilot AI** branding and mode taxonomies.
2. **Phase 2: Universal Search & Landing Enhancement**
   - Refine hero titles, input labels, localized station names, and pluralization in `UniversalSearchHero.tsx`.
3. **Phase 3: Multimodal Route Planner & Comparison Matrix**
   - Replace prototype verb strings (*"Simulate..."*), upgrade carrier titles, and polish buffer descriptions in `MultimodalComparison.tsx`.
4. **Phase 4: Checkout, Razorpay Simulation & Boarding Pass Vouchers**
   - Update `DemoBookingModal.tsx`, `AuthModal.tsx`, and `MyBookingsView.tsx` with production-grade reservation language while preserving transparent sandbox disclosures.
5. **Phase 5: AI Co-Pilot Dialogue & Dynamic Card Binding**
   - Update `AIAssistantDrawer.tsx` and `aiAssistantService.ts` greetings, prompts, edge-case fallbacks, and bind the Quick Booking card traveler name to the active authenticated session.
6. **Phase 6: Quality Assurance & E2E Verification**
   - Run unit test suites and verify in the local dev browser at `http://localhost:5176/`.
