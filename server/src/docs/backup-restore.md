# ShelterConnect — Backup & Restore Procedures

## Overview

This document outlines procedures for backing up and restoring the ShelterConnect MongoDB database using `mongodump` and `mongorestore`.

---

## Prerequisites

- MongoDB tools installed (`mongodump`, `mongorestore`)
- Access to the MongoDB instance (connection string in `.env`)
- Sufficient disk space for backup files

---

## 1. Full Database Backup

### Manual Backup

```bash
# Create a timestamped backup directory
mongodump --uri="mongodb://localhost:27017/shelterconnect" --out="./backups/$(date +%Y%m%d_%H%M%S)"
```

### Scheduled Backup (cron)

```bash
# Add to crontab (daily at 2 AM)
0 2 * * * mongodump --uri="mongodb://localhost:27017/shelterconnect" --out="/backups/shelterconnect_$(date +\%Y\%m\%d)" --gzip 2>&1 | logger -t mongodb-backup
```

### Backup Specific Collections

```bash
# Backup only shelters and users
mongodump --uri="mongodb://localhost:27017/shelterconnect" --collection=shelters --out="./backups/shelters_only"
mongodump --uri="mongodb://localhost:27017/shelterconnect" --collection=users --out="./backups/users_only"
```

---

## 2. Database Restore

### Full Restore

```bash
# Restore entire database (CAUTION: overwrites existing data)
mongorestore --uri="mongodb://localhost:27017/shelterconnect" --drop "./backups/20240401_020000/shelterconnect"
```

### Restore Specific Collection

```bash
# Restore only shelters
mongorestore --uri="mongodb://localhost:27017/shelterconnect" --collection=shelters --drop "./backups/20240401_020000/shelterconnect/shelters.bson"
```

---

## 3. Data Integrity Checks

After restoring, verify data integrity:

```bash
# Check document counts
mongosh --eval '
  const db = connect("mongodb://localhost:27017/shelterconnect");
  print("Shelters:", db.shelters.countDocuments());
  print("Users:", db.users.countDocuments());
  print("EmergencyContacts:", db.emergencycontacts.countDocuments());
  print("SafetyTips:", db.safetytips.countDocuments());
  print("AuditLogs:", db.auditlogs.countDocuments());
  print("TokenBlacklist:", db.tokenblacklists.countDocuments());
'
```

---

## 4. Re-seed from Application Data

If backups are unavailable, re-seed the database with built-in seed data:

```bash
cd server
npm run seed
```

> **Note:** This only populates shelters, emergency contacts, and safety tips. User accounts and audit logs will be lost.

---

## 5. Backup Retention Policy

| Backup Type | Retention | Storage |
|-------------|-----------|---------|
| Daily       | 7 days    | Local disk |
| Weekly      | 4 weeks   | Off-site / cloud |
| Monthly     | 12 months | Off-site / cloud |

- Delete daily backups older than 7 days automatically
- Compress backups with `--gzip` flag to save space
- Store off-site backups in a separate location/cloud storage

---

## 6. Emergency Recovery Procedure

1. Stop the application server
2. Identify the latest valid backup
3. Restore from backup using `mongorestore --drop`
4. Verify data integrity (see section 3)
5. Rotate `JWT_SECRET` and `REFRESH_SECRET` (forces re-authentication)
6. Restart the application server
7. Monitor audit logs for 48 hours
