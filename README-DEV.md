# SunnahReads (Dev)

Developer-focused notes for working on the dev branch.

## Branching and PRs
- Base branches: `main` (stable), `dev` (integration)
- Feature branches: `type/short-description` (e.g., `feat/add-search`, `chore/add-readmes`)
- Open PRs from feature branches into `dev`. Periodically merge `dev` into `main`.

## Environments
- Local dev runs against your own Postgres instance.
- Configure `.env` (see below). Use different DBs per developer when possible.

## Setup
```bash
pnpm install
cp .env.example .env # if present; otherwise create .env (see below)
```

### .env template
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
PAYLOAD_SECRET=replace-with-a-long-random-string
DATABASE_URI=postgres://USER:PASSWORD@HOST:5432/DB_NAME

# Optional S3 storage
S3_ENDPOINT=
S3_REGION=
S3_BUCKET=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
```

## Run
```bash
pnpm dev
```
- App: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`

## Build and Serve
```bash
pnpm build
pnpm start
```

## Coding Standards
- TypeScript: prefer explicit types on exports and public APIs
- Keep components small and focused; avoid deep prop drilling
- Use early returns and avoid unnecessary try/catch blocks
- Only add non-obvious comments (reasoning, invariants, edge cases)

## Directory Pointers
- `src/collections` — Payload collections (Books, Authors, Media, Users)
- `src/app/(payload)` — Admin and API routes
- `src/app/(app)` — User-facing routes
- `src/components` — UI and layout

## GraphQL
- Endpoint: `/api/graphql`
- Playground: `/api/graphql-playground`

## Common Scripts
- `pnpm dev` — Dev server (Turbopack)
- `pnpm build` — Build
- `pnpm start` — Production server
- `pnpm lint` — ESLint

## Releasing
- Ensure `dev` is green before merging to `main`
- Squash merge feature PRs for a clean history
