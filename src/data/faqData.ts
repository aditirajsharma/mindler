import { FAQCategory, FAQItem } from '../types';

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    iconName: 'Sparkles',
    description: 'Onboarding, AI screening frameworks, and device access.',
  },
  {
    id: 'care-team',
    name: 'Our Care Team',
    iconName: 'Users',
    description: 'Specialists, clinical distinctions, and medication triage.',
  },
  {
    id: 'pricing-booking',
    name: 'Pricing & Booking',
    iconName: 'CreditCard',
    description: 'Transparent rates, student concessions, and appointment flow.',
  },
  {
    id: 'privacy-safety',
    name: 'Privacy & Safety',
    iconName: 'ShieldCheck',
    description: 'Zero-knowledge HIPAA/GDPR encryption and emergency safety.',
  },
  {
    id: 'general',
    name: 'General',
    iconName: 'HelpCircle',
    description: 'Mission, founding team, and round-the-clock availability.',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  // Getting Started
  {
    id: 'gs-1',
    categoryId: 'getting-started',
    question: 'What is MindWell and how does it combine AI with somatic care?',
    answer: 'MindWell is a clinical-grade mental wellness sanctuary that bridges cognitive therapeutic dialogue with somatic nervous-system regulation. Through our AI companion Maya and targeted restorative yoga protocols, we address both psychological distress and its physical manifestation in the autonomic nervous system.',
    tags: ['overview', 'somatic', 'maya', 'wellness'],
  },
  {
    id: 'gs-2',
    categoryId: 'getting-started',
    question: 'How do I set up my account and daily wellness routine?',
    answer: 'Getting started takes under two minutes: select your primary goals (stress relief, sleep restoration, focus, or somatic release), complete an optional 60-second baseline assessment, and install MindWell as a lightweight Progressive Web App (PWA) on iOS or Android.',
    tags: ['setup', 'account', 'routine', 'pwa'],
  },
  {
    id: 'gs-3',
    categoryId: 'getting-started',
    question: 'Can I access MindWell and chat with Maya directly via WhatsApp?',
    answer: 'Yes! MindWell offers an encrypted WhatsApp gateway. You can send voice notes or text prompts to our verified business channel to receive immediate somatic grounding exercises, check in on your mood, and synchronize with your personal dashboard.',
    tags: ['whatsapp', 'integration', 'mobile', 'voice'],
  },
  {
    id: 'gs-4',
    categoryId: 'getting-started',
    question: 'How are clinical AI screening frameworks (GAD-7 and PHQ-9) integrated?',
    answer: 'Maya seamlessly references evidence-based clinical instruments including the GAD-7 (General Anxiety Disorder) and PHQ-9 (Patient Health Questionnaire). Scoring occurs conversationally with zero judgment, helping you track nervous system trends over 7-day and 30-day horizons.',
    tags: ['gad-7', 'phq-9', 'clinical', 'screening', 'assessment'],
  },
  {
    id: 'gs-5',
    categoryId: 'getting-started',
    question: 'Does MindWell provide multilingual support?',
    answer: 'Yes. Maya and our guided somatic protocols support over 18 languages, including Spanish, French, German, Hindi, Japanese, and Mandarin, ensuring culturally sensitive emotional resonance.',
    tags: ['languages', 'multilingual', 'accessibility'],
  },

  // Our Care Team
  {
    id: 'ct-1',
    categoryId: 'care-team',
    question: 'What credentials do MindWell affiliated specialists hold?',
    answer: 'Every human clinician in the MindWell network is board-certified, fully licensed, and verified with a minimum of 7 years of post-residency clinical experience. Our yoga therapists hold IAYT (International Association of Yoga Therapists) accreditations.',
    tags: ['credentials', 'doctors', 'certifications', 'licensure'],
  },
  {
    id: 'ct-2',
    categoryId: 'care-team',
    question: 'What is the distinction between Psychiatrists and Psychologists at MindWell?',
    answer: 'Psychiatrists are medical doctors (MD/DO) qualified to evaluate neurochemical factors, prescribe medications, and order laboratory assessments. Psychologists (Ph.D./Psy.D.) specialize in cognitive, behavioral, and somatic psychotherapy techniques without prescribing pharmaceuticals.',
    tags: ['psychiatrist', 'psychologist', 'specialties', 'therapy'],
  },
  {
    id: 'ct-3',
    categoryId: 'care-team',
    question: 'Can I receive prescriptions or medication management through MindWell?',
    answer: 'Yes. When you consult with a MindWell licensed psychiatrist in participating jurisdictions, electronic prescriptions (e-Rx) can be dispatched directly to your designated local pharmacy or convenient digital delivery partners.',
    tags: ['prescriptions', 'medication', 'psychiatry'],
  },
  {
    id: 'ct-4',
    categoryId: 'care-team',
    question: 'How does the algorithmic matching triage pair me with a provider?',
    answer: 'Our intelligent triage matches you based on your clinical evaluation, lived experience preferences, cultural affinity, timezone availability, and specific nervous system trauma modalities (e.g., Somatic Experiencing, EMDR, CBT, or Mindfulness-Based Stress Reduction).',
    tags: ['matching', 'triage', 'personalization'],
  },

  // Pricing & Booking
  {
    id: 'pb-1',
    categoryId: 'pricing-booking',
    question: 'What is MindWell’s pricing model? Are there hidden fees?',
    answer: 'We believe in radical price transparency: AI companion Maya and our restorative somatic yoga library are 100% accessible to every user. Licensed human telehealth consultations are billed flat-rate per 50-minute session ($85 for Psychologists, $140 for Psychiatrists) with no recurring retainer locks.',
    tags: ['pricing', 'rates', 'transparent', 'cost'],
  },
  {
    id: 'pb-2',
    categoryId: 'pricing-booking',
    question: 'How does the consultation booking walkthrough work?',
    answer: 'From your dashboard, tap "Book Consultation", select between psychiatric assessment or psychotherapy, review provider video introductions and real-time calendars, and lock in your session in under 3 clicks with automated calendar invites.',
    tags: ['booking', 'walkthrough', 'calendar'],
  },
  {
    id: 'pb-3',
    categoryId: 'pricing-booking',
    question: 'Is there a student or economic hardship concession available?',
    answer: 'Yes. We offer an automatic 30% student concession across all specialist consultations for verified .edu email holders, as well as a subsidized community care pool supported by our MindWell Foundation endowment.',
    tags: ['discount', 'student', 'concession', 'affordability'],
  },
  {
    id: 'pb-4',
    categoryId: 'pricing-booking',
    question: 'What are Aftercare Clinical Summaries and how do I receive them?',
    answer: 'Within 2 hours of concluding your telehealth consultation, a private, encrypted Aftercare Summary is populated in your patient portal detailing discussed coping strategies, recommended somatic postures, and follow-up checkpoints.',
    tags: ['aftercare', 'summary', 'portal', 'follow-up'],
  },

  // Privacy & Safety
  {
    id: 'ps-1',
    categoryId: 'privacy-safety',
    question: 'How is my conversational and health data secured under HIPAA & GDPR?',
    answer: 'MindWell utilizes zero-knowledge client-side encryption (AES-256 at rest, TLS 1.3 in transit). Your sensitive therapy reflections and chat histories are decoupled from identifying markers and never sold, monetized, or fed into public LLM training corpora.',
    tags: ['hipaa', 'gdpr', 'security', 'encryption', 'privacy'],
  },
  {
    id: 'ps-2',
    categoryId: 'privacy-safety',
    question: 'What emergency protocols are triggered if someone is in acute distress?',
    answer: 'MindWell employs active clinical sentiment safeguards. If language indicative of acute self-harm or psychiatric crisis is detected, Maya immediately prioritizes direct connectivity to the 988 Suicide & Crisis Lifeline, Crisis Text Line (text HOME to 741741), and international emergency registries.',
    tags: ['emergency', 'safety', 'crisis', '988', 'lifeline'],
  },

  // General
  {
    id: 'gen-1',
    categoryId: 'general',
    question: 'How does MindWell differentiate itself from typical meditation apps?',
    answer: 'Unlike generic meditation apps that only provide audio loops, MindWell combines neurobiology, somatic restorative movement (with real-time pacing and biofeedback timer loops), and clinical triage backed by certified clinicians.',
    tags: ['differentiation', 'neurobiology', 'comparison'],
  },
  {
    id: 'gen-2',
    categoryId: 'general',
    question: 'Who founded MindWell and what is the clinical advisory council?',
    answer: 'MindWell was architected by neuroscientists, yoga acharyas, and mental health clinicians united to eliminate the stigma and friction associated with timely psychological support.',
    tags: ['founders', 'mission', 'advisory'],
  },
  {
    id: 'gen-3',
    categoryId: 'general',
    question: 'How do I reach the MindWell concierge support team 24/7?',
    answer: 'You can tap the support action in your dashboard, email concierge@mindwell.care, or message our round-the-clock team on WhatsApp for technical or scheduling assistance.',
    tags: ['contact', 'support', '24-7'],
  },
];

