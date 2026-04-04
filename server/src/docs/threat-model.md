# ShelterConnect — STRIDE Threat Model

## Application Overview

ShelterConnect is a public-facing PWA that handles user authentication, shelter data, and emergency information. This threat model uses the STRIDE methodology to identify and mitigate security threats.

---

## 1. Spoofing (Identity Threats)

| Threat | Risk | Mitigation |
|--------|------|------------|
| Stolen JWT access tokens | High | Short-lived tokens (15 min), httpOnly refresh cookies |
| Brute-force login attacks | High | Account lockout after 5 attempts (15-min), auth-specific rate limiting (5 req/15 min) |
| User enumeration via registration | Medium | Generic error messages ("Invalid email or password") |
| Token replay after logout | Medium | Refresh token blacklisting on logout + token rotation |

## 2. Tampering (Data Integrity)

| Threat | Risk | Mitigation |
|--------|------|------------|
| Modified request body | Medium | express-validator input validation and sanitization |
| XSS injecting malicious data | High | Helmet CSP headers, input escaping, React auto-escaping |
| SQL/NoSQL injection | High | Mongoose parameterized queries (never raw queries) |
| Tampered JWT tokens | High | JWT signature verification with secret key |

## 3. Repudiation (Deniability)

| Threat | Risk | Mitigation |
|--------|------|------------|
| User denies performing action | Medium | Audit logging with user ID, IP, timestamp, correlation ID |
| Admin denies deleting shelter | Medium | All mutating requests logged to AuditLog collection |
| Unable to trace request chain | Low | Correlation IDs on every request for end-to-end tracing |

## 4. Information Disclosure

| Threat | Risk | Mitigation |
|--------|------|------------|
| Stack traces leaked in production | High | Error handler sanitizes messages in production mode |
| Sensitive headers exposed | Medium | Helmet removes/sets security headers (X-Powered-By removed) |
| Password stored in plaintext | Critical | bcrypt hashing with salt rounds of 12 |
| Token stored in localStorage (XSS) | Medium | Refresh token in httpOnly cookie (immune to XSS) |
| .env committed to Git | Critical | .gitignore includes .env, .env.example provided instead |

## 5. Denial of Service (Availability)

| Threat | Risk | Mitigation |
|--------|------|------------|
| API flood attack | High | Global rate limiter: 100 req/15 min per IP |
| Auth endpoint abuse | High | Auth-specific rate limiter: 5 req/15 min per IP |
| Large payload attack | Medium | Body size limit (10kb) via express.json() |
| MongoDB connection exhaustion | Medium | Mongoose connection pooling (default) |

## 6. Elevation of Privilege

| Threat | Risk | Mitigation |
|--------|------|------------|
| Regular user creating shelters | High | `authorizeRole('admin')` middleware on admin routes |
| Self-assigned admin role | High | Role defaults to 'user'; admin assignment only via direct DB |
| Accessing other user's data | Medium | JWT contains user ID; queries scoped to authenticated user |
| Bypassing auth on protected routes | High | `authenticateToken` middleware enforces JWT on all protected routes |

---

## Risk Matrix Summary

| STRIDE Category | Critical | High | Medium | Low |
|-----------------|----------|------|--------|-----|
| Spoofing        | 0        | 2    | 2      | 0   |
| Tampering       | 0        | 2    | 1      | 0   |
| Repudiation     | 0        | 0    | 2      | 1   |
| Info Disclosure  | 1        | 2    | 2      | 0   |
| DoS             | 0        | 2    | 2      | 0   |
| EoP             | 0        | 3    | 1      | 0   |

All CRITICAL risks have been mitigated. All HIGH risks have active countermeasures.
