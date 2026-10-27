# TripPilot AI — Product Content Style Guide

**Document Version:** 1.0.0  
**Effective Date:** 26 October 2026  
**Audience:** Product Managers, UX Designers, UI Engineers, and Technical Writers  
**Based On:** `docs/CONTENT_AUDIT.md`  
**Status:** Approved Specification — Pending Application Implementation

---

## 1. Purpose & Scope

This Style Guide defines the standards for all user-facing content in **TripPilot AI**, a multimodal travel planning and booking application. It establishes rules for voice, tone, terminology, UI component microcopy, conversational AI interactions, and simulation disclosures.

Every piece of copy in TripPilot AI should empower travelers to discover, evaluate, and book journeys across multiple transit modes with absolute clarity and confidence.

---

## 2. Brand Voice & Editorial Persona

TripPilot AI speaks like an experienced, thoughtful travel concierge who knows local transit systems inside and out. The voice is authoritative yet approachable, efficient yet warm, and grounded in real-world travel realities.

### 2.1 Core Voice Attributes

| Attribute | What It Means | How It Sounds | What to Avoid |
| :--- | :--- | :--- | :--- |
| **Professional yet Friendly** | Respectful, courteous, and polite without being stiff or bureaucratic. | *"Good morning! Where are you heading today?"* | *"Greetings user. Input destination parameters."* |
| **Clear & Conversational** | Written in plain, natural English that anyone can read in seconds. | *"Compare travel times, fares, and connections."* | *"Initiate multi-layered parameter filtration across transit APIs."* |
| **Helpful & Reassuring** | Anticiptates questions, explains connection buffers, and confirms outcomes. | *"We've added a 25-minute buffer so you have plenty of time to transfer between platforms."* | *"Schedule protection flag enabled."* |
| **Concise & Scannable** | Short sentences, bulleted lists, and scannable visual anchors. | *"4h 10m direct · KTM ETS Platinum · City center to city center"* | Walls of unformatted text or bloated introductory paragraphs. |
| **Grounded & Authentic** | Honest about routes, realistic about schedules, and transparent about sandbox simulation. | *"Interactive Demo Sandbox · No real charges will be made to your payment card."* | *"Experience the revolutionary AI miracle of limitless quantum transit."* or *"Zero Real Charges"*. |

### 2.2 Voice in Practice: Before & After

| Context | Before (Legacy / Unpolished) | After (TripPilot Voice) |
| :--- | :--- | :--- |
| **Hero Eyebrow** | `Next-Generation Unified Multimodal Booking Engine` | `AI-Powered Multimodal Travel Across 6 Modes` |
| **Hero Headline** | `One Search. Six Modes. Total Freedom.` | `One Search. Six Modes. Seamless Travel.` |
| **Mode Grid Subhead** | `Choose a mode to access specialized parameters, schedules, and vehicle options.` | `Select a mode to compare carriers, vehicle types, and direct schedules.` |
| **Checkout Step 3** | `Proceed to Sandbox Checkout (RM 70.2)` | `Continue to Payment Gateway (RM 70.20)` |
| **Confirmation Pass** | `Demo Booking Confirmed! A simulated travel voucher has been recorded in your session.` | `Booking Confirmed! Your verified digital travel voucher is ready.` |
| **Cancellation Dialog** | `Confirm Simulated Cancellation. Simulated refund of RM... will be processed.` | `Cancel Reservation. A full refund of RM [Amount] will be credited to your original payment method.` |
| **AI Fallback** | `I am a specialized travel booking & transit AI co-pilot. I can only assist with travel planning...` | `I specialize in transit and travel planning across Malaysia and Singapore. Let me know where you'd like to go!` |

---

## 3. Simulation, Sandbox & Truthful Transparency Framework

TripPilot AI operates as an interactive product demonstration. It features realistic mock schedules, fares, routes, seat assignments, and a fully functional Razorpay sandbox checkout.

### 3.1 The Golden Rule of Simulation
> **Always be truthful about simulation, but never let developer scaffolding degrade the traveler experience.**

Travelers must always understand that no live financial charge will occur and that tickets are simulated vouchers. However, we communicate this through **tasteful badges, dedicated security notes, and clear contextual disclaimers**—not by peppering the word *"simulated"* into every button, headline, and table cell.

### 3.2 Approved vs. Deprecated Sandbox Language

| Do Use (Approved) | Do Not Use (Deprecated) |
| :--- | :--- |
| **Interactive Demo Sandbox** | Prototype / Developer Build |
| **Simulation Mode** | Fake / Dummy / Mock |
| **Test Reservation / Demo Booking** | Fake Booking / Pretend Checkout |
| **Razorpay Test Mode** | Fake Gateway |
| **Digital Boarding Voucher** | Simulated Boarding Voucher |
| **Demonstration Passenger Profile** | Fictional Traveler Scaffolding |
| **Cancel Reservation** | Simulate Cancellation |
| **Refund credited to payment method** | Simulated refund processed |
| **Present digital QR code at gate** | Scan at gate reader (Prototype) |

