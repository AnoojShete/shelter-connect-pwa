# ShelterConnect — System Architecture

## Overview

ShelterConnect is a full-stack Progressive Web Application (PWA) for locating nearby shelters, accessing emergency resources, and managing shelter data. It follows a **client-server architecture** with clear separation between the Next.js frontend and the Express.js RESTful API backend.

---

## Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                                │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │              Next.js 15 (App Router, SSR/CSR)                │  │
│  │                                                              │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │  │
│  │  │   Home   │  │ Shelters │  │Emergency │  │  Profile   │  │  │
│  │  │  (SSR)   │  │  (SSR)   │  │  (SSR)   │  │  (CSR)     │  │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └────────────┘  │  │
│  │                                                              │  │
│  │  ┌──────────────┐  ┌──────────┐  ┌────────────────────┐    │  │
│  │  │ AuthContext   │  │  Header  │  │    BottomNav       │    │  │
│  │  │ (JWT + Cookie)│  │(Reactive)│  │ (4 tabs)           │    │  │
│  │  └──────────────┘  └──────────┘  └────────────────────┘    │  │
│  └──────────────────────────────────────────────────────────────┘  │
│              │ HTTP (fetch, credentials: include)                   │
└──────────────┼─────────────────────────────────────────────────────┘
               │
               ▼
┌────────────────────────────────────────────────────────────────────┐
│                       MIDDLEWARE CHAIN                              │
│                                                                    │
│  Request → [Helmet/HSTS] → [CORS] → [Correlation ID] →           │
│            [Body Parser] → [Cookie Parser] → [Morgan Logger] →    │
│            [Rate Limiter] → [Audit Logger] →                      │
│            [Route Handler] → [Error Handler] → Response           │
└──────────────┬─────────────────────────────────────────────────────┘
               │
┌──────────────┼─────────────────────────────────────────────────────┐
│              ▼         API LAYER (Express.js)                      │
│                                                                    │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────────┐     │
│  │  Auth Routes   │  │ Shelter Routes │  │ Emergency Routes │     │
│  │  POST /login   │  │  GET /         │  │  GET /contacts   │     │
│  │  POST /register│  │  GET /:id      │  │  GET /tips       │     │
│  │  POST /refresh │  │  POST /        │  └──────────────────┘     │
│  │  POST /logout  │  │  PUT /:id      │                           │
│  │  GET /me       │  │  DELETE /:id   │                           │
│  └────────────────┘  └────────────────┘                           │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Auth Middleware                            │  │
│  │  authenticateToken → authorizeRole('admin') → Controller     │  │
│  └──────────────────────────────────────────────────────────────┘  │
└──────────────┬─────────────────────────────────────────────────────┘
               │
┌──────────────┼─────────────────────────────────────────────────────┐
│              ▼          DATA LAYER (MongoDB + Mongoose)             │
│                                                                    │
│  ┌──────────┐  ┌──────┐  ┌──────────────────┐  ┌──────────┐      │
│  │ Shelters │  │Users │  │EmergencyContacts │  │SafetyTips│      │
│  └──────────┘  └──────┘  └──────────────────┘  └──────────┘      │
│                                                                    │
│  ┌──────────────────┐  ┌──────────────────┐                       │
│  │ TokenBlacklist   │  │    AuditLog      │                       │
│  │ (TTL: on expiry) │  │  (TTL: 90 days)  │                       │
│  └──────────────────┘  └──────────────────┘                       │
└────────────────────────────────────────────────────────────────────┘
```

## Authentication Flow

```
┌──────────┐         ┌─────────┐           ┌──────────┐
│  Client  │         │   API   │           │ MongoDB  │
└────┬─────┘         └────┬────┘           └────┬─────┘
     │  POST /login       │                     │
     │───────────────────>│  Verify credentials │
     │                    │────────────────────>│
     │                    │<────────────────────│
     │  Access Token (body) + Refresh Token (httpOnly cookie)
     │<───────────────────│                     │
     │                    │                     │
     │  GET /shelters     │                     │
     │  Authorization:    │                     │
     │  Bearer <access>   │                     │
     │───────────────────>│  Verify JWT         │
     │                    │  Fetch shelters     │
     │                    │────────────────────>│
     │<───────────────────│<────────────────────│
     │                    │                     │
     │  POST /refresh     │                     │
     │  (cookie auto-sent)│                     │
     │───────────────────>│  Verify refresh     │
     │                    │  Blacklist old      │
     │                    │────────────────────>│
     │  New Access Token  │                     │
     │<───────────────────│                     │
     │                    │                     │
     │  POST /logout      │                     │
     │───────────────────>│  Blacklist refresh  │
     │                    │────────────────────>│
     │  Clear cookie      │                     │
     │<───────────────────│                     │
```

## Technology Stack

| Layer       | Technology          | Purpose                              |
|-------------|---------------------|--------------------------------------|
| Frontend    | Next.js 15 (React)  | SSR/CSR, App Router, PWA             |
| Styling     | Tailwind CSS v4     | Utility-first CSS framework          |
| Backend     | Express.js          | RESTful API server                   |
| Database    | MongoDB + Mongoose  | Document database with ODM           |
| Auth        | JWT + bcrypt        | Token-based auth with password hash  |
| Security    | Helmet, CORS, Rate Limiter | HTTP security hardening        |
| Logging     | Morgan + Audit Log  | Request and security event logging   |
