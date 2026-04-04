"use client";

import { useMemo, useState } from "react";
import { getHoffmanMethoSteps } from "@/app/lib/recipies/drip/hoffman";
import { PwaInstallPrompt } from "@/app/features/brew-timer/PwaInstallPrompt";
import { Timer } from "@/app/features/brew-timer/Timer";
import styles from "@/app/features/brew-timer/BrewTimerHome.module.css";

const DEFAULT_READY_COFFEE_MILLILITERS = 250;
const DEFAULT_USED_COFFEE_GRAMS = 15;
const WATER_PER_COFFEE_RATIO = 16.67;

type InputMode = "readyCoffee" | "usedCoffee";

function toValidPositiveNumber(value: string, fallback: number): number {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return parsed;
}

export function BrewTimerHome() {
  const [inputMode, setInputMode] = useState<InputMode>("readyCoffee");
  const [readyCoffeeMillilitersInput, setReadyCoffeeMillilitersInput] =
    useState(String(DEFAULT_READY_COFFEE_MILLILITERS));
  const [usedCoffeeGramsInput, setUsedCoffeeGramsInput] = useState(
    String(DEFAULT_USED_COFFEE_GRAMS),
  );

  const readyCoffeeMilliliters = useMemo(
    () =>
      toValidPositiveNumber(
        readyCoffeeMillilitersInput,
        DEFAULT_READY_COFFEE_MILLILITERS,
      ),
    [readyCoffeeMillilitersInput],
  );

  const usedCoffeeGrams = useMemo(
    () =>
      toValidPositiveNumber(usedCoffeeGramsInput, DEFAULT_USED_COFFEE_GRAMS),
    [usedCoffeeGramsInput],
  );

  const totalWaterMilliliters = useMemo(() => {
    if (inputMode === "readyCoffee") return readyCoffeeMilliliters;
    return Math.round(usedCoffeeGrams * WATER_PER_COFFEE_RATIO);
  }, [inputMode, readyCoffeeMilliliters, usedCoffeeGrams]);

  const steps = useMemo(
    () => getHoffmanMethoSteps(totalWaterMilliliters),
    [totalWaterMilliliters],
  );

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.card}>
          <p className={styles.eyebrow}>Coffee Brew Timer</p>
          <h1 className={styles.title}>Hoffman Drip Method</h1>
          <p className={styles.subtitle}>
            Set your input mode and start brewing.
          </p>
        </header>

        <PwaInstallPrompt />

        <section className={styles.card}>
          <label className={styles.label}>
            Input mode
            <select
              value={inputMode}
              onChange={(e) => setInputMode(e.target.value as InputMode)}
              className={styles.field}
            >
              <option value="readyCoffee">Total amount of coffee</option>
              <option value="usedCoffee">Amount of used coffee (beans)</option>
            </select>
          </label>

          <label className={styles.label}>
            {inputMode === "readyCoffee"
              ? "Ready coffee (ml)"
              : "Used coffee (g)"}
            <input
              type="number"
              min={1}
              step={1}
              inputMode="numeric"
              value={
                inputMode === "readyCoffee"
                  ? readyCoffeeMillilitersInput
                  : usedCoffeeGramsInput
              }
              onChange={(e) => {
                if (inputMode === "readyCoffee") {
                  setReadyCoffeeMillilitersInput(e.target.value);
                  return;
                }
                setUsedCoffeeGramsInput(e.target.value);
              }}
              className={styles.field}
            />
          </label>

          <p className={styles.helper}>
            Using {totalWaterMilliliters} ml total water to calculate the
            recipe.
          </p>
        </section>
      </div>

      <Timer steps={steps} />
    </main>
  );
}
