import { useState, useMemo, useCallback } from 'react'
import * as d3 from 'd3'
import { motion, AnimatePresence } from 'framer-motion'
import StepControls from './StepControls.jsx'
import { useInterval } from '../../hooks/useInterval.js'

const SPEED_MS = { 0.5: 2000, 1: 1000, 1.5: 667, 2: 500, 3: 333 }

// 2D word embedding positions (PCA-projected for clarity)
const WORDS = [
  // Royalty cluster
  { id: 'king',   x: 6.8, y: 7.2, group: 'royalty', color: '#a78bfa' },
  { id: 'queen',  x: 5.2, y: 6.8, group: 'royalty', color: '#a78bfa' },
  { id: 'prince', x: 7.1, y: 5.9, group: 'royalty', color: '#a78bfa' },
  // Gender
  { id: 'man',    x: 6.5, y: 3.5, group: 'gender',  color: '#60a5fa' },
  { id: 'woman',  x: 4.8, y: 3.1, group: 'gender',  color: '#f472b6' },
  { id: 'boy',    x: 7.2, y: 2.4, group: 'gender',  color: '#60a5fa' },
  { id: 'girl',   x: 5.5, y: 2.0, group: 'gender',  color: '#f472b6' },
  // Animals
  { id: 'cat',    x: 2.1, y: 7.5, group: 'animal',  color: '#34d399' },
  { id: 'dog',    x: 1.5, y: 6.3, group: 'animal',  color: '#34d399' },
  { id: 'kitten', x: 2.8, y: 8.1, group: 'animal',  color: '#34d399' },
  // Places
  { id: 'paris',  x: 2.0, y: 2.5, group: 'city',    color: '#fbbf24' },
  { id: 'london', x: 1.4, y: 3.5, group: 'city',    color: '#fbbf24' },
  { id: 'france', x: 3.0, y: 1.8, group: 'city',    color: '#fb923c' },
]

// Nearest neighbours (pre-computed)
const NEAREST = {
  king:   ['queen', 'prince'],
  woman:  ['girl', 'queen'],
  cat:    ['kitten', 'dog'],
  paris:  ['london', 'france'],
}

// Vector arithmetic: king - man + woman ≈ queen
const ANALOGY = {
  from: 'king', sub: 'man', add: 'woman', result: 'queen',
}

const STEPS = [
  {
    highlight: new Set(),
    arrows:    [],
    annotation: '13 words projected to 2D (PCA). Semantically similar words cluster together.',
  },
  {
    highlight: new Set(['royalty']),
    arrows:    [],
    annotation: 'Royalty cluster: "king", "queen", "prince" are close in vector space.',
  },
  {
    highlight: new Set(['animal']),
    arrows:    [],
    annotation: 'Animal cluster: "cat", "kitten", "dog" share semantic context from co-occurrence.',
  },
  {
    highlight: new Set(['gender']),
    arrows:    [],
    annotation: 'Gender axis: "man"/"boy" and "woman"/"girl" separated by a consistent direction.',
  },
  {
    highlight: new Set(['cat']),
    arrows:    NEAREST['cat'].map(to => ({ from: 'cat', to })),
    annotation: 'Nearest neighbors of "cat": ["kitten", "dog"] — semantically similar words.',
  },
  {
    highlight: new Set(['king', 'man', 'woman', 'queen']),
    arrows:    [
      { from: 'king', to: 'queen', label: 'king − man + woman', color: '#a78bfa', dashed: true },
    ],
    annotation: 'Vector arithmetic: king − man + woman ≈ queen. The gender direction is consistent across domains.',
  },
]

