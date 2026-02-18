# Contributing

## Development Setup

1. Fork and clone the repository.
2. Start backend:
   - `cd backend`
   - `cp .env.example .env`
   - `composer install`
   - `php artisan key:generate`
   - `php artisan migrate`
3. Start frontend:
   - `cd frontend`
   - `cp .env.example .env.local`
   - `npm install`
   - `npm run dev`

## Branch and PR Workflow

1. Create a branch from `main`:
   - `feat/<short-name>`
   - `fix/<short-name>`
   - `docs/<short-name>`
2. Keep PRs focused and small.
3. Include a clear description:
   - what changed
   - why it changed
   - how it was validated

## Validation Checklist

Before opening a PR, run:

- Backend: `php artisan test` (in `backend/`)
- Frontend:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`

## Coding Standards

- Prefer clear, maintainable changes over clever shortcuts.
- Keep side effects explicit.
- Update documentation for behavior or API changes.
- Do not commit secrets or private keys.

## Commit Message Guidance

Use concise, action-oriented commit messages, for example:

- `feat(api): add message creation endpoint`
- `fix(frontend): resolve chat message type mismatch`
- `docs: add architecture and api references`
