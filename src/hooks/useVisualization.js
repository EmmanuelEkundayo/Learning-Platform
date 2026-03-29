import { useState, useCallback } from 'react'

/**
 * Generic hook for step-through visualization control.
 * Returns step state + Prev/Next/Play/Pause handlers.
 */
export function useVisualization(totalSteps = 0) {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1) // 0.5x – 3x

  const prev = useCallback(() => setStep((s) => Math.max(0, s - 1)), [])
  const next = useCallback(() => setStep((s) => Math.min(totalSteps - 1, s + 1)), [totalSteps])
  const reset = useCallback(() => { setStep(0); setPlaying(false) }, [])

  return { step, setStep, playing, setPlaying, speed, setSpeed, prev, next, reset }
}
