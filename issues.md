# Coffee Brew Timer — Issues

Discovered during project scan. Ordered by severity.

---

## 🔴 Critical

### 1. `eval()` usage — Code Injection / XSS vulnerability

- **File**: `src/app/lib/recipes/parser.ts`, line ~35
- **Description**: The `evalRecipeSchemaTemplateString` function converts recipe template strings into JavaScript template literals and executes them with `eval()`. If a recipe JSON file contains malicious code in `messageTemplate` or `commentTemplate` fields, it will execute arbitrary JavaScript in the user's browser.
- **Example payload in a JSON recipe**: `"messageTemplate": "${alert('XSS')}"` or worse, data exfiltration code.
- **Impact**: Any user-supplied or third-party recipe JSON can execute arbitrary code.
- **Suggested fix**: Replace `eval()` with a safe template interpolation function that only does variable substitution (e.g., `string.replace()` with a regex matching known variable names, or a small expression parser for simple math).

### 2. Static export incompatible with server-side code

- **Files**: `src/app/lib/recipes/utils.ts`, `next.config.mjs`
- **Description**: `next.config.mjs` sets `output: "export"` (static HTML generation), but `utils.ts` uses `"use server"` directive and `fs.readFileSync()` to load recipe files at runtime. Server actions and Node.js `fs` module are not available in a statically exported app. This means:
  - `npm run build` may fail or produce a broken build.
  - Recipes cannot be loaded in production.
- **Suggested fix**: Import recipe JSON files directly using ES module imports (Next.js supports JSON imports) or move to a dynamic approach. Remove the `"use server"` directive and `fs` dependency. Alternatively, remove `output: "export"` if server-side rendering is desired.

---

## 🟠 High

### 3. Corrupted JSON key: `mess§ageTemplate`

- **File**: `src/app/lib/recipes/config/drip/hoffmann/hoffmann-better-one-cup.json`, last recipe step
- **Description**: The key is `mess§ageTemplate` (with a `§` character) instead of `messageTemplate`. This means the last Drawdown step ("Wait for the water to flow") will never display its message — `evalRecipeSchemaTemplateString` receices `undefined` and returns an empty string.
- **Impact**: The last step of the "Better 1 Cup" recipe silently shows a blank message.
- **Suggested fix**: Rename the key to `messageTemplate`.

### 4. `getBrewingRecipe` can return `undefined`

- **File**: `src/app/lib/recipes/parser.ts`, line ~42–73
- **Description**: The `getBrewingRecipe` function has a try/catch where the catch block only logs and does not return a value. If an exception occurs (e.g., malformed recipe data), the function returns `undefined`. Both public functions (`getBrewingRecipeUsingTotalWater` and `getBrewingRecipeUsingCoffeeAmount`) call this and propagate the `undefined`, which will crash the Timer component.
- **Suggested fix**: Either re-throw the error, return a sensible default, or change the return type to `BrewingRecipe | undefined` and handle it in the calling code.

### 5. Type mismatch: `deadline: ""` (string instead of number)

- **File**: `src/app/ui/timer/timer.tsx`, line ~20
- **Description**: When `brewingRecipe` is `undefined`, a placeholder step is created: `{ message: "-", deadline: "" }` cast as `BrewingStep[]`. The `deadline` field is typed as `number` in `BrewingStep`, but `""` is a string. This causes `"" - totalSeconds` to evaluate to `NaN`, so the "Left: NaN s" is displayed in the UI.
- **Suggested fix**: Use `deadline: 0` instead of `deadline: ""`.

---

## 🟡 Medium

### 6. Missing `useEffect` dependency: `handleReset`

- **File**: `src/app/ui/timer/timer.tsx`, lines ~29–31
- **Description**: The `useEffect` that calls `handleReset()` when `brewingRecipe` changes does not list `handleReset` in its dependency array. React's exhaustive-deps rule would flag this. While it works because `handleReset` is recreated each render, it's fragile.
- **Suggested fix**: Wrap `handleReset` in `useCallback` and add it to the dependency array, or inline the reset logic.

