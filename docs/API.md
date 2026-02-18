# API Reference

Base URL (local): `http://localhost:8000/api`

All requests/responses use JSON.

## Authentication

Protected endpoints require:

```http
Authorization: Bearer <token>
Accept: application/json
```

## Endpoints

### `POST /register`

Create a new user and return token.

Request:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "StrongPass123"
}
```

Response `201`:

```json
{
  "user": {
    "id": "1",
    "email": "jane@example.com",
    "name": "Jane Doe",
    "plan": "free",
    "preferences": {
      "theme": "system",
      "language": "en",
      "aiPersona": "professional",
      "voiceEnabled": false,
      "highContrast": false,
      "fontSize": "medium"
    }
  },
  "token": "..."
}
```

### `POST /login`

Request:

```json
{
  "email": "jane@example.com",
  "password": "StrongPass123"
}
```

Response `200`:

```json
{
  "user": { "...": "..." },
  "token": "..."
}
```

### `POST /logout`

Auth required.

Response `200`:

```json
{
  "message": "Logged out"
}
```

### `GET /me`

Auth required.

Response `200`:

```json
{
  "id": "1",
  "email": "jane@example.com",
  "name": "Jane Doe",
  "plan": "free",
  "preferences": { "...": "..." }
}
```

### `GET /messages`

Auth required.

Query params:

- `per_page` (optional, integer `1..200`, default `50`)

Response `200`:

```json
{
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "role": "user",
      "content": "Hello",
      "model": null
    }
  ],
  "meta": {
    "total": 1,
    "per_page": 50,
    "current_page": 1,
    "last_page": 1
  }
}
```

### `POST /messages`

Auth required.

Request:

```json
{
  "role": "user",
  "content": "Draft this email politely",
  "model": null
}
```

Response `201`:

```json
{
  "id": 12,
  "user_id": 1,
  "role": "user",
  "content": "Draft this email politely",
  "model": null
}
```

### `POST /chat`

Auth required.

Request:

```json
{
  "userId": 1,
  "message": "Explain vector databases in simple terms."
}
```

Success response `200`:

```json
{
  "userMessage": {
    "id": 100,
    "user_id": 1,
    "role": "user",
    "content": "Explain vector databases in simple terms.",
    "model": null
  },
  "assistantMessage": {
    "id": 101,
    "user_id": 1,
    "role": "assistant",
    "content": "A vector database stores embeddings...",
    "model": "llama-3.3-70b-versatile"
  }
}
```

Provider error response `422`:

```json
{
  "userMessage": { "...": "..." },
  "assistantMessage": null,
  "error": {
    "status": 401,
    "message": "Invalid API key",
    "type": "invalid_api_key",
    "code": "401"
  }
}
```

## Validation Summary

- `register.password`: min 8 chars
- `messages.content`: required string
- `chat.userId`: required existing user id, must match current authenticated user
- `chat.message`: required non-empty string
