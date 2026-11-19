# Product Requirement Document (PRD): MindBridge LMS
**Brand:** MindBridge LMS  
**Tagline:** Learn • Manage • Achieve  
**Document Version:** 1.0.0 (Production Engineering & Design Baseline)  
**Status:** Approved for Implementation & UI/UX Handoff  

---

## 1. Executive Summary & Product Vision

### 1.1 Overview
MindBridge LMS is a multi-tenant Learning Management System (LMS) and tuition management platform tailored for educators, academic institutes, and learners. It provides each educational tenant with an independent, customized online academy operating on branded subdomains (`{tenant}.mindbridge.lk`), backed by a centralized super-administrative management core.

### 1.2 Core Business Model & Value Proposition
* **0% Platform Tuition Commission:** 100% of student tuition fees go directly to the tenant/educator. MindBridge monetizes via flat SaaS subscription tiers billed to educational tenants.
* **Sri Lankan Tuition Market Alignment:** Deep offline payment workflow support (commercial bank transfer, counterfoil/slip upload, and WhatsApp coordination), local exam patterns (G.C.E. A/L & O/L), and multilingual academic delivery.
* **Universal Student Experience:** Students utilize a single universal identity across all enrolled institutions with a persistent tenant switcher, while data, payments, and progress remain completely tenant-isolated.

---

## 2. User Roles & Permission Matrix

| Role | Scope & Permissions | Key Workflows |
| :--- | :--- | :--- |
| **Super Admin** | Platform-wide global administrator. Full governance over tenant provisioning, SaaS subscriptions, platform security, and system logs. | Tenant vetting/approval, SaaS plan provisioning, platform golden snapshots, audit log inspection, cross-tenant broadcasts. |
| **Tenant Admin (Institute / Teacher Owner)** | Owner or primary administrative manager of an individual academy subdomain. Full control over institution courses, staff, student enrollment, and financial accounting. | Student enrollment management, manual bank slip review & fee clearance, staff invitations (strict max 2 limit), institution settings. |
| **Course Teacher** | Academic instructor assigned to specific courses within a tenant. | Course curriculum authoring, lesson/video management, assignment grading, manual certificate issuance sign-off, live class coordination. |
| **Secondary Staff** | Operational assistant within a tenant under role-based permission locks. | Support desk management, student roster viewing, attendance, manual payment review (if assigned). Max 2 staff total per tenant. |
| **Student (Learner)** | Universal learner account participating across one or more tuition academies. | Course discovery & storefront enrollment, manual slip upload, video lecture viewing, assignment submission, online examinations, gradebook tracking. |

---

## 3. Confirmed Technical Architecture