### 3.3 Standard Disclaimer Components

#### 1. Header / Top-Level Pill
```
Preview Sandbox
```

#### 2. Checkout Modal Disclaimer
```
Interactive Sandbox Mode · No real charges will be debited from your card or bank account.
```

#### 3. Footer Sandbox Notice
```
Demonstration Sandbox
TripPilot AI operates in an interactive demonstration environment. All routes, schedules, seat assignments, and payment transactions are simulated in sandbox mode. No real money or bank accounts are debited.
```

---

## 4. Universal Terminology & Content Lexicon

### 4.1 Traveler vs. Passenger
Use distinct nouns depending on the functional context:
- **Traveler:** Use when referring to planning, counts, account holders, filter controls, or general humans moving through transit.
  - *Example:* `1 Traveler`, `2 Travelers`, `Traveler Profile`, `Frequent Traveler Preferences`.
- **Passenger:** Use when referring to legal tickets, seat assignments, manifests, boarding passes, or checkout details.
  - *Example:* `Passenger Name`, `Full Legal Name (as on ID)`, `Lead Passenger`, `Passenger 1`.
- **Never use:** `Pax`, `Person` (e.g. avoid *"2 Person"*), or `User`.

### 4.2 Transportation Mode Taxonomy
Maintain strict alignment across the navigation bar, search tabs, filter sidebars, comparison tables, and footer.

| Mode Key | Short Navigation Label | Filter / Card Label | Formal Industry Category |
| :--- | :--- | :--- | :--- |
| `flights` | **Flights** | **Commercial Flights** | Scheduled Domestic & Regional Aviation |
| `trains` | **Trains** | **Trains & ETS Rail** | KTM Electric Train Service (ETS) & Intercity Rail |
| `buses` | **Buses** | **Express Buses** | Intercity Executive Motorcoaches |
| `metro` | **Metro** | **Rapid Metro & LRT** | Urban Rapid Transit (LRT, MRT, Monorail) |
| `cabs` | **Cabs** | **Cabs & Taxis** | On-Demand Ride-Hail & Private Chauffeurs |
| `autos` | **Autos** | **Autos & Rickshaws** | First- and Last-Mile Micro-Transit |

### 4.3 Regional Geographic & Hub Naming
TripPilot AI focuses on the West Coast peninsular corridor (Malaysia & Singapore). Use consistent location strings:

| Geographic Location | Full Display Name | Code / Tag |
| :--- | :--- | :--- |
| **KL Sentral** | `Kuala Lumpur — KL Sentral Transit Hub` | `XKL` |
| **KLIA Terminal 1 & 2** | `Kuala Lumpur — KLIA International Airport` | `KUL` |
| **TBS Bus Terminal** | `Kuala Lumpur — TBS Express Terminal` | `TBS` |
| **Mont Kiara** | `Kuala Lumpur — Mont Kiara` | `City` |
| **Penang Butterworth** | `Penang — Butterworth Rail & Ferry Hub` | `BTW` |
| **Penang Airport** | `Penang — Bayan Lepas International Airport` | `PEN` |
| **George Town** | `Penang — George Town Heritage Hub` | `Heritage` |
| **Ipoh Station** | `Ipoh — Heritage Railway Station` | `IPH` |
| **Singapore Changi** | `Singapore — Changi International Airport` | `SIN` |
| **Singapore Woodlands** | `Singapore — Woodlands Train Checkpoint` | `Border` |

### 4.4 Currency, Numbers & Time Conventions
- **Currency:** Use `RM` followed by a space and the amount: `RM 79.00` or `RM 65`. In tables and breakdowns, always include two decimal places: `RM 70.20`.
- **Durations:** Use `h` and `m` without spaces between digits: `4h 10m`, `1h 05m`, `50m` or `50 mins`. Avoid single-letter `m` when alone (e.g., write `50 mins`, not `50m`, to prevent confusion with meters).
- **Time of Day:** Use 12-hour format with uppercase AM/PM and space: `08:30 AM`, `10:00 AM`, `02:25 PM`.
- **Pluralization:** Never use lazy brackets like `Traveler(s)`. Always dynamically pluralize: `1 Traveler` / `2 Travelers`.

---

## 5. Component-Specific Writing Guidelines

### 5.1 Buttons & Call-to-Actions (CTAs)

#### Formula: `[Strong Verb] + [Specific Noun]`
Button text must clearly state what happens when clicked.

