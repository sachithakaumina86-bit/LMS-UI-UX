# MindBridge LMS — Frontend Engineering Export Package & Implementation Guide
**Product:** Multi-Tenant Tuition & Academy Learning Management System  
**Architecture:** Multi-Tenant Micro-Frontends / Next.js / Tailwind CSS / Headless UI  
**Design Systems:** 
- **Dark Mode Master:** `DESIGN_SYSTEM_1` (*MindBridge LMS Oceanic Midnight*)
- **Light Mode Master:** `DESIGN_SYSTEM_2` (*MindBridge LMS Light Sapphire*)
**Status:** Validated Forensic Design Audit Complete (100% 4-Variant Parity across all 25 Functional Interfaces)

---

## 1. System Architecture & Engineering Overview

MindBridge LMS is engineered for multi-tenant educational institutions (tuition masters, physical tuition academies, and independent educators). Each academy operates on its own dedicated subdomain (`<tenant>.mindbridge.lk`) or vanity custom domain, with strict tenant isolation, localized payment workflows (offline bank deposit slip upload & cashier audit), unlisted YouTube video delivery, and a strict 2-staff administrative model.

### Key Architectural Boundaries
1. **Subdomain Routing & Tenant Context**:
   - `mindbridge.lk`: Public SaaS Marketing, Platform Registration, Global Auth, Super Admin Command Center.
   - `<tenant>.mindbridge.lk`: Isolated Academy Storefront, Student Learning Portal, Course Catalog.
   - Context is injected via Next.js Middleware parsing the hostname header, resolving the Tenant UUID and provisioning the tenant theme tokens.
2. **Dual Theme Engine (CSS Custom Properties)**:
   - Root application implements dark/light switching via CSS custom properties mapped to Tailwind CSS utilities.
   - Primary Dark mode token base: `#0d1322` (Surface lowest: `#080e1d`, Surface container: `#151b2b`, Accent: `#3898ff`).
   - Primary Light mode token base: `#faf8ff` (Surface lowest: `#ffffff`, Surface container: `#f2f3ff`, Accent: `#0875e8`).
3. **Core Tech Stack & Libraries**:
   - **Framework**: Next.js 14+ (App Router) / React 18+ / TypeScript strict.
   - **Styling**: Tailwind CSS 3.4+ with `@tailwindcss/forms` and `@tailwindcss/typography`.
   - **Icons**: Lucide React / Heroicons (24px outline / 20px solid).
   - **Math & Chemistry Formula Rendering**: KaTeX (`katex.min.css` / client-side MathJax or KaTeX parser).
   - **Video Playback**: YouTube IFrame Player API (enforcing unlisted ID streaming with playback rate, watermark overlay, and progress beaconing).

---

## 2. Design Tokens & CSS Variables Reference

