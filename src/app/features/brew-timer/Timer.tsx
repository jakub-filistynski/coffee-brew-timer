"use client";

import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { Step } from "@/app/lib/definitions";
import { PauseResumeButton } from "@/app/features/brew-timer/PauseResumeButton";
import styles from "@/app/features/brew-timer/Timer.module.css";

type Props = {
  steps: Array<Step>;
};

export function Timer({ steps }: Props) {
  const { totalSeconds, isRunning, start, pause, reset } = useStopwatch({
    autoStart: false,
  });
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const currentStep: Step = steps[currentStepIndex];
    if (currentStepIndex === steps.length - 1) {
      return;
    }

    if (totalSeconds >= currentStep.deadline) {
      setCurrentStepIndex((index) => Math.min(index + 1, steps.length - 1));
    }
  }, [currentStepIndex, steps, totalSeconds]);

  const isPaused = () => !isRunning && totalSeconds !== 0;

  const handlePauseAndResume = () => {
    if (isPaused()) {
      start();
      return;
    }
    pause();
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    reset(undefined, false);
  };

  const currentStep = steps[currentStepIndex];
  const nextStep =
    currentStepIndex >= steps.length - 1 ? null : steps[currentStepIndex + 1];
  const timeLeft = Math.max(0, currentStep.deadline - totalSeconds);

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>Now</p>
        <p className={styles.currentStep}>{currentStep.message}</p>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Time left</p>
            <p className={styles.statValue}>{timeLeft}s</p>
          </div>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Elapsed</p>
            <p className={styles.statValue}>{totalSeconds}s</p>
          </div>
        </div>

        <div className={styles.nextStepCard}>
          <p className={styles.eyebrow}>Next step</p>
          <p className={styles.nextStepText}>
            {nextStep?.message ?? "Done - enjoy your coffee."}
          </p>
        </div>

        <div className={styles.controls}>
          <span className={styles.controlGroup}>
            {totalSeconds === 0 ? (
              <button onClick={start} className={styles.startButton}>
                Start
              </button>
            ) : (
              <PauseResumeButton
                onClick={handlePauseAndResume}
                isTimerPaused={isPaused()}
              />
            )}
            <button onClick={handleReset} className={styles.resetButton}>
              Reset
            </button>
          </span>
        </div>
      </div>
    </section>
  );
}
