export interface Task {
  id: string
  title: string
  owner: string
  priority: 'High' | 'Medium' | 'Low'
  deadline: string
  status: 'Todo' | 'In Progress' | 'Done'
}

export interface TimelineItem {
  date: string
  day: string
  events: string[]
}

export interface ActionPlanResult {
  summary: string
  decisions: string[]
  tasks: Task[]
  risks: string[]
  followUps: string[]
  suggestions: string[]
  timeline: TimelineItem[]
}

// ─── Transcripts ────────────────────────────────────────────────────────────

export const TEAM_MEETING_TRANSCRIPT = `[Team Sync — Product & Engineering · Tuesday 10:00 AM]

Sarah (PM): Let's kick off the sprint review. We shipped the new onboarding flow last Thursday — overall positive signal from users so far.

Marcus (Engineering Lead): There's a performance issue on mobile though. Load time is sitting at 4.2 seconds on 3G. That's above our 3-second target and users are dropping off before reaching activation.

Jennifer (Designer): The A/B test results are in — Variant B outperforms Variant A by 23% on activation rate. We have enough statistical significance. We should ship it.

Marcus: I can implement the changes in about 2 days. The diff is small — mostly CSS and lazy-loading adjustments.

Sarah: Perfect. Let's target Monday for the full rollout. Marcus, you own the mobile performance fix?

Marcus: Yes. I'll also need DevOps to update the CDN configuration — it's blocking image optimization and that's probably half the load time issue.

Tom (CTO): One risk I want to flag — we haven't done load testing on the new onboarding at scale. We absolutely need to do that before Monday goes live.

Sarah: Good catch. Jennifer, can you schedule a QA session for Friday and get the right people in the room?

Jennifer: I'll book the conference room right after this call and send invites to QA and the staging team.

Tom: We also need to address the API rate limiting issue. Three enterprise clients hit their ceiling yesterday. That's a direct revenue risk we can't ignore.

Marcus: I can bump the limits as a temporary measure today, but the real fix is re-architecting the API gateway. That's a two-week project minimum.

Sarah: Let's ship the temp fix today and put the architecture work in next sprint's backlog. I'll write a proper RFC for it.

Tom: Agreed. One more thing — the board wants a live product demo next Wednesday at 2 PM.

Sarah: I'll prepare the slide deck and handle the narrative. Marcus, can you set up and own the demo environment?

Marcus: Absolutely. I'll have it production-ready by Tuesday EOD so we have buffer time for dry runs.

Sarah: Great. Priorities this week: API temp fix today, CDN update Friday, QA session Friday, Monday rollout, and Wednesday board demo. Let's sync again Thursday morning.`

export const LECTURE_TRANSCRIPT = `[CS 401 — Advanced Machine Learning · Lecture 12: Transformer Architectures]

Professor Chen: Today's lecture covers the transformer architecture in depth. Learning objectives: understand self-attention mechanisms, positional encoding, and encoder-decoder patterns. This is foundational material for the final project — everything we cover today will appear in your implementations.

The key innovation of transformers over RNNs is parallel token processing via self-attention. RNNs process sequentially and suffer from vanishing gradients over long sequences. Transformers eliminate both problems.

The core attention formula is: Attention(Q, K, V) = softmax(QK^T / √d_k) · V

Student (Aiden): Can you explain why we divide by √d_k specifically?

Professor Chen: Great question — this will be on the exam. As d_k grows large, the dot products grow in magnitude and push the softmax into regions of extremely small gradients, causing training instability. The √d_k scaling factor counteracts this effect. You need to be able to derive this from first principles on Thursday.

Moving to positional encoding. Self-attention has no inherent notion of sequence position — it's permutation invariant by design. We address this by adding sinusoidal encodings directly to the input embeddings: PE(pos, 2i) = sin(pos / 10000^(2i / d_model)). The alternating sin/cos pattern allows the model to learn relative positions.

Assignment due this Friday: implement a single-head attention mechanism from scratch using NumPy only — no PyTorch, no TensorFlow, no autograd. Submit via the course portal before 11:59 PM. Late submissions lose 20% per day, no exceptions.

Next class we cover BERT and GPT architectures and how they adapt the transformer for different pretraining objectives. Required reading before class: Vaswani et al. (2017), "Attention Is All You Need." It's in your course readings folder on the portal.

Professor Chen: Final project teams must be finalized by Monday. Groups of exactly 3 to 4 students — no solo projects, no groups of 5. Project proposals are due in exactly two weeks from today. No extensions will be granted regardless of circumstance.

Student (Maya): Will office hours be available this week given the exam and assignment overlap?

Professor Chen: Yes — Thursday 3 to 5 PM and Friday 10 AM to noon. Email me to reserve a 20-minute slot in advance. Walk-ins during exam week are not guaranteed.`