### Theme Token Map (`globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Light Mode Token Set (DESIGN_SYSTEM_2: Light Sapphire) */
  :root {
    --color-surface: #faf8ff;
    --color-surface-dim: #cfd9fb;
    --color-surface-bright: #faf8ff;
    --color-surface-container-lowest: #ffffff;
    --color-surface-container-low: #f2f3ff;
    --color-surface-container: #eaedff;
    --color-surface-container-high: #e3e7fc;
    --color-surface-container-highest: #dce1f6;

    --color-primary: #0875e8;
    --color-primary-hover: #065ec0;
    --color-primary-container: #d9e2ff;
    --color-on-primary: #ffffff;
    --color-on-primary-container: #001945;

    --color-secondary: #00668b;
    --color-secondary-container: #c3e8ff;
    --color-on-secondary: #ffffff;
    --color-on-secondary-container: #001e2c;

    --color-tertiary: #6b538c;
    --color-tertiary-container: #eedcff;

    --color-error: #ba1a1a;
    --color-error-container: #ffdad6;
    --color-success: #15803d;
    --color-success-container: #dcfce7;
    --color-warning: #b45309;
    --color-warning-container: #fef3c7;

    --color-text-primary: #131b2e;
    --color-text-secondary: #424754;
    --color-text-muted: #727785;
    --color-border: #c2c6d6;
    --color-border-subtle: #e2e5f1;

    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
    --radius-full: 9999px;
  }

  /* Dark Mode Token Set (DESIGN_SYSTEM_1: Oceanic Midnight) */
  .dark {
    --color-surface: #0d1322;
    --color-surface-dim: #0d1322;
    --color-surface-bright: #33394a;
    --color-surface-container-lowest: #080e1d;
    --color-surface-container-low: #151b2b;
    --color-surface-container: #192030;
    --color-surface-container-high: #232a3b;
    --color-surface-container-highest: #2e3546;

    --color-primary: #3898ff;
    --color-primary-hover: #5eaaff;
    --color-primary-container: #00458f;
    --color-on-primary: #002b5c;
    --color-on-primary-container: #d9e2ff;

    --color-secondary: #7cd0ff;
    --color-secondary-container: #004d6a;
    --color-on-secondary: #00344a;
    --color-on-secondary-container: #c3e8ff;

    --color-tertiary: #d7baff;
    --color-tertiary-container: #523b72;

    --color-error: #ffb4ab;
    --color-error-container: #93000a;
    --color-success: #4ade80;
    --color-success-container: #14532d;
    --color-warning: #fbbf24;
    --color-warning-container: #78350f;

    --color-text-primary: #e0e6f8;
    --color-text-secondary: #a3adc2;
    --color-text-muted: #6e788e;
    --color-border: #283042;
    --color-border-subtle: #1c2333;
  }
}
```

### Tailwind Config Preset (`tailwind.config.ts`)

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: 'var(--color-surface)',
          dim: 'var(--color-surface-dim)',
          bright: 'var(--color-surface-bright)',
          lowest: 'var(--color-surface-container-lowest)',
          low: 'var(--color-surface-container-low)',
          container: 'var(--color-surface-container)',
          high: 'var(--color-surface-container-high)',
          highest: 'var(--color-surface-container-highest)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          container: 'var(--color-primary-container)',
          foreground: 'var(--color-on-primary)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          container: 'var(--color-secondary-container)',
        },
        feedback: {
          error: 'var(--color-error)',
          'error-container': 'var(--color-error-container)',
          success: 'var(--color-success)',
          'success-container': 'var(--color-success-container)',
          warning: 'var(--color-warning)',
          'warning-container': 'var(--color-warning-container)',
        },
        tx: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        stroke: {
          DEFAULT: 'var(--color-border)',
          subtle: 'var(--color-border-subtle)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '8px',
        modal: '12px',
        pill: '9999px',
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
```

---

## 3. Authoritative Screen Asset & Variant Map (25 Interfaces)

Use this table as the direct mapping guide when converting HTML prototypes into modular React/Next.js route handlers.