The platform architecture is strictly bounded to the following verified technology baseline:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              CONFIRMED TECHNICAL ARCHITECTURE                          │
├─────────────────────────┬──────────────────────────────────────────────────────────────┤
│ Frontend Hosting        │ Vercel (Production Frontend Hosting)                         │
│ Source Control          │ GitHub (Separate Development and Production Branches)        │
│ Identity & Auth         │ Firebase Authentication                                      │
│ Primary Source of Truth │ Supabase PostgreSQL (Multi-tenant RLS by tenant_id)          │
│ Real-Time Layer         │ Cloud Firestore (Approved real-time events, messaging)       │
│ Object Storage          │ Supabase Storage (Encrypted bank slip counterfoils, PDFs)    │
│ Backend Compute / APIs  │ Netlify Functions (Serverless Node.js API endpoints)         │
│ Video Infrastructure    │ YouTube Unlisted Embedded Player                             │
└─────────────────────────┴──────────────────────────────────────────────────────────────┘
```

*Note: UI framework selection (Next.js, Vite/React SPA), CSS methodology, and 2FA provider mechanisms (TOTP, SMS, Email OTP) are open technical implementation decisions to be finalized by the engineering team during sprint planning.*

---

## 4. Key Functional Modules & Business Specifications

### 4.1 Multi-Tenant Subdomain Architecture
* Each tenant is provisioned an isolated digital storefront and academic dashboard: `{subdomain}.mindbridge.lk`.
* Single global student account maintains separate academic records, enrollments, and payment histories per tenant.
* Multi-Academy Tenant Switcher in the global student header enables 1-click context switching without re-authenticating.

### 4.2 Offline-First Manual Payment Verification (No OCR / No Gateways in V1)
* **Student Course Payments:**
  1. Student selects course and views bank account details for direct deposit/transfer.
  2. Student uploads payment proof (JPEG, PNG, or PDF bank counterfoil / online receipt).
  3. Status immediately transitions to `PENDING_REVIEW` (`SCREEN_43` / `SCREEN_35`).
  4. Tenant Admin or assigned Course Teacher opens the **Manual Payment Review Modal** (`SCREEN_238` / `SCREEN_102` / `SCREEN_56` / `SCREEN_54`), inspects image/document, verifies deposited amount against invoice, inputs internal verification notes, and selects **Approve** or **Reject with Reason**.
  5. Upon approval, course access is granted immediately.
* **Tenant SaaS Subscriptions:**
  * Super Admin manually audits uploaded bank slips or invoices (`SCREEN_322` / `SCREEN_134` / `SCREEN_252` / `SCREEN_162`) to activate or extend tenant licenses.
* **Strict Negative Constraints:** Zero automated OCR reading, zero OCR confidence scores, zero third-party courier dispatch integrations (e.g. PromptXpress), and no automated payment gateway dependencies for launch.

### 4.3 Course Studio & Video Learning Experience
* **Guided 7-Step Course Builder (`SCREEN_308` / `SCREEN_120` / `SCREEN_60`):** Step-by-step curriculum creation: Details, Pricing, Modules, Lesson Resources, Assignment Prompts, Exam Linking, and Publishing.
* **YouTube Unlisted Video Integration (`SCREEN_302` / `SCREEN_118` / `SCREEN_284`):**
  * Embedded player with standard controls: Play/Pause, Seek bar, Playback Speed (0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x), Resolution / Quality switcher, and Fullscreen.
  * **Resume Learning:** Automatic timestamp capture and progress resumption across sessions.
  * *Strict Boundary:* No unapproved DRM (Widevine), no Vimeo dependencies, and no hardware-level screen recording blocking claims.

### 4.4 Examination Security & Activity Monitoring
* **Online Examination Room (`SCREEN_300` / `SCREEN_114` / `SCREEN_282` / `SCREEN_206`):**
  * Timed assessment console with auto-save question palette.
  * Question & option randomization configurable by teacher.
  * Fullscreen prompt and status banner.
  * Focus blur / tab-switch detection modal displaying warning telemetry to learner.
  * Student activity and transition timestamp logs.
  * Teacher-moderated score publication: Teacher chooses between immediate score release or manual review/moderation prior to gradebook publication.

### 4.5 Handwritten Assignments & Grading Workbench
* **Student Portal (`SCREEN_298` / `SCREEN_112` / `SCREEN_286`):** Multi-file upload for scanned or photographed handwritten paper submissions.
* **Teacher Workbench (`SCREEN_296` / `SCREEN_90` / `SCREEN_272`):** Dual-pane grading view with submission document viewer on the left, rubric breakdown, point scoring, and personalized feedback notes on the right.

### 4.6 Manual Certificate Issuance
* **Issuance Protocol (`SCREEN_13` / `SCREEN_3`):**
  * Criteria: 100% Course Completion, Course-Configurable Minimum Passing Grade, and Assignment Submission.
  * Issued strictly manually by Course Teacher or Tenant Admin (zero automatic dispatch).
  * Earned certificates reside in Student Profile Gradebook history (`SCREEN_292` / `SCREEN_110`).
  * Certificates feature a lightweight HTTP verification link (`verify.mindbridge.lk/c/...`).

### 4.7 Tenant Staff Limit Governance
* **Strict 2-Staff Limit (`SCREEN_316` / `SCREEN_130` / `SCREEN_262` / `SCREEN_76`):**
  * Each tenant is strictly capped at a maximum of two staff members (including the tenant owner).
  * The `+ Add Staff` action is locked when seats reach 2/2.
  * Includes a dedicated "Request Staff Limit Increase" workflow routing requests to Super Admin for upgrade consideration.

### 4.8 Security & Tenant Lifecycle
* **Authentication & Audit (`SCREEN_228` / `SCREEN_100`):** Login history, failed attempt counters, active session termination, and multi-method 2FA support.
* **Tenant Lifecycle Management (`SCREEN_324` / `SCREEN_136`):** Activation, Suspension, and Soft-Deletion (`status: SOFT_DELETED`, `is_restorable: true`). Expired tenants enter an informative grace period (`SCREEN_41` / `SCREEN_33`).
* **Platform Backups (`SCREEN_322` / `SCREEN_134`):** Tenant Admin supports scheduled data exports; Super Admin features a **manual golden snapshot button only** (no unapproved automated platform-level backup claims).

---

## 5. Design System & 4-Variant Canonical Inventory

### 5.1 Design Tokens
* **Oceanic Midnight (`DESIGN_SYSTEM_1` — Dark Mode):** Deep navy/slate container surfaces (`#0d1322`, `#151b2b`), vibrant royal/electric blue primary accents (`#3898ff`), high-contrast typography (`Plus Jakarta Sans`), roundness `8px`.
* **Light Sapphire (`DESIGN_SYSTEM_2` — Light Mode):** Crisp white/slate background surfaces (`#faf8ff`, `#ffffff`), deep corporate blue accents (`#0875e8`), clean neutral text contrasts.