export const HACKATHON_TRANSCRIPT = `[ActionFlow AI — Hackathon Day 1 Kickoff · Friday 9:00 AM]

Alex (Team Lead): Clock is running. We have exactly 48 hours. Our project: ActionFlow AI — an AI-powered meeting intelligence platform that transforms raw transcripts into structured execution plans instantly. Tagline: "From Conversation to Execution."

Priya (Frontend Engineer): I'll own the entire frontend. Dark theme, Linear-inspired design with a premium SaaS feel — nothing that looks like a template. Three main sections: landing hero, transcript workspace, and a rich results view with cards and tables.

Dev (Full-Stack Engineer): I'll set up the Next.js 15 project, TypeScript, Tailwind configuration, and own the Gemini API integration end-to-end including structured output parsing.

Sam (AI/Prompt Engineer): My focus is prompt engineering — getting reliable, structured extraction from messy real-world transcripts. Meetings, lectures, brainstorming sessions — all three need to work cleanly.

Alex: MVP scope is locked to three things: transcript input, AI extraction, results visualization. Nothing else ships in v1. I'll enforce this.

Priya: I estimate 8 hours for polished UI — hero, workspace, results cards, the Linear-style action table, and a timeline component.

Dev: API integration is about 4 hours. Gemini's structured output mode means I won't need to parse raw text.

Sam: Give me 6 hours to nail reliable extraction across all three transcript types with proper fallback handling.

Alex: That gives us a working demo by Saturday afternoon. Internal checkpoint is Saturday 3 PM. Everyone presents what they have — no hiding blockers.

Dev: Risk flag I need on the table: Gemini API rate limits during the live judge demo could fail us at the worst possible moment.

Sam: Already planned for it. I'll build a complete fallback with pre-computed mock results. The demo will never fail regardless of API status.

Priya: UI is fully decoupled from the data source by design. Mock data or live API — the interface is identical.

Alex: Good. Other risks I'm tracking: scope creep, 48-hour sleep deprivation, and not leaving enough runway for the demo video.

Dev: We also need a landing page and a 2-minute demo video for the submission package.

Alex: I'll personally own the demo video — Saturday night after the checkpoint. Sam, can you write the project description and document the prompt architecture?

Sam: Yes. I'll also create three realistic sample transcripts so judges can actually test the product end-to-end without needing their own meeting recordings.

Alex: Submission deadline is Sunday at 6 PM. We submit by 5 PM — one hour of buffer is non-negotiable. Any questions? Let's build.`

// ─── Mock Results ────────────────────────────────────────────────────────────