| ID | Functional Destination | Target Route Handler | Desktop Light | Mobile Light | Desktop Dark | Mobile Dark | Primary Role |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **01** | Marketing Website | `app/(marketing)/page.tsx` | `SCREEN_285` | `SCREEN_227` | `SCREEN_95` | `SCREEN_101` | Public |
| **02** | Login & Auth | `app/(auth)/login/page.tsx` | `SCREEN_283` | `SCREEN_229` | `SCREEN_93` | `SCREEN_99` | All Roles |
| **03** | Student Registration | `app/(auth)/register/page.tsx` | `SCREEN_281` | `SCREEN_225` | `SCREEN_91` | `SCREEN_33` | Student |
| **04** | Teacher Onboarding | `app/(auth)/apply-teacher/page.tsx`| `SCREEN_279` | `SCREEN_17` | `SCREEN_45` | `SCREEN_15` | Teacher/Inst |
| **05** | Super Admin Dashboard | `app/admin/dashboard/page.tsx` | `SCREEN_277` | `SCREEN_207` | `SCREEN_89` | `SCREEN_113` | Super Admin |
| **06** | SA Tenant Provisioning | `app/admin/provisioning/page.tsx` | `SCREEN_275` | `SCREEN_205` | `SCREEN_87` | `SCREEN_23` | Super Admin |
| **07** | SA Tenant Registry | `app/admin/tenants/page.tsx` | `SCREEN_273` | `SCREEN_203` | `SCREEN_85` | `SCREEN_21` | Super Admin |
| **08** | SA Subscriptions & Backups | `app/admin/billing-backups/page.tsx`| `SCREEN_271` | `SCREEN_201` | `SCREEN_83` | `SCREEN_111` | Super Admin |
| **09** | Tenant Admin Overview | `app/tenant/[id]/dashboard/page.tsx`| `SCREEN_269` | `SCREEN_213` | `SCREEN_81` | `SCREEN_125` | Tenant Admin |
| **10** | Tenant Student Directory | `app/tenant/[id]/students/page.tsx` | `SCREEN_267` | `SCREEN_209` | `SCREEN_77` | `SCREEN_127` | Tenant Admin |
| **11** | Tenant Staff Governance | `app/tenant/[id]/staff/page.tsx` | `SCREEN_265` | `SCREEN_211` | `SCREEN_79` | `SCREEN_25` | Tenant Admin |
| **12** | Tenant Financials & Slips | `app/tenant/[id]/financials/page.tsx`| `SCREEN_263` | `SCREEN_215` | `SCREEN_75` | `SCREEN_27` | Tenant Admin |
| **13** | Teacher Workspace | `app/teacher/dashboard/page.tsx` | `SCREEN_261` | `SCREEN_219` | `SCREEN_73` | `SCREEN_123` | Teacher |
| **14** | Lesson & Video Manager | `app/teacher/courses/[id]/lessons`| `SCREEN_259` | `SCREEN_217` | `SCREEN_71` | `SCREEN_29` | Teacher |
| **15** | 7-Step Course Builder | `app/teacher/courses/builder/page.tsx`| `SCREEN_257` | `SCREEN_9` | `SCREEN_69` | `SCREEN_13` | Teacher |
| **16** | Teacher Grading Queue | `app/teacher/grading/page.tsx` | `SCREEN_245` | `SCREEN_221` | `SCREEN_39` | `SCREEN_31` | Teacher |
| **17** | Tenant Storefront | `app/storefront/[tenantSlug]/page.tsx`| `SCREEN_253` | `SCREEN_223` | `SCREEN_43` | `SCREEN_35` | Public / Student |
| **18** | Student Portal & Hub | `app/student/hub/page.tsx` | `SCREEN_255` | `SCREEN_237` | `SCREEN_65` | `SCREEN_159` | Student |
| **19** | Video Player & Handouts | `app/student/courses/[id]/learn` | `SCREEN_251` | `SCREEN_233` | `SCREEN_67` | `SCREEN_157` | Student |
| **20** | Online Exam Room | `app/student/exams/[id]/take` | `SCREEN_249` | `SCREEN_231` | `SCREEN_63` | `SCREEN_155` | Student |
| **21** | Student Homework Portal | `app/student/assignments/page.tsx` | `SCREEN_247` | `SCREEN_235` | `SCREEN_61` | `SCREEN_153` | Student |
| **22** | Exam Submission Receipt | `app/student/exams/[id]/receipt` | `SCREEN_243` | `SCREEN_7` | `SCREEN_57` | `SCREEN_11` | Student |
| **23** | Student Profile & Gradebook | `app/student/gradebook/page.tsx` | `SCREEN_241` | `SCREEN_239` | `SCREEN_59` | `SCREEN_37` | Student |
| **24** | Notifications & Messages | `app/messages/page.tsx` | `SCREEN_197` | `SCREEN_199` | `SCREEN_41` | `SCREEN_19` | All Roles |
| **25** | Payments & Bank Invoices | `app/student/billing/page.tsx` | `SCREEN_195` | `SCREEN_193` | `SCREEN_53` | `SCREEN_139` | Student / Tenant |
| **M1** | Bank Slip Upload Modal | `components/modals/BankSlipUploadModal`| `SCREEN_189` | `SCREEN_191` | `SCREEN_55` | `SCREEN_137` | Student |
| **M2** | Manual Slip Review Modal | `components/modals/BankSlipReviewModal`| `SCREEN_187` | `SCREEN_5` | `SCREEN_51` | `SCREEN_3` | Tenant Admin |
| **M3** | Student AI Study Companion | `components/ai/StudentAITutorDrawer`| `SCREEN_185` | `SCREEN_181` | `SCREEN_151` | `SCREEN_147` | Student |
| **M4** | Teacher AI Question Studio | `app/teacher/ai-studio/page.tsx` | `SCREEN_183` | `SCREEN_179` | `SCREEN_149` | `SCREEN_145` | Teacher |
| **U1** | Personal Account Settings | `app/settings/page.tsx` | `SCREEN_177` | `SCREEN_175` | `SCREEN_49` | `SCREEN_5` | All Roles |
| **U2** | Help & Support Desk | `app/support/page.tsx` | `SCREEN_173` | `SCREEN_171` | `SCREEN_47` | `SCREEN_3` | All Roles |
| **A1** | Super Admin Governance | `app/admin/system-rules/page.tsx` | *N/A (Admin)* | *N/A (Admin)* | `SCREEN_115` | `SCREEN_109` | Super Admin |
| **Ref**| Master Design Specimen | `app/dev/design-system/page.tsx` | `SCREEN_169` | — | — | — | Dev Only |

