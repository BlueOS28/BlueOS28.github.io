# ORM Setup Guide

## 1. Install ORM

Add the ORM to your project.

```bash
npm install prisma --save-dev
```

```bash
npx prisma init
```

## 2. Configure ORM

Set up your ORM configuration.

### Environment Variables (.env.local)

```env
# Connect to Postgres via the shared transaction-mode pooler (IPv4-only)
DATABASE_URL="postgresql://postgres.jlvlzzgpqhauyyeeiany:[YOUR-PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Connect to Postgres via the shared session-mode pooler (used for migrations)
DIRECT_URL="postgresql://postgres.jlvlzzgpqhauyyeeiany:[YOUR-PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:5432/postgres"
```

### Prisma Schema (prisma/schema.prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

## 3. Install Agent Skills (Optional)

Agent Skills give AI coding tools ready-made instructions, scripts, and resources for working with Supabase more accurately and efficiently.

```bash
npx skills add supabase/agent-skills
```