| Screen / Action | Avoid | Approved CTA |
| :--- | :--- | :--- |
| Search Hero | `Search` / `Go` | `Search All Modes` |
| Result Card Booking | `Select` / `Proceed` | `Book Ticket →` |
| Trip Planner Booking | `Simulate Trip` | `Book Complete 3-Leg Journey →` |
| Matrix Selection | `Simulate Flight` | `Select Flight Option →` |
| Checkout Step 1 | `Next` | `Continue to Seat & Add-ons →` |
| Checkout Step 2 | `Proceed to Sandbox Checkout` | `Continue to Payment Gateway (RM [Price]) →` |
| Checkout Step 3 | `Submit` / `Click to Pay` | `Pay RM [Price] with Razorpay` |
| Voucher Modal | `Done` | `View in My Bookings Dashboard` |
| Cancellation | `Yes` / `OK` | `Yes, Cancel Reservation` |
| Dismiss Cancellation | `No` | `Keep Reservation` |
| Login Form | `Submit` | `Sign In & Continue Booking →` |
| Signup Form | `Register` | `Create Account & Continue Booking →` |

### 5.2 Form Fields, Labels & Placeholders

1. **Always use explicit, visible labels:** Never rely on placeholder text as a label.
2. **Include helpful formatting hints:** Where input formats matter (e.g. phone numbers or legal names), include format hints below or in the label.
3. **Realistic, localized placeholders:**
   - Legal Name: `e.g. Siti Aminah binti Zulkifli`
   - Email: `alex.vance@example.com`
   - Phone: `+60 12-345 6789`
   - Promo Code: `TRIPPILOT10`
   - Test Card Number: `4111 1111 1111 1111`

### 5.3 Error Messages & Validation States

Error messages must follow the **3-part rule**:
1. **What happened:** State the issue simply without blame.
2. **Why it happened:** Clarify the constraint.
3. **How to fix it:** Give immediate, actionable guidance.

| Error Case | Poor Error Copy | Approved Error Copy |
| :--- | :--- | :--- |
| Missing Email/Password | `Error! Missing fields.` | `Please enter both your email address and password to sign in.` |
| Unregistered Email | `Account does not exist.` | `No account was found with this email address. Please check for typos or create a new account.` |
| Invalid Password | `Wrong password.` | `Incorrect password. If you are using a demo account, enter password123.` |
| Existing Account | `User duplicate.` | `An account with this email already exists. Please sign in instead.` |
| Weak Password | `Password too short.` | `Please create a password with at least 6 characters.` |
| Razorpay Network Drop | `CDN Failed.` | `Unable to connect to the payment gateway. Demo simulation mode has been activated for your transaction.` |

### 5.4 Empty States

Empty states should never leave the traveler stranded. They must contain:
1. **Descriptive Heading:** What is currently absent.
2. **Helpful Context:** Why nothing is shown.
3. **Direct Action:** A button to explore or reset filters.

#### Search Results Empty State
```
Heading: No Journeys Match Your Selected Filters
Body: Try relaxing your maximum price or travel duration limits, or ask TripPilot Co-Pilot to suggest alternative connection hubs.
Action CTA: Reset Filter Sliders
```

#### My Bookings Empty State
```
Heading: No Travel Bookings Found
Body: You don't have any active or past reservations yet. Search and compare routes to book your first multimodal trip.
Action CTA: Search & Book Routes
```

---

## 6. Conversational AI Writing Guidelines (TripPilot Co-Pilot)

The conversational AI assistant is an integral part of the user experience. It must feel like an extension of the UI—not a generic, detached chatbot.

### 6.1 Persona & Communication Rules
- **Name:** Always refer to the assistant as **TripPilot Co-Pilot** or **TripPilot**.
- **Formatting:** Use short paragraphs (1–3 sentences), bold keywords for routes and fares, and clean bulleted lists.
- **Tone:** Direct, encouraging, and informative. Never apologize excessively or repeat disclaimers unnecessarily.

### 6.2 Conversational Scenarios

#### 1. Welcome Greeting
```markdown
👋 Hi! I'm your **TripPilot Travel Co-Pilot**.

I can help you compare routes, plan door-to-door multimodal itineraries, and book tickets across **Flights, High-Speed Rail, Express Coaches, Metro, Cabs, and Auto-Rickshaws**.

Where would you like to travel today?
```

#### 2. Quick Booking Response
```markdown
⚡ **Quick Booking Prepared!**

Here are your trip details:
• **Carrier:** **[Operator]** ([MODE])
• **Route:** **[Origin Hub]** ➔ **[Destination Hub]**
• **Departure:** **[Time]** (Duration: [Duration])
• **Total Fare:** **RM [Price]**
• **Passenger:** **[Active Traveler Name]**

Click **⚡ Quick Book & Pay Now** on the card below to jump straight to Razorpay checkout and confirm your ticket!
```

