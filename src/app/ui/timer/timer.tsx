"use client";

import {BrewingRecipe, BrewingStep} from "@/app/lib/definitions";
import { PauseResumeButton } from "@/app/ui/timer/pauseResumeButton";
import { useStopwatch } from "react-timer-hook";
import { useState, useEffect } from "react";
import {addLeadingZeros} from "@/app/ui/utils";


type Props = {
  brewingRecipe: BrewingRecipe | undefined;
};


export function Timer({ brewingRecipe } : Props) {
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
  let steps: BrewingStep[] = []
  if (brewingRecipe === undefined) {
    steps = [{message: "-", deadline: ""}] as BrewingStep[]
  }
  else {
    steps = brewingRecipe.brewingSteps
  }

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
        handleResetTimer()
    },[brewingRecipe])

  useEffect(() => {
    const currentStep: BrewingStep = steps[currentStepIndex];
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

  const handlePauseAndResumeTimer = () => {
    if (isPaused()) {
      start();
    } else {
      pause();
    }
  };

  const handleResetTimer = () => {
    setCurrentStepIndex(0);
    reset(undefined, false);
  }

  return (
    <>
        <div className="text-4xl sm:text-6xl h-10 sm:h-16">
          {steps[currentStepIndex].stage ?
            `Stage: ${steps[currentStepIndex].stage}` : null
          }
        </div>
        <div className="text-4xl sm:text-8xl  flex flex-col space-y-5">
          <span>{steps[currentStepIndex].message}</span>
        </div>
        <div className="text-2xl sm:text-4xl h-8 sm:h-10">
          {steps[currentStepIndex].comment ?
            steps[currentStepIndex].comment: null
          }
        </div>
        <div className="text-4xl sm:text-8xl  flex flex-col space-y-5">
          <span>Left: {steps[currentStepIndex].deadline - totalSeconds} s</span>
        </div>
        <span className="text-2xl sm:text-4xl ">
          <b>Next step: </b>{" "}
          {currentStepIndex + 1 === steps.length
            ? ""
            : steps[currentStepIndex + 1].message}
        </span>
        <span className="sm:text-2xl text-xl">Total: {addLeadingZeros(minutes, 2)}:{addLeadingZeros(seconds, 2)}</span>
        <div>
          <span className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
            {totalSeconds === 0 ? (
              <button
                onClick={start}
                disabled={brewingRecipe === undefined}
                className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
              >
                Start
              </button>
            ) : (
              <PauseResumeButton
                onClick={handlePauseAndResumeTimer}
                isTimerPaused={isPaused()}
              />
            )}
            <button
              onClick={handleResetTimer}
              className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
            >
              Reset
            </button>
          </span>
        </div>
      </>

  );
}
