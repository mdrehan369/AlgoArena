# AlgoArena

A scalable competitive coding platform where users can solve programming problems, compete in contests, and battle friends in real time inside custom rooms with a live leaderboard.

---

## Overview

AlgoArena is a full-stack online judge system built as a Turborepo monorepo. Users can browse and solve coding problems across multiple languages, track their submission stats, and take part in contests. The standout feature is **custom battle rooms** — users can create a private room, invite friends, and compete head-to-head on a set of problems with a live-updating leaderboard, turning practice into a real-time competitive experience.

Under the hood, submitted code runs in **isolated, resource-limited Docker containers**, dispatched through a Kafka-based message queue to a dedicated runner service — the same architectural pattern used by real online judges to safely execute untrusted user code at scale.

---

## Key Features

- **Custom battle rooms** — create a room, invite friends, and compete live with a real-time leaderboard
- **Contests** — daily, weekly, biweekly, monthly, and local contests with public/private visibility and invite-only participation
- **Multi-language code execution** — supports C++, C, JavaScript, and Python
- **Sandboxed code execution** — user-submitted code runs in isolated Docker containers with runtime and memory limits, managed via Dockerode
- **Asynchronous judging pipeline** — submissions are queued and processed through Kafka, decoupling the API from code execution
- **Problem catalog** — problems organized by topic (arrays, graphs, DP, and more) and difficulty level, with example and hidden test cases
- **Authentication** — email/password plus GitHub and Google OAuth via Better Auth
- **Submission tracking** — per-user stats, acceptance rates, and submission history
- **API documentation** — auto-generated via Swagger/OpenAPI

---

## Architecture

AlgoArena is composed of independently deployable services within a single monorepo:

```
apps/
├── backend/    # Fastify API — auth, problems, submissions, room/contest logic
├── runner/     # Kafka consumer service — executes submitted code in sandboxed Docker containers
└── web/        # Next.js frontend — problem pages, code editor, rooms, profile & stats

packages/
├── db/                 # Prisma schema, migrations, and shared DB client (PostgreSQL)
├── eslint-config/       # Shared lint configuration
└── typescript-config/   # Shared TypeScript configuration
```

**Submission flow:** the frontend sends code to the backend API → the backend publishes a job to Kafka → the runner service consumes the job, spins up a sandboxed Docker container to execute the code against test cases, and reports the result back → results and stats are persisted via Prisma/PostgreSQL and reflected live in rooms/leaderboards.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, Redux Toolkit, TanStack Query, Mantine UI, Tailwind CSS |
| Backend API | Node.js, Fastify, Swagger/OpenAPI |
| Code Execution | Dockerode (sandboxed Docker containers), Kafka (KafkaJS) |
| Database | PostgreSQL, Prisma ORM |
| Auth | Better Auth (email/password, GitHub OAuth, Google OAuth) |
| Monorepo Tooling | Turborepo, npm workspaces |
| Containerization | Docker, Docker Compose |
| Code Quality | ESLint, Prettier, Husky |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- Docker & Docker Compose
- npm

### Installation

```bash
git clone https://github.com/mdrehan369/AlgoArena.git
cd AlgoArena
npm install
```

### Environment Variables

Each app (`apps/backend`, `apps/web`, `packages/db`) expects its own environment configuration — including `DATABASE_URL` for PostgreSQL, Kafka broker settings, and OAuth credentials (`GITHUB_CLIENT_ID`/`SECRET`, `GOOGLE_CLIENT_ID`/`SECRET`) for the web app. Refer to each app's config files under `src/config` / `config` for the full list of required variables.

### Running with Docker Compose (recommended)

This spins up PostgreSQL, runs migrations, and starts the backend and web services:

```bash
docker compose up
```

- Web app: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- Prisma Studio (DB browser): `http://localhost:5555`

### Running Locally (development)

```bash
# Start backend and web concurrently
npm run dev
```

This runs the `backend` and `web` workspaces in parallel via Turborepo. The `runner` service and Kafka broker need to be running separately for code execution to work end-to-end.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Run backend and web apps concurrently |
| `npm run build` | Build all apps and packages via Turborepo |
| `npm run lint` | Lint all workspaces |
| `npm run format` | Format the codebase with Prettier |
| `npm run check-types` | Type-check all workspaces |

---

## Roadmap

- [ ] Expanded language support for code execution
- [ ] Global and per-contest leaderboards
- [ ] Rate limiting on submission endpoints
- [ ] CI/CD pipeline

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## Author

**MD Rehan**
[GitHub](https://github.com/mdrehan369) · [LinkedIn](https://linkedin.com/in/md-rehan-169411232)

---

[![License: MIT](https://shields.io)](LICENSE)
