# web-client-strategy

React + TypeScript **web client** for the _End to End Company Products_ system.

This application is the main web dashboard for users and admins. It communicates with:

- [`server-strategy`](https://github.com/Noamiz/server-strategy) for HTTP APIs (auth, domain logic).
- `gateway-strategy` (later) for real-time features.
- Shared DTOs from [`common-strategy`](https://github.com/Noamiz/common-strategy).

---

## Table of Contents

- [Architecture](#architecture)
- [Current Features](#current-features)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Related Repositories](#related-repositories)
- [Documentation](#documentation)

---

## Architecture

- Framework: React + TypeScript
- Bundler/dev server: Vite
- Styling: (TBD – can start with CSS Modules or simple CSS)
- Tests: Vitest + React Testing Library
- Shared types: `common-strategy`

In development, the Vite dev server proxies `/auth` calls to the `server-strategy` dev server at `http://localhost:4000`.

---

## Current Features

### Authentication (Email + 6-digit Code, MVP)

Screens:

1. **Email Entry / Send Code**
   - User enters email.
   - Client calls `POST /auth/send-code`.
   - On success: shows info that a code was sent and navigates to the verification screen.
   - On validation error: displays `ApiError.message`.

2. **Verify Code**
   - User enters the same email + 6-digit code.
   - Client calls `POST /auth/verify-code`.
   - On success:
     - Stores `User` + `AuthToken` (storage mechanism to be defined).
     - Navigates to a simple “You are logged in” page.
   - On error:
     - For expired code → show message for re-requesting code.
     - For invalid code → show a generic “code invalid” message.
     - For too many attempts → show a throttling message.

This flow mirrors the backend behavior defined in `server-strategy` and Confluence (`5.1 – Authentication`).

---

## Getting Started

### Prerequisites

- Node.js LTS (e.g. v20+)
- Yarn (classic) or corepack
- `server-strategy` running locally on port 4000 (for the auth flow to work).

### Install dependencies

```bash
yarn install
```

### Run in development

```bash
yarn dev
```

By default the app runs at http://localhost:5173 (Vite default).

---

## Scripts

Common scripts (from `package.json`):

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:coverage": "vitest run --coverage",
    "lint": "eslint src --ext .ts,.tsx"
  }
}
```

- `yarn dev` – start dev server
- `yarn test` – run test suite
- `yarn lint` – run ESLint
- `yarn build` – create a production build

---

## Project Structure

```
web-client-strategy/
  src/
    api/
      authClient.ts      # HTTP calls to /auth endpoints using common-strategy DTOs
    components/
      AuthEmailForm.tsx  # Email input + send-code button
      AuthCodeForm.tsx   # Email + code inputs + verify-code button
    pages/
      SendCodePage.tsx   # Screen for POST /auth/send-code
      VerifyCodePage.tsx # Screen for POST /auth/verify-code
      LoggedInPage.tsx   # Very simple “you are logged in” screen
    hooks/
      useAuth.ts         # (Optional) simple hook to hold auth state
    App.tsx              # Routes between auth pages and logged-in page
    main.tsx             # React root
    __tests__/
      authFlow.test.tsx  # Tests for basic auth flow behavior
  vite.config.ts
  tsconfig.json
  README.md
  SYSTEM_SYNC.md
```

This layout can evolve as we add more features.

---

## Testing

We follow the general testing approach from Confluence (6.1 – Testing Strategy & Quality Gates).

For this repo use Vitest + React Testing Library for:

- Component tests around the auth forms and screens.
- Basic flow tests (mocking fetch/HTTP).

Initial goal: `src/__tests__/authFlow.test.tsx`:

- Renders the auth screens.
- Mocks HTTP responses for `/auth/send-code` and `/auth/verify-code`.
- Asserts that success paths navigate to the “logged in” view.
- Asserts that error responses show appropriate messages.

All tests should run with:

```bash
yarn test
```

---

## Related Repositories

- [`common-strategy`](https://github.com/Noamiz/common-strategy)
- [`server-strategy`](https://github.com/Noamiz/server-strategy)
- `gateway-strategy`
- `mobile-client-strategy`
- `ai-strategy`

---

## Documentation

System-level documentation lives in Confluence:

- `01 – Vision & Strategy`
- `02 – System Architecture`
- `03 – Repositories → web-client-strategy`
- `05 – APIs & Contracts → 5.1 – Authentication (Email + 6-digit Code)`
- `06 – Operations → 6.1 – Testing Strategy & Quality Gates`
- `06 – Operations → 6.2 – AI-Orchestrated Development (Target Vision)`

If this README and Confluence ever disagree, Confluence is the source of truth and this file should be updated.
