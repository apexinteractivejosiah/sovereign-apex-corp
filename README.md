# Sovereign Apex Corp — Enterprise Strategy & Corporate Architecture OS

Sovereign Apex Corp Enterprise OS is an integrated, multi-portal corporate operating platform engineered for global advisory practices, institutional retainer governance, multidisciplinary delivery pods, and executive boardroom telemetry.

## Platform Architecture

The platform synchronizes six dedicated enterprise portals across a unified, deterministic state layer:

1. **Global Headquarters (`Headquarters`)** — Executive showcase across New York, London, Zurich, and Singapore offices, quantified practice benchmarks, and real-time governance overview.
2. **B2B Retainer & Scope Configurator (`Retainer Configurator`)** — Institutional engagement builder with division calibration, team-size scaling (`Dedicated Pod of 3`, `Full Department of 8`, `Enterprise Taskforce of 15`), term discounting, and immediate contract origination (`SAC-XXXX`).
3. **B2B Client Executive Gateway (`B2B Client Portal`)** — Live 5-stage deliverable roadmap tracking, milestone sign-off controls, tranche invoice settlement, assigned principal rosters, and direct executive messaging.
4. **Principal Specialist Execution Workbench (`Employee Workspace`)** — Role-switched operational workspace across four specialist titles (`Principal Systems Architect`, `Senior Financial Analyst`, `Lead Product Designer`, `Client Account Manager`) with deliverable progression, billable hour logging, and PTO submission.
5. **Practice Director & HR Management Hub (`Director & HR Hub`)** — Cross-contract specialist resource allocation matrix, HR leave adjudication, compensation tier governance, specialist onboarding, and client communications console.
6. **CEO Executive Boardroom (`CEO Executive Boardroom`)** — Real-time synthesis of Annual Recurring Revenue (ARR), Consolidated Net Profit Margin, Global Department Utilization, contract governance overrides, and company-wide Executive Directives.

## Technology Stack

- **Frontend Framework:** React 19 + TypeScript
- **Build Engine:** Vite 8
- **Styling System:** Tailwind CSS 4 (`Playfair Display` editorial typography & `DM Sans` UI typography)
- **Icons:** Lucide React

## Local Development & Production Build

```bash
# Install dependencies (respects .npmrc legacy-peer-deps=true)
npm install

# Start local development server on port 3000
npm run dev

# Run TypeScript type verification
npm run lint

# Build optimized production bundle to dist/
npm run build
```

## Vercel Deployment

The repository includes root-level `.npmrc`, `vercel.json` SPA rewrites, `tailwind.config.js`, `postcss.config.js`, `vite.config.ts`, and static architectural media under `public/assets/images/` for zero-configuration deployment on Vercel.
