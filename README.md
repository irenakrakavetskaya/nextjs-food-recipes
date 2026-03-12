# Next.js Food Recipes

A  **food recipes** web app built with **Next.js (App Router)** where users can explore meals and share their own recipes. Meals are stored in a local **SQLite** database.

This project demonstrates core Next.js concepts like the **App Router**, **Server Actions**, server-side data access, cache revalidation, and basic input validation/sanitization.

## Features

- **Home page** with animage slideshow
- **Meals**
    - Fetch meals from a SQLite database (`meals.db`)
    - Fetch a single meal by `slug`
- **Share a recipe**
    - Submit a recipe via a **Next.js Server Action**
    - Validates input fields (title, summary, instructions, name, email, image)
    - Generates a URL-friendly slug from the meal title
    - Sanitizes recipe instructions to reduce XSS risk
    - Inserts recipe into SQLite and revalidates the meals page

## Tech Stack
- **Next.js** `^15.0.0` (App Router)
- **React** `^19.0.0`
- **SQLite** (local DB file: `meals.db`)
- **better-sqlite3** (SQLite driver)
- **Server Actions** (`'use server'`)
- **slugify** (create slugs from meal titles)
- **xss** (sanitize instructions input)
- **ESLint** + `eslint-config-next`



## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run the development server

```bash
npm run dev
```

## Available Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm start` — run production server
- `npm run lint` — run Next.js linting
