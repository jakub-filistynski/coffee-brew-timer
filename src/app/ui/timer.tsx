"use client"

import { Step } from "@/app/lib/definitions"
import { useState } from "react"

type Props = {
    steps: Array<Step>
}

export function Timer({ steps }: Props) {
    const [time, setTime] = useState(0.0);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const [isTimerPaused, setIsTimerPaused] = useState(false);

    const handleStart = () => {
        setIsTimerOn(true);
    }

    const handlePauseAndResume = () => {
        setIsTimerPaused(!isTimerPaused);
    }

    const handleReset = () => {
        setIsTimerOn(false);
        setIsTimerPaused(false);
    }

    return (
        <>
            {
                isTimerOn ?
                    <button
                        onClick={handlePauseAndResume}
                    >
                        <>
                            {
                                isTimerPaused ? "Resume" : "Pause"
                            }
                        </>
                    </button> :
                    <button
                        onClick={handleStart}
                    >
                        Start
                    </button>
            }
            <div></div>
            <button
                onClick={handleReset}
            >
                Reset
            </button>
        </>
    )
}