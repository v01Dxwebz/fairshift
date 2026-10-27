# FairShift component replacement catalog

This catalog is intentionally written as a swap map. Each component has one visual responsibility and should be replaceable without changing the product flows.

| Component | Current role | Replacement seam |
|---|---|---|
| `AppShell` | Page frame, background, global spacing, transition state | Replace shell layout without changing feature panels |
| `BrandMark` | FairShift wordmark and circular shift icon | Replace SVG/wordmark only |
| `TopNav` | Product navigation, role switch, sector switch, language/voice actions | Replace header while preserving callbacks |
| `RoleToggle` | Worker/admin interface switch | Replace segmented control |
| `SectorSwitcher` | Construction/Education/Hospital data selector | Replace tabs, dropdown, or cards |
| `HeroPanel` | Editorial navy hero and SDG 8 positioning | Replace hero composition |
| `MetricPill` | Compact headline metric with label and trend | Replace metric visual |
| `OutcomeCard` | Safety, pay, voice, and growth cards | Replace card treatment |
| `WorkerDashboard` | Worker home information hierarchy | Replace worker layout |
| `ShiftCard` | Check-in, active shift, overtime state | Replace shift control surface |
| `PayBreakdown` | Payslip totals and line items | Replace chart/table presentation |
| `SafetyReportFlow` | Hazard form, voice affordance, status timeline | Replace form or stepper |
| `SkillPassport` | Verified skills and career history | Replace profile/passport presentation |
| `AdminDashboard` | Workforce health overview | Replace dashboard composition |
| `StatGrid` | Attendance, overtime, reports, fatigue summary | Replace KPI layout |
| `WorkforceChart` | Lightweight overtime/attendance visualization | Replace chart implementation |
| `AlertQueue` | Safety/fatigue issues requiring action | Replace queue/table/list |
| `StatusBadge` | Shared state language across flows | Replace chip/badge styling |
| `ProgressRing` | Payslip/shift progress visual | Replace SVG progress treatment |
| `VoiceButton` | Voice-friendly affordance placeholder | Replace with real speech interaction |
| `BottomBar` | Mobile-first worker navigation | Replace mobile nav |
| `Modal` | Pay details and safety confirmation | Replace dialog/sheet implementation |
| `Toast` | Low-friction feedback after actions | Replace notification system |
| `GhostType` | Oversized editorial background type | Replace decorative typography |
| `Reveal` | Viewport entrance transition | Replace motion primitive |
| `TokenLayer` | Colors, spacing, radii, type, motion variables | Replace full visual system |

## Current visual tokens

- `--navy`: #11253d
- `--navy-2`: #173b5f
- `--sky`: #8dd3e8
- `--lime`: #c9e86b
- `--paper`: #f4f5f1
- `--ink`: #142033
- `--muted`: #6d7885
- `--line`: rgba(20, 32, 51, .12)
- `--radius-lg`: 28px
- `--radius-md`: 18px
- `--shadow-soft`: 0 18px 55px rgba(17, 37, 61, .12)

## Motion tokens

- Fast interaction: 160ms
- Standard transition: 240ms
- Panel entrance: 650ms cubic-bezier(.16, 1, .3, 1)
- Mobile hover effects are disabled; tap feedback remains.
- `prefers-reduced-motion` disables transforms and reveal delays.

## Added in the submission-readiness upgrade

| Component | Current role | Replacement seam |
|---|---|---|
| `ShiftRibbon` | Worker weekly flow of hours, pay, rest, and safety moments | Replace SVG/CSS ribbon while keeping segment callbacks |
| `RibbonSegment` | Explainable day-level interaction with voice output | Replace segment shape and tooltip/voice behavior |
| `HonestFeedback` | Anonymous rating with minimum-group privacy threshold | Replace rating control while preserving aggregate-only contract |
| `FatigueGuardrail` | Explicit 12h/day, 8h-rest, 60h/week rule display | Replace threshold visualization while keeping typed rules |
| `HazardStatusTracker` | Reported → Seen → In progress → Resolved progression | Replace stepper/timeline treatment |
| `QuitRiskSignal` | Transparent score with reasons, never a black box | Replace score card while preserving reason list |
| `LanguageSelector` | English, Tamil, Hindi, Telugu UI selector | Replace selector with locale provider |
| `VoiceInput` | Web Speech API recognition with graceful fallback | Replace browser speech adapter |
| `VoiceOutput` | Speech synthesis for ribbon and helper text | Replace TTS adapter |
| `SectorMode` | Construction, Education, and Hospital seeded modes | Replace sector config without changing feature views |
| `SolutionMap` | Visible pain-point-to-feature mapping for evaluators | Replace editorial mapping layout |
| `SecurityHeaders` | CSP, X-Content-Type-Options, Referrer-Policy | Replace server middleware policy layer |