#### 3. Off-Topic / Out-of-Domain Boundaries
When travelers ask questions unrelated to travel (coding, cooking, news, general trivia), firmly and politely redirect to travel without sounding dismissive:
```markdown
I am your dedicated **travel and transit assistant**. I can only assist with route planning, transit schedules, fares, and ticket reservations across Malaysia and Singapore.

While I don't cover general topics outside travel, I'd be glad to help you with:
• Direct flights or 🚆 KTM ETS trains to **Penang**
• Fastest airport transfers to **KLIA** (KLIA Ekspres vs. Cabs)
• Synchronized **door-to-door multimodal itineraries**
• Quick Bookings with simulated checkout

Where are you planning to travel?
```

#### 4. Dynamic Traveler Personalization Rule
> [!IMPORTANT]
> **Never hardcode static traveler names (like *"Alex Vance"*) into AI responses or Action Cards.**  
> Always resolve the active traveler dynamically:
> - If user is logged in: `[currentUser.name]`
> - If user is a guest: `Guest Traveler (Sign in to reserve)`

---

## 7. Accessibility & Usability Content Checklist

- [ ] **Accessible Icon Labels:** Every icon button (e.g. swap origin/destination, `+` and `-` travelers, close `✕`, delete) has an explicit `title` or `aria-label`.
- [ ] **High-Contrast Text:** Text meets WCAG 2.1 AA contrast standards against backgrounds (minimum 4.5:1 for body copy, 3:1 for large headers).
- [ ] **No All-Caps Sentences:** Restrict all-caps to short badges (`DIRECT`, `FIRST-MILE`) or table headers (`PASSENGER`, `TOTAL FARE`). Never write prose in all-caps.
- [ ] **Plain English:** Avoid corporate Latinates where simpler words exist (*"use"* instead of *"utilize"*, *"change"* instead of *"modify"*, *"get"* instead of *"acquire"*).
- [ ] **Consistent Regional English:** Use consistent Malaysian/British English conventions for transit terms where appropriate (e.g. *Cancelled* with double 'l', *Coach*, *Flyover / Highway*, *Touch 'n Go*).

---

## 8. Quick-Reference Copy Matrix

Use this cheatsheet for quick reference during copywriting and code reviews:

| Location | Don't Say | Do Say |
| :--- | :--- | :--- |
| **Navbar** | `WayfareAI` · `Prototype` | `TripPilot` · `Preview Sandbox` |
| **Search Tab** | `Cabs` · `Autos` · `Trains` | `Cabs & Taxis` · `Autos & Rickshaws` · `Trains & Rail` |
| **Search Counter** | `2 Person` | `2 Travelers` |
| **Filter Sidebar** | `⚡ Ask AI for Cheapest Trip` | `⚡ Ask TripPilot for Lowest Fare` |
| **Result Card** | `#[database_id]` · `Book Now` | `Ref: [Service Code]` · `Book Ticket →` |
| **Planner Tab** | `Door-to-Door Multi-leg` | `Door-to-Door Itinerary (3 Coordinated Legs)` |
| **Leg 2 Badge** | `Main Intercity Spine (Crucial Leg)` | `Leg 2 · Primary Intercity Carrier` |
| **Transfer Box** | `Interchange Station Buffer: 25 minutes for coffee...` | `Station Transfer Buffer: 25 minutes for ticket gates, platform navigation, and refreshment.` |
| **Matrix CTA** | `Simulate ETS Train →` | `Select Train Option →` |
| **Checkout Step 1** | `Fast-Track with Demo Travelers` | `Quick-Fill Demo Profiles` |
| **Checkout Step 2** | `Enter demo promo code (e.g. WAYFARE20)` | `Enter promo code (try: TRIPPILOT10)` |
| **Checkout Step 3** | `Pay RM 70.20 with Razorpay (Zero Real Charges)` | `Pay RM 70.20 with Razorpay (Sandbox Mode)` |
| **Confirmation** | `Demo Booking Confirmed` · `Simulated Voucher` | `Booking Confirmed!` · `Digital Boarding Voucher` |
| **My Bookings** | `My Bookings Dashboard` · `Simulate Cancellation` | `My Trips & Bookings` · `Cancel Reservation` |
| **Profile** | `Demo State Management` · `Reset Demo Data` | `Local Sandbox Data & Cache` · `Reset Sandbox Data` |
| **AI Drawer** | `Wayfare AI Co-Pilot` · `Live NLU` | `TripPilot Co-Pilot` · `Travel AI Active` |
| **Footer** | `Wayfare AI Inc.` · `Simulated Prototype` | `TripPilot AI Technologies Inc.` · `Demonstration Sandbox` |