export const TEAM_MEETING_RESULT: ActionPlanResult = {
  summary:
    'The Product & Engineering team reviewed sprint performance for the recently shipped onboarding flow. Three critical issues surfaced: mobile load time exceeding the 3-second target at 4.2s on 3G, a statistically-significant A/B test ready for full rollout with 23% activation uplift, and an active API rate limiting crisis affecting three enterprise clients with direct revenue impact. The team also faces a board demo on Wednesday requiring dedicated environment and narrative preparation. Six decisions were made with clear ownership, Monday as the primary rollout target, and a firm dependency on Friday QA.',

  decisions: [
    'Ship A/B Variant B to 100% of users — 23% activation improvement is statistically significant and justified',
    'Marcus leads mobile performance fix targeting sub-3s load time on 3G before Monday rollout',
    'Temporary API rate limit increase ships today as immediate relief for three affected enterprise clients',
    'API gateway re-architecture deferred to next sprint — Sarah to write a formal RFC before planning session',
    'QA session confirmed for Friday — Jennifer owns scheduling, room booking, and attendee coordination',
    'Board product demo confirmed Wednesday 2 PM — slide deck and live demo environment are hard requirements',
  ],

  tasks: [
    {
      id: 'T-001',
      title: 'Apply temporary API rate limit increase for enterprise clients',
      owner: 'Marcus',
      priority: 'High',
      deadline: 'Today',
      status: 'Todo',
    },
    {
      id: 'T-002',
      title: 'Book QA conference room and send invites to QA & staging',
      owner: 'Jennifer',
      priority: 'High',
      deadline: 'Today',
      status: 'Todo',
    },
    {
      id: 'T-003',
      title: 'Coordinate CDN configuration update with DevOps team',
      owner: 'Marcus',
      priority: 'High',
      deadline: 'Friday',
      status: 'Todo',
    },
    {
      id: 'T-004',
      title: 'Run QA session with staging environment full walkthrough',
      owner: 'Jennifer',
      priority: 'High',
      deadline: 'Friday',
      status: 'Todo',
    },
    {
      id: 'T-005',
      title: 'Ship mobile performance fix — target <3s load time on 3G',
      owner: 'Marcus',
      priority: 'High',
      deadline: 'Monday',
      status: 'Todo',
    },
    {
      id: 'T-006',
      title: 'Deploy A/B Variant B to 100% production traffic',
      owner: 'Marcus',
      priority: 'High',
      deadline: 'Monday',
      status: 'Todo',
    },
    {
      id: 'T-007',
      title: 'Prepare board demo slide deck and product narrative',
      owner: 'Sarah',
      priority: 'High',
      deadline: 'Tuesday',
      status: 'Todo',
    },
    {
      id: 'T-008',
      title: 'Set up and validate production-ready demo environment',
      owner: 'Marcus',
      priority: 'Medium',
      deadline: 'Tue EOD',
      status: 'Todo',
    },
    {
      id: 'T-009',
      title: 'Write API gateway re-architecture RFC for next sprint',
      owner: 'Sarah',
      priority: 'Low',
      deadline: 'Next Sprint',
      status: 'Todo',
    },
  ],

  risks: [
    'No load testing completed on the new onboarding flow before Monday rollout — scale vulnerabilities unknown',
    'API rate limiting actively affecting 3 enterprise clients — direct revenue impact if not resolved today',
    'Monday rollout is aggressive given the CDN coordination dependency on DevOps team availability this week',
    'Board demo Wednesday creates executive-level visibility — any rollout regression will be noticed immediately',
  ],

  followUps: [
    'What specific CDN configuration changes are needed and has DevOps confirmed availability before Friday?',
    'What threshold will the temporary API rate limit be set to — is there an infrastructure risk ceiling?',
    'Who from QA is required for Friday\'s session and what specific test scenarios must be covered?',
    'Should Variant B be rolled out gradually (10% → 50% → 100%) or as an immediate full-traffic switch?',
    'Is there a documented rollback plan if Monday\'s performance changes introduce regressions?',
  ],

  suggestions: [
    'Stage the Variant B rollout at 10% → 50% → 100% over 3 days — reduces blast radius before the board demo window',
    'Add real-time monitoring for API rate limit consumption per client — three hitting limits in one day is a signal',
    'Schedule a 30-minute post-rollout check-in Tuesday morning to catch regressions before Wednesday\'s board demo',
    'Draft the API re-architecture RFC this week while the context is fresh — assign Sarah as DRI with a review date',
  ],

  timeline: [
    {
      date: 'Today',
      day: 'Tuesday',
      events: [
        'Apply temporary API rate limit increase (Marcus)',
        'Book QA conference room & send invites (Jennifer)',
      ],
    },
    {
      date: 'Friday',
      day: 'Friday',
      events: [
        'CDN configuration update with DevOps (Marcus)',
        'QA session — full staging environment walkthrough (Jennifer)',
      ],
    },
    {
      date: 'Monday',
      day: 'Monday',
      events: [
        'Mobile performance fix live — <3s target on 3G (Marcus)',
        'A/B Variant B rolled out to 100% production traffic (Marcus)',
      ],
    },
    {
      date: 'Tuesday',
      day: 'Tuesday',
      events: [
        'Demo environment production-ready by EOD (Marcus)',
        'Board deck finalized and rehearsed (Sarah)',
      ],
    },
    {
      date: 'Wednesday',
      day: 'Wednesday',
      events: ['Board product demo — 2:00 PM'],
    },
  ],
}

