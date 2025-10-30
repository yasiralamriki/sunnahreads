# SunnahReads

A Next.js + Payload CMS app for discovering and browsing Islamic books and authors.

## Tech Stack
- Next.js (App Router)
- Payload CMS (Postgres)
- TypeScript
- Tailwind CSS + shadcn/ui

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm 9+
- A Postgres database (local or hosted)

### Installation
```bash
pnpm install
```

### Environment Variables
Create a `.env` file in the project root:
```bash
# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Payload CMS
PAYLOAD_SECRET=replace-with-a-long-random-string
DATABASE_URI=postgres://USER:PASSWORD@HOST:5432/DB_NAME

# File storage (S3-compatible) — optional if not using cloud storage
S3_ENDPOINT=
S3_REGION=
S3_BUCKET=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
```

### Development
```bash
pnpm dev
```
- App: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`

### Production
```bash
pnpm build
pnpm start
```

## Project Structure
- `src/app/(app)` — public pages (home, books, authors)
- `src/app/(payload)` — Payload admin, API routes, GraphQL
- `src/collections` — Payload collections (Books, Authors, Media, Users)
- `src/components` — UI components

## Useful Scripts
- `pnpm dev` — Start dev server (Turbopack)
- `pnpm build` — Build app
- `pnpm start` — Start production server
- `pnpm lint` — Run ESLint

## Admin Access
The Payload admin panel is served at `/admin`. You will create the first user on first run, unless seeding/custom auth is configured.

## GraphQL
- GraphQL endpoint: `/api/graphql`
- Playground: `/api/graphql-playground`

## License
MIT License — see `LICENSE`
