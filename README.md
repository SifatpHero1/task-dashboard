# 🚀 Task & Project Management Dashboard

A full-stack task management application built with **Next.js (App Router)**, **TypeScript**, **Prisma ORM** and **PostgreSQL** — featuring JWT authentication with **role-based access control (RBAC)**.

🔗 **Live Demo:** (coming soon — Vercel)

## 🛠️ Tech Stack
| Layer | Technology |
|---|---|
| Frontend | Next.js (App Router), TypeScript, Tailwind CSS |
| Backend | Next.js API Routes (REST) |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js (JWT) with ADMIN / USER roles |
| DevOps | GitHub Actions CI, PR template, branch workflow |

## ✨ Features
- 🔐 Secure credentials login (NextAuth JWT)
- 🛡️ Role-based access — ADMIN sees all tasks, USER sees own
- ✅ Full task **CRUD**: create, list, mark DONE, delete
- 🔒 API routes protected with ownership + admin checks (401/403)
- 🧱 Server Components for data fetching, Client Components for interactivity
- 🔄 CI pipeline: lint + prisma validate + build on every PR

## 🚀 Getting Started (Local)
**Prerequisites:** Node.js 18+, PostgreSQL running locally

```bash
git clone https://github.com/SifatpHero1/task-dashboard.git
cd task-dashboard
npm install

# 1. Create .env file
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
NEXTAUTH_SECRET="any-long-random-string"
NEXTAUTH_URL="http://localhost:3000"

# 2. Setup database + demo user
npx prisma db push
node prisma/seed.cjs

# 3. Run
npm run dev