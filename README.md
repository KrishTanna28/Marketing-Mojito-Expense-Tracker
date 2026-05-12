# Expense Tracker

A responsive expense tracker frontend built with Next.js (App Router) and Tailwind CSS. It supports local storage persistence, category summaries, and live currency conversion.

## Features

- Add, validate, and delete expenses
- Summary totals and entry counts
- Category breakdown with progress bars
- Live currency conversion using Frankfurter rates
- Local storage persistence with safe recovery

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Notes

- Data is stored locally in the browser.
- Base currency is INR and conversions are fetched on demand.