---

## 4. Key UI Components & Behavioral Specifications

### 1. Bank Slip Upload & Cashier Audit Workflow
- **Student Flow (`MOD-01`)**:
  - Accepts image formats: `image/jpeg`, `image/png`, and `application/pdf` (Max 5MB).
  - Collects form inputs: Depositor Name, Deposit Amount (LKR), Deposit Date, Reference Bank (e.g. Commercial Bank, BOC, Sampath, HNB), and Transaction Reference No.
  - Submits to `/api/tenants/[id]/slips` creating status `PENDING_REVIEW`.
- **Tenant Admin / Teacher Flow (`MOD-02`)**:
  - Displays side-by-side verification: uploaded image zoom/pan viewer on the left, fee ledger and student account details on the right.
  - Actions: `Approve Payment & Grant Access` or `Reject with Reason`.
  - Rejection requires selecting from a pre-defined reason dropdown (*"Deposit reference blurred"*, *"Amount does not match course tuition"*, *"Incorrect branch or date"*) + custom note.

### 2. Tenant Staff Limit Enforcement (Hard 2-Seat Cap)
- **Component**: `TenantStaffManager.tsx`
- **Rule**: Max 2 staff members per tenant (Owner + 1 Assistant Teacher/Staff).
- **UI Logic**:
  ```typescript
  const maxSeats = 2;
  const isSeatLimitReached = activeStaffCount >= maxSeats;
  // If true: Disable '+ Invite Staff Member' button
  // Display tooltip: "Tenant plan limit: 2 of 2 staff seats allocated. Contact Super Admin to upgrade."
  ```

### 3. Video Player & Content Security
- **Component**: `LessonVideoPlayer.tsx`
- **Workflow**:
  - Embeds YouTube Unlisted videos using the `react-youtube` or raw `<iframe>` wrapper with parameters:
    `controls=1&rel=0&modestbranding=1&enablejsapi=1`.
  - Injects dynamic floating ephemeral canvas watermark showing: `Kavindu Nirmal • SL-LRN-89401 • IP: 192.248.x.x • 2025-11-20`.
  - Disables right-click context menu and intercepts screenshot shortcut hotkeys on supported desktop clients.

### 4. Bilingual Formula & Math Rendering
- **Component**: `MathContentRenderer.tsx`
- **Workflow**:
  - Dynamically parses LaTeX blocks delimited by `$$...$$` or `$...$`.
  - Supports English and Sinhala text alongside KaTeX rendering (e.g., Sinhala explanation followed by calculus formula $\int x^2 dx = \frac{x^3}{3} + C$).

---

## 5. Frontend Engineering Checklist & Quality Gates

- [ ] **CSS Variable Strictness**: Never hardcode hex values like `#0875e8` or `#0d1322` in component code; always utilize Tailwind aliases `bg-surface-lowest`, `text-tx-primary`, or `border-stroke`.
- [ ] **Responsive Breakpoints**:
  - Desktop standard: `w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` with persistent left navigation sidebar (`w-64 flex-shrink-0`).
  - Mobile standard: Max-width 480px, fixed bottom navigation bar (`h-16 border-t border-stroke bg-surface-lowest/95 backdrop-blur`), touch targets minimum `44px x 44px`.
- [ ] **Accessibility (WCAG 2.1 AA)**:
  - Text contrast ratio $\ge 4.5:1$ against surface containers.
  - All form controls require explicit `<label>` tags and ARIA error associations (`aria-describedby="error-msg"`).
  - Keyboard navigation: Full focus ring visibility (`focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`).
- [ ] **State Preservation**:
  - Multi-step wizards (Course Builder, Onboarding Form) must serialize draft state to `localStorage` or session cache to prevent data loss on unintended refresh.
- [ ] **Tenant Isolation Guard**:
  - Ensure API client includes `x-tenant-id` header in all tenant-scoped requests. Never allow cross-tenant query mutation from client components.
