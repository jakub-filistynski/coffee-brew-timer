"use client";

import { Step } from "@/app/lib/definitions";
import { PauseResumeButton } from "@/app/ui/timer/pauseResumeButton";
import { useStopwatch } from "react-timer-hook";
import { useState, useEffect } from "react";

type Props = {
  steps: Array<Step>;
};

export function Timer({ steps }: Props) {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    let currentStep: Step = steps[currentStepIndex];
    if (currentStepIndex === steps.length - 1) {
      return;
    }

    if (totalSeconds === currentStep.deadline) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  }, [totalSeconds]);

  const isPaused = () => {
    return !isRunning && totalSeconds !== 0;
  };

  const handlePauseAndResume = () => {
    if (isPaused()) {
      start();
    } else {
      pause();
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    reset(undefined, false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "100px" }}>
        <span>{steps[currentStepIndex].message}</span>
        <div />
        <span>{steps[currentStepIndex].deadline - totalSeconds}</span>
        <div />
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
        <div></div>
        <span>Total: {totalSeconds}</span>
      </div>
      {totalSeconds === 0 ? (
        <button onClick={start}>Start</button>
      ) : (
        <PauseResumeButton
          onClick={handlePauseAndResume}
          isTimerPaused={isPaused()}
        />
      )}
      <p>{isRunning ? "Running" : "Not running"}</p>
      <button onClick={handleReset}>Reset</button>
      <div />
      <span>
        {currentStepIndex === steps.length
          ? ""
          : steps[currentStepIndex + 1].message}
      </span>
    </div>
  );
}
