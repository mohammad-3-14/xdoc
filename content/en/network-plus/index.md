---
title: Network plus
description: A practical, non-exhaustive checklist for web app and server security.
category: security
tags: [security, checklist]
date: 2026-02-10
updatedAt: 2026-07-08
draft: false
navigation:
  title: Overview
  icon: i-lucide-network
---

# Security Checklist

A running list of practical security reminders — not exhaustive, but the things that
matter most on real projects.

## Application layer

- Validate and sanitize all input server-side, even if client-side validation exists —
  the client can always be bypassed.
- Use parameterized queries / an ORM's query builder. Never string-concatenate SQL.
- Escape output based on context (HTML, attribute, JS, URL) — a single "escape
  everything the same way" approach usually gets contexts wrong.
- Set `httpOnly`, `Secure`, and `SameSite` on session cookies.
- Rate-limit authentication endpoints and anything that sends email/SMS.

```php
// Bad — string concatenation
$query = "SELECT * FROM users WHERE email = '$email'";

// Good — parameterized
$stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');
$stmt->execute([$email]);
```

## Secrets

- Never commit `.env` files or API keys — use `.gitignore` and a secrets manager for
  production.
- Rotate credentials after any suspected exposure (leaked log, public repo, ex-employee
  offboarding).
- Prefer short-lived tokens over long-lived static API keys where the service supports
  it.

## Server / infrastructure

- Keep the OS and package manager up to date; automate security patches where
  feasible.
- Close unused ports; only expose what's actually needed (80/443 for a web app, not the
  database port, to the public internet).
- Use SSH key auth, disable password auth, disable root login over SSH.
- Put a firewall (ufw, security groups, etc) in front of everything, default-deny.

## Headers worth setting

```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

## Dependencies

- Run `pnpm audit` / `npm audit` (or the language-appropriate equivalent) regularly,
  not just at project start.
- Pin lockfiles in version control — reproducible installs prevent "it worked
  yesterday" supply-chain surprises.
- Be wary of postinstall scripts from packages you don't recognize; review before
  approving build scripts.

## Backups

- Test restores, not just backups — an untested backup is a hope, not a plan.
- Keep at least one backup copy off the primary infrastructure (different provider or
  offline).

This list grows as new lessons get learned the hard way.
