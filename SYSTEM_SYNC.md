# System Sync – End to End Company Products

This repo is one of the 7 core repos in the secondbase kit.

## 1. Purpose of This File

This document gives AI coding tools and developers a compact overview of:

- The overall multi-repo system.
- The role of this specific repository: `web-client-strategy`.
- Where to find deeper documentation (Confluence).

When starting a new session or a big change, load/reference this file so the agent understands the whole picture.

---

## 2. Global System Overview

The system has 6 main repositories:

1. **common-strategy** – shared TypeScript library for DTOs, constants, logging, and API contracts.
2. **server-strategy** – Node.js TypeScript HTTP API server (auth, business logic, PostgreSQL).
3. **gateway-strategy** – Node.js real-time gateway (WebSockets) behind Nginx on a LAN device (e.g. NUC).
4. **web-client-strategy** – React + TypeScript web client (this repo).
5. **mobile-client-strategy** – React Native + Expo mobile client.
6. **ai-strategy** – AI/ML services (to be defined later).

Shared types and contracts live in `common-strategy` and are consumed by all other repos.

---

## 3. This Repo: `web-client-strategy`

**Role**:  
The **web dashboard** application for the system.

**Responsibilities (current & planned)**:

- Implement the web UI for:
  - Authentication (email + 6-digit code).
  - Later: dashboards, metrics, admin views, etc.
- Maintain the shared E2E Experience System (E2E-XS v1) shell: design tokens, sticky TopBar, Sidebar navigation, command palette (Ctrl/⌘+K), and AI assistant panel **stub** so new screens fit the same frame as `internal-tool-strategy`.
- Consume HTTP APIs from `server-strategy`.
- Later: consume real-time data from `gateway-strategy`.
- Use DTOs and error models from `common-strategy`.

**Initial Auth Flow (MVP)**:

- Screen: “Enter your email” → calls `POST /auth/send-code` (route: `/auth/send-code` inside the AppShell).
- Screen: “Enter your email + 6-digit code” → calls `POST /auth/verify-code` (route: `/auth/verify-code`).
- On success:
  - Stores the returned `AuthToken` and `User` client-side (for now in memory or localStorage, TBD).
  - Navigates to a simple “You are logged in” page (`/auth/logged-in`) that sits within the shell.
- On error:
  - Shows human-readable messages based on `ApiError` (`VALIDATION_ERROR`, `UNAUTHORIZED`, etc.).

Backend behavior is implemented in `server-strategy` and documented in Confluence:

- `05 – APIs & Contracts → 5.1 – Authentication (Email + 6-digit Code)`

---

## 4. Testing Expectations

For this repo:

- **Unit / component tests**:
  - React components (auth forms, screens).
  - Simple hooks or helpers (HTTP client, auth state).
- **Integration / UI tests** (later phases):
  - End-to-end flows using Playwright or similar.

Every PR should keep:

- `yarn test`
- `yarn lint`
- `yarn build`

green.

See Confluence `6.1 – Testing Strategy & Quality Gates` for the system-wide testing strategy.

---

## 5. Documentation Sources

- Confluence Space: **End to End Company Products**
  - `01 – Vision & Strategy`
  - `02 – System Architecture`
  - `03 – Repositories → web-client-strategy`
  - `05 – APIs & Contracts → 5.1 – Authentication (Email + 6-digit Code)`
  - `06 – Operations → 6.1 – Testing Strategy & Quality Gates`
  - `06 – Operations → 6.2 – AI-Orchestrated Development (Target Vision)`

If this file and Confluence ever disagree, Confluence is the source of truth and this file should be updated.

---

## 6. How Agents Should Use This

- Assume this app:
  - Authenticates users via `server-strategy` auth endpoints.
  - Reuses shared types from `common-strategy` when shaping request/response DTOs.
- When adding new features:
  - Start from Confluence specs and shared types.
  - Implement UI and HTTP calls here.
  - Add or update tests before making deeper changes.

## 7. UX Contract (E2E-XS v1 – Web Client)

- Always render content inside a sticky top bar shell:
  - app title / logo
  - page title
  - space for global search
  - command palette trigger (Ctrl/⌘+K)
  - user avatar + notifications placeholder.
- On desktop, use a side navigation rail for primary sections (Dashboard, Activity, Profile, etc.), and collapse or hide it behind a hamburger on smaller screens.
- New screens should follow the pattern:
  - page title + brief description
  - action bar (primary CTA, filters, search)
  - main content area (cards, lists, tables).
- Reuse shared primitives:
  - cards, buttons, inputs, modals, toasts.
  - Skeletons/tabs are FUTURE enhancements (not implemented in this repo yet).
- Tokens + globals live in `src/theme/tokens.ts` and `src/styles/globals.css`. Layout primitives (TopBar, Sidebar, Inspector, AppShell) live under `src/components/layout/`. New features should wire into these shared building blocks rather than inventing new frames.
- Do not hard-code colors/spacing/typography; use the shared design tokens and CSS variables.
- Leave hooks/placeholders for:
  - command palette actions (navigation, quick actions)
  - AI assistant side panel **stub** (chat-based helper – real backend TBD).
  - Inspector panel currently shows placeholder copy only; real entity inspectors are planned.
