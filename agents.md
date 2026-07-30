# Agent Instructions

This file provides context and guidelines for AI coding agents working on this project.

## Project Overview

Ledger is a personal finance dashboard. Users upload a bank statement PDF and get an
automatic breakdown of their transactions — totals, spending patterns, top movers, and
an AI-assigned category per transaction. The motivation is to avoid manually entering
transactions into an app: the bank already has all the data.

## Repository Structure

This is an **npm workspaces monorepo** (see the root `package.json` `workspaces` field):

```
ledger/
├── backend/       # Python API (FastAPI + SQLite via SQLAlchemy)
├── frontend/      # React SPA (Vite + TypeScript + Tailwind v4 + shadcn/ui)
├── mobile/        # React Native app (Expo + expo-router)
└── packages/
    └── api/       # @ledger/api — shared TS data types, API client, and React Query hooks
```

- The backend runs on port `8000`, the frontend (Vite) on port `5173`.
- `frontend` and `mobile` both depend on `@ledger/api` (`"@ledger/api": "*"`).
- Run `npm install` **at the repo root** — workspaces link the shared package automatically.

### The shared package (`@ledger/api`)

Frontend and mobile share their entire data/networking layer through this package instead
of duplicating it. It is consumed as **raw TypeScript source** — `main`/`types` point at
`./index.ts`, there is **no build step**. Each app's bundler (Vite / Metro) transpiles it.
After editing it, just save; if Metro doesn't pick up a change, restart with
`npx expo start -c`.

| Path | Responsibility |
|------|----------------|
| `data/StatementDaos.ts` | API response interfaces (snake_case) — mirror of the backend JSON |
| `data/StatementDtos.ts` | App-facing interfaces (camelCase), e.g. `IStatement`, `ITransaction` |
| `service/StatementService.ts` | API call logic (upload + fetch statement) |
| `service/adapters/StatementDataAdapter.ts` | Maps snake_case DAO → camelCase DTO |
| `service/client.ts` | Axios instance, base URL `http://localhost:8000/api` |
| `hooks/useStatementsQuery.ts` | React Query hook to fetch a month's statement |
| `hooks/useCreateStatementQuery.ts` | React Query mutation to upload a statement |
| `index.ts` | Barrel — re-exports everything above; import from `@ledger/api` |

Anything importing from `@/data/...` locally is stale — types now live in `@ledger/api`.

## Backend

- **Language**: Python
- **Framework**: FastAPI
- **Database**: SQLite via SQLAlchemy ORM (`DATABASE_URL` env var, loaded in `constants.py`)
- **Migrations**: Alembic (`backend/alembic/`)
- **PDF extraction**: Camelot (`utils/file_utils.py`)
- **AI**: OpenAI classification (`integrations/openai_api.py`)
- **Entry point**: `backend/main.py` (registers the statements router + exception handlers, CORS for `localhost:5173`)

The backend is organized by **feature module** (`statements/`) with a layered
controller → service → repository flow, plus supporting cross-cutting packages.

| Path | Responsibility |
|------|----------------|
| `statements/controller.py` | FastAPI router / HTTP route handlers |
| `statements/service.py` | Business orchestration (parse → validate → classify → persist) |
| `statements/repository.py` | SQLAlchemy read/write operations |
| `statements/adapter.py` | Ingestion adapter: DataFrame → `TransactionDTO` list (+ cleaning) |
| `db/database.py` | Engine, `SessionLocal`, `Base`, `get_db` dependency |
| `db/models/statement.py` | SQLAlchemy ORM models (`Statement`, `Transaction`) |
| `schemas/statement_dto.py` | Pydantic request/response models (`StatementDTO`, `TransactionDTO`) |
| `domain/transaction_builder.py` | Builds a `StatementDTO` (totals, growth rates) from ORM rows |
| `integrations/openai_api.py` | `classify_transactions()` — LLM category assignment |
| `utils/` | PDF extraction, DataFrame processing (Pandas), date/revenue helpers, text cleaning |
| `exceptions/` | Domain exceptions + FastAPI exception handlers |

### ORM vs DTO

Keep the layers separate: the **repository returns ORM models**; conversion to Pydantic
DTOs happens at the service/domain boundary (read path uses `from_attributes=True`; write
path maps DTO → ORM explicitly in the repository). Do not leak ORM objects past the service.

### Key constants (`backend/constants.py`)