export const LECTURE_RESULT: ActionPlanResult = {
  summary:
    'Lecture 12 covered the complete transformer architecture including the self-attention mechanism, the √d_k scaling derivation, and sinusoidal positional encoding. Two hard deadlines are now active: a NumPy-only attention implementation due Friday 11:59 PM, and final project team formation due Monday. Thursday\'s exam will include derivation of the attention formula from scratch. Next class covers BERT and GPT with Vaswani et al. (2017) as mandatory pre-reading.',

  decisions: [
    'Thursday exam includes derivation of the attention formula and the √d_k scaling justification from first principles',
    'Assignment: single-head attention forward pass in NumPy only — no ML frameworks — due Friday 11:59 PM',
    'Late penalty is 20% per day with no exceptions stated — submission through course portal only',
    'Final project teams of exactly 3–4 students must be finalized and registered by Monday',
    'Project proposals are due in exactly two weeks — Professor Chen explicitly stated no extensions',
    'Office hours this week: Thursday 3–5 PM, Friday 10 AM–noon — email reservation required, walk-ins not guaranteed',
  ],

  tasks: [
    {
      id: 'T-001',
      title: 'Implement single-head attention (forward pass) in NumPy from scratch',
      owner: 'Students (Individual)',
      priority: 'High',
      deadline: 'Fri 11:59 PM',
      status: 'Todo',
    },
    {
      id: 'T-002',
      title: 'Submit assignment via course portal before deadline',
      owner: 'Students (Individual)',
      priority: 'High',
      deadline: 'Fri 11:59 PM',
      status: 'Todo',
    },
    {
      id: 'T-003',
      title: 'Study attention derivation and √d_k scaling for exam',
      owner: 'Students (Individual)',
      priority: 'High',
      deadline: 'Thursday',
      status: 'Todo',
    },
    {
      id: 'T-004',
      title: 'Read Vaswani et al. (2017) — "Attention Is All You Need"',
      owner: 'Students (Individual)',
      priority: 'High',
      deadline: 'Next Class',
      status: 'Todo',
    },
    {
      id: 'T-005',
      title: 'Form and register final project team (exactly 3–4 students)',
      owner: 'Students (Group)',
      priority: 'High',
      deadline: 'Monday',
      status: 'Todo',
    },
    {
      id: 'T-006',
      title: 'Email Professor Chen to reserve office hours slot',
      owner: 'Students (Individual)',
      priority: 'Medium',
      deadline: 'ASAP',
      status: 'Todo',
    },
    {
      id: 'T-007',
      title: 'Write and submit project proposal with team',
      owner: 'Students (Group)',
      priority: 'Medium',
      deadline: '2 Weeks',
      status: 'Todo',
    },
  ],

  risks: [
    'Exam Thursday and assignment due Friday in the same week creates compounded deadline pressure',
    'NumPy-only constraint is intentionally hard — matrix shape bugs alone can consume 2–3 hours unexpectedly',
    'Students without a team by end of week will struggle to meet Monday\'s group registration deadline',
    'Positional encoding is commonly misunderstood and may appear on the exam beyond the stated attention derivation',
  ],

  followUps: [
    'Does the NumPy implementation require the backward pass or only the forward attention computation?',
    'What is the expected input/output format and grading rubric for the submission?',
    'Are there topic restrictions for final project proposals, or is any ML application acceptable?',
    'Will practice problems or past exam questions be posted to the portal before Thursday\'s exam?',
  ],

  suggestions: [
    'Start the NumPy implementation today — matrix dimensionality debugging routinely takes longer than expected',
    'Form your project team by tomorrow to preserve the full two-week window for a strong proposal',
    'Derive the attention formula by hand three separate times before the exam — recall beats re-reading notes',
    'Cross-reference the sinusoidal PE section in Vaswani et al. with today\'s lecture — it\'s an exam-eligible edge case',
  ],

  timeline: [
    {
      date: 'Thursday',
      day: 'Thursday',
      events: [
        'CS 401 Exam — attention formula derivation and √d_k scaling included',
        'Office Hours: 3:00–5:00 PM (email to reserve slot)',
      ],
    },
    {
      date: 'Friday',
      day: 'Friday',
      events: [
        'NumPy attention assignment due at 11:59 PM via course portal',
        'Office Hours: 10:00 AM–12:00 PM',
      ],
    },
    {
      date: 'Monday',
      day: 'Monday',
      events: ['Final project team finalized — exactly 3–4 students, no exceptions'],
    },
    {
      date: 'Next Class',
      day: 'Next Week',
      events: [
        'Lecture: BERT and GPT Architectures',
        'Pre-reading required: Vaswani et al. (2017)',
      ],
    },
    {
      date: '2 Weeks',
      day: 'Two Weeks Out',
      events: ['Final project proposal due — no extensions granted'],
    },
  ],
}