### 5.2 Canonical Screen Matrix (68 Screens across 34 Functional Modules)
All 34 core functional modules are complete with 4-variant parity:
1. **Public Marketing Gateway** (`SCREEN_336` L-Desk, `SCREEN_146` D-Desk, `SCREEN_278` L-Mob, `SCREEN_152` D-Mob)
2. **Split-Screen Authentication** (`SCREEN_334`, `SCREEN_144`, `SCREEN_280`, `SCREEN_150`)
3. **Universal Student Registration** (`SCREEN_332`, `SCREEN_142`, `SCREEN_276`, `SCREEN_84`)
4. **Teacher & Institute Onboarding** (`SCREEN_330`, `SCREEN_96`, `SCREEN_68`, `SCREEN_66`)
5. **Super Admin Command Center** (`SCREEN_328`, `SCREEN_140`, `SCREEN_258`, `SCREEN_164`)
6. **Super Admin Applications** (`SCREEN_326`, `SCREEN_138`, `SCREEN_256`, `SCREEN_74`)
7. **Super Admin Tenant Management** (`SCREEN_324`, `SCREEN_136`, `SCREEN_254`, `SCREEN_72`)
8. **Super Admin Subscriptions & Backups** (`SCREEN_322`, `SCREEN_134`, `SCREEN_252`, `SCREEN_162`)
9. **Tenant Admin Overview** (`SCREEN_320`, `SCREEN_132`, `SCREEN_264`, `SCREEN_176`)
10. **Tenant Student Management** (`SCREEN_318`, `SCREEN_128`, `SCREEN_260`, `SCREEN_178`)
11. **Tenant Staff Governance (Max 2)** (`SCREEN_316`, `SCREEN_130`, `SCREEN_262`, `SCREEN_76`)
12. **Tenant Financials & Bank Slips** (`SCREEN_314`, `SCREEN_126`, `SCREEN_266`, `SCREEN_78`)
13. **Teacher Workspace Dashboard** (`SCREEN_312`, `SCREEN_124`, `SCREEN_270`, `SCREEN_174`)
14. **Lesson & Video Content Manager** (`SCREEN_310`, `SCREEN_122`, `SCREEN_268`, `SCREEN_80`)
15. **Guided Course Builder Studio** (`SCREEN_308`, `SCREEN_120`, `SCREEN_60`, `SCREEN_64`)
16. **Universal Student Portal & Hub** (`SCREEN_306`, `SCREEN_116`, `SCREEN_288`, `SCREEN_210`)
17. **Public Academy Storefront** (`SCREEN_304`, `SCREEN_94`, `SCREEN_274`, `SCREEN_86`)
18. **Course Learning & Video Player** (`SCREEN_302`, `SCREEN_118`, `SCREEN_284`, `SCREEN_208`)
19. **Examination Security & Monitoring** (`SCREEN_300`, `SCREEN_114`, `SCREEN_282`, `SCREEN_206`)
20. **Student Assignment Portal** (`SCREEN_298`, `SCREEN_112`, `SCREEN_286`, `SCREEN_204`)
21. **Teacher Grading Workbench** (`SCREEN_296`, `SCREEN_90`, `SCREEN_272`, `SCREEN_82`)
22. **Exam Receipt & Score Breakdown** (`SCREEN_294`, `SCREEN_108`, `SCREEN_58`, `SCREEN_62`)
23. **Student Profile & Gradebook** (`SCREEN_292`, `SCREEN_110`, `SCREEN_290`, `SCREEN_88`)
24. **Enrollment Lifecycle Hub** (`SCREEN_5`, `SCREEN_11`, `SCREEN_7`, `SCREEN_9`)
25. **Manual Bank Slip Upload Modal** (`SCREEN_240`, `SCREEN_106`, `SCREEN_242`, `SCREEN_188`)
26. **Manual Payment Review Modal** (`SCREEN_238`, `SCREEN_102`, `SCREEN_56`, `SCREEN_54`)
27. **Payments & Subscriptions Hub** (`SCREEN_246`, `SCREEN_104`, `SCREEN_244`, `SCREEN_190`)
28. **Notifications & Messaging Hub** (`SCREEN_248`, `SCREEN_92`, `SCREEN_250`, `SCREEN_70`)
29. **Teacher AI Question Studio** (`SCREEN_234`, `SCREEN_200`, `SCREEN_230`, `SCREEN_196`)
30. **Student AI Study Companion** (`SCREEN_236`, `SCREEN_202`, `SCREEN_232`, `SCREEN_198`)
31. **Settings & Account Governance** (`SCREEN_228`, `SCREEN_100`, `SCREEN_226`, `SCREEN_52`)
32. **Help & Support Desk** (`SCREEN_224`, `SCREEN_98`, `SCREEN_222`, `SCREEN_50`)
33. **Student Empty State Fallback** (`SCREEN_45`, `SCREEN_37`, `SCREEN_15`, `SCREEN_27`)
34. **Bank Slip Pending Review State** (`SCREEN_43`, `SCREEN_35`, `SCREEN_17`, `SCREEN_29`)

