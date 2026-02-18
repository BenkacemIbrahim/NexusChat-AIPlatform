# AI Chat Platform

Production-style monorepo for a full-stack AI chat product:

- `backend/`: Laravel 11 REST API with Sanctum authentication and Groq integration
- `frontend/`: Next.js 15 application with a complete marketing + product UI and authenticated chat flow

## Highlights

- Token-based auth (`register`, `login`, `logout`, `me`) via Laravel Sanctum
- Persistent conversation history per user
- AI reply generation through Groq (`/api/chat`)
- Modern frontend built with App Router, Tailwind CSS, and reusable UI components
- CI-ready project structure with lint/type/build/test checks

## Monorepo Structure

```text
.
├── backend/                 # Laravel API
├── frontend/                # Next.js app
├── docs/
│   ├── API.md
│   ├── ARCHITECTURE.md
│   └── LINKEDIN_FEATURE.md
├── setup.sql                # Optional manual DB bootstrap
└── .github/workflows/ci.yml
```

## Prerequisites

- PHP 8.2+
- Composer
- Node.js 20+
- MySQL 8+ (or MariaDB)

## Quick Start

### 1) Clone and configure backend

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

### 2) Configure and run frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`

## Environment Variables

### Backend (`backend/.env`)

- `DB_*` variables for database connection
- `GROQ_API_KEY` (required for `/api/chat`)
- Optional:
  - `GROQ_BASE_URI` (default `https://api.groq.com/openai/v1`)
  - `GROQ_CHAT_PATH` (default `/chat/completions`)
  - `GROQ_DEFAULT_MODEL` (default `llama-3.3-70b-versatile`)

### Frontend (`frontend/.env.local`)

- `NEXT_PUBLIC_API_URL` (default `http://localhost:8000`)

## Scripts

### Backend

- `php artisan serve`
- `php artisan migrate`
- `php artisan test`

### Frontend

- `npm run dev`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Quality Status

Current local checks:

- `backend`: `php artisan test` passes
- `frontend`: `npm run lint`, `npm run typecheck`, and `npm run build` pass

## Documentation

- Architecture: `docs/ARCHITECTURE.md`
- API reference: `docs/API.md`
- Backend details: `backend/README.md`
- Frontend details: `frontend/README.md`
- LinkedIn-ready project summary: `docs/LINKEDIN_FEATURE.md`

## Open Source Standards

- Contribution guide: `CONTRIBUTING.md`
- Security policy: `SECURITY.md`
- Code of conduct: `CODE_OF_CONDUCT.md`
- Changelog: `CHANGELOG.md`

## License

Licensed under MIT. See `LICENSE`.
