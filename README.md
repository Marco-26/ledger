# Ledger

A personal finance dashboard for people who want to track their expenses without manually logging every transaction. Upload your bank statement PDF and instantly get a visual breakdown of your income, expenses and spending patterns.

## Motivation

Tracking expenses is useful, but manually adding entries every time you buy something is tedious. Ledger takes a different approach: your bank already has all that data. Export the PDF statement at the end of the month, upload it here, and get a full dashboard automatically.

## Features

- Upload bank statement PDFs and extract transactions automatically
- Summary cards for total income, total expenses and net balance
- Cash flow area chart with credit vs debit over time
- Top 3 income and top 3 expense transactions
- Full transaction history with Income / Expenses tabs
- Dark / Light / System theme

## Architecture

Ledger is a full-stack application with a Python backend and a React frontend.

```
ledger/
├── backend/     # FastAPI + SQLite
├── frontend/    # React + Vite + shadcn/ui
└── mobile/      # React Native + Expo
```

### Backend

Built with **FastAPI**. When a PDF is uploaded, the backend:

1. Extracts transaction tables from the PDF using **Camelot**
2. Builds a **Pandas** DataFrame and normalises European number formatting
3. Computes derived values (totals, top transactions, filtered lists)
4. Persists the result to a **SQLite** database via **SQLAlchemy**
5. Returns the full statement as JSON

```
backend/
├── db/
│   ├── database.py       # SQLAlchemy engine, session factory, get_db()
│   └── models/
│       └── statement.py  # ORM models (Statement, Transaction)
├── statements/
│   ├── controller.py     # Route handlers (POST /api/statement, GET /api/statement)
│   ├── service.py        # Orchestration: PDF parsing, validation, persistence
│   └── repository.py     # All database queries
├── domain/
│   ├── models.py         # Domain dataclasses (DailyTransaction)
│   └── transaction_builder.py  # Assembles StatementDTO from query results
├── mappers/
│   └── transaction_mapper.py   # ORM → DTO and DataFrame → ORM conversions
├── schemas/
│   └── statement_dto.py  # Pydantic response DTOs
├── exceptions/
│   ├── domain.py         # Domain exception classes
│   └── handlers.py       # FastAPI exception handlers
├── utils/
│   ├── date_utils.py     # Date helpers (end of month, previous month)
│   ├── revenue_utils.py  # Financial calculations (totals, growth rate)
│   ├── statement_dataframe.py  # DataFrame building and normalisation
│   └── statement_pdf.py  # PDF table extraction via Camelot
├── alembic/              # Database migrations
├── constants.py          # App-wide constants
└── main.py               # FastAPI app entrypoint, CORS, router registration
```

### Frontend

Built with **React 19** and **Vite**. Communicates with the backend via **Axios** and adapts the snake_case API response to camelCase DTOs before passing data to components.

```
frontend/src/
├── components/
│   ├── dashboard/      # Dashboard sections (Header, SummaryCards, CashFlowChart, ...)
│   ├── ui/             # shadcn/ui primitives (Button, Card, Tabs, ...)
│   ├── ThemeProvider   # React context for dark/light/system theme
│   └── ThemeToggle     # Dropdown to switch theme
├── data/               # TypeScript interfaces (DTOs and API response shapes)
├── service/
│   ├── StatementService.ts         # API calls
│   ├── adapters/StatementDataAdapter.ts  # Response → DTO mapping
│   └── client.ts                   # Axios instance
└── lib/
    └── utils.ts        # cn() helper and formatCurrency()
```

### Mobile

Built with **React Native** and **Expo**. Shares the same backend API and mirrors the web dashboard feature set in a native mobile interface. Uses **TanStack Query** for data fetching and **dayjs** for date handling.

```
mobile/
├── app/
│   ├── _layout.tsx     # Root layout: fonts, splash screen, QueryClientProvider
│   └── index.tsx       # Main screen: data fetching and component composition
├── components/
│   ├── header/         # App title and month navigator
│   ├── month-navigator/# Prev/next month controls
│   ├── summary-card/   # Money In, Money Out, Net Balance cards with growth rate
│   ├── cash-flow-chart/# Line chart of daily credit vs debit (react-native-chart-kit)
│   ├── top-transactions-card/  # Top 3 income and expense transactions
│   ├── transaction-history/    # Tabbed income/expense transaction list
│   └── transaction-list/       # Scrollable list of individual transactions
├── styles/
│   ├── tokens.ts       # Design tokens: colors, typography, spacing, radius
│   └── global.ts       # Shared Typography styles and icon color map
└── utils/
    ├── constants.ts    # Month names, date formats, API/TanStack Query keys
    ├── sharedTypes.ts  # TransactionType enum (income, expense, neutral)
    └── format.ts       # formatCurrency() using Intl (EUR, pt-PT locale)
```

### Data flow

```
User uploads PDF
      ↓
StatementService.generateStatement(file)   [frontend]
      ↓
POST /api/statement                        [HTTP]
      ↓
extract PDF → build DataFrame → compute totals → save to DB → return JSON
      ↓                                    [backend]
StatementDataAdapter.convertToStatement()  [frontend]
      ↓
React state → Dashboard renders charts and tables
```

## Tech Stack

| Layer     | Technology                                    |
|-----------|-----------------------------------------------|
| Backend   | Python, FastAPI, SQLAlchemy, Alembic, SQLite  |
| PDF       | Camelot, Pandas, OpenCV, Pillow               |
| Frontend  | React 19, TypeScript, Vite                    |
| Styling   | Tailwind CSS v4, shadcn/ui, Radix UI          |
| Charts    | Recharts                                      |
| Mobile    | React Native, Expo, TanStack Query            |
| HTTP      | Axios                                         |

## Getting Started

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn main:app --reload
# Runs on http://localhost:8000
```

### Frontend

```bash
cd frontend
npm install
npm start
# Runs on http://localhost:5173
```

### Mobile

```bash
cd mobile
npm install
npx expo start
# Scan the QR code with Expo Go, or press i for iOS simulator / a for Android emulator
```
