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
└── frontend/    # React + Vite + shadcn/ui
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
├── api/            # HTTP route handlers
├── services/       # Business logic
├── repository/     # Database access layer
├── models/         # SQLAlchemy ORM models
├── schema/         # Pydantic DTOs
├── utils/          # PDF extraction and DataFrame processing
├── alembic/        # Database migrations
└── main.py         # FastAPI app entrypoint
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
