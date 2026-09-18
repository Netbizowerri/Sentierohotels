# AGENTS.md

## Project Overview
Sentiero Hotels & Suites is a luxury hotel booking web application for a property near Sam Mbakwe Airport, Imo State, Nigeria. It features suite browsing/reservation, amenities, airport shuttle info, blog, and contact forms; bookings and inquiries are emailed to the admin inbox via Formspree.

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite 6, Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animations**: `motion`, `canvas-confetti`
- **Icons**: `lucide-react`
- **Maps**: `@googlemaps/js-api-loader`
- **Backend**: Express server (`server.ts`) run via `tsx`, bundled for prod with `esbuild`
- **Leads/Emails**: Formspree — forms POST directly to `https://formspree.io/f/xnpnnadb` (no server relay)

## Commands
- `npm run dev` — start dev server (Express + Vite middleware) on port 3000
- `npm run build` — Vite build + bundle `server.ts` to `dist/server.cjs`
- `npm start` — run production server
- `npm run lint` — typecheck with `tsc --noEmit` (this is the only lint/typecheck available; always run it after changes)

## Architecture
- `src/App.tsx` — root component; owns tab navigation, currency state, bookings (localStorage `sentiero_reservations`), suite filtering, and all modals
- `src/components/` — sections + modals: `HeaderNav`, `BottomNav`, `HomeSection`, `SuiteCard`, `SuiteDetailModal`, `BookingModal`, `MyBookingsModal`, `SearchFilterDrawer`, `ContactSection`, `AmenitiesSection`, `AirportGuideSection`, `AboutUsSection`, `BlogSection`, `Footer`, `WhatsAppFloat`, etc.
- `src/data/` — static content (`hotelData.ts`, `blogData.ts`)
- `src/types/hotel.ts` — shared types (`RoomSuite`, `Reservation`, `SearchFilterState`, `Currency`)
- `src/utils/formatters.ts` — price formatting, booking refs, date helpers
- `src/services/crmService.ts` — client-side lead dispatch to Formspree (`sendLeadToCrm`)
- `server.ts` — Express: serves the app only (static + Vite middleware), plus `/api/health`

## Conventions
- **Styling**: Tailwind utility classes inline; brand colors are the primary navy `#242E51`, gold accent `#CD9A29`, background `#F2F2FF`, and text `#091626` (also defined as theme colors in `src/index.css`)
- **Headings**: use `font-display` class (Sora font)
- **Naming**: `PascalCase` for component files, `camelCase` for values/functions; interfaces in `src/types/hotel.ts`
- **No comments** unless asked; match existing code patterns
- **Secrets**: never commit real API keys. `VITE_GOOGLE_MAPS_API_KEY` may only be set via env; the Formspree endpoint in `crmService.ts` is a public form ID designed for client-side use

## Environment Variables (`.env`, all optional except noted)
- `APP_URL` — hosted app URL
- `VITE_GOOGLE_MAPS_API_KEY` — Google Maps (optional)

Server exposes `/api/health`.

## Git
Commit style: conventional (`feat:`, `fix:`, `chore:`).