export default function VectorSpace({ config = {} }) {
  const [step,    setStep]    = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed,   setSpeed]   = useState(1)

  const cur = STEPS[step]

  useInterval(
    () => { if (step < STEPS.length - 1) setStep(s => s + 1); else setPlaying(false) },
    playing ? SPEED_MS[speed] : null,
  )

  const handleReset = useCallback(() => { setStep(0); setPlaying(false) }, [])

  // Chart geometry
  const W = 480, H = 340
  const mg = { top: 16, right: 16, bottom: 30, left: 36 }
  const iW = W - mg.left - mg.right
  const iH = H - mg.top  - mg.bottom

  const xScale = useMemo(() => d3.scaleLinear().domain([0, 10]).range([0, iW]), [iW])
  const yScale = useMemo(() => d3.scaleLinear().domain([0, 10]).range([iH, 0]), [iH])

  function wordPos(id) {
    const w = WORDS.find(x => x.id === id)
    return w ? { x: xScale(w.x), y: yScale(w.y) } : null
  }

  const groupLabels = [
    { group: 'royalty', label: 'Royalty',  color: '#a78bfa' },
    { group: 'gender',  label: 'Gender',   color: '#60a5fa' },
    { group: 'animal',  label: 'Animals',  color: '#34d399' },
    { group: 'city',    label: 'Places',   color: '#fbbf24' },
  ]

  return (
    <div className="flex flex-col gap-3">
      {/* Plot */}
      <div className="rounded-lg border border-surface-600 bg-surface-800 overflow-hidden">
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ maxHeight: 360 }}>
          <g transform={`translate(${mg.left},${mg.top})`}>
            {/* Axis labels */}
            <text x={iW / 2} y={iH + 22} textAnchor="middle"
              fill="#4b5563" fontSize={9} fontFamily="Inter,sans-serif">Principal Component 1</text>
            <text transform={`translate(-24,${iH / 2}) rotate(-90)`}
              textAnchor="middle" fill="#4b5563" fontSize={9} fontFamily="Inter,sans-serif">
              Principal Component 2
            </text>

            {/* Light grid */}
            {[2, 4, 6, 8].map(t => (
              <g key={t}>
                <line x1={xScale(t)} x2={xScale(t)} y1={0} y2={iH} stroke="#1e1e26" strokeWidth={1} />
                <line x1={0} x2={iW} y1={yScale(t)} y2={yScale(t)} stroke="#1e1e26" strokeWidth={1} />
              </g>
            ))}

            {/* Annotation arrows */}
            <AnimatePresence>
              {cur.arrows.map((arrow, i) => {
                const from = wordPos(arrow.from)
                const to   = wordPos(arrow.to)
                if (!from || !to) return null
                const color = arrow.color ?? '#6b7280'
                return (
                  <motion.line key={i}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke={color} strokeWidth={1.5} strokeOpacity={0.7}
                    strokeDasharray={arrow.dashed ? '5 3' : 'none'}
                  />
                )
              })}
            </AnimatePresence>

            {/* Word points */}
            {WORDS.map(w => {
              const isHighlighted = cur.highlight.size === 0 || cur.highlight.has(w.group) || cur.highlight.has(w.id)
              const cx = xScale(w.x), cy = yScale(w.y)

              return (
                <g key={w.id}>
                  <motion.circle
                    cx={cx} cy={cy}
                    animate={{
                      r:            isHighlighted ? 5 : 3.5,
                      fill:         w.color,
                      fillOpacity:  isHighlighted ? 0.9 : 0.2,
                      stroke:       w.color,
                      strokeOpacity: isHighlighted ? 0.5 : 0.1,
                    }}
                    transition={{ duration: 0.25 }}
                    strokeWidth={6}
                  />
                  <motion.text
                    x={cx + 7} y={cy + 3}
                    animate={{ opacity: isHighlighted ? 1 : 0.2, fill: w.color }}
                    transition={{ duration: 0.25 }}
                    fontSize={10} fontFamily="'JetBrains Mono',monospace" fontWeight="600"
                  >
                    {w.id}
                  </motion.text>
                </g>
              )
            })}
          </g>
        </svg>
      </div>

      {/* Group legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
        {groupLabels.map(({ label, color }) => (
          <span key={label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: color }} />
            {label}
          </span>
        ))}
      </div>

      <StepControls
        step={step} totalSteps={STEPS.length} playing={playing} speed={speed}
        annotation={cur?.annotation}
        onPrev={()  => { setPlaying(false); setStep(s => Math.max(0, s - 1)) }}
        onNext={()  => { setPlaying(false); setStep(s => Math.min(STEPS.length - 1, s + 1)) }}
        onPlay={()  => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onReset={handleReset}
        onSpeedChange={setSpeed}
      />
    </div>
  )
}
