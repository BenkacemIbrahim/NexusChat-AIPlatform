# Security Policy

## Reporting a Vulnerability

If you discover a security issue, please do not open a public GitHub issue.

Please report it privately to the maintainers with:

- clear summary of the issue
- impact and affected components
- reproduction steps or proof of concept
- suggested mitigation (if available)

## Response Process

1. Acknowledge report within 3 business days.
2. Reproduce and assess severity.
3. Prepare and test a fix.
4. Coordinate disclosure and release notes.

## Scope Notes

- Secrets in `.env` files must never be committed.
- API keys used for local development should be rotated immediately if exposed.
- Dependencies should be reviewed regularly (`npm audit`, `composer audit`).
