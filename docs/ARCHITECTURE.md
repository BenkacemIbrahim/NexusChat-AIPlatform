# Architecture Overview

## System Context

The platform is split into two deployable applications:

- `frontend` (Next.js): renders UI and sends HTTP requests to the backend API.
- `backend` (Laravel): handles auth, persistence, and external AI provider calls.

## High-Level Flow

1. User signs up or logs in from the frontend.
2. Frontend stores Sanctum token in `localStorage`.
3. Frontend includes `Authorization: Bearer <token>` on protected requests.
4. Backend validates token (`auth:sanctum`) and executes requested action.
5. For `/api/chat`, backend stores the user message, calls Groq, stores assistant reply, and returns both.

## Backend Components

- Routing: `backend/routes/api.php`
- Auth logic: `backend/app/Http/Controllers/AuthController.php`
- Chat orchestration: `backend/app/Http/Controllers/ChatController.php`
- Message read/write: `backend/app/Http/Controllers/MessageController.php`
- External AI call: `backend/app/Services/GroqService.php`
- Data models: `backend/app/Models/User.php`, `backend/app/Models/Message.php`

## Frontend Components

- Global auth state: `frontend/hooks/use-auth.tsx`
- API URL config: `frontend/lib/config.ts`
- Chat shell: `frontend/components/chat/authenticated-chat.tsx`
- Message rendering: `frontend/components/chat-interface.tsx`, `frontend/components/chat-message.tsx`

## Data Model

### `users`

- `id`, `name`, `email`, `password`
- `plan` (`free | pro | enterprise`)
- `preferences` (JSON)

### `messages`

- `id`, `user_id`
- `role` (`system | user | assistant`)
- `content` (long text)
- `model` (nullable)

## Security Model

- Backend endpoints are protected by Sanctum bearer tokens.
- Chat requests enforce ownership (`userId` must equal authenticated user id).
- CORS explicitly allows local frontend origins for development.

## Operational Notes

- Frontend and backend can be deployed independently.
- CI workflow validates:
  - backend tests
  - frontend lint, typecheck, and production build
