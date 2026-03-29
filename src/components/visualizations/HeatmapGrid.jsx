import { useState, useMemo, useCallback } from 'react'
import * as d3 from 'd3'
import { motion, AnimatePresence } from 'framer-motion'
import StepControls from './StepControls.jsx'
import { useInterval } from '../../hooks/useInterval.js'

const SPEED_MS = { 0.5: 2000, 1: 1000, 1.5: 667, 2: 500, 3: 333 }

// 6-token sentence: "The cat sat on the mat"
const TOKENS = ['The', 'cat', 'sat', 'on', 'the', 'mat']

// Plausible attention weights (each row sums to 1.0)
// Rows = query tokens, cols = key tokens
const ATTN = [
  [0.42, 0.08, 0.10, 0.05, 0.30, 0.05],  // "The" → attends to itself + "the"
  [0.06, 0.45, 0.18, 0.04, 0.05, 0.22],  // "cat" → attends to itself + "sat","mat"
  [0.05, 0.30, 0.32, 0.10, 0.04, 0.19],  // "sat" → attends to "cat" + itself
  [0.08, 0.12, 0.12, 0.36, 0.08, 0.24],  // "on"  → attends to "mat"
  [0.38, 0.06, 0.08, 0.06, 0.36, 0.06],  // "the" → attends to itself + "The"
  [0.06, 0.20, 0.14, 0.22, 0.05, 0.33],  // "mat" → attends to itself + "cat","on"
]

// Steps: overview then highlight each query row
function buildSteps() {
  const steps = [
    { activeRow: -1, annotation: 'Transformer self-attention: 6×6 weight matrix. Rows = queries, cols = keys. Darker = higher attention.' },
    ...TOKENS.map((tok, i) => ({
      activeRow: i,
      annotation: `Query "${tok}": attends most to "${TOKENS[ATTN[i].indexOf(Math.max(...ATTN[i]))]}"`
        + ` (weight=${Math.max(...ATTN[i]).toFixed(2)}). Softmax ensures each row sums to 1.`,
    })),
  ]
  return steps
}

export default function HeatmapGrid({ config = {} }) {
  const steps = useMemo(() => buildSteps(), [])

  const [step,    setStep]    = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed,   setSpeed]   = useState(1)

  const cur = steps[step]

  useInterval(
    () => { if (step < steps.length - 1) setStep(s => s + 1); else setPlaying(false) },
    playing ? SPEED_MS[speed] : null,
  )

  const handleReset = useCallback(() => { setStep(0); setPlaying(false) }, [])

  // Color scale: dark blue → yellow-orange
  const colorScale = useMemo(() =>
    d3.scaleSequential(d3.interpolateYlOrRd).domain([0, 0.5]), [])

  const CELL = 58
  const N    = TOKENS.length

  return (
    <div className="flex flex-col gap-3">
      {/* Heatmap grid */}
      <div className="rounded-lg border border-surface-600 bg-surface-800 p-4 overflow-x-auto">
        <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 2 }}>
          {/* Column headers (key tokens) */}
          <div style={{ display: 'flex', marginLeft: CELL + 8 }}>
            {TOKENS.map((tok, j) => (
              <div key={j} style={{ width: CELL }} className="flex items-end justify-center pb-1">
                <span className="text-[10px] font-mono text-gray-500 leading-none"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', height: 32 }}>
                  {tok}
                </span>
              </div>
            ))}
          </div>

          {/* Rows */}
          {TOKENS.map((qTok, i) => {
            const isActiveRow = cur.activeRow === i
            return (
              <div key={i} style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {/* Row header (query token) */}
                <div style={{ width: CELL }} className="flex items-center justify-end pr-2">
                  <span className={`text-[11px] font-mono font-semibold ${
                    isActiveRow ? 'text-dsa-300' : 'text-gray-500'
                  }`}>
                    {qTok}
                  </span>
                </div>

                {/* Cells */}
                {ATTN[i].map((w, j) => {
                  const bg = colorScale(w)
                  const textColor = w > 0.28 ? '#000' : '#fff'
                  return (
                    <motion.div key={j}
                      style={{ width: CELL, height: CELL }}
                      animate={{
                        backgroundColor: bg,
                        opacity: cur.activeRow === -1 ? 1 : isActiveRow ? 1 : 0.35,
                        scale:   isActiveRow && w === Math.max(...ATTN[i]) ? 1.08 : 1,
                        outline: isActiveRow ? '1.5px solid #60a5fa' : '0px solid transparent',
                      }}
                      transition={{ duration: 0.25 }}
                      className="rounded-sm flex items-center justify-center"
                    >
                      <span style={{ color: textColor }} className="text-[10px] font-mono font-semibold">
                        {w.toFixed(2)}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

      {/* Color scale legend */}
      <div className="flex items-center gap-3 text-xs text-gray-500">
        <span>0.00</span>
        <div className="flex-1 h-2 rounded overflow-hidden" style={{
          background: 'linear-gradient(to right, #1a0533, #7c1d0d, #d94e13, #facc15)',
        }} />
        <span>0.50+</span>
        <span className="text-gray-600 ml-2">attention weight</span>
      </div>

      {/* Active row stats */}
      <AnimatePresence>
        {cur.activeRow >= 0 && (
          <motion.div key={cur.activeRow}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex gap-2 flex-wrap text-xs font-mono"
          >
            {ATTN[cur.activeRow].map((w, j) => (
              <div key={j} className="flex items-center gap-1 px-2 py-0.5 rounded bg-surface-700 border border-surface-600">
                <span className="text-gray-500">{TOKENS[j]}:</span>
                <span className="font-bold" style={{ color: colorScale(w) === '#fff' ? '#ddd' : colorScale(w) }}>
                  {w.toFixed(2)}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <StepControls
        step={step} totalSteps={steps.length} playing={playing} speed={speed}
        annotation={cur?.annotation}
        onPrev={()  => { setPlaying(false); setStep(s => Math.max(0, s - 1)) }}
        onNext={()  => { setPlaying(false); setStep(s => Math.min(steps.length - 1, s + 1)) }}
        onPlay={()  => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onReset={handleReset}
        onSpeedChange={setSpeed}
      />
    </div>
  )
}
