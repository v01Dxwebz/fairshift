# FairShift implementation checklist

## Product and demo outcomes

- [ ] Landing and overview entry explains FairShift, SDG 8, worker/admin paths, and workforce outcomes.
- [ ] Worker dashboard is mobile-first, plain-language, visual-first, regional-language-ready, and voice-friendly.
- [ ] Employer/admin dashboard shows attendance, overtime, safety escalations, feedback, fatigue signals, and worker skills.
- [ ] Shift flow supports check-in, active shift, check-out, worked-hours calculation, and visible overtime.
- [ ] Payslip flow shows base salary, overtime, additions, deductions, total pay, and a simple visual breakdown.
- [ ] Safety flow supports hazard/incident submission and status tracking through acknowledgement and resolution.
- [ ] Skill Passport shows verified skills, credentials, experience, and sector-relevant capabilities.
- [ ] Sector switcher supports Construction and Education demos with tailored terminology and data.
- [ ] Responsive worker/admin layouts work across mobile and desktop breakpoints.
- [ ] Accessibility includes focus states, semantic labels, non-color-only status, and reduced-motion support.
- [ ] Smooth transitions are restrained and do not block basic-phone usability.
- [ ] Reusable tokens and components are documented for later replacement.

## Evaluation coverage

- [ ] Real-world impact: safety and employer visibility are obvious in the demo.
- [ ] SDG 8 relevance: decent work, transparent pay, worker voice, and growth are explicit.
- [ ] Inclusivity: low-literacy copy, voice affordances, language readiness, large touch targets.
- [ ] Technical implementation: clean component structure, shared state, connected worker/admin views.
- [ ] Feasibility/scalability: at least two distinct sectors share the same platform model.

## Delivery evidence

- [ ] Verify the route manifest at `/manus-routes.json`.
- [ ] Verify diagnostics after implementation.
- [ ] Verify the preview renders at desktop and mobile sizes.
- [ ] Save the completed project to a checkpoint.
