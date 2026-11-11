🌐 Live Website: https://mindler.netlify.app
# MindWell – AI-Powered Mental Wellness & Yoga Companion

**MindWell** is a modern, responsive, production-quality mental health and somatic yoga companion website built with React, TypeScript, Tailwind CSS, Framer Motion, Recharts, and Lucide Icons under a custom **Dark Neon Purple** design system.

Inspired by the editorial elegance and comprehensive structure of mental wellness services (like "Never Alone"), MindWell elevates the concept into an immersive, somatic, and clinical sanctuary.

---

## 🌟 Key Highlights & Features

### 1. Landing Page (`/`)
- **Sticky Glass Navbar**: Translucent glassmorphism (`backdrop-blur-xl`), MindWell glowing lotus/brain logo, navigation links, streak counter (`🔥 12d Streak`), and quick chat launch button.
- **Hero Section**:
  - Editorial headline: *"Mental wellness support that fits in your pocket."*
  - Dual CTAs: *Start Chatting with Maya* & *Explore Yoga Sanctuary*.
  - Instant hero mood check-in buttons (😔 Overwhelmed, 😐 Restless, 🙂 Calm, 😊 Energized).
  - WhatsApp integration pill with end-to-end encryption indicators.
- **Good to Know • Frequently Asked Questions**:
  - Editorial serif typography (`Playfair Display`) paired with crisp sans-serif body.
  - Interactive category tab pills with real-time question counts:
    - **Getting Started** (What is MindWell, Setup, PWA & WhatsApp, AI Screening frameworks GAD-7/PHQ-9, Multilingual support)
    - **Our Care Team** (Credentials, Psychiatrist vs. Psychologist distinctions, Medication & Prescriptions, Matching triage)
    - **Pricing & Booking** (Transparent pricing, Booking walkthrough, 30% Student Concession, Aftercare summaries)
    - **Privacy & Safety** (HIPAA/GDPR zero-knowledge encryption, Emergency protocols)
    - **General** (Differentiation, Founders, 24/7 Contact)
  - Accordion interaction with animated "+" / "−" toggle, neon purple glowing active borders, keyboard navigation, and keyword search.
- **Emergency Crisis Alert Banner**: High-contrast dark amber card with glowing warning icon, direct 988 Lifeline dial button, Crisis Text Line (741741), and clear non-emergency disclaimer.
- **"Still have questions?"** Section with direct AI Chat & support email actions.
- **Comprehensive Footer**: Services list, legal & HIPAA certifications (IAYT, ISO-27001, SOC-2), WhatsApp connect, and copyright lines.

---

### 2. Maya AI Companion (`ChatWidget` & Dedicated `/chat`)
- **Floating Action Button**: Bottom-right glowing neon purple trigger button with pulsing online presence badge.
- **Full Conversational UI**:
  - Right-aligned purple gradient bubbles for user messages.
  - Left-aligned dark surface bubbles with purple accent border for Maya.
  - Real-time typing indicators with 3 pulsing neon dots.
  - Contextual quick-reply chips under bot responses.
  - Simulated voice input toggle with microphone listening animation.
  - Keyword and mood-based triage (detects acute distress to surface 988 hotlines, recommends yoga postures, or guides 4-7-8 breathing).
  - Clean separation for plugging in real LLM APIs (e.g., Google Gemini Flash / Gemini Live).

---

### 3. Yoga Sanctuary (`/yoga`)
- **Top Somatic Progress Strip**: Visual progress bar (*"3 of 7 poses completed today"*), daily goal counter, and active streak badge.
- **Filter & Sort Bar**: Filter by Goal (*Stress Relief, Sleep, Focus, Energy*) and Difficulty (*Beginner, Intermediate, Advanced*).
- **Postures Library**: Sanskrit names (Balasana, Viparita Karani, Vrikshasana, etc.), duration, neurological benefits, and completion toggles.
- **Interactive Guided Session Modal**:
  - Circular SVG countdown timer ring with glowing neon stroke.
  - Real-time ambient pranayama breathing cues (*Inhale 4s -> Hold 2s -> Exhale 6s*) with breathing circle pulses.
  - Next / Previous pose traversal.
  - Celebratory confetti trigger upon pose completion.
- **Pose Detail Modal**: In-depth anatomical benefits, alignment steps, and contraindications.

---

### 4. Personal Wellness Dashboard (`/dashboard`)
- **Sidebar Navigation**: Overview, Mood Tracker, Yoga Progress, Consultations, Chat History, Settings.
- **Top Greeting & Notification Drawer**: Shows user avatar, streak, and wellness score (84/100).
- **Analytics & Visualizations**:
  - **Mood & Nervous System Trend**: Recharts Area chart with neon purple gradient fill across 7-day or 30-day views.
  - **Weekly Yoga Practice**: Recharts Bar chart showing minutes completed per day.
  - **Upcoming Consultation Widget**: Direct button to launch HIPAA Telehealth Mock Room.
  - **Quick Chatbot Card**: Fast access to conversation history.
- **Interactive Mood Logging**: Form with emoji valence selector, emotional tags, and personal reflection note.
- **Consultation Scheduler**: Complete booking modal for Board-Certified Psychiatrists and Psychologists.
- **Settings Sub-View**: Profile info, dark/light theme switch, and HIPAA data export/purge controls.

---

## 💻 Tech Stack
- **Framework**: React 18 + Vite 6 + TypeScript
- **Styling**: Tailwind CSS 3.4 with custom Dark Neon Purple tokens
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Confetti**: Canvas Confetti
- **Routing**: React Router DOM v6
