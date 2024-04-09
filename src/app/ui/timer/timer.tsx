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
    <div className="flex items-center justify-center h-screen">
      <div className="text-center space-y-5 flex flex-col">
        <span className="text-2xlsm:text-4xl ">
          <b>Next step: </b>{" "}
          {currentStepIndex === steps.length
            ? ""
            : steps[currentStepIndex + 1].message}
        </span>
        <div className="text-4xl sm:text-8xl  flex flex-col space-y-5">
          <span>{steps[currentStepIndex].message}</span>
          <span>Left: {steps[currentStepIndex].deadline - totalSeconds} s</span>
        </div>
        <span className="sm:text-2xl text-xl">Total: {totalSeconds}</span>
        <div>
          <span className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
            {totalSeconds === 0 ? (
              <button
                onClick={start}
                className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
              >
                Start
              </button>
            ) : (
              <PauseResumeButton
                onClick={handlePauseAndResume}
                isTimerPaused={isPaused()}
              />
            )}
            <button
              onClick={handleReset}
              className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
            >
              Reset
            </button>
          </span>
        </div>
        <div />
      </div>
    </div>
  );
}
