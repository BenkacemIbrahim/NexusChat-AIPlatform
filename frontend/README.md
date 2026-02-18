# Frontend (Next.js App)

Next.js 15 client for the AI Chat platform. Includes marketing pages, auth flows, dashboard, and authenticated chat UI.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Radix + custom UI components

## Setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Default app URL: `http://localhost:3000`

## Environment Variables

`frontend/.env.local`:

- `NEXT_PUBLIC_API_URL=http://localhost:8000`

## Scripts

- `npm run dev` - start development server
- `npm run lint` - run ESLint
- `npm run typecheck` - run TypeScript checks
- `npm run build` - production build
- `npm run start` - start production server

## Key Areas

- Auth context: `frontend/hooks/use-auth.tsx`
- Chat page: `frontend/app/chat/page.tsx`
- Authenticated chat client: `frontend/components/chat/authenticated-chat.tsx`
- API URL config: `frontend/lib/config.ts`

## Build and Quality

This app is configured to fail build on type or lint errors.

Recommended local verification:

```bash
npm run lint
npm run typecheck
npm run build
```
