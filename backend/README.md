# Backend (Laravel API)

REST API for authentication, message history, and AI chat completions.

## Stack

- Laravel 11
- PHP 8.2+
- MySQL / MariaDB
- Laravel Sanctum (Bearer tokens)
- Groq API (LLM inference)

## Setup

```bash
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

API default URL: `http://localhost:8000`

## Required Configuration

Set these in `backend/.env`:

- `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`
- `GROQ_API_KEY`

Optional overrides:

- `GROQ_BASE_URI` (default `https://api.groq.com/openai/v1`)
- `GROQ_CHAT_PATH` (default `/chat/completions`)
- `GROQ_DEFAULT_MODEL` (default `llama-3.3-70b-versatile`)

## API Endpoints

Base path: `/api`

Public:

- `POST /register`
- `POST /login`

Authenticated (`Authorization: Bearer <token>`):

- `POST /logout`
- `GET /me`
- `GET /messages`
- `POST /messages`
- `POST /chat`

Full request/response details are documented in `docs/API.md`.

## Core Files

- Routes: `backend/routes/api.php`
- Auth controller: `backend/app/Http/Controllers/AuthController.php`
- Chat controller: `backend/app/Http/Controllers/ChatController.php`
- Messages controller: `backend/app/Http/Controllers/MessageController.php`
- Groq client: `backend/app/Services/GroqService.php`

## Testing

```bash
php artisan test
```

## Notes

- CORS for local dev is configured in `backend/config/cors.php`.
- The API enforces user ownership in chat requests (`userId` must match the authenticated user).