### 7. Missing `useEffect` dependency: `steps`, `currentStepIndex`

- **File**: `src/app/ui/timer/timer.tsx`, lines ~33–41
- **Description**: The `useEffect` that advances steps depends on `totalSeconds` but also reads `steps` and `currentStepIndex` which are not in the dependency array. Stale closures could cause missed step transitions.
- **Suggested fix**: Add `steps` and `currentStepIndex` to the dependency array.

### 8. Metadata typo: "Coffe" instead of "Coffee"

- **File**: `src/app/layout.tsx`, line 8
- **Description**: `title: "Coffe Brew Timer"` — missing the second 'e' in "Coffee".
- **Suggested fix**: Change to `"Coffee Brew Timer"`.

### 9. No input validation on resource amount

- **File**: `src/app/ui/recipePicker/recipePicker.tsx`
- **Description**: The number input for water/coffee amount accepts negative numbers, zero, and extremely large values. Negative values cause nonsensical recipe calculations (negative water amounts). There is no min/max constraint.
- **Suggested fix**: Add `min="1"` to the input element. Validate the value before passing it to the parser.

### 10. `Function` type usage

- **File**: `src/app/ui/recipePicker/recipePicker.tsx`, line ~40
- **Description**: `const parserFunction: Function = ...` uses the generic `Function` type, which disables type checking on the call. TypeScript best practices discourage this.
- **Suggested fix**: Use a proper function type signature, e.g., `(recipe: RecipeSchema, amount: number) => BrewingRecipe`.

### 11. `fetchRecipes` has incorrect return type

- **File**: `src/app/ui/recipePicker/recipePicker.tsx`, lines ~23–27
- **Description**: `fetchRecipes` is declared as `async (): Promise<RawRecipesMap>` but actually returns `void` (the result of `setRawRecipesMap()`). The return type annotation is misleading.
- **Suggested fix**: Change return type to `Promise<void>`.

---

## 🔵 Low

### 12. Untyped `useState` in page.tsx

- **File**: `src/app/page.tsx`, line 8
- **Description**: `useState(undefined)` doesn't provide a type parameter. The state is inferred as `undefined` only, so passing the setter to `RecipePicker` (which expects `Dispatch<SetStateAction<BrewingRecipe>>`) is a type mismatch.
- **Suggested fix**: Use `useState<BrewingRecipe | undefined>(undefined)`.

### 13. Tailwind content paths include unused directories

- **File**: `tailwind.config.ts`
- **Description**: Content paths include `./src/pages/**` and `./src/components/**` but these directories don't exist (the project uses App Router with everything under `src/app/`). Not harmful but unnecessary.
- **Suggested fix**: Remove unused paths or leave as-is for future-proofing.

### 14. Stale default `description` in metadata

- **File**: `src/app/layout.tsx`, line 9
- **Description**: `description: "Generated by create next app"` — this is the default placeholder from create-next-app and should be updated to describe the actual app.
- **Suggested fix**: Update to a meaningful description like `"A guided coffee brewing timer with step-by-step recipes"`.

### 15. Outdated dependencies

- **File**: `package.json`
- **Description**: Next.js 14.1.4, React 18, and other dependencies are significantly outdated (current date: March 2026). Security patches and performance improvements are being missed.
- **Suggested fix**: Run `npm outdated`, review changelogs, and update dependencies.

### 16. No error boundaries

- **Description**: The app has no React error boundaries. If the timer or recipe picker throws a runtime error, the entire app crashes with a white screen.
- **Suggested fix**: Add an `ErrorBoundary` component wrapping the main content or individual widgets.

### 17. No tests

- **Description**: There is no testing framework or test files. The parser logic (template evaluation, amount calculations) and timer step advancement logic are prime candidates for unit tests.
- **Suggested fix**: Add Jest/Vitest with React Testing Library. Prioritize tests for `parser.ts` functions.