export const HACKATHON_RESULT: ActionPlanResult = {
  summary:
    'ActionFlow AI hackathon kickoff locked ownership, scope, and timelines across a 48-hour sprint. MVP is strictly bounded to three deliverables: transcript input, AI extraction, and results visualization. Three parallel workstreams total ~18 hours of estimated effort (8h UI, 6h prompts, 4h API) targeting a working internal demo by Saturday 3 PM. A mandatory fallback mechanism was agreed to fully de-risk the live judge demo against any API instability. Final submission is Sunday 5 PM with one hour of buffer before the 6 PM cutoff.',

  decisions: [
    'MVP scope locked to three features only — transcript input, AI extraction, results visualization; no scope additions',
    'Priya owns all frontend UI with a premium Linear-inspired dark design targeting a funded startup aesthetic',
    'Dev owns Next.js 15 architecture and complete Gemini API integration with structured output parsing',
    'Sam owns prompt engineering and mandatory pre-computed fallback mock data (non-negotiable for demo reliability)',
    'Internal demo checkpoint Saturday 3 PM | Final submission Sunday 5 PM with 1-hour buffer before 6 PM cutoff',
    '90-minute focused sprint cadence — mandatory Slack update immediately if anyone is blocked or at risk',
    'Alex owns demo video (Saturday night); Sam owns project description and prompt documentation',
  ],

  tasks: [
    {
      id: 'T-001',
      title: 'Initialize Next.js 15 project with TypeScript and Tailwind',
      owner: 'Dev',
      priority: 'High',
      deadline: 'Day 1 — 2h',
      status: 'In Progress',
    },
    {
      id: 'T-002',
      title: 'Build full frontend — hero, workspace, results, table, timeline',
      owner: 'Priya',
      priority: 'High',
      deadline: 'Day 1 — 8h',
      status: 'In Progress',
    },
    {
      id: 'T-003',
      title: 'Engineer extraction prompts for all 3 transcript types',
      owner: 'Sam',
      priority: 'High',
      deadline: 'Day 1 — 6h',
      status: 'In Progress',
    },
    {
      id: 'T-004',
      title: 'Integrate Gemini API with structured output mode',
      owner: 'Dev',
      priority: 'High',
      deadline: 'Day 1 — 4h',
      status: 'Todo',
    },
    {
      id: 'T-005',
      title: 'Build complete fallback mock data for all 3 transcript types',
      owner: 'Sam',
      priority: 'High',
      deadline: 'Day 1 EOD',
      status: 'Todo',
    },
    {
      id: 'T-006',
      title: 'Run end-to-end integration tests across all transcript types',
      owner: 'Dev + Sam',
      priority: 'High',
      deadline: 'Sat 3 PM',
      status: 'Todo',
    },
    {
      id: 'T-007',
      title: 'Create 3 realistic sample transcripts for judges',
      owner: 'Sam',
      priority: 'Medium',
      deadline: 'Day 2 AM',
      status: 'Todo',
    },
    {
      id: 'T-008',
      title: 'Build landing page with hero, features, and CTA',
      owner: 'Dev + Priya',
      priority: 'Medium',
      deadline: 'Day 2 — 2h',
      status: 'Todo',
    },
    {
      id: 'T-009',
      title: 'Record 2-minute demo video',
      owner: 'Alex',
      priority: 'Medium',
      deadline: 'Sat Night',
      status: 'Todo',
    },
    {
      id: 'T-010',
      title: 'Write project description and prompt documentation',
      owner: 'Sam',
      priority: 'Low',
      deadline: 'Sun AM',
      status: 'Todo',
    },
    {
      id: 'T-011',
      title: 'Final submission to hackathon portal',
      owner: 'Alex',
      priority: 'High',
      deadline: 'Sun 5:00 PM',
      status: 'Todo',
    },
  ],

  risks: [
    'Gemini API rate limits or outages during live judge demo could cause product failure at the critical moment',
    '18 hours of parallel work in 48 hours — any single blocker creates cascade risk across all three workstreams',
    'Scope creep is the most likely failure mode — team must enforce MVP boundary aggressively every sprint',
    'Demo video deferred to Saturday night directly competes with final polish and buffer time',
    'Submission portal access should be verified before Sunday — last-minute portal issues have ended hackathons',
  ],

  followUps: [
    'What are Gemini API rate limits for this tier and should we pre-warm the connection before the live demo?',
    'How is the fallback triggered — automatic on API failure detection, or a manual override toggle for judges?',
    'What are the hackathon judging criteria weights — should we optimize UI craft, AI quality, or originality?',
    'Does the submission require a live deployment URL or is the demo video sufficient for judging?',
  ],

  suggestions: [
    'Build and validate the fallback mock data before integrating the live API — it completely de-risks the demo',
    'Test Gemini with all 3 sample transcript types during Day 1 integration, not just one type',
    'Film the demo video Saturday afternoon during the checkpoint when the product is freshest — not Saturday night',
    'Create a pre-demo checklist: API key valid, fallback toggle tested, all 3 samples load clean, no console errors',
  ],

  timeline: [
    {
      date: 'Day 1',
      day: 'Friday',
      events: [
        'Project setup complete (Dev)',
        'UI development begins — hero & workspace (Priya)',
        'Prompt engineering for all 3 types (Sam)',
        'Gemini API integration (Dev)',
      ],
    },
    {
      date: 'Day 1 EOD',
      day: 'Fri Night',
      events: [
        'Fallback mock data complete for all 3 transcript types (Sam)',
        'Core extraction working end-to-end (Dev + Sam)',
        '4-hour sprint checkpoint — surface blockers',
      ],
    },
    {
      date: 'Day 2',
      day: 'Saturday',
      events: [
        'UI polish — results cards, table, timeline (Priya)',
        'End-to-end integration tests across all types (Dev + Sam)',
        'Landing page build (Dev + Priya)',
      ],
    },
    {
      date: 'Sat 3 PM',
      day: 'Saturday',
      events: ['Internal demo checkpoint — full product walkthrough, all 3 transcript types'],
    },
    {
      date: 'Sat Night',
      day: 'Saturday',
      events: [
        'Demo video recording (Alex)',
        'Final bug fixes and polish',
        'Prompt documentation (Sam)',
      ],
    },
    {
      date: 'Sun 5 PM',
      day: 'Sunday',
      events: ['Final submission to hackathon portal (Alex)', '1-hour buffer before 6 PM cutoff'],
    },
  ],
}

export const SAMPLES = {
  team: {
    label: 'Team Meeting',
    transcript: TEAM_MEETING_TRANSCRIPT,
    result: TEAM_MEETING_RESULT,
  },
  lecture: {
    label: 'Lecture',
    transcript: LECTURE_TRANSCRIPT,
    result: LECTURE_RESULT,
  },
  hackathon: {
    label: 'Hackathon Planning',
    transcript: HACKATHON_TRANSCRIPT,
    result: HACKATHON_RESULT,
  },
}
