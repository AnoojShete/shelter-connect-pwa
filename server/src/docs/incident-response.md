# ShelterConnect — Incident Response Checklist

## Purpose

This document defines the step-by-step procedure for responding to security incidents affecting ShelterConnect.

---

## Severity Levels

| Level | Description | Examples | Response Time |
|-------|-------------|----------|---------------|
| P1 — Critical | System compromised, data breach | DB leaked, admin credentials compromised | Immediate |
| P2 — High | Active attack, partial outage | DDoS, brute-force in progress | Within 1 hour |
| P3 — Medium | Vulnerability discovered | Dependency CVE, config leak | Within 24 hours |
| P4 — Low | Minor issue, no active impact | Unused endpoint, minor log issue | Within 1 week |

---

## Incident Response Steps

### 1. Detection & Identification
- [ ] Check the **AuditLog** collection for suspicious patterns (unusual IPs, failed logins, bulk deletes)
- [ ] Check **morgan** request logs for anomalous traffic patterns
- [ ] Review **Correlation IDs** to trace the full lifecycle of suspicious requests
- [ ] Check `npm audit` output for new dependency vulnerabilities
- [ ] Query: `db.auditlogs.find({ action: 'LOGIN', statusCode: 401 }).sort({ timestamp: -1 }).limit(50)`

### 2. Containment
- [ ] If credentials compromised: rotate `JWT_SECRET` and `REFRESH_SECRET` in `.env` (invalidates ALL tokens)
- [ ] If user account compromised: set `lockUntil` to a far-future date in the User document
- [ ] If API under DDoS: lower rate limiter thresholds temporarily
- [ ] If database breach: take the server offline, take a snapshot of current state

### 3. Eradication
- [ ] Identify the attack vector (check audit logs, server logs, dependency audit)
- [ ] Patch the vulnerability (update code, dependencies, or configuration)
- [ ] Remove any unauthorized data or accounts
- [ ] Force all users to re-authenticate by rotating JWT secrets

### 4. Recovery
- [ ] Restore from MongoDB backup if data was corrupted (see `backup-restore.md`)
- [ ] Deploy patched version of the application
- [ ] Verify all endpoints work correctly with health check: `GET /api/health`
- [ ] Monitor audit logs for 48 hours to confirm no recurrence

### 5. Post-Incident Review
- [ ] Document the timeline: detection → containment → resolution
- [ ] Update this checklist if gaps were identified
- [ ] Update the threat model with any new threats discovered
- [ ] Run `npm audit` and update dependencies
- [ ] Brief the team on lessons learned

---

## Emergency Contacts

| Role | Responsibility |
|------|---------------|
| Lead Developer | Code fixes, deployment |
| Database Admin | MongoDB backup/restore |
| System Admin | Server access, firewall rules |

---

## Quick Commands

```bash
# Check recent failed logins
mongosh --eval 'db.auditlogs.find({action:"LOGIN",statusCode:401}).sort({timestamp:-1}).limit(20).pretty()'

# Check token blacklist size
mongosh --eval 'db.tokenblacklists.countDocuments({})'

# Force-lock a user account
mongosh --eval 'db.users.updateOne({email:"attacker@example.com"},{$set:{lockUntil:new Date("2099-01-01")}})'

# Rotate secrets (restart required)
# Edit .env → change JWT_SECRET and REFRESH_SECRET → restart server

# Run dependency audit
npm audit --production
```
