# motorhub-web

React frontend for the MotorHub API. Vite + React 19 + TypeScript, Tailwind CSS v4
with shadcn/ui, TanStack Query, Zustand, React Hook Form + Zod, and axios.
Typography is Inter, self-hosted via `@fontsource-variable/inter`.

## Prerequisites

- Node.js 20+
- The backend running locally — the .NET solution in `../motorhub-api`

## Setup

```bash
npm install
cp .env.example .env   # then set VITE_API_BASE_URL
npm run dev
```

### Environment

| Variable            | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `VITE_API_BASE_URL` | Base URL of the MotorHub API, e.g. `https://localhost:7123` |

The app throws a clear error on startup if this is missing, rather than silently
issuing relative requests against the dev server.

> **HTTPS note:** in development the backend uses a self-signed localhost
> certificate. If it is not trusted, every request fails opaquely in the browser
> with no useful error. Run `dotnet dev-certs https --trust` once.

## Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server            |
| `npm run build`   | Type-check (`tsc -b`) and build      |
| `npm run lint`    | Run ESLint                           |
| `npm run preview` | Serve the production build locally   |

## Structure

```
src/
├─ api/           axios instance + auth/401 interceptors
├─ components/    shared/ (app components) and ui/ (shadcn primitives)
├─ context/       React context objects
├─ hooks/         useAuth, useTheme
├─ lib/           utils (cn), apiError
├─ models/        API DTOs and Zod schemas
├─ pages/         route components
├─ providers/     ThemeProvider
├─ routes/        router, path constants, route guards
├─ services/      API call wrappers
└─ store/         Zustand stores
```

## Auth

Login returns a JWT that is decoded client-side for the user's profile claims and
stored in `localStorage`. `apiClient` attaches it as a `Bearer` token on every
request; a `401` response clears the session, and the route guards redirect to
`/auth/login`. Expired or corrupt stored sessions are discarded on startup.

## Theming

`ThemeProvider` (`src/providers/ThemeProvider.tsx`) toggles the `dark` class on
`<html>`, which drives the Tailwind v4 tokens in `src/index.css`. It supports
`light`, `dark`, and `system`, persisting the choice under the `motorhub-theme`
localStorage key. An inline script in `index.html` applies the same class before
first paint to avoid a flash of the wrong theme — keep the two in sync.
