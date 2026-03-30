# Coffee Brew Timer

Simple brew assistant for the Hoffman drip method, built with Next.js.

## Features

- Step-by-step brew timer with deadlines
- Two input modes:
  - total amount of ready coffee (`ml`)
  - amount of used coffee / beans (`g`)
- Automatic water calculation for the recipe
- Responsive UI with feature-scoped CSS Modules
- Unit tests for recipe generation logic

## Tech stack

- Next.js 14
- React 18
- TypeScript
- Tailwind (base setup)
- Vitest (unit tests)

## Project structure

Main application code lives under `src/app`:

- `features/brew-timer/` - UI feature module
  - `BrewTimerHome.tsx`
  - `Timer.tsx`
  - `PauseResumeButton.tsx`
  - `*.module.css`
- `lib/recipies/drip/hoffman.ts` - recipe step generation logic
- `page.tsx` - app entry page

## Getting started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev        # start local dev server
npm run build      # production build
npm run start      # run production server
npm run lint       # lint code
npm run test       # run unit tests once
npm run test:watch # run tests in watch mode
```

## Testing

Unit tests are written with Vitest.

- Current tests: `src/app/lib/recipies/drip/hoffman.test.ts`
- Focus: recipe shape, deadlines, per-pour water calculation, rounding behavior

Run:

```bash
npm run test
```

## Notes / roadmap

- PWA support is planned (manifest + installable experience + offline behavior)
- Recommended next tests:
  - component tests (input mode switching, displayed values)
  - end-to-end flow tests (start/pause/reset, step progression)
