# Agent Instructions

This file provides context and guidelines for AI coding agents working on this project.

## Project Overview

Ledger is a personal finance dashboard. Users upload a bank statement PDF and get an automatic breakdown of their transactions, totals and spending patterns. The motivation is to avoid manually entering transactions into an app — the bank already has all the data.

## Repository Structure

```
ledger/
├── backend/     # Python API (FastAPI + SQLite)
└── frontend/    # React SPA (Vite + TypeScript + shadcn/ui)
```

Both are independent projects. The backend runs on port `8000`, the frontend on port `5173`.

## Backend

- **Language**: Python
- **Framework**: FastAPI
- **Database**: SQLite (`backend/dev.db`) via SQLAlchemy ORM
- **Migrations**: Alembic (`backend/alembic/`)
- **Entry point**: `backend/main.py`

### Layer responsibilities

| Layer | Path | Responsibility |
|-------|------|----------------|
| API | `backend/api/` | HTTP route handlers, FastAPI routers |
| Services | `backend/services/` | Business logic orchestration |
| Repository | `backend/repository/` | Database read/write operations |
| Models | `backend/models/` | SQLAlchemy ORM table definitions |
| Schema | `backend/schema/` | Pydantic request/response models |
| Utils | `backend/utils/` | PDF extraction (Camelot) and DataFrame processing (Pandas) |

### Key constants

Defined in `backend/constants.py`:
- `TOP_N_TRANSACTIONS = 3` — number of top income/expense transactions to store
- `DATE_PATTERN_REGEX` — regex used to identify transaction rows in PDF tables
- `DECIMAL_CASE_ROUND = 2` — rounding precision for currency values

### Running the backend

```bash
cd backend
source .venv/bin/activate
uvicorn main:app --reload
```

## Frontend

- **Language**: TypeScript
- **Framework**: React 19 with Vite 7
- **Styling**: Tailwind CSS v4 + shadcn/ui (radix-nova style, neutral base)
- **HTTP client**: Axios (`src/service/client.ts` — base URL `http://localhost:8000/api`)
- **Charts**: Recharts
- **Entry point**: `frontend/src/main.tsx`

### Directory structure

| Path | Responsibility |
|------|----------------|
| `src/components/dashboard/` | Dashboard section components (Header, SummaryCards, CashFlowChart, TopTransactions, TransactionHistory) |
| `src/components/ui/` | shadcn/ui primitives — do not edit manually, use `npx shadcn add` |
| `src/components/ThemeProvider.tsx` | React context for dark/light/system theme — applies `.dark` class to `<html>` |
| `src/components/ThemeToggle.tsx` | Dropdown button to switch theme |
| `src/data/StatementDtos.ts` | Frontend-facing TypeScript interfaces (camelCase) |
| `src/data/StatementDaos.ts` | API response interfaces (snake_case) — mirror of the backend JSON shape |
| `src/service/StatementService.ts` | API call logic |
| `src/service/adapters/StatementDataAdapter.ts` | Maps snake_case API response to camelCase DTOs |
| `src/lib/utils.ts` | `cn()` class helper and `formatCurrency()` (EUR, pt-PT locale) |

### Running the frontend

```bash
cd frontend
npm install
npm start
```

### Adding shadcn/ui components

```bash
cd frontend
npx shadcn add <component-name>
```

Never edit files under `src/components/ui/` manually.

## Theming

Theme is class-based. Adding `class="dark"` to `<html>` switches all CSS variables defined in `src/index.css`. Components use Tailwind semantic classes (`bg-background`, `text-foreground`, etc.) which reference those variables — no component-level theme logic needed.

Theme preference is persisted in `localStorage` under the key `ledger-ui-theme`.

## API

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/statement` | Upload a PDF, returns a processed `Statement` object |

Request: `multipart/form-data` with a `file` field (PDF bytes).

## Conventions

- **Backend**: follow existing layered architecture — routes call services, services call repositories, repositories call the ORM
- **Frontend**: new UI sections go in `src/components/dashboard/`, reusable primitives go in `src/components/ui/` (via shadcn)
- **Types**: API response shapes go in `StatementDaos.ts`, frontend interfaces go in `StatementDtos.ts`, the adapter in `StatementDataAdapter.ts` converts between them
- **Currency formatting**: always use `formatCurrency()` from `src/lib/utils.ts`
- **Icons**: use `lucide-react`