- `TOP_N_TRANSACTIONS = 3` — number of top income/expense transactions returned
- `DATE_PATTERN_REGEX` — regex identifying transaction rows in PDF tables
- `DATABASE_URL` — SQLite connection string (from `.env`)
- `MODEL_SYSTEM_PROMPT` — system prompt + fixed category list for the LLM classifier

### Running the backend

```bash
cd backend
source .venv/bin/activate
uvicorn main:app --reload
```

## Frontend

- **Language**: TypeScript
- **Framework**: React 19 with Vite 7
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Data layer**: `@ledger/api` (Axios client + TanStack React Query hooks)
- **Charts**: Recharts
- **Entry point**: `frontend/src/main.tsx`

### Directory structure

| Path | Responsibility |
|------|----------------|
| `src/components/dashboard/` | Dashboard sections (Header, SummaryCards, CashFlowChart, TopTransactions, TransactionHistory) |
| `src/components/core/` | Reusable presentational components (CategoryChip, SummaryCard, TopTransactionsCard, TransactionTable, MonthNavigator) |
| `src/components/chart/` | Chart building blocks |
| `src/components/theme/` | `ThemeProvider` + `ThemeToggle` (class-based dark/light theme) |
| `src/components/ui/` | shadcn/ui primitives — **do not edit manually**, use `npx shadcn add` |
| `src/lib/utils.ts` | `cn()` class helper and `formatCurrency()` (EUR, pt-PT) |
| `src/utils/` | `Constants.ts`, `chartUtils.ts`, `useTheme.ts` |

### Running the frontend

```bash
npm install          # at repo root (workspaces)
cd frontend
npm start            # vite dev server on :5173
```

### Adding shadcn/ui components

```bash
cd frontend
npx shadcn add <component-name>
```

Never edit files under `src/components/ui/` manually.

## Mobile

- **Language**: TypeScript
- **Framework**: React Native via **Expo** with **expo-router** (file-based routing in `app/`)
- **Data layer**: `@ledger/api` (same hooks/services as the web app)
- **Icons**: `@expo/vector-icons` (Ionicons)

### Structure & conventions

- Screens live in `mobile/app/` (`_layout.tsx`, `index.tsx`) — expo-router file-based.
- Each component is a folder under `mobile/components/<kebab-name>/` containing
  `Component.tsx` **and** a co-located `Component.styles.ts`. Follow this pattern for
  new components — do not inline `StyleSheet` in the `.tsx`.
- `styles/tokens.ts` holds the design tokens (`Colors`, `FontFamily`, `FontSize`,
  `Spacing`, `Radius`) — style from these, never hardcode colors/sizes.
- `utils/format.ts` exports `formatCurrency()`; `utils/sharedTypes.ts` holds shared enums.

### Running mobile

```bash
npm install          # at repo root
cd mobile
npm start            # expo start  (then i / a / w for iOS / Android / web)
```

## API

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/statement?date=YYYY-MM-DD` | Upload a PDF (`multipart/form-data`, `file` field), returns a `StatementDTO` |
| GET | `/api/statement?date=YYYY-MM-DD` | Fetch the processed statement for a month |

## Theming (web)

Class-based. Adding `class="dark"` to `<html>` switches the CSS variables in
`src/index.css`; components use Tailwind semantic classes (`bg-background`,
`text-foreground`, …) that reference them. Preference is persisted in `localStorage`
under `ledger-ui-theme`.

## Conventions

- **Shared data layer**: types, API client, and query hooks belong in `@ledger/api`,
  not per-app. DAOs are snake_case (API shape), DTOs are camelCase; `StatementDataAdapter`
  converts between them.
- **Backend**: follow the layered feature-module flow — controller → service →
  repository → ORM. External-format ingestion goes through an adapter
  (`statements/adapter.py`); external services go in `integrations/`.
- **ORM vs DTO**: repositories return ORM models; DTO conversion happens at the boundary.
- **Frontend**: dashboard sections in `components/dashboard/`, reusable presentational
  components in `components/core/`, shadcn primitives in `components/ui/` (via `shadcn add`).
- **Mobile**: one folder per component with a co-located `.styles.ts`; style from
  `styles/tokens.ts`.
- **Currency**: always use `formatCurrency()` (`frontend/src/lib/utils.ts` /
  `mobile/utils/format.ts`) — never format currency by hand.
- **Icons**: `lucide-react` (web), `@expo/vector-icons` Ionicons (mobile).
