# web-client-strategy

Part of the secondbase kit – a reusable, always-modern company-in-a-box.

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
- Styling: E2E-XS v1 design tokens + global CSS variables (`src/theme/tokens.ts`, `src/styles/globals.css`)
- Tests: Vitest + React Testing Library
- Shared types: `common-strategy`
- Routing/Layout: React Router AppShell with sticky TopBar, Sidebar, and nested routes

In development, the Vite dev server proxies `/auth` calls to the `server-strategy` dev server at `http://localhost:4000`.

---

## Current Features

### E2E-XS v1 AppShell

- Sticky TopBar with title slot, global search placeholder, command palette trigger (Ctrl/⌘+K helper), notification + AI buttons, and avatar stub.
- Sidebar navigation (collapsible) for Dashboard, Activity, Auth demo, and Profile plus an Inspector panel **stub** on wide screens.
- Pages render within the shell via React Router nested routes (`src/components/layout/AppShell.tsx`).
- Layout + primitives consume shared design tokens exposed as CSS variables, making it easy to extend themes later.

### Command Palette (Ctrl/⌘+K)

- Accessible overlay (see `src/components/command-palette/CommandPalette.tsx`) that opens via the TopBar button or the global Ctrl/⌘+K shortcut.
- Provides navigation commands (Dashboard, Activity, Auth, Profile) and UI actions (toggle sidebar, open AI assistant).
- Keyboard-friendly: arrow keys to move selection, Enter to run commands, Escape to close.

### AI Assistant Panel (Preview)

- Right-side slide-in panel (`src/components/ai/AiAssistantPanel.tsx`) wired to the TopBar button and command palette action.
- Currently a **stub**: local message list + canned assistant responses so the surface exists while backend wiring is pending.
- Declares dialog semantics and ESC-to-close; focus trapping + real AI integration are TODO items.

### Authentication (Email + 6-digit Code, MVP)

Screens:

1. **Email Entry / Send Code** (`/auth/send-code`)
   - User enters email.
   - Client calls `POST /auth/send-code`.
   - On success: shows info that a code was sent and navigates to the verification screen.
   - On validation error: displays `ApiError.message`.

2. **Verify Code** (`/auth/verify-code`)
   - User enters the same email + 6-digit code.
   - Client calls `POST /auth/verify-code`.
   - On success:
     - Stores `User` + `AuthToken` (storage mechanism to be defined).
     - Navigates to a simple “You are logged in” page.
   - On error:
     - For expired code → show message for re-requesting code.
     - For invalid code → show a generic “code invalid” message.
     - For too many attempts → show a throttling message.

3. **Logged In View** (`/auth/logged-in`)
   - Wrapped inside the AppShell; shows session context and sign-out action (resets auth state + routes back to `/auth/send-code`).

This flow mirrors the backend behavior defined in `server-strategy` and Confluence (`5.1 – Authentication`) while following the shared shell experience.

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
    components/
      ai/AiAssistantPanel.tsx
      command-palette/CommandPalette.tsx
      layout/
        AppShell.tsx
        TopBar.tsx
        Sidebar.tsx
        InspectorPanel.tsx
    features/
      auth/
        api/authClient.ts
        components/
          AuthEmailForm.tsx
          AuthCodeForm.tsx
        hooks/useAuth.ts
        pages/
          SendCodePage.tsx
          VerifyCodePage.tsx
          LoggedInPage.tsx
        AuthSectionRoutes.tsx
    pages/
      DashboardPage.tsx
      ActivityPage.tsx
      ProfilePage.tsx
      NotFoundPage.tsx
    styles/globals.css
    theme/tokens.ts
    App.tsx              # AppRoutes with BrowserRouter + AppShell
    main.tsx             # React root
    __tests__/
      authFlow.test.tsx  # Tests for basic auth flow behavior
      appShell.test.tsx  # Shell + command palette + AI panel tests
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

- Component tests around the auth forms, AppShell, command palette, and AI stub.
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
