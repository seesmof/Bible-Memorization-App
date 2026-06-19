# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bible memorization app with FastAPI backend and Next.js frontend. UI in Ukrainian. Users select book/chapter/verse and create flashcards (reference on one side, text on other).

## Architecture

**Monorepo structure:**
- `backend/` - FastAPI Python backend
  - `api/v1/` - API route handlers
  - `core/` - Configuration (pydantic-settings, loads from `.env`) and logging (loguru)
  - `deps/` - Dependency injection
  - `services/` - Business logic
- `frontend/src/` - Next.js 16 + React 19 + TypeScript
  - `app/page.tsx` - Main UI with book/chapter/verse selectors and flashcards
  - Uses DaisyUI + Tailwind for styling
- `main.py` - FastAPI entry point (root `/` route)
- `Bible.txt` - Scripture text source data (in `frontend/` dir)

**Key data structures:**
- `BibleBook` (frontend) - `{name: string, numberOfChapters: number}` - 66 books hardcoded with Ukrainian names
- `Verse` - `{text: string, reference: string}` - flashcard model
- Cards currently hardcoded; no backend integration yet

## Development Commands

**Backend (run from project root):**
```bash
# Run FastAPI dev server (uses uv)
uv run fastapi dev main.py

# Install dependencies
uv sync
```

**Frontend (run from `frontend/src/` directory):**
```bash
# Dev server
npm run dev

# Build
npm run build

# Lint
npm run lint

# Install dependencies
npm install
```

**Environment:**
- Backend expects `.env` file (currently empty schema in `Settings`)
- Python 3.14+ required

**Logging:**
- Use `loguru` for all backend logging
- Import: `from backend.core.logger import logger`
- Configured in `backend/core/logger.py` (stderr only, no file logging)
- Usage: `logger.info()`, `logger.warning()`, `logger.error()`, etc.
