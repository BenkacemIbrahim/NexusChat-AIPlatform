# Changelog

All notable changes to this project are documented in this file.

## [0.1.0] - 2026-02-18

### Added

- Repository standards and governance files:
  - `CONTRIBUTING.md`
  - `SECURITY.md`
  - `CODE_OF_CONDUCT.md`
  - `CHANGELOG.md`
- Documentation set:
  - `docs/ARCHITECTURE.md`
  - `docs/API.md`
  - `docs/LINKEDIN_FEATURE.md`
- CI workflow: `.github/workflows/ci.yml`
- Frontend chat message type model: `frontend/lib/chat.ts`
- Backend request validation for manual message creation:
  - `backend/app/Http/Requests/MessageStoreRequest.php`

### Changed

- Reworked root, backend, and frontend README files for production-style onboarding.
- Fixed backend auth controller import for `Request`.
- Implemented `POST /api/messages` to create messages instead of returning `404`.
- Cleaned and normalized `.gitignore` files.
- Added editor and git normalization files:
  - `.editorconfig`
  - `.gitattributes`
- Updated frontend tooling and scripts:
  - production `start` script
  - ESLint flat config
  - explicit dependency versions for previously `latest`-pinned packages
- Resolved frontend type/build issues and ensured lint/typecheck/build pass.

### Fixed

- Corrupted `frontend/.gitignore` file encoding issue.
- Frontend Next.js dynamic route typing issue in `app/careers/apply/[jobId]/page.tsx`.
