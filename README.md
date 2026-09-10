# chat-app

React frontend for a realtime chat app, authenticated with Google Sign-In. Talks to [chat-app-backend](https://github.com/jesusgabri3l/chat-app-backend) over REST (message history) and Socket.IO (realtime messages).

Live at [jesusgabri3l.github.io/chat-app](https://jesusgabri3l.github.io/chat-app/) (backend runs on Render's free tier — sleeps on inactivity, first login after idle can take ~30-50s while it wakes up).

## Stack

- Vite + React 19 + TypeScript 5
- `@react-oauth/google` (Google Identity Services) for sign-in — the old `react-google-login` package relied on the legacy Google Sign-In JS library, which Google shut down in 2023
- `socket.io-client` for realtime messages
- Sass

## Local development

```bash
cp .env.example .env   # fill in real values
npm install
npm run dev
```

Required env vars (see `.env.example`):

- `VITE_API_URL` — the backend URL, trailing slash included (e.g. `http://localhost:5000/`)
- `VITE_GOOGLE_CLIENT_ID` — Google OAuth Client ID, must match the one [chat-app-backend](https://github.com/jesusgabri3l/chat-app-backend) verifies tokens against

The backend's `CLIENT_ORIGIN` env var must include this app's origin (e.g. `http://localhost:5173` in dev, `https://jesusgabri3l.github.io` in production) or CORS/Socket.IO will reject requests.

## Scripts

- `npm run dev` — dev server
- `npm run build` — type-check and build to `dist`
- `npm test` — Vitest
- `npm run lint` — ESLint
- `npm run format` — Prettier

## Deploy

GitHub Pages via `.github/workflows/deploy.yml`, triggered on push to `master`. It needs two repo variables (not secrets — a Google Client ID and a backend URL aren't sensitive):

```bash
gh variable set VITE_API_URL --body "https://<your-backend>.onrender.com/"
gh variable set VITE_GOOGLE_CLIENT_ID --body "<client-id>.apps.googleusercontent.com"
```

Pages must be switched to "GitHub Actions" as the source: `gh api -X PUT repos/<owner>/chat-app/pages -f build_type=workflow`.
