import { YogaPose } from '../types';

export const YOGA_POSES: YogaPose[] = [
  {
    id: 'balasana',
    englishName: "Child's Pose",
    sanskritName: 'Balasana',
    goal: 'Stress Relief',
    difficulty: 'Beginner',
    durationMinutes: 3,
    targetChakra: 'Ajna (Third Eye)',
    neurologicalBenefits: 'Down-regulates the sympathetic fight-or-flight nervous response and activates the restorative parasympathetic vagal brake.',
    anatomicalBenefits: [
      'Gently elongates the lumbosacral spine and decompresses discs',
      'Opens hips, thighs, and ankles while relieving tension in the pelvic floor',
      'Calms heart rate through deep diaphragmatic belly expansion against the thighs'
    ],
    instructions: [
      'Kneel on your mat with big toes touching and knees widened hip-distance apart.',
      'Exhale and lower your torso between your thighs, resting your forehead onto the floor or a block.',
      'Extend your arms forward with palms facing down, or drape them alongside your thighs with palms up.',
      'Breathe deeply into the back of your lungs, feeling the ribcage expand laterally with every breath.'
    ],
    contraindications: [
      'Acute knee injury or recent surgery',
      'Late-term pregnancy (keep knees wide without pressing abdomen)',
      'Severe diarrhea or acid reflux'
    ],
    breathingPattern: [
      { phase: 'Inhale', durationSeconds: 4, instruction: 'Expand the posterior lungs and lower back' },
      { phase: 'Hold', durationSeconds: 2, instruction: 'Notice stillness and somatic grounding' },
      { phase: 'Exhale', durationSeconds: 6, instruction: 'Soften the shoulders and sink towards the earth' },
      { phase: 'Rest', durationSeconds: 2, instruction: 'Settle into absolute tranquility' }
    ],
    completed: true,
  },
  {
    id: 'viparita-karani',
    englishName: 'Legs-Up-The-Wall Pose',
    sanskritName: 'Viparita Karani',
    goal: 'Sleep',
    difficulty: 'Beginner',
    durationMinutes: 5,
    targetChakra: 'Vishuddha (Throat)',
    neurologicalBenefits: 'Enhances venous return, cools the circulatory system, reduces evening cortisol spikes, and prepares the brain for slow-wave restorative sleep.',
    anatomicalBenefits: [
      'Relieves edema and fluid accumulation in the feet and lower extremities',
      'Passively stretches the hamstrings and releases tension in the lower back',
      'Gently massages the abdominal organs to assist nocturnal peristalsis'
    ],
    instructions: [
      'Sit sideways next to an empty wall with your hip as close to the skirting board as comfortable.',
      'In a smooth pivot, swing your legs vertically up the wall as you lower your shoulders and head to the mat.',
      'Rest your pelvis on a folded bolster or blanket if needed for lower back ease.',
      'Place one hand over your heart and one hand over your navel, closing your eyes.'
    ],
    contraindications: [
      'Uncontrolled glaucoma or detached retina',
      'Severe neck or cervical spine instability',
      'Advanced congestive heart conditions without physician clearance'
    ],
    breathingPattern: [
      { phase: 'Inhale', durationSeconds: 4, instruction: 'Draw soothing vitality into the chest' },
      { phase: 'Hold', durationSeconds: 2, instruction: 'Permeate cellular relaxation' },
      { phase: 'Exhale', durationSeconds: 6, instruction: 'Release all daily cognitive residue' },
      { phase: 'Rest', durationSeconds: 2, instruction: 'Melt deeply into the support beneath you' }
    ],
    completed: true,
  },
  {
    id: 'vrikshasana',
    englishName: 'Tree Pose',
    sanskritName: 'Vrikshasana',
    goal: 'Focus',
    difficulty: 'Intermediate',
    durationMinutes: 3,
    targetChakra: 'Muladhara (Root)',
    neurologicalBenefits: 'Builds vestibular balance, enhances neuroplastic proprioception, and engages cerebellar neural circuits for acute present-moment focus.',
    anatomicalBenefits: [
      'Strengthens calves, ankles, and stabilizes the deep pelvic stabilizer muscles',
      'Improves posture and core stabilizer coordination',
      'Facilitates hip abduction and promotes symmetry across the left and right body halves'
    ],
    instructions: [
      'Begin in Mountain Pose (Tadasana), rooting firmly through the sole of your left foot.',
      'Bend your right knee and place the sole of your right foot against your inner left calf or inner thigh (never on the knee).',
      'Fix your gaze (Drishti) on an unmoving focal point at eye level.',
      'Bring hands together at heart center in Anjali Mudra, or sweep them upward like branches toward the sky.'
    ],
    contraindications: [
      'Acute vertigo or balance impairment',
      'Recent ankle sprain or acute knee inflammation'
    ],
    breathingPattern: [
      { phase: 'Inhale', durationSeconds: 4, instruction: 'Lengthen upward from the spine crown' },
      { phase: 'Hold', durationSeconds: 2, instruction: 'Maintain grounded equilibrium' },
      { phase: 'Exhale', durationSeconds: 4, instruction: 'Root into your standing foot with unwavering poise' },
      { phase: 'Rest', durationSeconds: 1, instruction: 'Savor unbroken focus' }
    ],
    completed: true,
  },
  {
    id: 'supta-baddha-konasana',
    englishName: 'Reclining Bound Angle Pose',
    sanskritName: 'Supta Baddha Konasana',
    goal: 'Stress Relief',
    difficulty: 'Beginner',
    durationMinutes: 4,
    targetChakra: 'Svadhisthana (Sacral)',
    neurologicalBenefits: 'Promotes deep emotional release, regulates the sympathetic chain ganglion, and alleviates physiological somatic tension in the psoas.',
    anatomicalBenefits: [
      'Passively opens inner thighs, groin, and pelvic diaphragm',
      'Expands the anterior chest, collarbones, and lung capacity',
      'Soothes menstrual cramping and abdominal discomfort'
    ],
    instructions: [
      'Lie supine on your mat, bringing the soles of your feet together with knees splaying open naturally.',
      'Slide your heels a comfortable distance away from your pelvis.',
      'Place arms out wide at a 45-degree angle with palms facing skyward in receptivity.',
      'Allow gravity to gently open your hips with each slow cycle of breath.'
    ],
    contraindications: [
      'Recent groin, hip, or sacroiliac joint injury without supporting blocks'
    ],
    breathingPattern: [
      { phase: 'Inhale', durationSeconds: 4, instruction: 'Open the heart and ribcage' },
      { phase: 'Hold', durationSeconds: 2, instruction: 'Experience effortless openness' },
      { phase: 'Exhale', durationSeconds: 6, instruction: 'Let hips and jaw surrender heavy tension' },
      { phase: 'Rest', durationSeconds: 2, instruction: 'Rest in pure somatic peace' }
    ],
    completed: false,
  },
  {
    id: 'marjaryasana-bitilasana',
    englishName: 'Cat-Cow Flow',
    sanskritName: 'Marjaryasana-Bitilasana',
    goal: 'Energy',
    difficulty: 'Beginner',
    durationMinutes: 3,
    targetChakra: 'Manipura (Solar Plexus)',
    neurologicalBenefits: 'Synchronizes respiration with spinal articulation, stimulating cerebrospinal fluid circulation and gently awakening alertness.',
    anatomicalBenefits: [
      'Warms and mobilizes the entire vertebral column from cervical to sacral',
      'Strengthens the wrist flexors and shoulder girdle',
      'Provides a gentle massage to internal abdominal digestive organs'
    ],
    instructions: [
      'Start on all fours with wrists directly under shoulders and knees directly beneath hips.',
      'Inhale (Cow Pose): Drop your belly toward the mat, lift your chest and gaze upward.',
      'Exhale (Cat Pose): Draw your navel into your spine, rounding your back upward like an arched cat.',
      'Continue undulating smoothly between these two poses guided by the natural cadence of your breath.'
    ],
    contraindications: [
      'Severe carpometacarpal wrist pain (use forearms or fists instead)',
      'Acute neck strain (keep the neck neutral rather than lifting gaze)'
    ],
    breathingPattern: [
      { phase: 'Inhale', durationSeconds: 4, instruction: 'Dip belly into Cow, expanding heart forward' },
      { phase: 'Hold', durationSeconds: 1, instruction: 'Pause at the peak of the curve' },
      { phase: 'Exhale', durationSeconds: 4, instruction: 'Tuck chin and tailbone, arching like a Cat' },
      { phase: 'Rest', durationSeconds: 1, instruction: 'Prepare for the next flowing wave' }
    ],
    completed: false,
  },
  {
    id: 'setu-bandhasana',
    englishName: 'Bridge Pose',
    sanskritName: 'Setu Bandhasana',
    goal: 'Energy',
    difficulty: 'Intermediate',
    durationMinutes: 3,
    targetChakra: 'Anahata (Heart)',
    neurologicalBenefits: 'Elevates thyroid blood flow, releases fatigue, counteracts prolonged forward slouching, and boosts endorphin release.',
    anatomicalBenefits: [
      'Strengthens glutes, hamstrings, and erector spinae muscles',
      'Opens the chest, neck, and hip flexors',
      'Improves lung elasticity and respiratory volume'
    ],
    instructions: [
      'Lie on your back with knees bent and feet placed flat on the floor, hip-width apart.',
      'Press firmly into your heels and lift your pelvis toward the ceiling.',
      'Interlace fingers beneath your sacrum and draw your shoulder blades closer together.',
      'Keep your thighs parallel and hold while sustaining steady, rhythmic breathing.'
    ],
    contraindications: [
      'Recent cervical spine or neck herniation',
      'Advanced stage 3 hypertension'
    ],
    breathingPattern: [
      { phase: 'Inhale', durationSeconds: 4, instruction: 'Lift the sternum higher toward your chin' },
      { phase: 'Hold', durationSeconds: 2, instruction: 'Feel power in the posterior chain' },
      { phase: 'Exhale', durationSeconds: 4, instruction: 'Maintain stability through grounded heels' },
      { phase: 'Rest', durationSeconds: 1, instruction: 'Balance effort and ease' }
    ],
    completed: false,
  },
  {
    id: 'savasana',
    englishName: 'Corpse Pose & Somatic Integration',
    sanskritName: 'Savasana',
    goal: 'Sleep',
    difficulty: 'Beginner',
    durationMinutes: 6,
    targetChakra: 'Sahasrara (Crown)',
    neurologicalBenefits: 'Facilitates synaptic neuro-consolidation, resets autonomic vagal tone, and creates deep cellular restorative equilibrium.',
    anatomicalBenefits: [
      'Allows the entire muscular skeletal framework to release all residual contraction',
      'Lowers resting blood pressure and heart rate',
      'Induces profound mental stillness akin to delta-wave states'
    ],
    instructions: [
      'Lie comfortably flat on your back, letting your feet fall open naturally.',
      'Rest your arms alongside your body with palms open to the ceiling.',
      'Release all muscular control in your forehead, jaw, tongue, and eyelids.',
      'Surrender completely to the earth, observing the subtle rhythm of breath without directing it.'
    ],
    contraindications: [
      'Back discomfort (place a bolster or pillow beneath knees for relief)'
    ],
    breathingPattern: [
      { phase: 'Inhale', durationSeconds: 4, instruction: 'Breathe in serene calm' },
      { phase: 'Hold', durationSeconds: 2, instruction: 'Suspend conscious thought' },
      { phase: 'Exhale', durationSeconds: 6, instruction: 'Exhale all tension into complete stillness' },
      { phase: 'Rest', durationSeconds: 3, instruction: 'Pure awareness' }
    ],
    completed: false,
  }
];

