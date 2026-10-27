# FairShift — Decent Work Platform

For the official Prompt Wars submission-guide audit, see [`SUBMISSION_AUDIT.md`](./SUBMISSION_AUDIT.md). It separates locally verified requirements from the GitHub, Cloud Run, LinkedIn, and Innovator Dashboard actions that require the submitter's own accounts.

FairShift is a Prompt Wars 2026 × SRM ACM Student Chapter prototype aligned with UN SDG 8. It makes shift work more transparent for workers and more actionable for employers across construction sites and college campuses.

## Requirements map

| Pain point / blind spot | Feature | Screen |
|---|---|---|
| Opaque pay and uncounted overtime | Shift Tracking + Clear Payslips | Worker dashboard |
| Fear of identification | Honest Feedback with group threshold and no worker ID | Worker/Admin dashboard |
| Unreported hazards and delayed escalation | Safety Reporting + status tracker | Worker dashboard / Admin queue |
| Lost career history | Skill Passport with share affordance | Worker dashboard |
| Zero workforce visibility | Admin Dashboard with attendance and volume trends | Employer dashboard |
| Overwork and attrition risk | Fatigue Alerts + transparent quit-risk reasons | Employer dashboard |
| Regional language and limited literacy | Voice & Local controls, icon-first cards | Both interfaces |

## Shift Ribbon

The worker sees one week as a flowing ribbon of hours, pay, rest, and safety moments. The employer sees those ribbons woven into a workforce fabric, where fatigue and unresolved issues gently fray the thread. The metaphor turns abstract workforce health into something human, explainable, and actionable.

## Architecture

The current lightweight prototype keeps the visual shell dependency-free and organizes business rules in `shared/rules.ts`. `src/main.js` owns the interactive seeded demo state, while `src/enhancements.js` adds the Shift Ribbon, feedback privacy threshold, fatigue signals, local-language controls, and Web Speech API fallback. The Node server is Cloud Run-compatible and serves static assets with a non-root user in the container.

```text
index.html + src/styles.css
        ↓
src/main.js + src/enhancements.js  → worker/admin UI state
        ↓
shared/rules.ts                     → typed, testable domain rules
        ↓
server.mjs                          → static Cloud Run listener
```

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
npm test
```

The demo accounts are role selectors rather than real credentials: Worker opens the privacy-first worker interface; Employer opens the admin interface. No production identity data is stored in this prototype.

## Deployment

The intended target is Google Cloud Run, not a frontend-only host:

```bash
gcloud run deploy fairshift --source . --region asia-south1 --allow-unauthenticated
```

The container listens on `PORT` and defaults to `8080` in production. In this sandbox, Cloud Run deployment and a public GitHub URL are not verified; do not claim either until deployed from an authenticated Google Cloud/GitHub environment.

## Testing and security notes

The unit-test file covers pay/overtime, fatigue thresholds, quit-risk reasons, anonymity thresholds, hazard transitions, and language fallback. The demo avoids credentials and keeps feedback anonymous by design: the feedback UI submits an aggregate-only payload and does not attach worker identity. A production backend must add server-side validation, rate limiting, CSP, RBAC, and Secret Manager integration before real worker data is used.

## LinkedIn draft

**The Problem** — Paper registers, spreadsheets, and WhatsApp groups still hide overtime, hazards, worker voice, and career history across employee-intensive workplaces.

**Solution Fit** — FairShift turns those blind spots into clear payslips, safer reporting, honest anonymous feedback, portable skills, fatigue alerts, and explainable workforce signals. One data-driven platform adapts from construction sites to college campuses.

**Your Build** — Built with a responsive editorial UI, lightweight SVG Shift Ribbon, Web Speech API affordances, typed domain rules, seeded worker/admin flows, and a Cloud Run-ready container. Repo: `<public-github-url>.git` · Cloud Run: `<cloud-run-url>`.

#SDG8 #DecentWork #PromptWars2026 #CloudRun #Accessibility #WorkplaceSafety

## Self-audit

- [x] Problem statement and SDG 8 alignment are visible.
- [x] Worker and Employer/Admin UIs are functional.
- [x] Construction and Education sector modes are seeded; Hospital mode is prepared as a bonus extension.
- [x] Eight feature surfaces are represented in the prototype.
- [x] Shift Ribbon is lightweight SVG/CSS, not video.
- [x] No secrets, datasets, node_modules, or build output are committed.
- [x] Dockerfile, `.dockerignore`, `.gitignore`, `.env.example`, tests, and deploy command are included.
- [ ] Public GitHub URL ending in `.git` — requires user-owned GitHub connection.
- [ ] Google Cloud Run deployment — requires user-owned GCP project/authentication.
- [ ] Lighthouse 90+ and real-device low-end verification — requires deployment/device audit.
