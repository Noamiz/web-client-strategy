# System Sync – End to End Company Products

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
- Consume HTTP APIs from `server-strategy`.
- Later: consume real-time data from `gateway-strategy`.
- Use DTOs and error models from `common-strategy`.

**Initial Auth Flow (MVP)**:

- Screen: “Enter your email” → calls `POST /auth/send-code`.
- Screen: “Enter your email + 6-digit code” → calls `POST /auth/verify-code`.
- On success:
  - Stores the returned `AuthToken` and `User` client-side (for now in memory or localStorage, TBD).
  - Navigates to a simple “You are logged in” page.
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