---

## 6. Engineering Implementation Milestones & Backlog

1. **Sprint 1 — Core Authentication, Multi-Tenancy & RLS:** Setup Firebase Auth, configure Supabase PostgreSQL schema with strict tenant isolation RLS, and establish Vercel/GitHub CI/CD pipelines.
2. **Sprint 2 — Offline Payment Verification Engine:** Deploy Supabase Storage private buckets for slip uploads and build Netlify Function endpoints for manual review submission and auditing.
3. **Sprint 3 — Course Studio & YouTube Video Integration:** Build 7-step course builder and implement YouTube Unlisted embed player with timestamp resume hooks.
4. **Sprint 4 — Examination & Assignment Workbenches:** Implement timed online exam interface with focus blur listeners, and dual-pane assignment grading workbench.
5. **Sprint 5 — Tenant Administration, Staff Limits & Export Handover:** Wire up the strict 2-staff limit lock, manual certificate issuance logic, and Super Admin command center.

---

## 7. Compliance & Production Readiness Boundary

* **UI/UX Design Status:** 100% verified, token-harmonized, and ready for frontend code scaffolding.
* **Production Boundary:** The UI mockups and documentation define visual hierarchy and interaction models. Working security, backend business logic, database transactions, and multi-tenant authentication will be implemented and validated during software development.
