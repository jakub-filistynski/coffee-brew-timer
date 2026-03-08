# Coffee Brew Timer — Agent Guide

## Project Overview

A **Next.js 14** (App Router) single-page application that acts as a guided coffee brewing timer. Users pick a recipe (e.g. James Hoffmann V60), enter the amount of water or coffee, and the app calculates step-by-step brewing instructions with a live countdown timer.

- **Framework**: Next.js 14.1.4 (App Router) with static export (`output: "export"`)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3
- **Key lib**: `react-timer-hook` for stopwatch functionality
- **Package manager**: npm (see `package.json`)
- **No testing framework** is currently configured.
- **No database** — recipes are stored as JSON files on disk.

## Commands

| Command         | Purpose                           |
| --------------- | --------------------------------- |
| `npm run dev`   | Start dev server (localhost:3000) |
| `npm run build` | Production static build           |
| `npm run start` | Serve production build            |
| `npm run lint`  | Run ESLint                        |

## Architecture & Data Flow

```
User selects recipe + enters water/coffee amount
        │
        ▼
RecipePicker (src/app/ui/recipePicker/recipePicker.tsx)
  ├── Loads raw RecipeSchema JSON files via getRawRecipes()
  ├── User picks recipe, toggles water/coffee, enters amount
  └── Calls parser → produces BrewingRecipe → passes up to page
        │
        ▼
Timer (src/app/ui/timer/timer.tsx)
  ├── Receives BrewingRecipe with calculated steps
  ├── Uses react-timer-hook stopwatch
  └── Advances steps based on elapsed seconds vs deadlines
```

## Directory Map

```
src/
├── settings.ts              — Global settings (baseURL from env)
├── app/
│   ├── globals.css          — Tailwind directives only
│   ├── layout.tsx           — Root layout (Inter font, metadata)
│   ├── page.tsx             — Single page: RecipePicker + Timer
│   ├── lib/
│   │   ├── definitions.ts   — All TypeScript types (BrewingStep, BrewingRecipe, RecipeSchema, etc.)
│   │   └── recipes/
│   │       ├── parser.ts    — Converts RecipeSchema → BrewingRecipe (template eval, amount calculation)
│   │       ├── recipes.ts   — Static map of recipe name → JSON file path
│   │       ├── utils.ts     — Server-side recipe loader (fs.readFileSync) ⚠️ see issues.md
│   │       └── config/      — Recipe JSON files
│   │           ├── example-recipe-schema.json
│   │           └── drip/hoffmann/
│   │               ├── hoffmann-better-one-cup.json
│   │               └── hoffmann-ultimate-v60.json
│   └── ui/
│       ├── utils.ts         — Utility functions (roundAndTruncate, addLeadingZeros)
│       ├── recipePicker/
│       │   └── recipePicker.tsx  — Recipe selection UI component
│       └── timer/
│           ├── timer.tsx         — Main timer/step display component
│           └── pauseResumeButton.tsx — Simple pause/resume toggle
```

## Key Types (src/app/lib/definitions.ts)

- **`RecipeSchema`** — Raw recipe as stored in JSON: author, name, source, description, `coffeeGramsPerLiter`, and `recipeSteps[]` with template strings and durations.
- **`RecipeStep`** — A single step in a raw recipe: `messageTemplate`, `duration`, optional `amount`, `stage`, `commentTemplate`.
- **`BrewingRecipe`** — Parsed/calculated recipe ready for the timer: concrete `coffeeAmount`, `waterAmount`, and `brewingSteps[]`.
- **`BrewingStep`** — A single calculated step: `message` (resolved string), `deadline` (cumulative seconds), optional `stage`/`comment`.

## Recipe Template System (parser.ts)

Recipe JSON files use template strings with `{variable}` syntax. The parser replaces `{` with `${` and wraps in backticks, then uses `eval()` to resolve variables:

- `{stepWaterAmount}` — water for this step (grams)
- `{waterAccumulator}` — total water so far (grams)
- `{flowRate}` — `stepWaterAmount / stepDuration` (g/s)
- Arbitrary JS expressions are also possible (e.g., `{stepWaterAmount / 30}`)

⚠️ **The `eval()` approach is a known security concern** — see `issues.md`.

## How to Add a New Recipe

1. Create a new JSON file in `src/app/lib/recipes/config/` following the schema in `example-recipe-schema.json`.
2. Register it in `src/app/lib/recipes/recipes.ts` by adding an entry to `recipesConfigMap`.

## Configuration

- `next.config.mjs`: `basePath` from `BASE_PATH` env var; `output: "export"` for static site generation.
- `src/settings.ts`: Exposes `baseURL` derived from `BASE_PATH`.
- `tailwind.config.ts`: Scans `src/pages/`, `src/components/`, `src/app/` for class usage.
- TypeScript path alias: `@/*` → `./src/*`.

## Important Caveats for Agents

1. **Static export mode** — The app uses `output: "export"`. There is no Node.js server at runtime. Server actions (`"use server"`) and `fs` module calls will NOT work in production. This is a critical architecture issue (see `issues.md`).
2. **`eval()` in parser** — Template resolution uses `eval()`. Any changes to template processing should address this.
3. **No tests** — There are no unit or integration tests. Consider adding them.
4. **No error boundaries** — React error boundaries are not implemented.
5. **Single page app** — Everything lives on one page (`page.tsx`). No routing needed.
6. **JSON recipe typo** — `hoffmann-better-one-cup.json` has a corrupted key `mess§ageTemplate` (last step). This causes a silent bug where that step shows an empty message.
7. **Known issues** are tracked in `issues.md` — check it before starting work.
